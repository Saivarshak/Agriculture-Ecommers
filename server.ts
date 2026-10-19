import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Increase request payload limit for image uploads
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Ensure upload directory exists
const UPLOADS_DIR = path.resolve(__dirname, 'public/uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Server-side persistent storage directory for image registry
const DATA_DIR = path.resolve(__dirname, 'src/data');
const REGISTRY_FILE = path.resolve(DATA_DIR, 'managed_images_db.json');

// Serve uploaded media files directly
app.use('/uploads', express.static(UPLOADS_DIR));

// -----------------------------------------------------------------------------
// IMAGE MANAGEMENT REST API ENDPOINTS
// -----------------------------------------------------------------------------

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AgriShop Image Management System', timestamp: new Date().toISOString() });
});

// 2. Upload and store media file on server with security validation
app.post('/api/images/upload', (req, res) => {
  try {
    const { dataUrl, fileName, fileType } = req.body;

    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ error: 'No image data payload provided.' });
    }

    // Validate MIME type
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let mimeType = fileType;
    let base64Data = dataUrl;

    if (matches && matches.length === 3) {
      mimeType = matches[1];
      base64Data = matches[2];
    }

    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (mimeType && !allowedMimes.includes(mimeType.toLowerCase())) {
      return res.status(400).json({
        error: `Unsupported image format "${mimeType}". Allowed: JPG, PNG, WebP, SVG.`
      });
    }

    const buffer = Buffer.from(base64Data, 'base64');

    // Validate size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (buffer.length > MAX_SIZE) {
      return res.status(400).json({
        error: `Image exceeds maximum file size limit of 10 MB (${(buffer.length / (1024 * 1024)).toFixed(1)} MB).`
      });
    }

    // Determine safe file extension
    let ext = '.jpg';
    if (mimeType?.includes('png')) ext = '.png';
    else if (mimeType?.includes('webp')) ext = '.webp';
    else if (mimeType?.includes('svg')) ext = '.svg';
    else if (mimeType?.includes('gif')) ext = '.gif';

    // Sanitize file name to prevent directory traversal
    const safeBaseName = (fileName || 'image')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 32);

    const uniqueId = crypto.randomBytes(6).toString('hex');
    const finalFileName = `${safeBaseName}_${Date.now()}_${uniqueId}${ext}`;
    const destinationPath = path.resolve(UPLOADS_DIR, finalFileName);

    // Save to disk
    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/${finalFileName}`;
    const formattedSize = buffer.length > 1024 * 1024
      ? `${(buffer.length / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.round(buffer.length / 1024)} KB`;

    return res.json({
      success: true,
      url: publicUrl,
      fileName: finalFileName,
      fileSize: formattedSize,
      fileType: mimeType || 'image/jpeg',
      storedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error while processing image.' });
  }
});

// 3. Save / backup registry state to server disk
app.post('/api/images/sync', (req, res) => {
  try {
    const { images } = req.body;
    if (!Array.isArray(images)) {
      return res.status(400).json({ error: 'Expected images array.' });
    }
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(images, null, 2), 'utf-8');
    res.json({ success: true, count: images.length, timestamp: new Date().toISOString() });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to save registry to disk.' });
  }
});

// 4. Retrieve disk-persisted registry state
app.get('/api/images', (req, res) => {
  try {
    if (fs.existsSync(REGISTRY_FILE)) {
      const data = fs.readFileSync(REGISTRY_FILE, 'utf-8');
      return res.json({ success: true, images: JSON.parse(data) });
    }
    return res.json({ success: true, images: [] });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to load registry.' });
  }
});

// -----------------------------------------------------------------------------
// VITE INTEGRATION (DEV MIDDLEWARE OR STATIC PRODUCTION SERVE)
// -----------------------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AgriShop] Full-Stack server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

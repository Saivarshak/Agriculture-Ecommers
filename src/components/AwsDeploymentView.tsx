import React, { useState } from 'react';
import {
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Play,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Server,
  Layers,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';

interface AwsDeploymentViewProps {
  language: LanguageCode;
}

export const AwsDeploymentView: React.FC<AwsDeploymentViewProps> = ({ language }) => {
  const t = translations[language];

  // Pipeline simulation state
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(4); // 0: git, 1: lint/test, 2: docker, 3: ecr, 4: ecs-live
  const [buildLogs, setBuildLogs] = useState<string[]>([
    '[CI/CD] Build #1042 triggered via GitHub Webhook on commit e81a4d',
    '[TEST] Executing TypeScript compiler check (tsc --noEmit)... OK',
    '[DOCKER] Building container image: kisansetu-platform:v2.4.0',
    '[ECR] Pushing image tag to 895625459277.dkr.ecr.ap-south-1.amazonaws.com/kisansetu:latest',
    '[ECS] Performing Blue/Green rolling deployment on AWS Fargate... 100% healthy',
    '[ROUTE53] Health-check green: 0 downtime recorded. Service live on AWS CloudFront.'
  ]);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const pipelineSteps = [
    { name: '1. Git Commit', icon: GitBranch, desc: 'Push to main branch' },
    { name: '2. Lint & Verify', icon: Terminal, desc: 'TypeScript & security audit' },
    { name: '3. Docker Build', icon: Layers, desc: 'Multi-stage alpine image' },
    { name: '4. AWS ECR Push', icon: Server, desc: 'Encrypted container registry' },
    { name: '5. ECS Fargate', icon: Cpu, desc: 'Serverless zero-downtime deploy' }
  ];

  const handleRunPipeline = () => {
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setActiveStage(0);
    setBuildLogs(['[TRIGGER] Starting automated CI/CD pipeline on AWS CodePipeline / GitHub Actions...']);

    const stageMessages = [
      '[STAGE 1] Pulled latest agricultural commits from git repository: feat(farmer-verification)',
      '[STAGE 2] Running syntax verification & build optimization: 0 errors found.',
      '[STAGE 3] Docker build completed in 4.2s. Image size: 48.2 MB.',
      '[STAGE 4] Push completed to AWS ECR Mumbai (ap-south-1). Digest: sha256:d891b...',
      '[STAGE 5] ECS Fargate tasks swapped with zero-downtime. All healthchecks reporting 200 OK.'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < 5) {
        setActiveStage(current);
        setBuildLogs((prev) => [...prev, stageMessages[current]]);
      } else {
        clearInterval(interval);
        setPipelineRunning(false);
        setBuildLogs((prev) => [
          ...prev,
          '[SUCCESS] Automated AWS Deployment successfully verified live!'
        ]);
      }
    }, 1200);
  };

  const copyConfig = (name: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(name);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const sampleDockerfile = `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--port", "3000", "--host", "0.0.0.0"]`;

  const sampleGitHubWorkflow = `name: Deploy KisanSetu to AWS
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    name: Build & Deploy to AWS Fargate
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: ap-south-1

      - name: Build, tag, and push Docker image to Amazon ECR
        run: |
          docker build -t kisansetu-platform:latest .
          docker push \${{ steps.login-ecr.outputs.registry }}/kisansetu-platform:latest

      - name: Deploy Amazon ECS Task Definition
        uses: aws-actions/amazon-ecs-deploy-task-definition@v2
        with:
          task-definition: aws-task-definition.json
          service: kisansetu-production-service
          cluster: kisansetu-rural-cluster
          wait-for-service-stability: true`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Cloud Infrastructure & DevOps
          </span>
          <h2 className="text-2xl font-bold text-stone-900 font-serif-display mt-0.5">
            AWS Hosting & Automated CI/CD Pipelines
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Engineered for rural low-latency edge delivery, automated zero-downtime releases, and zero-cost serverless operation for smallholder farmers.
          </p>
        </div>

        <button
          onClick={handleRunPipeline}
          disabled={pipelineRunning}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-2 ${
            pipelineRunning
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
              : 'bg-emerald-800 hover:bg-emerald-900 text-white cursor-pointer'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>{pipelineRunning ? 'Deploying Pipeline...' : 'Trigger Automated CI/CD Pipeline'}</span>
        </button>
      </div>

      {/* Free Tier for Small-Scale Operations Guarantee */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
            🌱
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-950">
              Zero Platform Charges for Rural Small-Scale Operations
            </h3>
            <p className="text-xs text-emerald-800 mt-0.5 max-w-2xl">
              Utilizing AWS Serverless Free-Tier primitives (AWS ECS Fargate scale-to-zero, CloudFront 1TB transfer, Amazon DynamoDB pay-per-request, and S3 media storage). Small farmers and FPOs pay $0 fixed server maintenance costs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 text-xs font-bold text-emerald-900 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>100% Free Tier Architecture</span>
        </div>
      </div>

      {/* Interactive CI/CD Pipeline Stepper */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900 font-serif-display">
            Automated CI/CD Deployment Flow
          </h3>
          <span className="text-xs text-stone-500">
            Status: {pipelineRunning ? 'Executing Steps...' : 'Production Healthy'}
          </span>
        </div>

        {/* Stepper Graph */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {pipelineSteps.map((step, idx) => {
            const isFinished = idx <= activeStage;
            const isCurrent = idx === activeStage && pipelineRunning;
            const StepIcon = step.icon;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-xs transition-all ${
                  isFinished
                    ? 'border-emerald-700 bg-emerald-50/60 text-emerald-950'
                    : 'border-stone-200 bg-stone-50 text-stone-500'
                } ${isCurrent ? 'ring-2 ring-emerald-500 animate-pulse' : ''}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <StepIcon className={`w-4 h-4 ${isFinished ? 'text-emerald-800' : 'text-stone-400'}`} />
                  {isFinished && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <span className="font-bold block text-xs">{step.name}</span>
                <span className="text-[11px] text-stone-500 block mt-0.5">{step.desc}</span>
              </div>
            );
          })}
        </div>

        {/* Live Terminal Log Stream */}
        <div className="bg-stone-950 text-emerald-400 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto shadow-inner border border-stone-800 space-y-1">
          <div className="text-stone-500 text-[10px] pb-1 border-b border-stone-800 flex items-center justify-between">
            <span>AWS CodePipeline Console Output</span>
            <span className="text-emerald-500">Region: ap-south-1 (Mumbai / Hyderabad Local Edge)</span>
          </div>
          {buildLogs.map((log, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-stone-600 select-none">&gt;</span>
              <span className={log.includes('OK') || log.includes('green') || log.includes('SUCCESS') ? 'text-emerald-300 font-bold' : 'text-stone-300'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cloud Architecture Diagram (SVG / Grid) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
        <h3 className="text-base font-bold text-stone-900 font-serif-display">
          Multi-AZ AWS Architecture Topology
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {/* Edge Tier */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
              <Cloud className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-stone-900">Amazon CloudFront CDN</h4>
            <p className="text-stone-500 text-[11px] leading-normal">
              200+ edge locations caching agricultural listings, harvest photos, and PWA manifests near rural panchayats.
            </p>
          </div>

          {/* Compute Tier */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-stone-900">AWS ECS Fargate</h4>
            <p className="text-stone-500 text-[11px] leading-normal">
              Serverless Node.js container fleet automatically scaling up during morning harvest order rushes and scaling to zero at night.
            </p>
          </div>

          {/* Database Tier */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Database className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-stone-900">Amazon DynamoDB & S3</h4>
            <p className="text-stone-500 text-[11px] leading-normal">
              Single-digit millisecond latency for live crop inventory, farmer verification documents, and temperature telemetry.
            </p>
          </div>

          {/* DevOps Tier */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <GitBranch className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-stone-900">GitHub Actions & ECR</h4>
            <p className="text-stone-500 text-[11px] leading-normal">
              Automated lint, unit test, container build, vulnerability scan, and rolling Blue/Green deployment to ECS cluster.
            </p>
          </div>
        </div>
      </div>

      {/* Production Infrastructure Files (Ready to Deploy) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900 font-mono">Dockerfile (Production Multi-Stage)</span>
            <button
              onClick={() => copyConfig('docker', sampleDockerfile)}
              className="text-xs text-stone-500 hover:text-emerald-800 flex items-center gap-1 font-medium"
            >
              {copiedFile === 'docker' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFile === 'docker' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="bg-stone-900 text-stone-300 p-3 rounded-lg text-[10px] font-mono overflow-x-auto leading-relaxed max-h-48">
            {sampleDockerfile}
          </pre>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900 font-mono">.github/workflows/deploy-aws.yml</span>
            <button
              onClick={() => copyConfig('workflow', sampleGitHubWorkflow)}
              className="text-xs text-stone-500 hover:text-emerald-800 flex items-center gap-1 font-medium"
            >
              {copiedFile === 'workflow' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFile === 'workflow' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="bg-stone-900 text-stone-300 p-3 rounded-lg text-[10px] font-mono overflow-x-auto leading-relaxed max-h-48">
            {sampleGitHubWorkflow}
          </pre>
        </div>
      </div>
    </div>
  );
};

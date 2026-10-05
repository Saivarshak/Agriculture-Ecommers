import { LanguageCode } from '../types';

export interface TranslationStrings {
  brandName: string;
  tagline: string;
  navMarketplace: string;
  navFarmerDashboard: string;
  navAdminVerification: string;
  navOrders: string;
  login: string;
  logout: string;
  topTrustBar: string;

  // Hero Section
  heroBadge: string;
  heroMainTitle: string;
  heroSubTitle: string;
  heroDescription: string;
  heroCtaExplore: string;
  heroCtaFarmer: string;
  statCommission: string;
  statDirect: string;
  statGateToHome: string;
  statVerifiedFarms: string;
  mandiTickerTitle: string;
  mandiTickerDesc: string;
  tickerPaddy: string;
  tickerTomato: string;
  tickerMango: string;

  // Category Tabs
  allCrops: string;
  cereals: string;
  pulses: string;
  vegetables: string;
  fruits: string;
  spices: string;
  exotic: string;

  // Catalog Filter & Sorting
  filterVerifiedOnly: string;
  showing: string;
  crops: string;
  searchPlaceholder: string;
  sortBy: string;
  sortHighestRated: string;
  sortPriceLowHigh: string;
  sortPriceHighLow: string;
  sortDistance: string;
  resetFilters: string;
  noCropsFound: string;
  noCropsFoundDesc: string;

  // Product Card & Details
  farmerBadge: string;
  verifiedLocalFarmer: string;
  verificationInProgress: string;
  away: string;
  freshBatch: string;
  reviews: string;
  directToFarmer: string;
  addToBasket: string;
  addedToBasket: string;
  addToCart: string;
  customerReviews: string;
  writeReview: string;
  submitReview: string;
  zeroMiddlemanBadge: string;
  organicStandard: string;
  apmcRate: string;
  farmerGainHigher: string;
  farmStory: string;
  nutritionalValue: string;
  coldTransportGuaranteed: string;
  reviewNoticeDelivered: string;
  reviewSuccess: string;
  starRating: string;
  feedbackPlaceholder: string;
  simulateDeliveredOrder: string;

  // User Dropdown & Profile
  adminAuthenticated: string;
  adminDesc: string;
  adminVerificationDesk: string;
  logoutAdmin: string;
  adminPortal: string;
  trackMyOrders: string;
  myWishlist: string;
  farmerDashboard: string;
  signInSwitchRole: string;

  // Cart & Checkout
  shoppingBag: string;
  emptyCart: string;
  emptyCartDesc: string;
  startShopping: string;
  harvestBasket: string;
  farmGateOrigin: string;
  automatedDeliverySchedule: string;
  orderConfirmed: string;
  orderConfirmedDesc: string;
  directFarmerRemittance: string;
  directRemittanceDesc: string;
  deliveryDestination: string;
  recipientName: string;
  mobileNumber: string;
  completeAddress: string;
  deliverySlots: string;
  earlyMorningSlot: string;
  earlyMorningSlotDesc: string;
  eveningSlot: string;
  eveningSlotDesc: string;
  weekendSlot: string;
  weekendSlotDesc: string;
  recommended: string;
  secureCheckout: string;
  orderTotal: string;
  directFarmerEarnings: string;
  paymentMethod: string;
  cashOnDelivery: string;
  cashOnDeliveryDesc: string;
  upiInstant: string;
  upiInstantDesc: string;
  cardsRuPay: string;
  cardsRuPayDesc: string;
  netBanking: string;
  placeOrder: string;
  confirmHarvestOrder: string;
  orderPlacedSuccess: string;
  orderId: string;
  harvestDispatched: string;
  orderDispatchedDesc: string;
  directFarmerPayout: string;
  coldTransitLogistics: string;
  totalAmountDue: string;
  viewLiveTracker: string;
  freeAbove399: string;
  zeroCommission: string;

  // Wishlist
  wishlistTitle: string;
  wishlistEmpty: string;
  wishlistEmptyDesc: string;
  browseFreshCrops: string;
  removeFromWishlist: string;

  // Farmer Dashboard
  farmerHubTitle: string;
  farmerHubDesc: string;
  tabInventory: string;
  tabVerification: string;
  tabAnalytics: string;
  totalActiveCrops: string;
  stockReady: string;
  estHarvestValue: string;
  avgCustomerRating: string;
  addNewHarvest: string;
  updateStock: string;
  cropName: string;
  pricePerUnit: string;
  stockAvailable: string;
  action: string;
  verifiedStatusBadge: string;
  pendingStatusBadge: string;
  landRecords: string;
  uploadLandRecord: string;

  // Admin Verification
  adminAuditTitle: string;
  adminAuditSubtitle: string;
  adminAuditDesc: string;
  filterAll: string;
  filterPending: string;
  filterVerified: string;
  filterRejected: string;
  approveFarmer: string;
  rejectFarmer: string;
  landAcreage: string;
  soilType: string;
  primaryCrops: string;
  acresUnit: string;

  // Order Tracking
  trackingSubtitle: string;
  trackingTitle: string;
  selectOrder: string;
  estimatedDelivery: string;
  noOrdersTitle: string;
  noOrdersDesc: string;
  stageHarvestScheduled: string;
  stageHarvestScheduledDesc: string;
  stageHandHarvested: string;
  stageHandHarvestedDesc: string;
  stageColdChain: string;
  stageColdChainDesc: string;
  stageOutForDelivery: string;
  stageOutForDeliveryDesc: string;
  stageDelivered: string;
  stageDeliveredDesc: string;
  vehicleTelemetry: string;
  coldTempStatus: string;
  assignedDriver: string;
  harvestItemsSummary: string;

  // Auth & Admin Portal Modals
  authModalTitle: string;
  authModalDesc: string;
  authConsumer: string;
  authFarmer: string;
  authAdmin: string;
  authEmail: string;
  authPassword: string;
  authLoginButton: string;
  quickDemoAccess: string;
  adminPortalTitle: string;
  adminPortalDesc: string;
  adminPinLabel: string;
  adminLoginBtn: string;

  // Footer
  footerSubtitle: string;
  footerDirect: string;
  home: string;
}

export const translations: Record<LanguageCode, TranslationStrings> = {
  en: {
    brandName: 'Xiva.Org',
    tagline: 'Direct Farm-to-Consumer Agriculture Platform',
    navMarketplace: 'Marketplace',
    navFarmerDashboard: 'Farmer Hub',
    navAdminVerification: 'Admin Desk',
    navOrders: 'Track Orders',
    login: 'Sign In',
    logout: 'Sign Out',
    topTrustBar: '100% Direct Farmer Remittance · Zero Middlemen · APMC Mandi Benchmark Pricing',

    heroBadge: '100% Organic & Fresh · Direct From Village Soil to Urban Table',
    heroMainTitle: 'Pure Organic Farm Harvests,',
    heroSubTitle: 'Directly From Verified Local Farmers',
    heroDescription: 'Connecting rural smallholder farmers directly with urban consumers. 0% middlemen commission, APMC price parity, guaranteed fresh harvest, and automated morning delivery scheduling.',
    heroCtaExplore: 'Explore Fresh Crops',
    heroCtaFarmer: 'Farmer Portal & Inventory',
    statCommission: 'Platform Commission',
    statDirect: 'Direct to Farmer',
    statGateToHome: 'Farm Gate to Home',
    statVerifiedFarms: 'Land Verified Farms',
    mandiTickerTitle: 'APMC Mandi Transparency',
    mandiTickerDesc: 'Farmers earn up to 40% more while consumers save 15-25% compared to commercial supermarket markups.',
    tickerPaddy: '🌾 Paddy/Rice: ₹65/kg (Mandi: ₹54)',
    tickerTomato: '🍅 Tomato: ₹38/kg (Supermarket: ₹48)',
    tickerMango: '🥭 Alphonso: ₹520/doz',

    allCrops: 'All Crops',
    cereals: 'Cereals',
    pulses: 'Pulses',
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    spices: 'Spices',
    exotic: 'Exotic',

    filterVerifiedOnly: 'Verified Farmers Only',
    showing: 'Showing',
    crops: 'crops',
    searchPlaceholder: 'Search crops, pulses, fruits...',
    sortBy: 'Sort By',
    sortHighestRated: 'Highest Customer Rating',
    sortPriceLowHigh: 'Price: Low to High',
    sortPriceHighLow: 'Price: High to Low',
    sortDistance: 'Nearest Farm Distance',
    resetFilters: 'Reset Filters',
    noCropsFound: 'No matching farm produce found',
    noCropsFoundDesc: 'Try adjusting your category filter, turning off verified only, or searching for other agricultural produce.',

    farmerBadge: 'Verified Producer',
    verifiedLocalFarmer: 'Govt & Land Verified Producer',
    verificationInProgress: 'Verification in Progress',
    away: 'km away',
    freshBatch: 'Fresh batch',
    reviews: 'reviews',
    directToFarmer: '100% to farmer',
    addToBasket: 'Add to Basket',
    addedToBasket: 'Added to basket',
    addToCart: 'Add to Basket',
    customerReviews: 'Customer Reviews & Ratings',
    writeReview: 'Write a Verified Review',
    submitReview: 'Submit Farm Review',
    zeroMiddlemanBadge: 'Zero Middleman: 100% to Farmer',
    organicStandard: 'Organic Standard',
    apmcRate: 'APMC Mandi Middleman Rate',
    farmerGainHigher: 'Farmer gains higher direct realization!',
    farmStory: 'Farm Story & Harvesting',
    nutritionalValue: 'Nutritional Value & Natural Health',
    coldTransportGuaranteed: 'Cold Transport Guaranteed: Monitored at 4°C directly from village cold storage',
    reviewNoticeDelivered: 'Only customers with a verified delivered order can review this harvest.',
    reviewSuccess: 'Review submitted successfully! Thank you for supporting local farmers.',
    starRating: 'Star Rating',
    feedbackPlaceholder: 'Write your feedback about freshness, taste, and farm quality...',
    simulateDeliveredOrder: 'Simulate Verified Purchase (Demo)',

    adminAuthenticated: 'Admin Authenticated',
    adminDesc: 'Full verification & catalog control',
    adminVerificationDesk: 'Admin Verification Desk',
    logoutAdmin: 'Log Out Administrator',
    adminPortal: 'Administrator Portal',
    trackMyOrders: 'Track My Orders',
    myWishlist: 'My Wishlist',
    farmerDashboard: 'Farmer Dashboard & Inventory',
    signInSwitchRole: 'Sign In / Switch Role',

    shoppingBag: 'Shopping Basket',
    emptyCart: 'Your basket is empty',
    emptyCartDesc: 'Add fresh organic crops harvested directly from rural farmers.',
    startShopping: 'Browse Crops',
    harvestBasket: 'Harvest Basket',
    farmGateOrigin: 'Direct farm gate origin · Zero intermediaries',
    automatedDeliverySchedule: 'Automated Delivery & Schedule',
    orderConfirmed: 'Order Confirmed!',
    orderConfirmedDesc: '100% value booked for rural farmers',
    directFarmerRemittance: 'Direct Farmer Remittance',
    directRemittanceDesc: 'Full subtotal will be wired directly via UPI/Bank to the farmer account. Zero platform cut.',
    deliveryDestination: 'Delivery Destination',
    recipientName: 'Recipient Full Name',
    mobileNumber: 'Mobile Number (for SMS & Driver Dispatch)',
    completeAddress: 'Complete Flat/House, Apartment Name, Street, Landmark',
    deliverySlots: 'Automated Delivery Slot',
    earlyMorningSlot: 'Morning Dew (6:00 AM - 8:30 AM)',
    earlyMorningSlotDesc: 'Plucked at 4:30 AM · Delivered cold at 7:00 AM',
    eveningSlot: 'Evening Harvest (5:00 PM - 8:00 PM)',
    eveningSlotDesc: 'Midday harvest · Doorstep delivery before dinner',
    weekendSlot: 'Sunday Community Drop',
    weekendSlotDesc: 'Apartment community collective drop · Zero carbon',
    recommended: 'Recommended',
    secureCheckout: 'Proceed to Secure Checkout',
    orderTotal: 'Order Total',
    directFarmerEarnings: 'Direct Farmer Payout (100%)',
    paymentMethod: 'Payment Method',
    cashOnDelivery: 'Cash on Delivery (Zero Advance)',
    cashOnDeliveryDesc: 'Pay upon farm delivery verification',
    upiInstant: 'Instant UPI (GPay, PhonePe, Paytm)',
    upiInstantDesc: 'Google Pay, PhonePe, Paytm, BHIM QR',
    cardsRuPay: 'RuPay / Credit / Debit Card',
    cardsRuPayDesc: 'Domestic RuPay & International Cards',
    netBanking: 'Direct Net Banking',
    placeOrder: 'Confirm & Place Order',
    confirmHarvestOrder: 'Confirm Harvest Order',
    orderPlacedSuccess: 'Order placed successfully! Scheduled for automated morning dispatch.',
    orderId: 'Order ID',
    harvestDispatched: 'Farm Harvest Dispatched to Queue',
    orderDispatchedDesc: 'Your order has been transmitted directly to the farmer. Automated delivery scheduled for',
    directFarmerPayout: 'Direct Farmer Payout',
    coldTransitLogistics: 'Cold Transit Logistics',
    totalAmountDue: 'Total Amount Paid/Due',
    viewLiveTracker: 'View Live Delivery Tracker',
    freeAbove399: 'Free (Order ₹399+)',
    zeroCommission: '₹0.00 (Zero Fee)',

    wishlistTitle: 'My Wishlist',
    wishlistEmpty: 'Your wishlist is empty',
    wishlistEmptyDesc: 'Save your favorite organic crops by clicking the heart icon on any product card.',
    browseFreshCrops: 'Browse Fresh Crops',
    removeFromWishlist: 'Remove from wishlist',

    farmerHubTitle: 'Farmer Producer Hub',
    farmerHubDesc: 'Manage crop inventory, harvest logs, and official land verification.',
    tabInventory: 'Crop Inventory & Stock',
    tabVerification: 'Government Verification & Land Audit',
    tabAnalytics: 'Farm Analytics',
    totalActiveCrops: 'Total Active Crops',
    stockReady: 'Stock Ready for Harvest',
    estHarvestValue: 'Est. Harvest Value',
    avgCustomerRating: 'Avg. Customer Rating',
    addNewHarvest: 'Add New Harvest / Crop',
    updateStock: 'Update Stock',
    cropName: 'Crop Name',
    pricePerUnit: 'Price / Unit',
    stockAvailable: 'Stock Available',
    action: 'Action',
    verifiedStatusBadge: 'Verified',
    pendingStatusBadge: 'Pending Review',
    landRecords: 'Land Records & Documents',
    uploadLandRecord: 'Upload Land Document',

    adminAuditTitle: 'Farmer Verification & Compliance Desk',
    adminAuditSubtitle: 'Official Land & Producer Audit',
    adminAuditDesc: 'Review land records, Kisan registration cards, and organic certifications before conferring the marketplace verified badge.',
    filterAll: 'All',
    filterPending: 'Pending Review',
    filterVerified: 'Verified Farms',
    filterRejected: 'Rejected',
    approveFarmer: 'Approve & Verify Farmer',
    rejectFarmer: 'Reject Application',
    landAcreage: 'Land Acreage',
    soilType: 'Soil Type',
    primaryCrops: 'Primary Crops',
    acresUnit: 'Acres',

    trackingSubtitle: 'Real-Time Agricultural Cold-Chain',
    trackingTitle: 'Farm-to-Doorstep Tracking',
    selectOrder: 'Select Order',
    estimatedDelivery: 'Estimated Delivery',
    noOrdersTitle: 'No Active Orders Yet',
    noOrdersDesc: 'When you place a direct farm harvest order, monitor live temperature and vehicle tracking here.',
    stageHarvestScheduled: 'Harvest Scheduled',
    stageHarvestScheduledDesc: 'Farmer notified at village gate',
    stageHandHarvested: 'Hand-Harvested',
    stageHandHarvestedDesc: 'Plucked & washed in well-water',
    stageColdChain: 'Cold-Chain Transit',
    stageColdChainDesc: 'Reefer vehicle monitored at 4°C',
    stageOutForDelivery: 'Out for Delivery',
    stageOutForDeliveryDesc: 'Urban dispatch rider en-route',
    stageDelivered: 'Delivered',
    stageDeliveredDesc: 'Handed over at doorstep',
    vehicleTelemetry: 'Cold-Chain Sensor Telemetry',
    coldTempStatus: 'Reefer Temperature Monitored (4.0°C)',
    assignedDriver: 'Cold Transport Driver',
    harvestItemsSummary: 'Harvest Items in this Order',

    authModalTitle: 'Direct Farm Access',
    authModalDesc: 'Sign in to order fresh village produce or manage farm harvests',
    authConsumer: 'Consumer (Fresh Organics)',
    authFarmer: 'Farmer (Manage Harvests)',
    authAdmin: 'Admin (Land Audit)',
    authEmail: 'Email Address',
    authPassword: 'Password',
    authLoginButton: 'Sign In',
    quickDemoAccess: 'Quick Demo 1-Click Login',
    adminPortalTitle: 'Administrator Portal',
    adminPortalDesc: 'Protected area for agricultural verification officers',
    adminPinLabel: 'Enter Security PIN (Demo: 1111)',
    adminLoginBtn: 'Unlock Verification Desk',

    footerSubtitle: 'Organic vegetables, fresh fruits, quality pulses, grains, and aromatic spices',
    footerDirect: '100% Direct Farmer Remittance',
    home: 'Home'
  },

  te: {
    brandName: 'Xiva.Org',
    tagline: 'రైతు నుండి నేరుగా వినియోగదారునికి చేర్చే వ్యవసాయ వేదిక',
    navMarketplace: 'రైతు బజార్',
    navFarmerDashboard: 'రైతు కేంద్రం',
    navAdminVerification: 'ధృవీకరణ డెస్క్',
    navOrders: 'ఆర్డర్ల ట్రాకింగ్',
    login: 'లాగిన్',
    logout: 'లాగౌట్',
    topTrustBar: '100% రైతుకు నేరుగా చెల్లింపు · దళారులు లేరు · మార్కెట్ మద్దతు ధరల హామీ',

    heroBadge: '100% స్వచ్ఛమైన సేంద్రీయం · పల్లె నేల నుండి నగర ఇళ్లకు తాజా పంటలు',
    heroMainTitle: 'స్వచ్ఛమైన సేంద్రీయ పంటలు,',
    heroSubTitle: 'ధృవీకరించబడిన స్థానిక రైతుల నుండి నేరుగా',
    heroDescription: 'గ్రామీణ చిన్నకారు రైతులను నేరుగా నగర ప్రజలతో అనుసంధానిస్తున్నాం. దళారుల కమీషన్ 0%, నాణ్యమైన పంటలు మరియు ఉదయపు తాజా డెలివరీ.',
    heroCtaExplore: 'తాజా పంటలను చూడండి',
    heroCtaFarmer: 'రైతు పోర్టల్ & నిల్వలు',
    statCommission: 'ప్లాట్‌ఫామ్ కమీషన్',
    statDirect: 'రైతుకు నేరుగా లబ్ధి',
    statGateToHome: 'పొలం నుండి ఇంటికి',
    statVerifiedFarms: 'ప్రభుత్వ భూమి రికార్డుల ధృవీకరణ',
    mandiTickerTitle: 'మార్కెట్ పారదర్శకత',
    mandiTickerDesc: 'రైతులకు 40% వరకు అధిక లాభం, వినియోగదారులకు సూపర్ మార్కెట్ ధరల కంటే 15-25% ఆదా.',
    tickerPaddy: '🌾 వరి/బియ్యం: ₹65/కిలో (మార్కెట్: ₹54)',
    tickerTomato: '🍅 టమోటా: ₹38/కిలో (సూపర్ మార్కెట్: ₹48)',
    tickerMango: '🥭 బంగినపల్లి/అల్ఫోన్సో: ₹520/డజను',

    allCrops: 'అన్ని పంటలు',
    cereals: 'ధాన్యాలు',
    pulses: 'పప్పులు',
    vegetables: 'కూరగాయలు',
    fruits: 'పండ్లు',
    spices: 'సుగంధ ద్రవ్యాలు',
    exotic: 'విదేశీ పంటలు',

    filterVerifiedOnly: 'ధృవీకరించబడిన రైతులు మాత్రమే',
    showing: 'లభ్యమవుతున్నవి',
    crops: 'పంటలు',
    searchPlaceholder: 'పంటలు, పప్పులు, పండ్లు వెతకండి...',
    sortBy: 'క్రమబద్ధీకరణ',
    sortHighestRated: 'ఉత్తమ కస్టమర్ రేటింగ్',
    sortPriceLowHigh: 'ధర: తక్కువ నుండి ఎక్కువ',
    sortPriceHighLow: 'ధర: ఎక్కువ నుండి తక్కువ',
    sortDistance: 'దగ్గరి పొలాలు మొదట',
    resetFilters: 'ఫిల్టర్లు రీసెట్ చేయండి',
    noCropsFound: 'ఎలాంటి పంటలు కనిపించలేదు',
    noCropsFoundDesc: 'దయచేసి మీ ఫిల్టర్లు లేదా సెర్చ్ పదాన్ని మార్చి మళ్ళీ ప్రయత్నించండి.',

    farmerBadge: 'ధృవీకరించబడిన రైతు',
    verifiedLocalFarmer: 'ప్రభుత్వ భూమి రికార్డుల ద్వారా ధృవీకరించబడింది',
    verificationInProgress: 'ధృవీకరణ పరిశీలనలో ఉంది',
    away: 'కి.మీ దూరంలో',
    freshBatch: 'తాజా పంట',
    reviews: 'సమీక్షలు',
    directToFarmer: 'రైతుకు పూర్తి లాభం',
    addToBasket: 'బుట్టలో చేర్చండి',
    addedToBasket: 'బుట్టలో చేర్చబడింది',
    addToCart: 'బుట్టలో చేర్చండి',
    customerReviews: 'వినియోగదారుల సమీక్షలు & రేటింగ్‌లు',
    writeReview: 'సమీక్ష రాయండి',
    submitReview: 'సమీక్ష సమర్పించండి',
    zeroMiddlemanBadge: 'దళారులు లేరు: 100% రైతుకే సొమ్ము',
    organicStandard: 'సేంద్రీయ ప్రమాణం',
    apmcRate: 'మార్కెట్ దళారుల రేటు',
    farmerGainHigher: 'రైతుకు లభించే అదనపు లాభం!',
    farmStory: 'పంట విశేషాలు & కోత వివరాలు',
    nutritionalValue: 'పోషక విలువలు & ఆరోగ్యం',
    coldTransportGuaranteed: 'కోల్డ్ చైన్ రవాణా హామీ: 4°C వద్ద నిరంతరం పర్యవేక్షణ',
    reviewNoticeDelivered: 'డెలివరీ పూర్తయిన ఆర్డర్ ఉన్న వినియోగదారులు మాత్రమే సమీక్ష రాయగలరు.',
    reviewSuccess: 'మీ సమీక్ష విజయవంతంగా నమోదైంది! రైతులకు మద్దతు ఇచ్చినందుకు ధన్యవాదాలు.',
    starRating: 'స్టార్ రేటింగ్',
    feedbackPlaceholder: 'తాజాదనం, నాణ్యత మరియు రుచి గురించి మీ అభిప్రాయాన్ని రాయండి...',
    simulateDeliveredOrder: 'డెలివరీ ఆర్డర్ సిమ్యులేట్ చేయండి (టెస్ట్)',

    adminAuthenticated: 'అడ్మిన్ లాగిన్ అయింది',
    adminDesc: 'ధృవీకరణ మరియు పంటల నిర్వహణ',
    adminVerificationDesk: 'అడ్మిన్ ధృవీకరణ డెస్క్',
    logoutAdmin: 'అడ్మిన్ లాగౌట్',
    adminPortal: 'అడ్మినిస్ట్రేటర్ పోర్టల్',
    trackMyOrders: 'నా ఆర్డర్లు ట్రాక్ చేయండి',
    myWishlist: 'నా కోరికల జాబితా',
    farmerDashboard: 'రైతు డాష్‌బోర్డ్ & నిల్వలు',
    signInSwitchRole: 'లాగిన్ / హోదా మార్చండి',

    shoppingBag: 'కొనుగోలు బుట్ట',
    emptyCart: 'మీ బుట్ట ఖాళీగా ఉంది',
    emptyCartDesc: 'రైతులు పండించిన తాజా సేంద్రీయ పంటలను బుట్టలో చేర్చండి.',
    startShopping: 'పంటలను కొనండి',
    harvestBasket: 'పంటల బుట్ట',
    farmGateOrigin: 'నేరుగా పొలం వద్ద నుండి · దళారులు లేరు',
    automatedDeliverySchedule: 'ఆటోమేటెడ్ డెలివరీ & షెడ్యూల్',
    orderConfirmed: 'ఆర్డర్ ఖరారైంది!',
    orderConfirmedDesc: '100% మొత్తం రైతు ఖాతాకు కేటాయించబడింది',
    directFarmerRemittance: 'రైతుకు ప్రత్యక్ష చెల్లింపు',
    directRemittanceDesc: 'పూర్తి మొత్తం దళారుల కట్ లేకుండా నేరుగా రైతు బ్యాంక్ ఖాతాకు జమ చేయబడుతుంది.',
    deliveryDestination: 'చేరవలసిన చిరునామా',
    recipientName: 'గ్రహీత పూర్తి పేరు',
    mobileNumber: 'మొబైల్ నంబర్ (డెలివరీ సమాచారం కొరకు)',
    completeAddress: 'ఇంటి నంబర్, వీధి, అపార్ట్‌మెంట్, ప్రాంతం',
    deliverySlots: 'డెలివరీ సమయ స్లాట్',
    earlyMorningSlot: 'ఉదయపు డెలివరీ (6:00 - 8:30 AM)',
    earlyMorningSlotDesc: 'ఉదయం 4:30కి కోత · 7:00కి తాజా సరఫరా',
    eveningSlot: 'సాయంత్రపు డెలివరీ (5:00 - 8:00 PM)',
    eveningSlotDesc: 'మధ్యాహ్నపు కోత · రాత్రి భోజనానికి ముందు డెలివరీ',
    weekendSlot: 'ఆదివారం ప్రత్యేక డెలివరీ',
    weekendSlotDesc: 'కమ్యూనిటీ డెలివరీ · సున్నా కార్బన్ ఉద్గారాలు',
    recommended: 'సిఫార్సు చేయబడింది',
    secureCheckout: 'సురక్షిత చెల్లింపు',
    orderTotal: 'మొత్తం బిల్లు',
    directFarmerEarnings: 'రైతుకు చేరే మొత్తం (100%)',
    paymentMethod: 'చెల్లింపు విధానం',
    cashOnDelivery: 'క్యాష్ ఆన్ డెలివరీ (డెలివరీ అయ్యాక నగదు)',
    cashOnDeliveryDesc: 'పంట నాణ్యత చూశాకే నగదు చెల్లించండి',
    upiInstant: 'తక్షణ UPI (GPay, PhonePe, Paytm)',
    upiInstantDesc: 'గూగుల్ పే, ఫోన్ పే, పేటిఎమ్ లేదా క్యూఆర్ కోడ్',
    cardsRuPay: 'రూపే / డెబిట్ కార్డు',
    cardsRuPayDesc: 'భారతీయ రూపే మరియు అంతర్జాతీయ కార్డులు',
    netBanking: 'నెట్ బ్యాంకింగ్',
    placeOrder: 'ఆర్డర్ నిర్ధారించండి',
    confirmHarvestOrder: 'పంట ఆర్డర్ నిర్ధారించండి',
    orderPlacedSuccess: 'ఆర్డర్ విజయవంతంగా నమోదైంది! ఉదయం డెలివరీ కోసం పంపబడుతుంది.',
    orderId: 'ఆర్డర్ సంఖ్య',
    harvestDispatched: 'పొలం నుండి డెలివరీకి పంపబడింది',
    orderDispatchedDesc: 'మీ ఆర్డర్ రైతుకు చేరింది. అంచనా డెలివరీ సమయం:',
    directFarmerPayout: 'రైతుకు చెల్లింపు',
    coldTransitLogistics: 'కోల్డ్ చైన్ రవాణా ఛార్జీలు',
    totalAmountDue: 'మొత్తం చెల్లించవలసినది',
    viewLiveTracker: 'లైవ్ డెలివరీ ట్రాకర్ చూడండి',
    freeAbove399: 'ఉచితం (₹399 పైన ఆర్డర్లకు)',
    zeroCommission: '₹0.00 (కమీషన్ లేదు)',

    wishlistTitle: 'నా కోరికల జాబితా',
    wishlistEmpty: 'మీ కోరికల జాబితా ఖాళీగా ఉంది',
    wishlistEmptyDesc: 'మీకు నచ్చిన సేంద్రీయ పంటలను హార్ట్ గుర్తుపై క్లిక్ చేసి భద్రపరుచుకోండి.',
    browseFreshCrops: 'తాజా పంటలను చూడండి',
    removeFromWishlist: 'జాబితా నుండి తొలగించండి',

    farmerHubTitle: 'రైతు ఉత్పత్తిదారుల కేంద్రం',
    farmerHubDesc: 'పంటల నిల్వలు, కోత వివరాలు మరియు అధికారిక భూమి ధృవీకరణలను నిర్వహించండి.',
    tabInventory: 'పంటల నిల్వలు & స్టాక్',
    tabVerification: 'ప్రభుత్వ భూమి రికార్డుల ధృవీకరణ',
    tabAnalytics: 'వ్యవసాయ గణాంకాలు',
    totalActiveCrops: 'మొత్తం పంటలు',
    stockReady: 'కోతకు సిద్ధంగా ఉన్న స్టాక్',
    estHarvestValue: 'అంచనా పంట విలువ',
    avgCustomerRating: 'సగటు రేటింగ్',
    addNewHarvest: 'కొత్త పంటను చేర్చండి',
    updateStock: 'స్టాక్ అప్‌డేట్ చేయండి',
    cropName: 'పంట పేరు',
    pricePerUnit: 'ధర / యూనిట్',
    stockAvailable: 'అందుబాటులో ఉన్న నిల్వ',
    action: 'చర్య',
    verifiedStatusBadge: 'ధృవీకరించబడింది',
    pendingStatusBadge: 'పరిశీలనలో ఉంది',
    landRecords: 'భూమి పత్రాలు & ధృవపత్రాలు',
    uploadLandRecord: 'భూమి పత్రాలను అప్‌లోడ్ చేయండి',

    adminAuditTitle: 'రైతు ధృవీకరణ & నియంత్రణ డెస్క్',
    adminAuditSubtitle: 'అధికారిక భూమి & ఉత్పత్తిదారుల ఆడిట్',
    adminAuditDesc: 'రైతులకు అధికారిక బ్యాడ్జ్ ఇచ్చే ముందు పట్టాదారు పాస్‌బుక్, కిసాన్ కార్డు మరియు సేంద్రీయ పత్రాలను పరిశీలించండి.',
    filterAll: 'అన్ని దరఖాస్తులు',
    filterPending: 'పరిశీలించవలసినవి',
    filterVerified: 'ధృవీకరించబడినవి',
    filterRejected: 'తిరస్కరించబడినవి',
    approveFarmer: 'రైతును ఆమోదించండి & బ్యాడ్జ్ ఇవ్వండి',
    rejectFarmer: 'దరఖాస్తు తిరస్కరించండి',
    landAcreage: 'భూమి విస్తీర్ణం',
    soilType: 'నేల రకం',
    primaryCrops: 'ప్రధాన పంటలు',
    acresUnit: 'ఎకరాలు',

    trackingSubtitle: 'రియల్-టైమ్ వ్యవసాయ కోల్డ్-చైన్',
    trackingTitle: 'పొలం నుండి ఇంటికి లైవ్ ట్రాకింగ్',
    selectOrder: 'ఆర్డర్ ఎంచుకోండి',
    estimatedDelivery: 'అంచనా డెలివరీ',
    noOrdersTitle: 'ప్రస్తుతం ఎలాంటి ఆర్డర్లు లేవు',
    noOrdersDesc: 'మీరు రైతు వద్ద నుండి ఆర్డర్ చేసినప్పుడు, వాహనం మరియు ఉష్ణోగ్రత ట్రాకింగ్ ఇక్కడ కనిపిస్తుంది.',
    stageHarvestScheduled: 'కోత సమయం నిర్ణయించబడింది',
    stageHarvestScheduledDesc: 'రైతుకు సమాచారం చేరింది',
    stageHandHarvested: 'చేతితో కోసిన తాజా పంట',
    stageHandHarvestedDesc: 'బావి నీటితో శుభ్రం చేయబడింది',
    stageColdChain: 'కోల్డ్-చైన్ రవాణాలో ఉంది',
    stageColdChainDesc: '4°C ఉష్ణోగ్రత వద్ద పర్యవేక్షించబడుతోంది',
    stageOutForDelivery: 'డెలివరీకి బయలుదేరింది',
    stageOutForDeliveryDesc: 'డెలివరీ సిబ్బంది మీ ప్రాంతానికి వస్తున్నారు',
    stageDelivered: 'డెలివరీ పూర్తయింది',
    stageDeliveredDesc: 'మీ ఇంటి వద్ద అందించబడింది',
    vehicleTelemetry: 'కోల్డ్-చైన్ సెన్సార్ సమాచారం',
    coldTempStatus: 'వాహన ఉష్ణోగ్రత నియంత్రణ (4.0°C)',
    assignedDriver: 'రవాణా డ్రైవర్ వివరాలు',
    harvestItemsSummary: 'ఈ ఆర్డర్‌లోని పంటలు',

    authModalTitle: 'రైతు బజార్ ప్రవేశం',
    authModalDesc: 'తాజా పల్లె పంటలను ఆర్డర్ చేయడానికి లేదా పంటలను అమ్మడానికి లాగిన్ అవ్వండి',
    authConsumer: 'వినియోగదారుడు (సేంద్రీయ పంటల కొనుగోలు)',
    authFarmer: 'రైతు (పంటల నిర్వహణ)',
    authAdmin: 'అడ్మిన్ (భూమి రికార్డుల తనిఖీ)',
    authEmail: 'ఈమెయిల్ చిరునామా',
    authPassword: 'పాస్‌వర్డ్',
    authLoginButton: 'లాగిన్ అవ్వండి',
    quickDemoAccess: 'త్వరిత డెమో లాగిన్ (1-క్లిక్)',
    adminPortalTitle: 'అడ్మినిస్ట్రేటర్ పోర్టల్',
    adminPortalDesc: 'వ్యవసాయ ధృవీకరణ అధికారులకు మాత్రమే అనుమతి',
    adminPinLabel: 'సెక్యూరిటీ పిన్ (డెమో: 1111)',
    adminLoginBtn: 'ధృవీకరణ డెస్క్‌లోకి ప్రవేశించండి',

    footerSubtitle: 'సేంద్రీయ కూరగాయలు, తాజా పండ్లు, మేలైన పప్పులు, ధాన్యాలు మరియు సుగంధ ద్రవ్యాలు',
    footerDirect: '100% రైతుకే పూర్తి సొమ్ము',
    home: 'హోమ్'
  },

  hi: {
    brandName: 'Xiva.Org',
    tagline: 'खेत से सीधे उपभोक्ता तक कृषि मंच',
    navMarketplace: 'किसान बाज़ार',
    navFarmerDashboard: 'किसान केंद्र',
    navAdminVerification: 'सत्यापन डेस्क',
    navOrders: 'ऑर्डर ट्रैकिंग',
    login: 'लॉग इन',
    logout: 'लॉग आउट',
    topTrustBar: '100% किसान को सीधा भुगतान · कोई बिचौलिया नहीं · उचित मंडी समर्थन मूल्य',

    heroBadge: '100% जैविक व ताज़ा · गाँव की मिट्टी से सीधे आपकी रसोई तक',
    heroMainTitle: 'शुद्ध प्राकृतिक खेत की उपज,',
    heroSubTitle: 'सीधे सत्यापित स्थानीय किसानों द्वारा',
    heroDescription: 'ग्रामीण छोटे किसानों को सीधे शहरी परिवारों से जोड़ना। 0% दलाली, मंडी भाव में पारदर्शिता, और सुबह की ताज़ा होम डिलीवरी।',
    heroCtaExplore: 'ताज़ी फसलें देखें',
    heroCtaFarmer: 'किसान पोर्टल व इन्वेंटरी',
    statCommission: 'मंच कमीशन',
    statDirect: 'किसान को सीधा लाभ',
    statGateToHome: 'खेत से सीधे घर',
    statVerifiedFarms: 'सरकारी भूमि सत्यापित खेत',
    mandiTickerTitle: 'मंडी भाव पारदर्शिता',
    mandiTickerDesc: 'किसानों को 40% तक अधिक आय, और उपभोक्ताओं को सुपरमार्केट से 15-25% की बचत।',
    tickerPaddy: '🌾 धान/चावल: ₹65/किलो (मंडी: ₹54)',
    tickerTomato: '🍅 देसी टमाटर: ₹38/किलो (सुपरमार्केट: ₹48)',
    tickerMango: '🥭 दशहरी/अल्फांसो: ₹520/दर्जन',

    allCrops: 'सभी फसलें',
    cereals: 'अनाज',
    pulses: 'दालें',
    vegetables: 'सब्जियाँ',
    fruits: 'फल',
    spices: 'मसाले',
    exotic: 'विदेशी फसलें',

    filterVerifiedOnly: 'केवल सत्यापित किसान',
    showing: 'उपलब्ध',
    crops: 'फसलें',
    searchPlaceholder: 'अनाज, दालें, ताज़ी सब्ज़ियाँ खोजें...',
    sortBy: 'क्रमबद्ध करें',
    sortHighestRated: 'सर्वोच्च ग्राहक रेटिंग',
    sortPriceLowHigh: 'कीमत: कम से अधिक',
    sortPriceHighLow: 'कीमत: अधिक से कम',
    sortDistance: 'नज़दीकी खेत पहले',
    resetFilters: 'फ़िल्टर हटाएं',
    noCropsFound: 'कोई फसल नहीं मिली',
    noCropsFoundDesc: 'कृपया अपनी श्रेणी बदलें या अन्य उत्पाद खोजें।',

    farmerBadge: 'सत्यापित किसान',
    verifiedLocalFarmer: 'भूमि अभिलेख एवं सरकारी प्रमाणित किसान',
    verificationInProgress: 'सत्यापन प्रक्रिया जारी है',
    away: 'कि.मी. दूर',
    freshBatch: 'ताज़ा लॉट',
    reviews: 'समीक्षाएं',
    directToFarmer: 'किसान को 100% भुगतान',
    addToBasket: 'टोकरी में जोड़ें',
    addedToBasket: 'टोकरी में जोड़ा गया',
    addToCart: 'टोकरी में जोड़ें',
    customerReviews: 'ग्राहकों की समीक्षाएं व रेटिंग',
    writeReview: 'सत्यापित समीक्षा लिखें',
    submitReview: 'समीक्षा सबमिट करें',
    zeroMiddlemanBadge: 'बिचौलिया मुक्त: 100% किसान को सीधा भुगतान',
    organicStandard: 'जैविक मानक',
    apmcRate: 'मंडी आढ़ती दर',
    farmerGainHigher: 'किसान को सीधा अधिक लाभ!',
    farmStory: 'खेत की कहानी व फसल कटाई',
    nutritionalValue: 'पोषण मूल्य एवं स्वास्थ्य लाभ',
    coldTransportGuaranteed: 'कोल्ड-चेन सुरक्षा: गाँव के कोल्ड स्टोरेज से 4°C पर सीधे सुरक्षित परिवहन',
    reviewNoticeDelivered: 'केवल वही ग्राहक समीक्षा लिख सकते हैं जिनका ऑर्डर सफलतापूर्वक डिलीवर हो चुका है।',
    reviewSuccess: 'आपकी समीक्षा सफलतापूर्वक दर्ज कर ली गई! स्थानीय किसानों का समर्थन करने के लिए धन्यवाद।',
    starRating: 'स्टार रेटिंग',
    feedbackPlaceholder: 'ताज़गी, स्वाद और गुणवत्ता के बारे में अपनी राय लिखें...',
    simulateDeliveredOrder: 'सत्यापित डिलीवरी सिमुलेट करें (डेमो टेस्ट)',

    adminAuthenticated: 'प्रशासक प्रमाणित',
    adminDesc: 'सत्यापन और कैटलॉग नियंत्रण',
    adminVerificationDesk: 'प्रशासक सत्यापन डेस्क',
    logoutAdmin: 'प्रशासक लॉग आउट',
    adminPortal: 'प्रशासक पोर्टल',
    trackMyOrders: 'मेरे ऑर्डर ट्रैक करें',
    myWishlist: 'मेरी पसंद',
    farmerDashboard: 'किसान डैशबोर्ड व इन्वेंटरी',
    signInSwitchRole: 'लॉग इन / भूमिका बदलें',

    shoppingBag: 'खरीदारी की टोकरी',
    emptyCart: 'आपकी टोकरी खाली है',
    emptyCartDesc: 'सीधे किसानों द्वारा उगाई गई ताज़ी जैविक फसलें जोड़ें।',
    startShopping: 'फसलें देखें',
    harvestBasket: 'फसल टोकरी',
    farmGateOrigin: 'सीधे खेत की मेड़ से · शून्य बिचौलिया',
    automatedDeliverySchedule: 'स्वचालित डिलीवरी व समय निर्धारण',
    orderConfirmed: 'ऑर्डर पक्का हो गया!',
    orderConfirmedDesc: '100% राशि किसान के खाते में आरक्षित कर दी गई',
    directFarmerRemittance: 'किसान को सीधी अदायगी',
    directRemittanceDesc: 'बिना किसी कमीशन कटौती के पूरा पैसा सीधे किसान के बैंक खाते/UPI में जाएगा।',
    deliveryDestination: 'डिलीवरी का पता',
    recipientName: 'प्राप्तकर्ता का पूरा नाम',
    mobileNumber: 'मोबाइल नंबर (डिलीवरी अपडेट के लिए)',
    completeAddress: 'मकान/फ्लैट नंबर, गली, अपार्टमेंट, लैंडमार्क',
    deliverySlots: 'डिलीवरी स्लॉट',
    earlyMorningSlot: 'सुबह का स्लॉट (6:00 - 8:30 AM)',
    earlyMorningSlotDesc: 'भोर 4:30 बजे तुड़ाई · सुबह 7:00 बजे तक ताज़ा डिलीवरी',
    eveningSlot: 'शाम का स्लॉट (5:00 - 8:00 PM)',
    eveningSlotDesc: 'दोपहर की तुड़ाई · रात के खाने से पहले ताज़ा डिलीवरी',
    weekendSlot: 'रविवार विशेष डिलीवरी',
    weekendSlotDesc: 'सामुदायिक डिलीवरी · शून्य कार्बन उत्सर्जन',
    recommended: 'सुझाया गया',
    secureCheckout: 'सुरक्षित भुगतान करें',
    orderTotal: 'कुल योग',
    directFarmerEarnings: 'किसान की सीधी आय (100%)',
    paymentMethod: 'भुगतान का माध्यम',
    cashOnDelivery: 'कैश ऑन डिलीवरी (सामान मिलने पर नकदी)',
    cashOnDeliveryDesc: 'फसल की गुणवत्ता जांचने के बाद ही भुगतान करें',
    upiInstant: 'त्वरित UPI (GPay, PhonePe, Paytm)',
    upiInstantDesc: 'गूगल पे, फोन पे, पेटीएम अथवा क्यूआर कोड',
    cardsRuPay: 'रुपे / डेबिट कार्ड',
    cardsRuPayDesc: 'भारतीय रुपे व सभी प्रमुख बैंक कार्ड',
    netBanking: 'नेट बैंकिंग',
    placeOrder: 'ऑर्डर पक्का करें',
    confirmHarvestOrder: 'फसल ऑर्डर कन्फर्म करें',
    orderPlacedSuccess: 'ऑर्डर सफलतापूर्वक दर्ज हुआ! सुबह खेत से रवाना किया जाएगा।',
    orderId: 'ऑर्डर संख्या',
    harvestDispatched: 'खेत से डिलीवरी हेतु प्रस्थान',
    orderDispatchedDesc: 'आपका ऑर्डर सीधे किसान को भेज दिया गया है। अनुमानित डिलीवरी समय:',
    directFarmerPayout: 'किसान को सीधा भुगतान',
    coldTransitLogistics: 'कोल्ड-चेन परिवहन शुल्क',
    totalAmountDue: 'कुल देय राशि',
    viewLiveTracker: 'लाइव डिलीवरी ट्रैकर देखें',
    freeAbove399: 'मुफ्त (₹399 से अधिक के ऑर्डर पर)',
    zeroCommission: '₹0.00 (शून्य कमीशन)',

    wishlistTitle: 'मेरी पसंद',
    wishlistEmpty: 'आपकी पसंद सूची खाली है',
    wishlistEmptyDesc: 'किसी भी उत्पाद के दिल वाले आइकन पर क्लिक करके अपनी पसंदीदा फसलें सहेजें।',
    browseFreshCrops: 'ताज़ी फसलें देखें',
    removeFromWishlist: 'सूची से हटाएं',

    farmerHubTitle: 'किसान उत्पादक केंद्र',
    farmerHubDesc: 'फसल इन्वेंटरी, कटाई रिकॉर्ड और आधिकारिक भूमि सत्यापन प्रबंधित करें।',
    tabInventory: 'फसल इन्वेंटरी व स्टॉक',
    tabVerification: 'सरकारी भूमि सत्यापन व रिकॉर्ड',
    tabAnalytics: 'कृषि विश्लेषण',
    totalActiveCrops: 'सक्रिय फसलें',
    stockReady: 'कटाई हेतु तैयार स्टॉक',
    estHarvestValue: 'अनुमानित फसल मूल्य',
    avgCustomerRating: 'औसत ग्राहक रेटिंग',
    addNewHarvest: 'नई फसल / उपज जोड़ें',
    updateStock: 'स्टॉक अपडेट करें',
    cropName: 'फसल का नाम',
    pricePerUnit: 'कीमत / इकाई',
    stockAvailable: 'उपलब्ध मात्रा',
    action: 'कार्रवाई',
    verifiedStatusBadge: 'सत्यापित',
    pendingStatusBadge: 'सत्यापन लंबित',
    landRecords: 'भूमि अभिलेख एवं प्रमाणपत्र',
    uploadLandRecord: 'भूमि दस्तावेज अपलोड करें',

    adminAuditTitle: 'किसान सत्यापन एवं अनुपालन डेस्क',
    adminAuditSubtitle: 'आधिकारिक भूमि एवं उत्पादक ऑडिट',
    adminAuditDesc: 'सत्यापित किसान बैज जारी करने से पूर्व पट्टादार पासबुक, किसान क्रेडिट कार्ड तथा जैविक प्रमाण पत्रों की समीक्षा करें।',
    filterAll: 'सभी आवेदन',
    filterPending: 'लंबित समीक्षा',
    filterVerified: 'सत्यापित खेत',
    filterRejected: 'अस्वीकृत',
    approveFarmer: 'किसान को स्वीकृत करें व बैज दें',
    rejectFarmer: 'आवेदन अस्वीकृत करें',
    landAcreage: 'भूमि का क्षेत्रफल',
    soilType: 'मिट्टी का प्रकार',
    primaryCrops: 'प्रमुख फसलें',
    acresUnit: 'एकड़',

    trackingSubtitle: 'रियल-टाइम कृषि कोल्ड-चेन',
    trackingTitle: 'खेत से चौखट तक लाइव ट्रैकिंग',
    selectOrder: 'ऑर्डर चुनें',
    estimatedDelivery: 'अनुमानित डिलीवरी',
    noOrdersTitle: 'फिलहाल कोई सक्रिय ऑर्डर नहीं है',
    noOrdersDesc: 'जब आप किसी किसान से सीधी ताज़ा फसल का ऑर्डर देंगे, तब उसका लाइव तापमान व वाहन ट्रैकिंग यहाँ दिखाई देगा।',
    stageHarvestScheduled: 'कटाई का समय निर्धारित',
    stageHarvestScheduledDesc: 'गाँव के खेत में किसान को सूचना भेजी गई',
    stageHandHarvested: 'हाथों से ताज़ा तुड़ाई संपन्न',
    stageHandHarvestedDesc: 'कुएं के मीठे पानी से धोया व छांटा गया',
    stageColdChain: 'कोल्ड-चेन वाहन में रवाना',
    stageColdChainDesc: 'तापमान 4°C पर लगातार नियंत्रित',
    stageOutForDelivery: 'डिलीवरी हेतु रवाना',
    stageOutForDeliveryDesc: 'शहरी डिलीवरी राइडर आपके पते की ओर अग्रसर',
    stageDelivered: 'सफलतापूर्वक डिलीवर',
    stageDeliveredDesc: 'सीधे आपके घर की चौखट पर सुपुर्द',
    vehicleTelemetry: 'कोल्ड-चेन सेंसर टेलीमेट्री',
    coldTempStatus: 'वाहन तापमान मॉनिटरिंग (4.0°C)',
    assignedDriver: 'कोल्ड ट्रांसपोर्ट चालक',
    harvestItemsSummary: 'इस ऑर्डर में शामिल फसलें',

    authModalTitle: 'किसान बाज़ार में प्रवेश',
    authModalDesc: 'गाँव की ताज़ी उपज मँगाने अथवा फसल बेचने हेतु लॉग इन करें',
    authConsumer: 'उपभोक्ता (ताज़ा जैविक फसलें खरीदें)',
    authFarmer: 'किसान (फसलें सूचीबद्ध करें)',
    authAdmin: 'प्रशासक (भूमि रिकॉर्ड सत्यापन)',
    authEmail: 'ईमेल पता',
    authPassword: 'पासवर्ड',
    authLoginButton: 'लॉग इन करें',
    quickDemoAccess: 'त्वरित डेमो 1-क्लिक लॉग इन',
    adminPortalTitle: 'प्रशासक पोर्टल',
    adminPortalDesc: 'कृषि सत्यापन अधिकारियों हेतु सुरक्षित क्षेत्र',
    adminPinLabel: 'सुरक्षा पिन दर्ज करें (डेमो: 1111)',
    adminLoginBtn: 'सत्यापन डेस्क खोलें',

    footerSubtitle: 'जैविक सब्जियां, ताजे फल, गुणवत्तापूर्ण दालें, अनाज और सुगंधित मसाले',
    footerDirect: '100% किसान को सीधा भुगतान',
    home: 'होम'
  },

  ta: {
    brandName: 'Xiva.Org',
    tagline: 'விவசாயிகளிடமிருந்து நேரடியாக நுகர்வோருக்கு',
    navMarketplace: 'உழவர் சந்தை',
    navFarmerDashboard: 'விவசாயி மையம்',
    navAdminVerification: 'சரிபார்ப்பு மேசை',
    navOrders: 'ஆர்டர் கண்காணிப்பு',
    login: 'உள்நுழைய',
    logout: 'வெளியேறு',
    topTrustBar: '100% விவசாயிக்கு நேரடி வருவாய் · இடைத்தரகர் இல்லை · மண்டி ஆதார விலை',

    heroBadge: '100% இயற்கை விளைபொருட்கள் · மண் வாசனை மாறாமல் இல்லத்திற்கு',
    heroMainTitle: 'தூய இயற்கை பண்ணை விளைச்சல்,',
    heroSubTitle: 'நேரடியாக சரிபார்க்கப்பட்ட உழவர்களிடமிருந்து',
    heroDescription: 'கிராமப்புற விவசாயிகளை நேரடியாக நகர்ப்புற குடும்பங்களுடன் இணைக்கிறோம். 0% கமிஷன், நியாயமான விலை, மற்றும் காலை நேர நேரடி விநியோகம்.',
    heroCtaExplore: 'பயிர்களை பார்வையிடவும்',
    heroCtaFarmer: 'உழவர் தளம் & இருப்பு',
    statCommission: 'தள கமிஷன்',
    statDirect: 'விவசாயிக்கு நேரடி பலன்',
    statGateToHome: 'பண்ணையிலிருந்து வீடு தேடி',
    statVerifiedFarms: 'அரசு நில ஆவண சரிபார்ப்பு',
    mandiTickerTitle: 'மண்டி விலை வெளிப்படைத்தன்மை',
    mandiTickerDesc: 'விவசாயிகளுக்கு 40% வரை கூடுதல் வருமானம், நுகர்வோருக்கு 15-25% சேமிப்பு.',
    tickerPaddy: '🌾 பாரம்பரிய நெல்/அரிசி: ₹65/கிலோ (மண்டி: ₹54)',
    tickerTomato: '🍅 நாட்டு தக்காளி: ₹38/கிலோ (கடைகள்: ₹48)',
    tickerMango: '🥭 அல்போன்சா மாம்பழம்: ₹520/டஜன்',

    allCrops: 'அனைத்து பயிர்கள்',
    cereals: 'தானியங்கள்',
    pulses: 'பருப்பு வகைகள்',
    vegetables: 'காய்கறிகள்',
    fruits: 'பழங்கள்',
    spices: 'மசாலா',
    exotic: 'வெளிநாட்டு பயிர்கள்',

    filterVerifiedOnly: 'சான்றளிக்கப்பட்ட விவசாயிகள் மட்டும்',
    showing: 'காண்பிக்கப்படுகிறது',
    crops: 'பயிர்கள்',
    searchPlaceholder: 'பயிர்கள், பருப்புகள், பழங்களை தேடவும்...',
    sortBy: 'வரிசைப்படுத்து',
    sortHighestRated: 'உயர் வாடிக்கையாளர் மதிப்பீடு',
    sortPriceLowHigh: 'விலை: குறைவு முதல் அதிகம்',
    sortPriceHighLow: 'விலை: அதிகம் முதல் குறைவு',
    sortDistance: 'அருகிலுள்ள பண்ணை',
    resetFilters: 'வடிகட்டிகளை மீட்டமை',
    noCropsFound: 'பயிர்கள் எதுவும் கிடைக்கவில்லை',
    noCropsFoundDesc: 'வடிகட்டிகளை மாற்றி மீண்டும் முயற்சிக்கவும்.',

    farmerBadge: 'சான்றளிக்கப்பட்ட உழவர்',
    verifiedLocalFarmer: 'அரசு அங்கீகாரம் பெற்ற நில விவசாயி',
    verificationInProgress: 'சரிபார்ப்பு பரிசீலனையில் உள்ளது',
    away: 'கி.மீ தூரத்தில்',
    freshBatch: 'புதிய அறுவடை',
    reviews: 'மதிப்புரைகள்',
    directToFarmer: 'விவசாயிக்கு 100% நேரடி தொகை',
    addToBasket: 'கூடையில் சேர்',
    addedToBasket: 'கூடையில் சேர்க்கப்பட்டது',
    addToCart: 'கூடையில் சேர்',
    customerReviews: 'வாடிக்கையாளர் கருத்துக்கள் & மதிப்பீடுகள்',
    writeReview: 'கருத்து பதிவு செய்',
    submitReview: 'சமர்ப்பிக்கவும்',
    zeroMiddlemanBadge: 'இடைத்தரகர் இல்லை: 100% விவசாயிக்கே பலன்',
    organicStandard: 'இயற்கை வேளாண்மை தரம்',
    apmcRate: 'மண்டி இடைத்தரகர் விலை',
    farmerGainHigher: 'விவசாயிக்கு அதிக நேரடி லாபம்!',
    farmStory: 'விவசாயியின் உழைப்பு & அறுவடை விவரங்கள்',
    nutritionalValue: 'ஊட்டச்சத்து & ஆரோக்கிய நன்மைகள்',
    coldTransportGuaranteed: 'குளிர்சாதன வாகனம்: 4°C வெப்பநிலையில் பாதுகாப்பான விநியோகம்',
    reviewNoticeDelivered: 'டெலிவரி செய்யப்பட்ட ஆர்டர்கள் உள்ள வாடிக்கையாளர்கள் மட்டுமே மதிப்பீடு எழுத முடியும்.',
    reviewSuccess: 'உங்கள் மதிப்பீடு வெற்றிகரமாக பதிவு செய்யப்பட்டது! விவசாயிகளுக்கு ஆதரவளித்தமைக்கு நன்றி.',
    starRating: 'நட்சத்திர மதிப்பீடு',
    feedbackPlaceholder: 'புத்துணர்ச்சி மற்றும் சுவை குறித்த உங்கள் அனுபவத்தை எழுதுங்கள்...',
    simulateDeliveredOrder: 'டெலிவரியை உருவகப்படுத்துங்கள் (சோதனை)',

    adminAuthenticated: 'நிர்வாகி உள்நுழைந்துள்ளார்',
    adminDesc: 'சரிபார்ப்பு மற்றும் தயாரிப்பு கட்டுப்பாடு',
    adminVerificationDesk: 'நிர்வாக சரிபார்ப்பு மேசை',
    logoutAdmin: 'நிர்வாகி வெளியேறு',
    adminPortal: 'நிர்வாக தளம்',
    trackMyOrders: 'என் ஆர்டர்களை கண்காணிக்க',
    myWishlist: 'விருப்பப்பட்டியல்',
    farmerDashboard: 'விவசாயி கட்டுப்பாட்டகம்',
    signInSwitchRole: 'உள்நுழைக / பங்கு மாற்றவும்',

    shoppingBag: 'ஷாப்பிங் கூடை',
    emptyCart: 'உங்கள் கூடை காலியாக உள்ளது',
    emptyCartDesc: 'விவசாயிகளிடமிருந்து நேரடியாக அறுவடை செய்யப்பட்ட பொருட்களை சேர்க்கவும்.',
    startShopping: 'பயிர்களை வாங்க',
    harvestBasket: 'அறுவடை கூடை',
    farmGateOrigin: 'நேரடியாக பண்ணை வாசலில் இருந்து · இடைத்தரகர் இல்லை',
    automatedDeliverySchedule: 'தானியங்கி விநியோகம் & அட்டவணை',
    orderConfirmed: 'ஆர்டர் உறுதி செய்யப்பட்டது!',
    orderConfirmedDesc: '100% தொகை விவசாயியின் கணக்கில் ஒதுக்கப்பட்டது',
    directFarmerRemittance: 'விவசாயிக்கு நேரடி பணப்பரிமாற்றம்',
    directRemittanceDesc: 'எந்தவித கமிஷனும் இல்லாமல் முழுத் தொகையும் விவசாயியின் கணக்கிற்கு நேரடியாக மாற்றப்படும்.',
    deliveryDestination: 'சேர வேண்டிய முகவரி',
    recipientName: 'முழு பெயர்',
    mobileNumber: 'மொபைல் எண்',
    completeAddress: 'வீட்டு எண், தெரு, பகுதி, அடையாளக் குறி',
    deliverySlots: 'டெலிவரி நேரம்',
    earlyMorningSlot: 'காலை விநியோகம் (6:00 - 8:30 AM)',
    earlyMorningSlotDesc: 'அதிகாலை 4:30 மணி அறுவடை · 7:00 மணிக்கு வாசல் தேடி',
    eveningSlot: 'மாலை விநியோகம் (5:00 - 8:00 PM)',
    eveningSlotDesc: 'மதிய அறுவடை · இரவு உணவுக்கு முன் புதிய விநியோகம்',
    weekendSlot: 'ஞாயிறு சிறப்பு விநியோகம்',
    weekendSlotDesc: 'குடியிருப்பு கூட்டு விநியோகம்',
    recommended: 'பரிந்துரைக்கப்படுகிறது',
    secureCheckout: 'பாதுகாப்பான கட்டணம்',
    orderTotal: 'மொத்த தொகை',
    directFarmerEarnings: 'விவசாயிக்கு சேரும் தொகை (100%)',
    paymentMethod: 'செலுத்தும் முறை',
    cashOnDelivery: 'பொருளைப் பெற்றவுடன் ரொக்கம்',
    cashOnDeliveryDesc: 'விளைபொருளை சரிபார்த்த பிறகு பணம் செலுத்துங்கள்',
    upiInstant: 'உடனடி UPI (GPay, PhonePe, Paytm)',
    upiInstantDesc: 'கூகிள் பே, போன்பே, பேடிஎம் அல்லது QR குறியீடு',
    cardsRuPay: 'ரூபே அட்டை',
    cardsRuPayDesc: 'ரூபே மற்றும் அனைத்து முக்கிய கார்டுகள்',
    netBanking: 'வங்கி பரிமாற்றம்',
    placeOrder: 'ஆர்டரை உறுதிசெய்',
    confirmHarvestOrder: 'விளைபொருள் ஆர்டரை உறுதிசெய்',
    orderPlacedSuccess: 'ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டது! காலை விநியோகம் செய்யப்படும்.',
    orderId: 'ஆர்டர் எண்',
    harvestDispatched: 'பண்ணையிலிருந்து அனுப்பப்பட்டது',
    orderDispatchedDesc: 'உங்கள் ஆர்டர் விவசாயிக்கு அனுப்பப்பட்டுள்ளது. டெலிவரி நேரம்:',
    directFarmerPayout: 'விவசாயிக்கு கட்டணம்',
    coldTransitLogistics: 'குளிர்சாதன போக்குவரத்து செலவு',
    totalAmountDue: 'செலுத்த வேண்டிய மொத்த தொகை',
    viewLiveTracker: 'நேரடி கண்காணிப்பைப் பார்க்கவும்',
    freeAbove399: 'இலவசம் (₹399க்கு மேல்)',
    zeroCommission: '₹0.00 (கமிஷன் இல்லை)',

    wishlistTitle: 'விருப்பப்பட்டியல்',
    wishlistEmpty: 'உங்கள் விருப்பப்பட்டியல் காலியாக உள்ளது',
    wishlistEmptyDesc: 'உங்களுக்கு பிடித்த இயற்கை விளைபொருட்களை இதயக் குறியீட்டை அழுத்தி சேமிக்கவும்.',
    browseFreshCrops: 'புதிய விளைபொருட்களை பார்க்க',
    removeFromWishlist: 'பட்டியலில் இருந்து நீக்கு',

    farmerHubTitle: 'விவசாயி உற்பத்தியாளர் மையம்',
    farmerHubDesc: 'பயிர் இருப்பு, அறுவடை பதிவுகள் மற்றும் நில ஆவணங்களை நிர்வகிக்கவும்.',
    tabInventory: 'பயிர் இருப்பு & கையிருப்பு',
    tabVerification: 'அரசு நில ஆவண சரிபார்ப்பு',
    tabAnalytics: 'பண்ணை பகுப்பாய்வு',
    totalActiveCrops: 'மொத்த பயிர்கள்',
    stockReady: 'அறுவடைக்கு தயாரான இருப்பு',
    estHarvestValue: 'மதிப்பிடப்பட்ட மதிப்பு',
    avgCustomerRating: 'வாடிக்கையாளர் மதிப்பீடு',
    addNewHarvest: 'புதிய பயிரைச் சேர்க்கவும்',
    updateStock: 'இருப்பை புதுப்பிக்கவும்',
    cropName: 'பயிர் பெயர்',
    pricePerUnit: 'விலை / அலகு',
    stockAvailable: 'கிடைக்கும் இருப்பு',
    action: 'செயல்',
    verifiedStatusBadge: 'சரிபார்க்கப்பட்டது',
    pendingStatusBadge: 'பரிசீலனையில் உள்ளது',
    landRecords: 'நில ஆவணங்கள் & சான்றிதழ்கள்',
    uploadLandRecord: 'நில ஆவணங்களை பதிவேற்றவும்',

    adminAuditTitle: 'விவசாயி சரிபார்ப்பு & கண்காணிப்பு மேசை',
    adminAuditSubtitle: 'அதிகாரப்பூர்வ நில ஆவண ஆய்வு',
    adminAuditDesc: 'விவசாயிகளுக்கு அங்கீகார முத்திரை வழங்கும் முன் பட்டா பாஸ்புக், கிசான் அட்டை மற்றும் இயற்கை சான்றிதழ்களை சரிபார்க்கவும்.',
    filterAll: 'அனைத்து விண்ணப்பங்கள்',
    filterPending: 'பரிசீலனையில் உள்ளவை',
    filterVerified: 'சான்றளிக்கப்பட்டவை',
    filterRejected: 'நிராகரிக்கப்பட்டவை',
    approveFarmer: 'விவசாயியை அங்கீகரிக்கவும்',
    rejectFarmer: 'விண்ணப்பத்தை நிராகரிக்கவும்',
    landAcreage: 'நில அளவு',
    soilType: 'மண் வகை',
    primaryCrops: 'முக்கிய பயிர்கள்',
    acresUnit: 'ஏக்கர்',

    trackingSubtitle: 'நேரடி குளிர்சாதன வேளாண் தொடர்',
    trackingTitle: 'பண்ணையிலிருந்து வாசல் வரை நேரடி கண்காணிப்பு',
    selectOrder: 'ஆர்டரைத் தேர்ந்தெடுக்கவும்',
    estimatedDelivery: 'எதிர்பார்க்கப்படும் டெலிவரி',
    noOrdersTitle: 'தற்போது ஆர்டர்கள் எதுவும் இல்லை',
    noOrdersDesc: 'நீங்கள் விவசாயியிடம் ஆர்டர் செய்யும் போது, வாகனத்தின் நகர்வு மற்றும் வெப்பநிலையை இங்கே கண்காணிக்கலாம்.',
    stageHarvestScheduled: 'அறுவடை திட்டமிடப்பட்டது',
    stageHarvestScheduledDesc: 'விவசாயிக்கு தகவல் தெரிவிக்கப்பட்டது',
    stageHandHarvested: 'கைகளால் பறிக்கப்பட்ட புதிய பயிர்',
    stageHandHarvestedDesc: 'கிணற்று நீரில் தூய்மையாக கழுவப்பட்டது',
    stageColdChain: 'குளிர்சாதன வாகனத்தில் பயணம்',
    stageColdChainDesc: '4°C வெப்பநிலையில் தொடர்ந்து பராமரிக்கப்படுகிறது',
    stageOutForDelivery: 'விநியோகத்திற்கு புறப்பட்டது',
    stageOutForDeliveryDesc: 'டெலிவரி பணியாளர் உங்கள் பகுதியை நோக்கி வருகிறார்',
    stageDelivered: 'வெற்றிகரமாக விநியோகிக்கப்பட்டது',
    stageDeliveredDesc: 'உங்கள் இல்ல வாசலில் ஒப்படைக்கப்பட்டது',
    vehicleTelemetry: 'சென்சார் அளவீடுகள்',
    coldTempStatus: 'வாகன வெப்பநிலை (4.0°C)',
    assignedDriver: 'வாகன ஓட்டுநர் தகவல்',
    harvestItemsSummary: 'இந்த ஆர்டரில் உள்ள பொருட்கள்',

    authModalTitle: 'உழவர் சந்தை உள்நுழைவு',
    authModalDesc: 'புதிய விளைபொருட்களை ஆர்டர் செய்ய அல்லது பயிர்களை பட்டியலிட உள்நுழையவும்',
    authConsumer: 'நுகர்வோர் (இயற்கை உணவுகள்)',
    authFarmer: 'விவசாயி (விளைபொருட்கள் மேலாண்மை)',
    authAdmin: 'நிர்வாகி (நில ஆவண சரிபார்ப்பு)',
    authEmail: 'மின்னஞ்சல் முகவரி',
    authPassword: 'கடவுச்சொல்',
    authLoginButton: 'உள்நுழைக',
    quickDemoAccess: 'விரைவு டெமோ உள்நுழைவு',
    adminPortalTitle: 'நிர்வாக தளம்',
    adminPortalDesc: 'வேளாண் சரிபார்ப்பு அதிகாரிகளுக்கு மட்டுமே அனுமதி',
    adminPinLabel: 'பாதுகாப்பு பின்னை உள்ளிடவும் (டெமோ: 1111)',
    adminLoginBtn: 'சரிபார்ப்பு மேசையை திறக்கவும்',

    footerSubtitle: 'இயற்கை காய்கறிகள், புதிய பழங்கள், தரமான பருப்புகள், தானியங்கள் மற்றும் மசாலா',
    footerDirect: '100% விவசாயிக்கு நேரடி தொகை',
    home: 'முகப்பு'
  },

  mr: {
    brandName: 'Xiva.Org',
    tagline: 'शेतावरून थेट ग्राहकांपर्यंत कृषी मंच',
    navMarketplace: 'शेतकरी बाजार',
    navFarmerDashboard: 'शेतकरी केंद्र',
    navAdminVerification: 'पडताळणी कक्ष',
    navOrders: 'ऑर्डर ट्रॅकिंग',
    login: 'लॉग इन',
    logout: 'लॉग आउट',
    topTrustBar: '१००% शेतकऱ्यांना थेट मोबदला · कोणताही मध्यस्थ नाही · पारदर्शक हमीभाव',

    heroBadge: '१००% सेंद्रिय व ताजे · काळ्या मातीतून थेट तुमच्या दारात',
    heroMainTitle: 'शुद्ध सेंद्रिय शेतमाल,',
    heroSubTitle: 'थेट स्थानिक पडताळणीकृत शेतकऱ्यांकडून',
    heroDescription: 'ग्रामीण अल्पभूधारक शेतकऱ्यांना थेट शहरी ग्राहकांशी जोडणे. ०% दलाली, पारदर्शक भाव आणि सकाळच्या ताज्या शेतमालाची थेट घरपोच डिलिव्हरी.',
    heroCtaExplore: 'ताजा शेतमाल पहा',
    heroCtaFarmer: 'शेतकरी पोर्टल व इन्व्हेंटरी',
    statCommission: 'प्लॅटफॉर्म कमिशन',
    statDirect: 'शेतकऱ्यांना थेट नफा',
    statGateToHome: 'शेतातून थेट दारात',
    statVerifiedFarms: 'शासकीय नोंदणीकृत शेतकरी',
    mandiTickerTitle: 'बाजारभाव पारदर्शकता',
    mandiTickerDesc: 'शेतकऱ्यांना ४०% जास्त नफा आणि ग्राहकांना सुपरमार्केटपेक्षा १५-२५% बचत.',
    tickerPaddy: '🌾 भात/तांदूळ: ₹65/किलो (बाजारभाव: ₹54)',
    tickerTomato: '🍅 गावरान टोमॅटो: ₹38/किलो (बाजार: ₹48)',
    tickerMango: '🥭 हापूस आंबा: ₹520/डझन',

    allCrops: 'सर्व पिके',
    cereals: 'तृणधान्ये',
    pulses: 'डाळी',
    vegetables: 'भाज्या',
    fruits: 'फळे',
    spices: 'मसाले',
    exotic: 'विदेशी पिके',

    filterVerifiedOnly: 'केवळ पडताळणी झालेले शेतकरी',
    showing: 'दाखवत आहे',
    crops: 'पिके',
    searchPlaceholder: 'धान्य, भाज्या, फळे शोधा...',
    sortBy: 'क्रमवारी',
    sortHighestRated: 'उत्तम ग्राहक रेटिंग',
    sortPriceLowHigh: 'किंमत: कमी ते जास्त',
    sortPriceHighLow: 'किंमत: जास्त ते कमी',
    sortDistance: 'जवळचे शेत आधी',
    resetFilters: 'फिल्टर काढा',
    noCropsFound: 'कोणताही शेतमाल सापडला नाही',
    noCropsFoundDesc: 'कृपया श्रेणी बदला किंवा इतर पिके शोधा.',

    farmerBadge: 'प्रमाणित शेतकरी',
    verifiedLocalFarmer: 'शासकीय जमीन नोंदणी प्रमाणित शेतकरी',
    verificationInProgress: 'पडताळणी प्रक्रिया सुरू आहे',
    away: 'कि.मी. अंतरावर',
    freshBatch: 'ताजा तोडलेला माल',
    reviews: 'अभिप्राय',
    directToFarmer: 'शेतकऱ्याला १००% रक्कम',
    addToBasket: 'बास्केटमध्ये जोडा',
    addedToBasket: 'बास्केटमध्ये जोडले',
    addToCart: 'बास्केटमध्ये जोडा',
    customerReviews: 'ग्राहकांचे अभिप्राय व रेटिंग',
    writeReview: 'सत्यापित अभिप्राय लिहा',
    submitReview: 'अभिप्राय नोंदवा',
    zeroMiddlemanBadge: 'दलालमुक्त शेती: १००% रक्कम थेट शेतकऱ्याला',
    organicStandard: 'सेंद्रिय शेती दर्जा',
    apmcRate: 'बाजार समिती दलाल दर',
    farmerGainHigher: 'शेतकऱ्याला थेट अधिक नफा!',
    farmStory: 'शेताची गोष्ट व तोडणी माहिती',
    nutritionalValue: 'पोषणमूल्ये व आरोग्यदायी फायदे',
    coldTransportGuaranteed: 'शीतगृह साखळी: शेतापासून ४°C तापमानात सुरक्षित वाहतूक',
    reviewNoticeDelivered: 'केवळ यशस्वीरित्या डिलिव्हरी मिळालेले ग्राहकच अभिप्राय नोंदवू शकतात.',
    reviewSuccess: 'तुमचा अभिप्राय यशस्वीरित्या नोंदवला गेला! स्थानिक शेतकऱ्यांना पाठिंबा दिल्याबद्दल धन्यवाद.',
    starRating: 'स्टार रेटिंग',
    feedbackPlaceholder: 'ताजेपणा, चव आणि दर्जाबद्दल आपला अनुभव लिहा...',
    simulateDeliveredOrder: 'डिलिव्हरी सिमुलेट करा (चाचणी)',

    adminAuthenticated: 'प्रशासक प्रमाणित',
    adminDesc: 'पडताळणी व शेतमाल नियंत्रण',
    adminVerificationDesk: 'प्रशासकीय पडताळणी कक्ष',
    logoutAdmin: 'प्रशासक लॉग आउट',
    adminPortal: 'प्रशासक पोर्टल',
    trackMyOrders: 'माझ्या ऑर्डर्स ट्रॅक करा',
    myWishlist: 'माझी आवडती पिके',
    farmerDashboard: 'शेतकरी डॅशबोर्ड व साठा',
    signInSwitchRole: 'लॉग इन / भूमिका बदला',

    shoppingBag: 'खरेदी बास्केट',
    emptyCart: 'तुमची बास्केट रिकामी आहे',
    emptyCartDesc: 'शेतकऱ्यांकडून थेट ताजी पिके बास्केटमध्ये जोडा.',
    startShopping: 'पिके खरेदी करा',
    harvestBasket: 'शेतमाल बास्केट',
    farmGateOrigin: 'थेट शेताच्या बांधावरून · कोणताही दलाल नाही',
    automatedDeliverySchedule: 'स्वयंचलित डिलिव्हरी व वेळ',
    orderConfirmed: 'ऑर्डर निश्चित झाली!',
    orderConfirmedDesc: '१००% रक्कम शेतकऱ्याच्या खात्यात जमा केली जाईल',
    directFarmerRemittance: 'शेतकऱ्यांना थेट मोबदला',
    directRemittanceDesc: 'कोणत्याही कपातीशिवाय संपूर्ण रक्कम शेतकऱ्याच्या बँक खात्यात/UPI द्वारे जमा होईल.',
    deliveryDestination: 'डिलिव्हरीचा पत्ता',
    recipientName: 'ग्राहकाचे नाव',
    mobileNumber: 'मोबाईल नंबर',
    completeAddress: 'घर/फ्लॅट नंबर, रस्ता, इमारत, परिसर',
    deliverySlots: 'डिलिव्हरी वेळ',
    earlyMorningSlot: 'सकाळची डिलिव्हरी (६:०० - ८:३० AM)',
    earlyMorningSlotDesc: 'पहाटे ४:३० वाजता तोडणी · सकाळी ७:०० वाजता ताजी डिलिव्हरी',
    eveningSlot: 'संध्याकाळची डिलिव्हरी (५:०० - ८:०० PM)',
    eveningSlotDesc: 'दुपारची तोडणी · रात्रीच्या जेवणापूर्वी ताजी डिलिव्हरी',
    weekendSlot: 'रविवार विशेष डिलिव्हरी',
    weekendSlotDesc: 'सोसायटी सामूहिक डिलिव्हरी',
    recommended: 'शिफारस केलेले',
    secureCheckout: 'सुरक्षित चेकआउट करा',
    orderTotal: 'एकूण रक्कम',
    directFarmerEarnings: 'शेतकऱ्याला थेट मिळणारी रक्कम (१००%)',
    paymentMethod: 'पेमेंट पर्याय',
    cashOnDelivery: 'कॅश ऑन डिलिव्हरी (माल मिळाल्यावर रोख)',
    cashOnDeliveryDesc: 'शेतमालाची तपासणी केल्यावरच पैसे द्या',
    upiInstant: 'त्वरित UPI (GPay, PhonePe, Paytm)',
    upiInstantDesc: 'गुगल पे, फोन पे, पेटीएम अथवा क्यूआर कोड',
    cardsRuPay: 'रुपे / डेबिट कार्ड',
    cardsRuPayDesc: 'रुपे आणि सर्व प्रमुख कार्ड्स',
    netBanking: 'नेट बँकिंग',
    placeOrder: 'ऑर्डर निश्चित करा',
    confirmHarvestOrder: 'शेतमाल ऑर्डर निश्चित करा',
    orderPlacedSuccess: 'ऑर्डर यशस्वीरीत्या नोंदवली गेली! सकाळच्या वेळेत पाठवली जाईल.',
    orderId: 'ऑर्डर क्रमांक',
    harvestDispatched: 'शेतातून वाहतुकीसाठी रवाना',
    orderDispatchedDesc: 'तुमची ऑर्डर शेतकऱ्याकडे पाठवण्यात आली आहे. अंदाजे वेळ:',
    directFarmerPayout: 'शेतकऱ्याचा मोबदला',
    coldTransitLogistics: 'शीत वाहतूक खर्च',
    totalAmountDue: 'एकूण देय रक्कम',
    viewLiveTracker: 'थेट डिलिव्हरी ट्रॅकर पहा',
    freeAbove399: 'मोफत (₹३९९ वरील ऑर्डरवर)',
    zeroCommission: '₹०.०० (कमिशन नाही)',

    wishlistTitle: 'माझी आवडती पिके',
    wishlistEmpty: 'तुमची आवडती यादी रिकामी आहे',
    wishlistEmptyDesc: 'उत्पादनावरील हृदयाच्या चिन्हावर क्लिक करून पिके जतन करा.',
    browseFreshCrops: 'ताजा शेतमाल पहा',
    removeFromWishlist: 'यादीतून काढा',

    farmerHubTitle: 'शेतकरी उत्पादक केंद्र',
    farmerHubDesc: 'शेतमाल साठा, तोडणी नोंदी आणि शासकीय जमीन पडताळणी व्यवस्थापित करा.',
    tabInventory: 'शेतमाल साठा व इन्व्हेंटरी',
    tabVerification: 'शासकीय जमीन पडताळणी',
    tabAnalytics: 'शेती विश्लेषण',
    totalActiveCrops: 'सक्रिय पिके',
    stockReady: 'तोडणीस तयार साठा',
    estHarvestValue: 'अंदाजे मूल्य',
    avgCustomerRating: 'ग्राहक रेटिंग',
    addNewHarvest: 'नवीन पीक जोडा',
    updateStock: 'साठा अद्ययावत करा',
    cropName: 'पिकाचे नाव',
    pricePerUnit: 'किंमत / प्रमाण',
    stockAvailable: 'उपलब्ध साठा',
    action: 'कृती',
    verifiedStatusBadge: 'प्रमाणित',
    pendingStatusBadge: 'पडताळणी बाकी',
    landRecords: 'जमीन कागदपत्रे व दाखले',
    uploadLandRecord: 'जमीन कागदपत्रे अपलोड करा',

    adminAuditTitle: 'शेतकरी पडताळणी व नियमन कक्ष',
    adminAuditSubtitle: 'अधिकृत जमीन व उत्पादक तपासणी',
    adminAuditDesc: 'शेतकऱ्यांना अधिकृत बॅज देण्यापूर्वी ७/१२ उतारा, किसान कार्ड व सेंद्रिय प्रमाणपत्रे तपासा.',
    filterAll: 'सर्व अर्ज',
    filterPending: 'तपासणी बाकी',
    filterVerified: 'प्रमाणित शेतकरी',
    filterRejected: 'नाकारलेले',
    approveFarmer: 'शेतकऱ्याला मान्यता द्या व बॅज जारी करा',
    rejectFarmer: 'अर्ज नाकारा',
    landAcreage: 'जमिनीचे क्षेत्रफळ',
    soilType: 'मातीचा प्रकार',
    primaryCrops: 'मुख्य पिके',
    acresUnit: 'एकर',

    trackingSubtitle: 'रिअल-टाइम कृषी शीत-साखळी',
    trackingTitle: 'शेतापासून घरापर्यंत थेट ट्रॅकिंग',
    selectOrder: 'ऑर्डर निवडा',
    estimatedDelivery: 'अंदाजे डिलिव्हरी',
    noOrdersTitle: 'सध्या कोणतीही सक्रिय ऑर्डर नाही',
    noOrdersDesc: 'जेव्हा तुम्ही शेतकऱ्याकडून थेट शेतमालाची ऑर्डर द्याल, तेव्हा वाहनाचे स्थान व तापमान येथे दिसेल.',
    stageHarvestScheduled: 'तोडणीचे नियोजन झाले',
    stageHarvestScheduledDesc: 'गावातील शेतकऱ्याला माहिती दिली गेली',
    stageHandHarvested: 'हाताने ताजी तोडणी संपन्न',
    stageHandHarvestedDesc: 'विहिरीच्या पाण्याने स्वच्छ धुतले',
    stageColdChain: 'शीत वाहनातून वाहतूक सुरू',
    stageColdChainDesc: '४°C तापमानावर सुरक्षित नियंत्रण',
    stageOutForDelivery: 'डिलिव्हरीसाठी बाहेर पडले',
    stageOutForDeliveryDesc: 'डिलिव्हरी पार्टनर आपल्या पत्त्याकडे येत आहे',
    stageDelivered: 'यशस्वीरित्या पोहोचवले',
    stageDeliveredDesc: 'थेट तुमच्या दारात पोहोचवले',
    vehicleTelemetry: 'शीत-साखळी सेन्सर माहिती',
    coldTempStatus: 'वाहनातील तापमान (४.०°C)',
    assignedDriver: 'वाहतूक चालक माहिती',
    harvestItemsSummary: 'या ऑर्डरमधील शेतमाल',

    authModalTitle: 'शेतकरी बाजारात प्रवेश',
    authModalDesc: 'ताजा शेतमाल मागवण्यासाठी किंवा पीक नोंदणीसाठी लॉग इन करा',
    authConsumer: 'ग्राहक (ताजा सेंद्रिय शेतमाल)',
    authFarmer: 'शेतकरी (शेतमाल व्यवस्थापन)',
    authAdmin: 'प्रशासक (जमीन पडताळणी)',
    authEmail: 'ईमेल पत्ता',
    authPassword: 'पासवर्ड',
    authLoginButton: 'लॉग इन करा',
    quickDemoAccess: 'त्वरित डेमो १-क्लिक लॉग इन',
    adminPortalTitle: 'प्रशासक पोर्टल',
    adminPortalDesc: 'केवळ कृषी पडताळणी अधिकाऱ्यांसाठी संरक्षित विभाग',
    adminPinLabel: 'सुरक्षा पिन टाका (डेमो: 1111)',
    adminLoginBtn: 'पडताळणी कक्ष उघडा',

    footerSubtitle: 'सेंद्रिय भाज्या, ताजी फळे, दर्जेदार डाळी, धान्ये आणि सुगंधी मसाले',
    footerDirect: '१००% थेट शेतकऱ्यांच्या खात्यात',
    home: 'होम'
  },

  pa: {
    brandName: 'Xiva.Org',
    tagline: 'ਖੇਤਾਂ ਤੋਂ ਸਿੱਧਾ ਖਪਤਕਾਰਾਂ ਤੱਕ ਖੇਤੀਬਾੜੀ ਮੰਚ',
    navMarketplace: 'ਕਿਸਾਨ ਮੰਡੀ',
    navFarmerDashboard: 'ਕਿਸਾਨ ਕੇਂਦਰ',
    navAdminVerification: 'ਪੜਤਾਲ ਡੈਸਕ',
    navOrders: 'ਆਰਡਰ ਟਰੈਕਿੰਗ',
    login: 'ਲਾਗ ਇਨ',
    logout: 'ਲਾਗ ਆਉਟ',
    topTrustBar: '100% ਕਿਸਾਨ ਨੂੰ ਸਿੱਧੀ ਅਦਾਇਗੀ · ਕੋਈ ਵਿਚੋਲਾ ਨਹੀਂ · ਸਰਕਾਰੀ ਮੰਡੀ ਮੁੱਲ ਪਾਰਦਰਸ਼ਤਾ',

    heroBadge: '100% ਦੇਸੀ ਤੇ ਤਾਜ਼ਾ · ਖੇਤਾਂ ਦੀ ਮਿੱਟੀ ਤੋਂ ਸਿੱਧਾ ਤੁਹਾਡੀ ਰਸੋਈ ਤੱਕ',
    heroMainTitle: 'ਸ਼ੁੱਧ ਕੁਦਰਤੀ ਖੇਤੀਬਾੜੀ ਉਪਜ,',
    heroSubTitle: 'ਸਿੱਧੇ ਤੌਰ ਤੇ ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨਾਂ ਵੱਲੋਂ',
    heroDescription: 'ਪੇਂਡੂ ਕਿਸਾਨਾਂ ਨੂੰ ਸ਼ਹਿਰੀ ਖਪਤਕਾਰਾਂ ਨਾਲ ਸਿੱਧਾ ਜੋੜਨਾ। 0% ਵਿਚੋਲਾ ਕਮਿਸ਼ਨ, ਮੰਡੀ ਦੇ ਸਹੀ ਭਾਅ ਅਤੇ ਸਵੇਰ ਦੀ ਤਾਜ਼ੀ ਹੋਮ ਡਿਲੀਵਰੀ।',
    heroCtaExplore: 'ਤਾਜ਼ੀਆਂ ਫਸਲਾਂ ਦੇਖੋ',
    heroCtaFarmer: 'ਕਿਸਾਨ ਪੋਰਟਲ ਤੇ ਸਟਾਕ',
    statCommission: 'ਪਲੇਟਫਾਰਮ ਕਮਿਸ਼ਨ',
    statDirect: 'ਕਿਸਾਨ ਨੂੰ ਸਿੱਧਾ ਲਾਭ',
    statGateToHome: 'ਖੇਤ ਤੋਂ ਸਿੱਧਾ ਘਰ',
    statVerifiedFarms: 'ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਪ੍ਰਮਾਣਿਤ ਖੇਤ',
    mandiTickerTitle: 'ਮੰਡੀ ਭਾਅ ਪਾਰਦਰਸ਼ਤਾ',
    mandiTickerDesc: 'ਕਿਸਾਨਾਂ ਨੂੰ 40% ਤੱਕ ਵੱਧ ਆਮਦਨ ਅਤੇ ਸੁਪਰਮਾਰਕੀਟਾਂ ਨਾਲੋਂ 15-25% ਘੱਟ ਖਰਚਾ।',
    tickerPaddy: '🌾 ਝੋਨਾ/ਚਾਵਲ: ₹65/ਕਿਲੋ (ਮੰਡੀ: ₹54)',
    tickerTomato: '🍅 ਦੇਸੀ ਟਮਾਟਰ: ₹38/ਕਿਲੋ (ਮਾਰਕੀਟ: ₹48)',
    tickerMango: '🥭 ਅਲਫੋਂਸੋ ਅੰਬ: ₹520/ਦਰਜਨ',

    allCrops: 'ਸਾਰੀਆਂ ਫਸਲਾਂ',
    cereals: 'ਅਨਾਜ',
    pulses: 'ਦਾਲਾਂ',
    vegetables: 'ਸਬਜ਼ੀਆਂ',
    fruits: 'ਫਲ',
    spices: 'ਮਸਾਲੇ',
    exotic: 'ਵਿਦੇਸ਼ੀ ਫਸਲਾਂ',

    filterVerifiedOnly: 'ਸਿਰਫ਼ ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨ',
    showing: 'ਮੌਜੂਦ',
    crops: 'ਫਸਲਾਂ',
    searchPlaceholder: 'ਅਨਾਜ, ਦਾਲਾਂ, ਤਾਜ਼ੀਆਂ ਸਬਜ਼ੀਆਂ ਲੱਭੋ...',
    sortBy: 'ਤਰਤੀਬ ਦਿਓ',
    sortHighestRated: 'ਸਭ ਤੋਂ ਉੱਚੀ ਰੇਟਿੰਗ',
    sortPriceLowHigh: 'ਕੀਮਤ: ਘੱਟ ਤੋਂ ਵੱਧ',
    sortPriceHighLow: 'ਕੀਮਤ: ਵੱਧ ਤੋਂ ਘੱਟ',
    sortDistance: 'ਨੇੜਲਾ ਖੇਤ ਪਹਿਲਾਂ',
    resetFilters: 'ਫਿਲਟਰ ਹਟਾਓ',
    noCropsFound: 'ਕੋਈ ਫਸਲ ਨਹੀਂ ਮਿਲੀ',
    noCropsFoundDesc: 'ਕਿਰਪਾ ਕਰਕੇ ਸ਼੍ਰੇਣੀ ਬਦਲੋ ਜਾਂ ਦੁਬਾਰਾ ਖੋਜ ਕਰੋ।',

    farmerBadge: 'ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨ',
    verifiedLocalFarmer: 'ਸਰਕਾਰੀ ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨ',
    verificationInProgress: 'ਪੜਤਾਲ ਚੱਲ ਰਹੀ ਹੈ',
    away: 'ਕਿਲੋਮੀਟਰ ਦੂਰ',
    freshBatch: 'ਤਾਜ਼ਾ ਕਟਾਈ',
    reviews: 'ਸਮੀਖਿਆਵਾਂ',
    directToFarmer: 'ਕਿਸਾਨ ਨੂੰ 100% ਭੁਗਤਾਨ',
    addToBasket: 'ਟੋਕਰੀ ਵਿੱਚ ਪਾਓ',
    addedToBasket: 'ਟੋਕਰੀ ਵਿੱਚ ਪਾਇਆ ਗਿਆ',
    addToCart: 'ਟੋਕਰੀ ਵਿੱਚ ਪਾਓ',
    customerReviews: 'ਗਾਹਕਾਂ ਦੀਆਂ ਸਮੀਖਿਆਵਾਂ ਤੇ ਰੇਟਿੰਗ',
    writeReview: 'ਸਮੀਖਿਆ ਲਿਖੋ',
    submitReview: 'ਸਮੀਖਿਆ ਦਰਜ ਕਰੋ',
    zeroMiddlemanBadge: 'ਕੋਈ ਵਿਚੋਲਾ ਨਹੀਂ: 100% ਸਿੱਧਾ ਕਿਸਾਨ ਨੂੰ',
    organicStandard: 'ਕੁਦਰਤੀ ਖੇਤੀ ਮਿਆਰ',
    apmcRate: 'ਮੰਡੀ ਆੜ੍ਹਤੀਆ ਰੇਟ',
    farmerGainHigher: 'ਕਿਸਾਨ ਨੂੰ ਵੱਧ ਸਿੱਧਾ ਮੁਨਾਫ਼ਾ!',
    farmStory: 'ਖੇਤ ਦੀ ਕਹਾਣੀ ਤੇ ਕਟਾਈ ਦੇ ਵੇਰਵੇ',
    nutritionalValue: 'ਪੌਸ਼ਟਿਕ ਮੁੱਲ ਤੇ ਕੁਦਰਤੀ ਤੰਦਰੁਸਤੀ',
    coldTransportGuaranteed: 'ਕੋਲਡ-ਚੇਨ ਸੁਰੱਖਿਆ: 4°C ਤਾਪਮਾਨ ਤੇ ਸਿੱਧੀ ਸੁਰੱਖਿਅਤ ਡਿਲੀਵਰੀ',
    reviewNoticeDelivered: 'ਸਿਰਫ਼ ਉਹੀ ਗਾਹਕ ਸਮੀਖਿਆ ਦੇ ਸਕਦੇ ਹਨ ਜਿਨ੍ਹਾਂ ਨੂੰ ਆਰਡਰ ਮਿਲ ਚੁੱਕਾ ਹੈ।',
    reviewSuccess: 'ਤੁਹਾਡੀ ਸਮੀਖਿਆ ਦਰਜ ਹੋ ਗਈ ਹੈ! ਕਿਸਾਨਾਂ ਦਾ ਸਾਥ ਦੇਣ ਲਈ ਧੰਨਵਾਦ।',
    starRating: 'ਸਟਾਰ ਰੇਟਿੰਗ',
    feedbackPlaceholder: 'ਤਾਜ਼ਗੀ ਅਤੇ ਸਵਾਦ ਬਾਰੇ ਆਪਣਾ ਤਜਰਬਾ ਲਿਖੋ...',
    simulateDeliveredOrder: 'ਸਫਲ ਡਿਲੀਵਰੀ ਟੈਸਟ ਕਰੋ (ਡੈਮੋ)',

    adminAuthenticated: 'ਪ੍ਰਸ਼ਾਸਕ ਪ੍ਰਮਾਣਿਤ',
    adminDesc: 'ਪੜਤਾਲ ਅਤੇ ਸਟਾਕ ਨਿਯੰਤਰਣ',
    adminVerificationDesk: 'ਪ੍ਰਸ਼ਾਸਕ ਪੜਤਾਲ ਡੈਸਕ',
    logoutAdmin: 'ਪ੍ਰਸ਼ਾਸਕ ਲਾਗ ਆਉਟ',
    adminPortal: 'ਪ੍ਰਸ਼ਾਸਕ ਪੋਰਟਲ',
    trackMyOrders: 'ਆਰਡਰ ਟਰੈਕ ਕਰੋ',
    myWishlist: 'ਮੇਰੀ ਪਸੰਦ',
    farmerDashboard: 'ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ ਤੇ ਸਟਾਕ',
    signInSwitchRole: 'ਲਾਗ ਇਨ / ਰੋਲ ਬਦਲੋ',

    shoppingBag: 'ਖਰੀਦਦਾਰੀ ਟੋਕਰੀ',
    emptyCart: 'ਤੁਹਾਡੀ ਟੋਕਰੀ ਖਾਲੀ ਹੈ',
    emptyCartDesc: 'ਸਿੱਧੇ ਕਿਸਾਨਾਂ ਦੁਆਰਾ ਉਗਾਈਆਂ ਤਾਜ਼ੀਆਂ ਫਸਲਾਂ ਸ਼ਾਮਲ ਕਰੋ।',
    startShopping: 'ਫਸਲਾਂ ਖਰੀਦੋ',
    harvestBasket: 'ਫਸਲ ਟੋਕਰੀ',
    farmGateOrigin: 'ਸਿੱਧਾ ਖੇਤ ਦੇ ਬੰਨੇ ਤੋਂ · ਕੋਈ ਵਿਚੋਲਾ ਨਹੀਂ',
    automatedDeliverySchedule: 'ਆਟੋਮੈਟਿਕ ਡਿਲੀਵਰੀ ਤੇ ਸਮਾਂ',
    orderConfirmed: 'ਆਰਡਰ ਪੱਕਾ ਹੋ ਗਿਆ!',
    orderConfirmedDesc: '100% ਰਕਮ ਕਿਸਾਨ ਦੇ ਖਾਤੇ ਲਈ ਬੁੱਕ ਕਰ ਦਿੱਤੀ ਗਈ ਹੈ',
    directFarmerRemittance: 'ਕਿਸਾਨ ਨੂੰ ਸਿੱਧੀ ਅਦਾਇਗੀ',
    directRemittanceDesc: 'ਬਿਨਾਂ ਕਿਸੇ ਕਟੌਤੀ ਦੇ ਪੂਰੇ ਪੈਸੇ ਸਿੱਧੇ ਕਿਸਾਨ ਦੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਜਮ੍ਹਾ ਹੋਣਗੇ।',
    deliveryDestination: 'ਪਹੁੰਚਾਉਣ ਦਾ ਪਤਾ',
    recipientName: 'ਪੂਰਾ ਨਾਮ',
    mobileNumber: 'ਮੋਬਾਈਲ ਨੰਬਰ',
    completeAddress: 'ਮਕਾਨ ਨੰਬਰ, ਗਲੀ, ਇਲਾਕਾ, ਸ਼ਹਿਰ',
    deliverySlots: 'ਡਿਲੀਵਰੀ ਸਮਾਂ',
    earlyMorningSlot: 'ਸਵੇਰ ਦਾ ਸਮਾਂ (6:00 - 8:30 AM)',
    earlyMorningSlotDesc: 'ਸਵੇਰੇ 4:30 ਵਜੇ ਤੁੜਾਈ · ਸਵੇਰੇ 7:00 ਵਜੇ ਤਾਜ਼ੀ ਡਿਲੀਵਰੀ',
    eveningSlot: 'ਸ਼ਾਮ ਦਾ ਸਮਾਂ (5:00 - 8:00 PM)',
    eveningSlotDesc: 'ਦੁਪਹਿਰ ਦੀ ਤੁੜਾਈ · ਸ਼ਾਮ ਦੇ ਖਾਣੇ ਤੋਂ ਪਹਿਲਾਂ ਡਿਲੀਵਰੀ',
    weekendSlot: 'ਐਤਵਾਰ ਵਿਸ਼ੇਸ਼ ਡਿਲੀਵਰੀ',
    weekendSlotDesc: 'ਕਮਿਊਨਿਟੀ ਡਿਲੀਵਰੀ',
    recommended: 'ਸਿਫਾਰਸ਼ ਕੀਤੀ',
    secureCheckout: 'ਸੁਰੱਖਿਅਤ ਭੁਗਤਾਨ',
    orderTotal: 'ਕੁੱਲ ਰਕਮ',
    directFarmerEarnings: 'ਕਿਸਾਨ ਦੀ ਸਿੱਧੀ ਕਮਾਈ (100%)',
    paymentMethod: 'ਭੁਗਤਾਨ ਵਿਧੀ',
    cashOnDelivery: 'ਕੈਸ਼ ਆਨ ਡਿਲੀਵਰੀ (ਸਮਾਨ ਮਿਲਣ ਤੇ ਰੁਪਏ)',
    cashOnDeliveryDesc: 'ਫਸਲ ਦੀ ਜਾਂਚ ਕਰਨ ਤੋਂ ਬਾਅਦ ਹੀ ਭੁਗਤਾਨ ਕਰੋ',
    upiInstant: 'ਤੁਰੰਤ UPI (GPay, PhonePe, Paytm)',
    upiInstantDesc: 'ਗੂਗਲ ਪੇ, ਫੋਨ ਪੇ, ਪੇਟੀਐਮ ਜਾਂ QR ਕੋਡ',
    cardsRuPay: 'ਰੂਪੇ ਕਾਰਡ',
    cardsRuPayDesc: 'ਸਾਰੇ ਦੇਸੀ ਤੇ ਵਿਦੇਸ਼ੀ ਕਾਰਡ',
    netBanking: 'ਨੈੱਟ ਬੈਂਕਿੰਗ',
    placeOrder: 'ਆਰਡਰ ਪੱਕਾ ਕਰੋ',
    confirmHarvestOrder: 'ਫਸਲ ਆਰਡਰ ਪੱਕਾ ਕਰੋ',
    orderPlacedSuccess: 'ਆਰਡਰ ਕਾਮਯਾਬੀ ਨਾਲ ਦਰਜ ਹੋਇਆ! ਸਵੇਰ ਦੀ ਡਿਲੀਵਰੀ ਲਈ ਭੇਜਿਆ ਜਾਵੇਗਾ।',
    orderId: 'ਆਰਡਰ ਨੰਬਰ',
    harvestDispatched: 'ਖੇਤ ਤੋਂ ਰਵਾਨਾ ਹੋਇਆ',
    orderDispatchedDesc: 'ਤੁਹਾਡਾ ਆਰਡਰ ਕਿਸਾਨ ਕੋਲ ਪਹੁੰਚ ਚੁੱਕਾ ਹੈ। ਅੰਦਾਜ਼ਨ ਸਮਾਂ:',
    directFarmerPayout: 'ਕਿਸਾਨ ਦਾ ਭੁਗਤਾਨ',
    coldTransitLogistics: 'ਕੋਲਡ ਟਰਾਂਸਪੋਰਟ ਖਰਚਾ',
    totalAmountDue: 'ਕੁੱਲ ਦੇਣਯੋਗ ਰਕਮ',
    viewLiveTracker: 'ਲਾਈਵ ਡਿਲੀਵਰੀ ਟਰੈਕਰ ਦੇਖੋ',
    freeAbove399: 'ਮੁਫ਼ਤ (₹399 ਤੋਂ ਉੱਪਰ)',
    zeroCommission: '₹0.00 (ਕੋਈ ਕਮਿਸ਼ਨ ਨਹੀਂ)',

    wishlistTitle: 'ਮੇਰੀ ਪਸੰਦ',
    wishlistEmpty: 'ਤੁਹਾਡੀ ਪਸੰਦ ਸੂਚੀ ਖਾਲੀ ਹੈ',
    wishlistEmptyDesc: 'ਕਿਸੇ ਵੀ ਫਸਲ ਦੇ ਦਿਲ ਵਾਲੇ ਨਿਸ਼ਾਨ ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਆਪਣੀ ਪਸੰਦ ਬਣਾਓ।',
    browseFreshCrops: 'ਤਾਜ਼ੀਆਂ ਫਸਲਾਂ ਦੇਖੋ',
    removeFromWishlist: 'ਸੂਚੀ ਵਿੱਚੋਂ ਹਟਾਓ',

    farmerHubTitle: 'ਕਿਸਾਨ ਉਤਪਾਦਕ ਕੇਂਦਰ',
    farmerHubDesc: 'ਫਸਲ ਸਟਾਕ, ਤੁੜਾਈ ਰਿਕਾਰਡ ਅਤੇ ਜ਼ਮੀਨੀ ਪੜਤਾਲ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ।',
    tabInventory: 'ਫਸਲ ਸਟਾਕ ਤੇ ਵਸਤੂ ਸੂਚੀ',
    tabVerification: 'ਸਰਕਾਰੀ ਜ਼ਮੀਨੀ ਪੜਤਾਲ',
    tabAnalytics: 'ਖੇਤੀ ਵਿਸ਼ਲੇਸ਼ਣ',
    totalActiveCrops: 'ਕੁੱਲ ਫਸਲਾਂ',
    stockReady: 'ਤੁੜਾਈ ਲਈ ਤਿਆਰ ਸਟਾਕ',
    estHarvestValue: 'ਅੰਦਾਜ਼ਨ ਫਸਲ ਮੁੱਲ',
    avgCustomerRating: 'ਗਾਹਕ ਰੇਟਿੰਗ',
    addNewHarvest: 'ਨਵੀਂ ਫਸਲ ਸ਼ਾਮਲ ਕਰੋ',
    updateStock: 'ਸਟਾਕ ਅੱਪਡੇਟ ਕਰੋ',
    cropName: 'ਫਸਲ ਦਾ ਨਾਮ',
    pricePerUnit: 'ਕੀਮਤ / ਇਕਾਈ',
    stockAvailable: 'ਮੌਜੂਦ ਸਟਾਕ',
    action: 'ਕਾਰਵਾਈ',
    verifiedStatusBadge: 'ਪ੍ਰਮਾਣਿਤ',
    pendingStatusBadge: 'ਪੜਤਾਲ ਅਧੀਨ',
    landRecords: 'ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਤੇ ਸਰਟੀਫਿਕੇਟ',
    uploadLandRecord: 'ਜ਼ਮੀਨੀ ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰੋ',

    adminAuditTitle: 'ਕਿਸਾਨ ਪੜਤਾਲ ਅਤੇ ਨਿਯਮ ਡੈਸਕ',
    adminAuditSubtitle: 'ਸਰਕਾਰੀ ਜ਼ਮੀਨੀ ਤੇ ਉਤਪਾਦਕ ਆਡਿਟ',
    adminAuditDesc: 'ਕਿਸਾਨਾਂ ਨੂੰ ਪ੍ਰਮਾਣਿਤ ਬੈਜ ਦੇਣ ਤੋਂ ਪਹਿਲਾਂ ਜਮ੍ਹਾਂਬੰਦੀ, ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਅਤੇ ਜੈਵਿਕ ਸਰਟੀਫਿਕੇਟਾਂ ਦੀ ਜਾਂਚ ਕਰੋ।',
    filterAll: 'ਸਾਰੀਆਂ ਅਰਜ਼ੀਆਂ',
    filterPending: 'ਪੜਤਾਲ ਬਾਕੀ',
    filterVerified: 'ਪ੍ਰਮਾਣਿਤ ਖੇਤ',
    filterRejected: 'ਰੱਦ ਕੀਤੀਆਂ',
    approveFarmer: 'ਕਿਸਾਨ ਨੂੰ ਮਨਜ਼ੂਰ ਕਰੋ ਤੇ ਬੈਜ ਦਿਓ',
    rejectFarmer: 'ਅਰਜ਼ੀ ਰੱਦ ਕਰੋ',
    landAcreage: 'ਜ਼ਮੀਨ ਦਾ ਰਕਬਾ',
    soilType: 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ',
    primaryCrops: 'ਮੁੱਖ ਫਸਲਾਂ',
    acresUnit: 'ਏਕੜ',

    trackingSubtitle: 'ਰੀਅਲ-ਟਾਈਮ ਖੇਤੀਬਾੜੀ ਕੋਲਡ-ਚੇਨ',
    trackingTitle: 'ਖੇਤ ਤੋਂ ਘਰ ਤੱਕ ਲਾਈਵ ਟਰੈਕਿੰਗ',
    selectOrder: 'ਆਰਡਰ ਚੁਣੋ',
    estimatedDelivery: 'ਅੰਦਾਜ਼ਨ ਡਿਲੀਵਰੀ',
    noOrdersTitle: 'ਹਾਲੇ ਕੋਈ ਚੱਲ ਰਿਹਾ ਆਰਡਰ ਨਹੀਂ ਹੈ',
    noOrdersDesc: 'ਜਦੋਂ ਤੁਸੀਂ ਕਿਸਾਨ ਤੋਂ ਸਿੱਧੀ ਤਾਜ਼ੀ ਫਸਲ ਮੰਗਵਾਉਂਦੇ ਹੋ, ਤਾਂ ਗੱਡੀ ਦੀ ਲੋਕੇਸ਼ਨ ਅਤੇ ਤਾਪਮਾਨ ਇੱਥੇ ਦਿਖਾਈ ਦੇਵੇਗਾ।',
    stageHarvestScheduled: 'ਕਟਾਈ ਦਾ ਸਮਾਂ ਤੈਅ',
    stageHarvestScheduledDesc: 'ਪਿੰਡ ਦੇ ਕਿਸਾਨ ਨੂੰ ਸੁਨੇਹਾ ਭੇਜਿਆ ਗਿਆ',
    stageHandHarvested: 'ਹੱਥੀਂ ਤਾਜ਼ੀ ਤੁੜਾਈ ਹੋਈ',
    stageHandHarvestedDesc: 'ਖੂਹ ਦੇ ਪਾਣੀ ਨਾਲ ਧੋਤਾ ਤੇ ਸਾਫ਼ ਕੀਤਾ',
    stageColdChain: 'ਕੋਲਡ-ਚੇਨ ਗੱਡੀ ਵਿੱਚ ਰਵਾਨਾ',
    stageColdChainDesc: 'ਤਾਪਮਾਨ 4°C ਤੇ ਲਗਾਤਾਰ ਕੰਟਰੋਲ',
    stageOutForDelivery: 'ਡਿਲੀਵਰੀ ਲਈ ਰਵਾਨਾ',
    stageOutForDeliveryDesc: 'ਡਿਲੀਵਰੀ ਰਾਈਡਰ ਤੁਹਾਡੇ ਪਤੇ ਵੱਲ ਆ ਰਿਹਾ ਹੈ',
    stageDelivered: 'ਕਾਮਯਾਬੀ ਨਾਲ ਪਹੁੰਚਾਇਆ',
    stageDeliveredDesc: 'ਸਿੱਧਾ ਤੁਹਾਡੇ ਘਰ ਦੀ ਦਹਿਲੀਜ਼ ਤੇ',
    vehicleTelemetry: 'ਸੈਂਸਰ ਟੈਲੀਮੈਟਰੀ',
    coldTempStatus: 'ਗੱਡੀ ਦਾ ਤਾਪਮਾਨ (4.0°C)',
    assignedDriver: 'ਟਰਾਂਸਪੋਰਟ ਡਰਾਈਵਰ ਜਾਣਕਾਰੀ',
    harvestItemsSummary: 'ਇਸ ਆਰਡਰ ਦੀਆਂ ਫਸਲਾਂ',

    authModalTitle: 'ਕਿਸਾਨ ਮੰਡੀ ਵਿੱਚ ਦਾਖਲਾ',
    authModalDesc: 'ਤਾਜ਼ੀਆਂ ਪੇਂਡੂ ਫਸਲਾਂ ਖਰੀਦਣ ਜਾਂ ਵੇਚਣ ਲਈ ਲਾਗ ਇਨ ਕਰੋ',
    authConsumer: 'ਖਪਤਕਾਰ (ਤਾਜ਼ਾ ਕੁਦਰਤੀ ਖਾਣਾ)',
    authFarmer: 'ਕਿਸਾਨ (ਫਸਲਾਂ ਦੀ ਵਿਕਰੀ)',
    authAdmin: 'ਪ੍ਰਸ਼ਾਸਕ (ਜ਼ਮੀਨੀ ਰਿਕਾਰਡ ਪੜਤਾਲ)',
    authEmail: 'ਈਮੇਲ ਪਤਾ',
    authPassword: 'ਪਾਸਵਰਡ',
    authLoginButton: 'ਲਾਗ ਇਨ ਕਰੋ',
    quickDemoAccess: 'ਤੁਰੰਤ ਡੈਮੋ 1-ਕਲਿੱਕ ਲਾਗ ਇਨ',
    adminPortalTitle: 'ਪ੍ਰਸ਼ਾਸਕ ਪੋਰਟਲ',
    adminPortalDesc: 'ਸਿਰਫ਼ ਖੇਤੀਬਾੜੀ ਪੜਤਾਲ ਅਧਿਕਾਰੀਆਂ ਲਈ ਸੁਰੱਖਿਅਤ ਖੇਤਰ',
    adminPinLabel: 'ਸੁਰੱਖਿਆ ਪਿੰਨ ਭਰੋ (ਡੈਮੋ: 1111)',
    adminLoginBtn: 'ਪੜਤਾਲ ਡੈਸਕ ਖੋਲ੍ਹੋ',

    footerSubtitle: 'ਜੈਵਿਕ ਸਬਜ਼ੀਆਂ, ਤਾਜ਼ੇ ਫਲ, ਉੱਚ ਦਰਜੇ ਦੀਆਂ ਦਾਲਾਂ, ਅਨਾਜ ਅਤੇ ਦੇਸੀ ਮਸਾਲੇ',
    footerDirect: '100% ਕਿਸਾਨ ਨੂੰ ਸਿੱਧਾ ਭੁਗਤਾਨ',
    home: 'ਹੋਮ'
  }
};

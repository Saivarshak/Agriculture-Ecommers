import { FarmerProfile, Product, Review, Order, User } from '../types';

export const DEFAULT_USER: User = {
  id: 'usr_varshak',
  email: 'saivarshak14@gmail.com',
  name: 'Sai Varshak',
  role: 'farmer',
  phone: '+91 98480 22334',
  address: 'Plot 42, Green Meadows Agri Hub, Shamirpet, Hyderabad Rural',
  farmId: 'farm_varshak_01'
};

export const INITIAL_FARMERS: FarmerProfile[] = [
  {
    id: 'farm_varshak_01',
    farmerName: 'Sai Varshak',
    email: 'saivarshak14@gmail.com',
    phone: '+91 98480 22334',
    farmName: 'Varshak Organic Bio-Farm',
    village: 'Aliabad Village, Shamirpet Mandal',
    district: 'Medchal-Malkajgiri',
    state: 'Telangana',
    pincode: '500078',
    landAcreage: 14.5,
    soilType: 'Rich Red Loamy with Vermicompost',
    primaryCrops: ['Vine Heirloom Tomatoes', 'Baby Spinach & Gongura', 'Alphonso Mangoes', 'Native Chilli'],
    verificationStatus: 'verified',
    verificationBadge: 'Govt Pattadar & NPOP Certified',
    verifiedAt: '2026-08-15',
    reviewedBy: 'Dr. Ramesh Rao (District Agricultural Officer)',
    documents: [
      {
        id: 'doc_1',
        type: 'farm_registration',
        title: 'Rythu Bharosa / Land Pattadar Passbook (Khata #4920)',
        fileName: 'telangana_dharani_pattadar_4920.pdf',
        fileSize: '2.4 MB',
        uploadedAt: '2026-08-10',
        documentNumber: 'DH-TEL-2024-99201',
        status: 'valid'
      },
      {
        id: 'doc_2',
        type: 'kisan_id',
        title: 'National Farmer Registry (Kisan Card)',
        fileName: 'kisan_id_sai_varshak.pdf',
        fileSize: '1.1 MB',
        uploadedAt: '2026-08-10',
        documentNumber: 'KIC-IND-8849-2041',
        status: 'valid'
      },
      {
        id: 'doc_3',
        type: 'organic_cert',
        title: 'NPOP India Organic Accreditation (Zero-Chemical)',
        fileName: 'apeda_npop_cert_2026.pdf',
        fileSize: '3.8 MB',
        uploadedAt: '2026-08-12',
        documentNumber: 'ORG-APEDA-TG-803',
        status: 'valid'
      },
      {
        id: 'doc_4',
        type: 'soil_health_card',
        title: 'ICAR Soil Health Card (High Organic Carbon 0.82%)',
        fileName: 'icar_soil_test_shamirpet.pdf',
        fileSize: '1.6 MB',
        uploadedAt: '2026-08-14',
        documentNumber: 'SHC-2026-TEL-4412',
        status: 'valid'
      }
    ],
    bankAccount: {
      accountNumber: '••••••••8912',
      ifsc: 'SBIN0004921',
      holderName: 'Sai Varshak',
      upiId: 'saivarshak14@oksbi'
    }
  },
  {
    id: 'farm_krishna_02',
    farmerName: 'Ranganathan Pillai',
    email: 'ranga.soil@gmail.com',
    phone: '+91 94441 55667',
    farmName: 'Kaveri Delta Heirloom Collective',
    village: 'Thiruvaiyaru',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    pincode: '613204',
    landAcreage: 8.0,
    soilType: 'Alluvial River Delta Silt',
    primaryCrops: ['Traditional Mappillai Samba Red Rice', 'Wood-Pressed Sesame Oil'],
    verificationStatus: 'verified',
    verificationBadge: 'Heritage Seed Conservator',
    verifiedAt: '2026-07-20',
    reviewedBy: 'K. Balaji (State Organic Certifier)',
    documents: [
      {
        id: 'doc_r1',
        type: 'farm_registration',
        title: 'Patta Chitta Land Extract #183',
        fileName: 'tn_patta_chitta_183.pdf',
        fileSize: '1.8 MB',
        uploadedAt: '2026-07-15',
        documentNumber: 'TN-REV-THJ-18349',
        status: 'valid'
      }
    ],
    bankAccount: {
      accountNumber: '••••••••3102',
      ifsc: 'IOBA0001200',
      holderName: 'Ranganathan Pillai',
      upiId: 'ranganathan@okaxis'
    }
  },
  {
    id: 'farm_pend_03',
    farmerName: 'Baldev Singh Dhillon',
    email: 'baldev.singh72@gmail.com',
    phone: '+91 98150 99881',
    farmName: 'Malwa Heritage Agro Farm',
    village: 'Kotkapura',
    district: 'Faridkot',
    state: 'Punjab',
    pincode: '151204',
    landAcreage: 22.0,
    soilType: 'Deep Fertile Loam',
    primaryCrops: ['Heirloom Desi Mustard', 'Raw Forest Clover Honey', 'Sharbati Wheat'],
    verificationStatus: 'pending',
    verificationBadge: 'Under Official Document Verification',
    documents: [
      {
        id: 'doc_b1',
        type: 'farm_registration',
        title: 'Fard Jamabandi Land Revenue Record #71',
        fileName: 'faridkot_jamabandi_71.pdf',
        fileSize: '3.1 MB',
        uploadedAt: '2026-10-01',
        documentNumber: 'PB-REV-FK-7104',
        status: 'pending'
      },
      {
        id: 'doc_b2',
        type: 'kisan_id',
        title: 'Kisan Credit Passbook',
        fileName: 'punjab_kcc_dhillon.pdf',
        fileSize: '2.0 MB',
        uploadedAt: '2026-10-01',
        documentNumber: 'PB-KCC-99410',
        status: 'pending'
      }
    ],
    bankAccount: {
      accountNumber: '••••••••7721',
      ifsc: 'PUNB0182300',
      holderName: 'Baldev Singh Dhillon',
      upiId: 'baldev72@pnb'
    }
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_tomatoes_01',
    farmerId: 'farm_varshak_01',
    farmerName: 'Sai Varshak',
    farmerVillage: 'Aliabad, Telangana',
    farmerVerified: true,
    name: 'Vine-Ripened Heirloom Desi Tomatoes',
    category: 'vegetables',
    price: 38,
    unit: 'kg',
    stock: 240,
    harvestTime: 'Today at 5:30 AM',
    harvestDate: '2026-10-03',
    farmDistanceKm: 18,
    organicCertification: 'NPOP Zero-Pesticide Tested',
    image: '/src/assets/images/product_heirloom_tomatoes_1791021824051.jpg',
    description: 'Directly plucked at sunrise from Varshak Farm. Sweet, thin-skinned heritage desi variety packed with lycopene. Grown with Jeevamrutha and vermicompost, never treated with ripening chemicals.',
    nutrition: 'High Vitamin C, Lycopene 4.2mg/100g, Potassium, Zero Chemical Residue',
    mandiPriceBenchmark: 22, // Middlemen pay 22, consumer pays 55 in retail; here farmer earns 38 directly!
    rating: 4.9,
    reviewCount: 38,
    featured: true
  },
  {
    id: 'prod_mangoes_02',
    farmerId: 'farm_varshak_01',
    farmerName: 'Sai Varshak',
    farmerVillage: 'Aliabad, Telangana',
    farmerVerified: true,
    name: 'Tree-Ripened Premium Alphonso Mangoes',
    category: 'fruits',
    price: 520,
    unit: 'dozen',
    stock: 45,
    harvestTime: 'Yesterday evening',
    harvestDate: '2026-10-02',
    farmDistanceKm: 18,
    organicCertification: 'Naturally Straw Ripened',
    image: '/src/assets/images/product_orchard_alphonso_mangoes_1791021846830.jpg',
    description: 'Golden, intensely fragrant GI-heritage Alphonso harvested at peak brix sugar level. Matured naturally in dry paddy straw without calcium carbide. Unmatched aroma and saffron pulp.',
    nutrition: 'Rich Beta-Carotene, Natural Enzymes, Vitamin A & Dietary Fiber',
    mandiPriceBenchmark: 380,
    rating: 5.0,
    reviewCount: 64,
    featured: true
  },
  {
    id: 'prod_oil_03',
    farmerId: 'farm_pend_03',
    farmerName: 'Baldev Singh Dhillon',
    farmerVillage: 'Faridkot, Punjab',
    farmerVerified: false, // Verification pending
    name: 'Slow Wood-Pressed Kachi Ghani Mustard Oil',
    category: 'cold_pressed_oils',
    price: 210,
    unit: 'liter',
    stock: 80,
    harvestTime: 'Pressed this week',
    harvestDate: '2026-09-29',
    farmDistanceKm: 42,
    organicCertification: 'Cold Kolhu Extracted (<38°C)',
    image: '/src/assets/images/product_farm_coldpressed_oil_1791021836230.jpg',
    description: 'Extracted using heavy traditional wooden kolhu without chemical refining or heat damage. Pungent natural aroma, golden amber hue, retaining natural antioxidants and essential fatty acids.',
    nutrition: 'Balanced Omega 3 & 6, Monounsaturated Fats, Zero Hexane solvent',
    mandiPriceBenchmark: 155,
    rating: 4.7,
    reviewCount: 19,
    featured: true
  },
  {
    id: 'prod_spinach_04',
    farmerId: 'farm_varshak_01',
    farmerName: 'Sai Varshak',
    farmerVillage: 'Aliabad, Telangana',
    farmerVerified: true,
    name: 'Dew-Crisp Baby Palak & Wild Gongura Bunch',
    category: 'vegetables',
    price: 24,
    unit: 'bunch',
    stock: 120,
    harvestTime: 'Today at 6:00 AM',
    harvestDate: '2026-10-03',
    farmDistanceKm: 18,
    organicCertification: 'Hydro-Well Irrigated Organic',
    image: '/src/assets/images/hero_organic_farm_fresh_1791021810264.jpg',
    description: 'Tender iron-rich baby spinach and authentic tangy Andhra gongura harvested before morning heat. Washed in natural well water, delivered unblemished and crisp within hours.',
    nutrition: 'Iron 3.8mg, Folic Acid, Calcium, Chlorophyll rich',
    mandiPriceBenchmark: 12,
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 'prod_rice_05',
    farmerId: 'farm_krishna_02',
    farmerName: 'Ranganathan Pillai',
    farmerVillage: 'Thanjavur, Tamil Nadu',
    farmerVerified: true,
    name: 'Kaveri Mappillai Samba Unpolished Heritage Red Rice',
    category: 'grains_pulses',
    price: 115,
    unit: 'kg',
    stock: 350,
    harvestTime: 'Cured 6 months in grain granary',
    harvestDate: '2026-04-12',
    farmDistanceKm: 310,
    organicCertification: 'Traditional Ancient Seed Strain',
    image: '/src/assets/images/product_farm_coldpressed_oil_1791021836230.jpg',
    description: 'Ancient medicinal red rice grown in Kaveri alluvium. Low glycemic index, robust nutty flavor, retaining bran layer intact. Hand-harvested and sun-dried on threshing floors.',
    nutrition: 'Low GI (54), High Zinc, Magnesium, Natural Anthocyanins',
    mandiPriceBenchmark: 80,
    rating: 4.9,
    reviewCount: 52
  },
  {
    id: 'prod_honey_06',
    farmerId: 'farm_varshak_01',
    farmerName: 'Sai Varshak',
    farmerVillage: 'Aliabad, Telangana',
    farmerVerified: true,
    name: 'Raw Unfiltered Multi-Flora Forest Apiary Honey',
    category: 'dairy_honey',
    price: 340,
    unit: 'kg',
    stock: 50,
    harvestTime: 'Extracted Sept 2026',
    harvestDate: '2026-09-18',
    farmDistanceKm: 22,
    organicCertification: 'Raw Wild Bloom (Unheated)',
    image: '/src/assets/images/product_orchard_alphonso_mangoes_1791021846830.jpg',
    description: 'Pure bee farm honey collected from neem, eucalyptus, and mustard blossoms bordering the forest reserve. Cold strained through muslin, containing active live pollen and enzymes.',
    nutrition: 'Zero Added Invert Sugars, Natural Pollen, Diastase Active',
    mandiPriceBenchmark: 220,
    rating: 4.9,
    reviewCount: 31
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    productId: 'prod_tomatoes_01',
    userId: 'usr_ananya',
    userName: 'Ananya Sharma',
    userEmail: 'ananya.s@urbanfresh.org',
    rating: 5,
    comment: 'You can actually smell the tomato vine! It reminds me of my grandmother village in Medak. The flavor in rasam is tenfold better than supermarket ones. Delivered in paper bags at 7:15 AM as promised.',
    createdAt: '2026-10-02',
    verifiedPurchase: true,
    helpfulVotes: 14
  },
  {
    id: 'rev_2',
    productId: 'prod_tomatoes_01',
    userId: 'usr_vikram',
    userName: 'Dr. Vikram Malhotra',
    userEmail: 'vikram.m@apollohealth.in',
    rating: 5,
    comment: 'Tested zero nitrates and pesticides with my kitchen strip kit. Sai Varshak farm is genuine. 100% money going to the farmer makes me proud to order every Tuesday.',
    createdAt: '2026-09-28',
    verifiedPurchase: true,
    helpfulVotes: 23
  },
  {
    id: 'rev_3',
    productId: 'prod_mangoes_02',
    userId: 'usr_kavita',
    userName: 'Kavita Sundaram',
    userEmail: 'kavita.chennai@gmail.com',
    rating: 5,
    comment: 'Saffron flesh, intoxicating scent, zero artificial carbide taste. Sweetest Alphonso of the season. Will buy 2 more crates for festival gifting!',
    createdAt: '2026-10-01',
    verifiedPurchase: true,
    helpfulVotes: 9
  },
  {
    id: 'rev_4',
    productId: 'prod_oil_03',
    userId: 'usr_harpreet',
    userName: 'Harpreet Singh',
    userEmail: 'harpreet.punjab@outlook.com',
    rating: 4,
    comment: 'Great traditional pungency and clean color. Smokes nicely for tadka. Good packaging with tamper-evident seal.',
    createdAt: '2026-09-30',
    verifiedPurchase: true,
    helpfulVotes: 5
  },
  {
    id: 'rev_5',
    productId: 'prod_rice_05',
    userId: 'usr_suresh',
    userName: 'Suresh Kumar',
    userEmail: 'suresh.bgl@techcorp.com',
    rating: 5,
    comment: 'The Mappillai Samba red rice keeps blood sugar very stable. Ranganathan Pillai Kaveri collective is doing immense service by preserving these heirloom seeds.',
    createdAt: '2026-09-25',
    verifiedPurchase: true,
    helpfulVotes: 19
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9824',
    consumerEmail: 'saivarshak14@gmail.com',
    consumerName: 'Sai Varshak (Personal Kitchen)',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 3
      },
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 2
      }
    ],
    subtotal: 162,
    deliveryFee: 35,
    total: 197,
    status: 'transit_cold',
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    delivery: {
      fullName: 'Sai Varshak',
      phone: '+91 98480 22334',
      address: 'Tower 4, Green Valley Enclave, Gachibowli',
      city: 'Hyderabad',
      pincode: '500032',
      slot: 'early_morning',
      deliveryDate: '2026-10-03',
      specialInstructions: 'Ring bell or leave in insulated vegetable crate'
    },
    createdAt: '2026-10-03 05:40 AM',
    estimatedDeliveryTime: '07:30 AM (In 35 mins)',
    liveStage: 2, // 0: placed, 1: harvested, 2: transit_cold, 3: out_for_delivery, 4: delivered
    currentLocationDesc: 'Cold-chain Reefer Van entering Outer Ring Road (ORR Junction 6)',
    driverName: 'Ramesh Reddy (Certified Agri Logistician)',
    driverPhone: '+91 98851 44321',
    tempCelsius: 4.2
  },
  {
    id: 'ORD-8910',
    consumerEmail: 'saivarshak14@gmail.com',
    consumerName: 'Sai Varshak',
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 1
      }
    ],
    subtotal: 520,
    deliveryFee: 0,
    total: 520,
    status: 'delivered',
    paymentMethod: 'cod',
    paymentStatus: 'paid',
    delivery: {
      fullName: 'Sai Varshak',
      phone: '+91 98480 22334',
      address: 'Tower 4, Green Valley Enclave, Gachibowli',
      city: 'Hyderabad',
      pincode: '500032',
      slot: 'evening_fresh',
      deliveryDate: '2026-10-01'
    },
    createdAt: '2026-10-01 02:15 PM',
    estimatedDeliveryTime: 'Delivered',
    liveStage: 4,
    currentLocationDesc: 'Delivered to Doorstep at 6:45 PM',
    driverName: 'K. Prasad',
    driverPhone: '+91 99011 23456'
  }
];

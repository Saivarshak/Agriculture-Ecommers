import { LanguageCode, ProductCategory } from '../types';

export interface LocalizedProductInfo {
  name: string;
  categoryName: string;
  description: string;
  nutrition: string;
  unit: string;
  certification: string;
}

export const PRODUCT_TRANSLATIONS: Record<string, Record<LanguageCode, LocalizedProductInfo>> = {
  // 1. CEREALS
  cereal_01: {
    en: {
      name: 'Paddy/Rice',
      categoryName: 'Cereals',
      description: 'Traditional farm paddy and naturally processed rice grown with organic compost.',
      nutrition: 'Rich in dietary fiber and essential complex carbohydrates.',
      unit: 'kg',
      certification: 'NPOP Certified Organic'
    },
    te: {
      name: 'వరి వడ్లు / స్వచ్ఛమైన బియ్యం',
      categoryName: 'ధాన్యాలు',
      description: 'సేంద్రీయ ఎరువులతో పండించిన సాంప్రదాయ దేశీ వరి వడ్లు మరియు ముడి బియ్యం.',
      nutrition: 'సహజ పీచు పదార్థం మరియు మంచి పిండిపదార్థాలతో కూడినది.',
      unit: 'కిలో',
      certification: 'ప్రభుత్వ సేంద్రీయ ధృవీకరణ'
    },
    hi: {
      name: 'धान / जैविक चावल',
      categoryName: 'अनाज',
      description: 'प्राकृतिक खाद से उगाया गया पारंपरिक धान व बिना पॉलिश का पौष्टिक चावल।',
      nutrition: 'फाइबर और प्राकृतिक कार्बोहाइड्रेट से भरपूर।',
      unit: 'किलो',
      certification: 'NPOP प्रमाणित जैविक'
    },
    ta: {
      name: 'பாரம்பரிய நெல் / கைக்குத்தல் அரிசி',
      categoryName: 'தானியங்கள்',
      description: 'இயற்கை உரம் கொண்டு விளைவிக்கப்பட்ட பாரம்பரிய நெல் மற்றும் ஊட்டச்சத்து அரிசி.',
      nutrition: 'அதிக நார்ச்சத்தும் இயற்கை மாவுச்சத்தும் கொண்டது.',
      unit: 'கிலோ',
      certification: 'சான்றளிக்கப்பட்ட இயற்கை உழவு'
    },
    mr: {
      name: 'भात / सेंद्रिय तांदूळ',
      categoryName: 'तृणधान्ये',
      description: 'सेंद्रिय खतावर पिकवलेले पारंपरिक भात आणि पॉलिश न केलेले तांदूळ.',
      nutrition: 'फायबर आणि नैसर्गिक ऊर्जेने समृद्ध.',
      unit: 'किलो',
      certification: 'सेंद्रिय शेती प्रमाणित'
    },
    pa: {
      name: 'ਝੋਨਾ / ਦੇਸੀ ਚਾਵਲ',
      categoryName: 'ਅਨਾਜ',
      description: 'ਕੁਦਰਤੀ ਖਾਦਾਂ ਨਾਲ ਤਿਆਰ ਕੀਤਾ ਦੇਸੀ ਝੋਨਾ ਅਤੇ ਬਿਨਾਂ ਪਾਲਿਸ਼ ਦੇ ਚਾਵਲ।',
      nutrition: 'ਫਾਈਬਰ ਅਤੇ ਭਰਪੂਰ ਊਰਜਾ ਨਾਲ ਲੈਸ।',
      unit: 'ਕਿਲੋ',
      certification: 'ਕੁਦਰਤੀ ਖੇਤੀ ਪ੍ਰਮਾਣਿਤ'
    }
  },
  cereal_02: {
    en: {
      name: 'Wheat/flour/Atta',
      categoryName: 'Cereals',
      description: 'Fresh organic wheat, whole grain flour, and atta stone ground without preservatives.',
      nutrition: 'High in natural bran, protein, and B-vitamins.',
      unit: 'kg',
      certification: '100% Whole Wheat Unadulterated'
    },
    te: {
      name: 'గోధుమలు / చక్కి పిండి / ఆటా',
      categoryName: 'ధాన్యాలు',
      description: 'రసాయన రహిత దేశీ గోధుమలు, సాంప్రదాయ రాతి గానుగలో పట్టిన తాజా పిండి.',
      nutrition: 'సహజ తవుడు, ప్రోటీన్ మరియు బి-విటమిన్లు మెండుగా ఉన్నాయి.',
      unit: 'కిలో',
      certification: '100% స్వచ్ఛమైన గోధుమలు'
    },
    hi: {
      name: 'गेहूँ / चक्की का ताज़ा आटा',
      categoryName: 'अनाज',
      description: 'देसी शरबती गेहूँ से धीमी गति की पत्थर चक्की में पीसा गया शुद्ध आटा।',
      nutrition: 'चोकर, प्रोटीन और विटामिन बी से भरपूर।',
      unit: 'किलो',
      certification: '100% शुद्ध संपूर्ण गेहूँ'
    },
    ta: {
      name: 'கோதுமை / கல் மில் மாவு',
      categoryName: 'தானியங்கள்',
      description: 'கலப்படமற்ற இயற்கை கோதுமை மற்றும் மெதுவாக அரைக்கப்பட்ட சம்பா கோதுமை மாவு.',
      nutrition: 'இயற்கை தவிடு மற்றும் புரதம் நிறைந்தது.',
      unit: 'கிலோ',
      certification: '100% இயற்கை முழு கோதுமை'
    },
    mr: {
      name: 'गहू / खमंग चक्की पीठ',
      categoryName: 'तृणधान्ये',
      description: 'सेंद्रिय दर्जेदार गहू आणि गार चक्कीवर दळलेले ताजे पौष्टिक पीठ.',
      nutrition: 'कोंडा, प्रथिने आणि जीवनसत्त्वांनी परिपूर्ण.',
      unit: 'किलो',
      certification: '१००% शुद्ध गहू'
    },
    pa: {
      name: 'ਕਣਕ / ਦੇਸੀ ਚੱਕੀ ਦਾ ਆਟਾ',
      categoryName: 'ਅਨਾਜ',
      description: 'ਬਿਨਾਂ ਰਸਾਇਣਾਂ ਤੋਂ ਉਗਾਈ ਦੇਸੀ ਕਣਕ ਅਤੇ ਪੱਥਰ ਚੱਕੀ ਦਾ ਤਾਜ਼ਾ ਪੀਠਾ ਆਟਾ।',
      nutrition: 'ਚੋਕਰ, ਪ੍ਰੋਟੀਨ ਅਤੇ ਵਿਟਾਮਿਨਾਂ ਨਾਲ ਭਰਪੂਰ।',
      unit: 'ਕਿਲੋ',
      certification: '100% ਸ਼ੁੱਧ ਦੇਸੀ ਕਣਕ'
    }
  },
  cereal_03: {
    en: {
      name: 'Maize/Flour',
      categoryName: 'Cereals',
      description: 'Farm-fresh yellow maize and coarse stone-milled makki flour.',
      nutrition: 'Carotenoids, lutein, and natural dietary fiber.',
      unit: 'kg',
      certification: 'Non-GMO Heritage Corn'
    },
    te: {
      name: 'మొక్కజొన్నలు / జొన్న పిండి',
      categoryName: 'ధాన్యాలు',
      description: 'చేను నుండి సేకరించిన పసుపు మొక్కజొన్నలు మరియు రొట్టెల పిండి.',
      nutrition: 'కంటికి మేలు చేసే లూటిన్ మరియు సహజ పీచు పదార్థం.',
      unit: 'కిలో',
      certification: 'సహజ నాటు విత్తనం'
    },
    hi: {
      name: 'मक्का / मक्के का आटा',
      categoryName: 'अनाज',
      description: 'खेत से ताज़ा पीली मक्का और सर्दियों की रोटियों के लिए देसी मक्के का आटा।',
      nutrition: 'कैरोटीनॉयड और पाचन के लिए उत्तम फाइबर।',
      unit: 'किलो',
      certification: 'गैर-जीएमओ पारंपरिक मक्का'
    },
    ta: {
      name: 'மக்காச்சோளம் / சோள மாவு',
      categoryName: 'தானியங்கள்',
      description: 'பண்ணை மஞ்சள் மக்காச்சோளம் மற்றும் நாட்டு சோள மாவு.',
      nutrition: 'கண் பார்வைக்கான கரோட்டினாய்டுகள் மற்றும் நார்ச்சத்து.',
      unit: 'கிலோ',
      certification: 'மரபணு மாற்றப்படாத சோளம்'
    },
    mr: {
      name: 'मका / मक्याचे पीठ',
      categoryName: 'तृणधान्ये',
      description: 'शेतातून ताजी पिवळी मका आणि भाकरीसाठी खमंग मक्याचे पीठ.',
      nutrition: 'डोळ्यांच्या आरोग्यासाठी ल्युटीन आणि फायबर.',
      unit: 'किलो',
      certification: 'पारंपरिक सेंद्रिय मका'
    },
    pa: {
      name: 'ਮੱਕੀ / ਮੱਕੀ ਦਾ ਆਟਾ',
      categoryName: 'ਅਨਾਜ',
      description: 'ਦੇਸੀ ਪੀਲੀ ਮੱਕੀ ਅਤੇ ਸਰ੍ਹੋਂ ਦੇ ਸਾਗ ਲਈ ਖਾਸ ਪੱਥਰ ਚੱਕੀ ਦਾ ਮੱਕੀ ਆਟਾ।',
      nutrition: 'ਕੁਦਰਤੀ ਫਾਈਬਰ ਅਤੇ ਤਾਕਤਵਰ ਪੋਸ਼ਕ ਤੱਤ।',
      unit: 'ਕਿਲੋ',
      certification: 'ਦੇਸੀ ਬੀਜ ਮੱਕੀ'
    }
  },

  // 2. PULSES
  pulse_01: {
    en: {
      name: 'Green gram',
      categoryName: 'Pulses',
      description: 'Raw unpolished whole green gram and split moong with green husk.',
      nutrition: '24g protein per 100g, easily digestible amino acids.',
      unit: 'kg',
      certification: 'Unpolished Moong Dal'
    },
    te: {
      name: 'పచ్చ పెసలు / పెసరపప్పు',
      categoryName: 'పప్పులు',
      description: 'పాలిష్ లేని పొట్టుతో కూడిన పచ్చి పెసలు మరియు పెసరపప్పు.',
      nutrition: '100 గ్రాములకు 24 గ్రాముల ప్రొటీన్, సులభంగా జీర్ణమవుతుంది.',
      unit: 'కిలో',
      certification: 'సహజ సేంద్రీయ పప్పు'
    },
    hi: {
      name: 'साबुत मूंग / हरी मूंग दाल',
      categoryName: 'दालें',
      description: 'बिना पॉलिश की हरी छिलके वाली देसी मूंग दाल, सुपाच्य और शुद्ध।',
      nutrition: 'प्रति 100 ग्राम 24 ग्राम सुपाच्य प्रोटीन।',
      unit: 'किलो',
      certification: 'बिना पॉलिश की शुद्ध दाल'
    },
    ta: {
      name: 'பச்சைப்பயறு / பாசிப்பருப்பு',
      categoryName: 'பருப்பு வகைகள்',
      description: 'தீட்டப்படாத இயற்கை பச்சைப்பயறு மற்றும் ஆரோக்கிய பாசிப்பருப்பு.',
      nutrition: '100 கிராமுக்கு 24 கிராம் புரதம், எளிதில் செரிக்கும்.',
      unit: 'கிலோ',
      certification: '100% இயற்கை பருப்பு'
    },
    mr: {
      name: 'अख्खा मूग / मूग डाळ',
      categoryName: 'डाळी',
      description: 'पॉलिश नसलेली सालासहित हिरवी मूग डाळ आणि पौष्टिक अख्खे मूग.',
      nutrition: 'प्रति १०० ग्रॅम २४ ग्रॅम प्रथिने, पचायला अत्यंत हलके.',
      unit: 'किलो',
      certification: 'सेंद्रिय मूग डाळ'
    },
    pa: {
      name: 'ਸਾਬਤ ਮੂੰਗ / ਹਰੀ ਮੂੰਗੀ ਦਾਲ',
      categoryName: 'ਦਾਲਾਂ',
      description: 'ਕੁਦਰਤੀ ਬਿਨਾਂ ਪਾਲਿਸ਼ ਦੇ ਹਰੇ ਸਾਬਤ ਮੂੰਗ ਅਤੇ ਛਿਲਕੇ ਵਾਲੀ ਦਾਲ।',
      nutrition: '24 ਗ੍ਰਾਮ ਪ੍ਰੋਟੀਨ, ਹਜ਼ਮ ਕਰਨ ਵਿੱਚ ਬਹੁਤ ਆਸਾਨ।',
      unit: 'ਕਿਲੋ',
      certification: 'ਕੁਦਰਤੀ ਦੇਸੀ ਦਾਲ'
    }
  },

  // 3. VEGETABLES
  veg_01: {
    en: {
      name: 'Tomato',
      categoryName: 'Vegetables',
      description: 'Plump, naturally vine-ripened farm fresh tomatoes picked at sunrise.',
      nutrition: 'High Lycopene (4.2mg), Vitamin C, Potassium.',
      unit: 'kg',
      certification: 'Vine Ripened Zero Chemical'
    },
    te: {
      name: 'నాటు టమోటాలు',
      categoryName: 'కూరగాయలు',
      description: 'సూర్యోదయానికి కోసిన తాజా, పులుపు రుచిగల నాటు తోట టమోటాలు.',
      nutrition: 'లైకోపీన్, విటమిన్-సి మరియు పొటాషియం పుష్కలం.',
      unit: 'కిలో',
      certification: 'రసాయన రహిత సహజ పంట'
    },
    hi: {
      name: 'देसी टमाटर',
      categoryName: 'सब्जियाँ',
      description: 'सुबह की ओस में बेल से तोड़े गए रसदार और खट्टे-मीठे देसी टमाटर।',
      nutrition: 'उच्च लाइकोपीन, विटामिन सी और पोटैशियम।',
      unit: 'किलो',
      certification: 'रासायनिक कीटनाशक रहित'
    },
    ta: {
      name: 'நாட்டு தக்காளி',
      categoryName: 'காய்கறிகள்',
      description: 'செடியிலேயே பழுத்த புத்துணர்ச்சியான சுவைமிக்க நாட்டுத் தக்காளி.',
      nutrition: 'அதிக லைகோபீன், வைட்டமின் சி மற்றும் பொட்டாசியம்.',
      unit: 'கிலோ',
      certification: 'ரசாயனமற்ற இயற்கை தக்காளி'
    },
    mr: {
      name: 'गावरान टोमॅटो',
      categoryName: 'भाज्या',
      description: 'सकाळी तोडलेले ताजे, रसरशीत आणि चवदार गावरान टोमॅटो.',
      nutrition: 'उच्च लायकोपीन, व्हिटॅमिन सी आणि पोटॅशियम.',
      unit: 'किलो',
      certification: 'विषमुक्त शेती उत्पादन'
    },
    pa: {
      name: 'ਦੇਸੀ ਟਮਾਟਰ',
      categoryName: 'ਸਬਜ਼ੀਆਂ',
      description: 'ਸਵੇਰੇ ਤਾਜ਼ੇ ਤੋੜੇ ਗਏ ਰਸੀਲੇ ਅਤੇ ਕੁਦਰਤੀ ਤੌਰ ਤੇ ਪੱਕੇ ਹੋਏ ਦੇਸੀ ਟਮਾਟਰ।',
      nutrition: 'ਲਾਈਕੋਪੀਨ, ਵਿਟਾਮਿਨ ਸੀ ਅਤੇ ਪੋਟਾਸ਼ੀਅਮ ਭਰਪੂਰ।',
      unit: 'ਕਿਲੋ',
      certification: 'ਕੈਮੀਕਲ ਮੁਕਤ ਸਬਜ਼ੀ'
    }
  },
  veg_02: {
    en: {
      name: 'Green chilli',
      categoryName: 'Vegetables',
      description: 'Spicy fresh desi green chillies harvested tender with crisp snap.',
      nutrition: 'Capsaicin, high Vitamin C, natural antioxidants.',
      unit: 'kg',
      certification: 'Native Sharp Pungent'
    },
    te: {
      name: 'పచ్చిమిరపకాయలు',
      categoryName: 'కూరగాయలు',
      description: 'తోటలో తాజాగా కోసిన ఘాటైన నాటు పచ్చిమిర్చి.',
      nutrition: 'క్యాప్సైసిన్, విటమిన్-సి మరియు యాంటీఆక్సిడెంట్లు.',
      unit: 'కిలో',
      certification: 'నాటు విత్తనం'
    },
    hi: {
      name: 'तीखी हरी मिर्च',
      categoryName: 'सब्जियाँ',
      description: 'खेत से ताज़ा तोड़ी गई तीखी और कुरकुरी देसी हरी मिर्च।',
      nutrition: 'कैप्साइसिन और भरपूर विटामिन सी।',
      unit: 'किलो',
      certification: 'शुद्ध देसी तीखापन'
    },
    ta: {
      name: 'பச்சை மிளகாய்',
      categoryName: 'காய்கறிகள்',
      description: 'பண்ணையிலிருந்து நேரடியாக பறிக்கப்பட்ட காரசாரமான நாட்டு பச்சை மிளகாய்.',
      nutrition: 'வைட்டமின் சி மற்றும் ஆன்டிஆக்ஸிடன்ட்கள்.',
      unit: 'கிலோ',
      certification: 'நாட்டு வகை'
    },
    mr: {
      name: 'तुकतुकीत हिरवी मिरची',
      categoryName: 'भाज्या',
      description: 'गावरान झणझणीत आणि ताजी हिरवीगार मिरची.',
      nutrition: 'व्हिटॅमिन सी आणि नैसर्गिक अँटीऑक्सिडंट्स.',
      unit: 'किलो',
      certification: 'सेंद्रिय गावरान'
    },
    pa: {
      name: 'ਹਰੀ ਮਿਰਚ',
      categoryName: 'ਸਬਜ਼ੀਆਂ',
      description: 'ਖੇਤਾਂ ਵਿੱਚੋਂ ਤਾਜ਼ੀ ਤੋੜੀ ਤਿੱਖੀ ਅਤੇ ਕਰੰਚੀ ਦੇਸੀ ਹਰੀ ਮਿਰਚ।',
      nutrition: 'ਵਿਟਾਮਿਨ ਸੀ ਅਤੇ ਐਂਟੀਆਕਸੀਡੈਂਟਸ।',
      unit: 'ਕਿਲੋ',
      certification: 'ਦੇਸੀ ਹਰੀ ਮਿਰਚ'
    }
  },

  // 4. FRUITS
  fruit_08: {
    en: {
      name: 'Mango',
      categoryName: 'Fruits',
      description: 'Heritage Alphonso mangoes matured naturally in dry paddy straw.',
      nutrition: 'Beta-carotene, enzymes, vitamin A & fiber.',
      unit: 'dozen',
      certification: 'Tree Ripened Alphonso'
    },
    te: {
      name: 'అల్ఫోన్సో మామిడి పండ్లు',
      categoryName: 'పండ్లు',
      description: 'గడ్డి మాపులో సహజంగా పండిన స్వచ్ఛమైన తీపి అల్ఫోన్సో మామిడి పండ్లు.',
      nutrition: 'బీటా-కెరోటిన్, విటమిన్ ఎ మరియు సహజ ఎంజైములు.',
      unit: 'డజన్',
      certification: 'చెట్టు మీదే పండిన రకం'
    },
    hi: {
      name: 'अल्फांसो आम',
      categoryName: 'फल',
      description: 'घास की पाल में प्राकृतिक रूप से पके हुए खुशबूदार अल्फांसो आम।',
      nutrition: 'बीटा कैरोटीन, पाचक एंजाइम और विटामिन ए।',
      unit: 'दर्जन',
      certification: 'कार्बाइड रहित प्राकृतिक पका'
    },
    ta: {
      name: 'அல்போன்சா மாம்பழம்',
      categoryName: 'பழங்கள்',
      description: 'வைக்கோலில் இயற்கை முறையில் பழுக்க வைக்கப்பட்ட இனிப்பு அல்போன்சா.',
      nutrition: 'வைட்டமின் ஏ மற்றும் நார்ச்சத்தின் ஊற்று.',
      unit: 'டஜன்',
      certification: 'கார்பைடு கலக்காத இயற்கை பழம்'
    },
    mr: {
      name: 'देवगड हापूस आंबा',
      categoryName: 'फळे',
      description: 'गवती अढी लावून नैसर्गिकरित्या पिकवलेला खराखुरा सुगंधी हापूस.',
      nutrition: 'बीटा-कॅरोटीन आणि भरपूर व्हिटॅमिन ए.',
      unit: 'डझन',
      certification: 'नैसर्गिकरित्या पिकवलेला'
    },
    pa: {
      name: 'ਅਲਫੋਂਸੋ ਅੰਬ',
      categoryName: 'ਫਲ',
      description: 'ਕੁਦਰਤੀ ਘਾਹ ਵਿੱਚ ਪਕਾਏ ਹੋਏ ਸੁਆਦੀ ਅਤੇ ਮਿੱਠੇ ਅਲਫੋਂਸੋ ਅੰਬ।',
      nutrition: 'ਵਿਟਾਮਿਨ ਏ ਅਤੇ ਕੁਦਰਤੀ ਐਂਜ਼ਾਈਮ।',
      unit: 'ਦਰਜਨ',
      certification: '100% ਕੈਮੀਕਲ ਮੁਕਤ'
    }
  },

  // 5. SPICES
  spice_01: {
    en: {
      name: 'Turmeric',
      categoryName: 'Spices',
      description: 'Raw dried whole turmeric roots with bright golden color and natural essential oils.',
      nutrition: 'Curcumin 5.4%, anti-inflammatory bioactive compounds.',
      unit: 'kg',
      certification: 'High Curcumin (5.4%)'
    },
    te: {
      name: 'పసుపు కొమ్ములు',
      categoryName: 'సుగంధ ద్రవ్యాలు',
      description: 'సహజ సువాసన మరియు అధిక కర్క్యుమిన్ కలిగిన ఎండబెట్టిన మేలురకం పసుపు కొమ్ములు.',
      nutrition: '5.4% కర్క్యుమిన్, రోగనిరోధక శక్తిని పెంచే ఔషధ గుణాలు.',
      unit: 'కిలో',
      certification: 'అధిక కర్క్యుమిన్ రకం'
    },
    hi: {
      name: 'साबुत हल्दी की गांठ',
      categoryName: 'मसाले',
      description: 'प्राकृतिक रूप से धूप में सुखाई गई शुद्ध पीली हल्दी, भरपूर तेल व सुगंध।',
      nutrition: '5.4% करक्यूमिन, सूजनरोधी व इम्यूनिटी बूस्टर।',
      unit: 'किलो',
      certification: 'उच्च करक्यूमिन (5.4%)'
    },
    ta: {
      name: 'நாட்டு விரலி மஞ்சள்',
      categoryName: 'மசாலா',
      description: 'வெயிலில் உலர்த்தப்பட்ட வாசனை மிக்க தூய விரலி மஞ்சள் கிழங்குகள்.',
      nutrition: '5.4% குர்குமின், நோய் எதிர்ப்பு சக்தி மிக்கது.',
      unit: 'கிலோ',
      certification: 'உயர் குர்குமின் சான்றிதழ்'
    },
    mr: {
      name: 'गावरान हळकुंड',
      categoryName: 'मसाले',
      description: 'उन्हात वाळवलेले अस्सल सुगंधी आणि औषधी पिवळेधमक हळकुंड.',
      nutrition: '५.४% कर्क्युमिन, आरोग्यवर्धक आणि दाहकताविरोधी.',
      unit: 'किलो',
      certification: 'उच्च कर्क्युमिन प्रमाणित'
    },
    pa: {
      name: 'ਸਾਬਤ ਹਲਦੀ ਗੰਢਾਂ',
      categoryName: 'ਮਸਾਲੇ',
      description: 'ਧੁੱਪ ਵਿੱਚ ਸੁਕਾਈਆਂ ਹੋਈਆਂ ਸ਼ੁੱਧ ਸੁਨਹਿਰੀ ਦੇਸੀ ਹਲਦੀ ਦੀਆਂ ਗੰਢਾਂ।',
      nutrition: '5.4% ਕਰਕਿਊਮਿਨ, ਸਰੀਰ ਦੀ ਰੋਗ ਪ੍ਰਤੀਰੋਧਕ ਸ਼ਕਤੀ ਵਧਾਉਂਦੀ ਹੈ।',
      unit: 'ਕਿਲੋ',
      certification: 'ਉੱਚ ਕਰਕਿਊਮਿਨ ਗ੍ਰੇਡ'
    }
  },

  // 6. EXOTIC
  exotic_04: {
    en: {
      name: 'Saffron',
      categoryName: 'Exotic',
      description: 'All-red pure Mongra saffron filaments with intense natural floral aroma and dye power.',
      nutrition: 'Crocin, safranal, picrocrocin antioxidants.',
      unit: 'g',
      certification: 'Pure Mongra Kashmiri Grade'
    },
    te: {
      name: 'కాశ్మీరీ కుంకుమపువ్వు',
      categoryName: 'విదేశీ పంటలు',
      description: 'స్వచ్ఛమైన కాశ్మీర్ లోయ నుండి సేకరించిన అత్యున్నత మోంగ్రా కుంకుమపువ్వు రేకులు.',
      nutrition: 'క్రోసిన్ మరియు పవర్‌ఫుల్ యాంటీఆక్సిడెంట్లు.',
      unit: 'గ్రాము',
      certification: '100% ప్యూర్ మోంగ్రా గ్రేడ్'
    },
    hi: {
      name: 'कश्मीरी मोंगरा केसर',
      categoryName: 'विदेशी फसलें',
      description: 'कश्मीर घाटी से हाथ से चुनी गई शुद्ध लाल मोंगरा केसर की पंखुड़ियां।',
      nutrition: 'क्रोसिन, सैफ्रानल और प्राकृतिक शक्तिशाली एंटीऑक्सीडेंट्स।',
      unit: 'ग्राम',
      certification: 'जीआई प्रमाणित कश्मीरी केसर'
    },
    ta: {
      name: 'காஷ்மீரி குங்குமப்பூ',
      categoryName: 'வெளிநாட்டு பயிர்கள்',
      description: 'காஷ்மீர் பள்ளத்தாக்கில் கைதேர்ந்த உழவர்களால் பறிக்கப்பட்ட தூய மோங்ரா குங்குமப்பூ.',
      nutrition: 'அதிக குரோசின் மற்றும் நறுமண ஆன்டிஆக்ஸிடன்ட்கள்.',
      unit: 'கிராம்',
      certification: '100% தூய மோங்ரா தரம்'
    },
    mr: {
      name: 'काश्मिरी मोगरा केशर',
      categoryName: 'विदेशी पिके',
      description: 'काश्मीर खोऱ्यातील शुद्ध लालभडक मोगरा केशराच्या नाजूक काड्या.',
      nutrition: 'क्रोसिन आणि नैसर्गिक अँटीऑक्सिडंट्सने समृद्ध.',
      unit: 'ग्रॅम',
      certification: 'शुद्ध काश्मिरी केशर'
    },
    pa: {
      name: 'ਕਸ਼ਮੀਰੀ ਮੋਂਗਰਾ ਕੇਸਰ',
      categoryName: 'ਵਿਦੇਸ਼ੀ ਫਸਲਾਂ',
      description: 'ਕਸ਼ਮੀਰ ਦੀਆਂ ਵਾਦੀਆਂ ਵਿੱਚੋਂ ਹੱਥੀਂ ਚੁਣੀਆਂ ਸ਼ੁੱਧ ਲਾਲ ਕੇਸਰ ਦੀਆਂ ਤੰਦਾਂ।',
      nutrition: 'ਕ੍ਰੋਸਿਨ ਅਤੇ ਤਾਕਤਵਰ ਕੁਦਰਤੀ ਐਂਟੀਆਕਸੀਡੈਂਟ।',
      unit: 'ਗ੍ਰਾਮ',
      certification: '100% ਸ਼ੁੱਧ ਕਸ਼ਮੀਰੀ ਕੇਸਰ'
    }
  }
};

// Generic fallback helper for any product ID and language
export function getProductLocalized(
  productId: string,
  fallbackName: string,
  category: ProductCategory,
  language: LanguageCode,
  fallbackDesc?: string,
  fallbackUnit?: string
): { name: string; categoryName: string; description: string; unit: string } {
  const direct = PRODUCT_TRANSLATIONS[productId]?.[language];
  if (direct) {
    return {
      name: direct.name,
      categoryName: direct.categoryName,
      description: direct.description,
      unit: direct.unit
    };
  }

  // Category name dictionary
  const catNames: Record<ProductCategory | 'all', Record<LanguageCode, string>> = {
    all: {
      en: 'All Crops',
      te: 'అన్ని పంటలు',
      hi: 'सभी फसलें',
      ta: 'அனைத்து பயிர்கள்',
      mr: 'सर्व पिके',
      pa: 'ਸਾਰੀਆਂ ਫਸਲਾਂ'
    },
    cereals: {
      en: 'Cereals',
      te: 'ధాన్యాలు',
      hi: 'अनाज',
      ta: 'தானியங்கள்',
      mr: 'तृणधान्ये',
      pa: 'ਅਨਾਜ'
    },
    pulses: {
      en: 'Pulses',
      te: 'పప్పులు',
      hi: 'दालें',
      ta: 'பருப்பு வகைகள்',
      mr: 'डाळी',
      pa: 'ਦਾਲਾਂ'
    },
    vegetables: {
      en: 'Vegetables',
      te: 'కూరగాయలు',
      hi: 'सब्जियाँ',
      ta: 'காய்கறிகள்',
      mr: 'भाज्या',
      pa: 'ਸਬਜ਼ੀਆਂ'
    },
    fruits: {
      en: 'Fruits',
      te: 'పండ్లు',
      hi: 'फल',
      ta: 'பழங்கள்',
      mr: 'फळे',
      pa: 'ਫਲ'
    },
    spices: {
      en: 'Spices',
      te: 'సుగంధ ద్రవ్యాలు',
      hi: 'मसाले',
      ta: 'மசாலா',
      mr: 'मसाले',
      pa: 'ਮਸਾਲੇ'
    },
    exotic: {
      en: 'Exotic',
      te: 'విదేశీ పంటలు',
      hi: 'विदेशी फसलें',
      ta: 'வெளிநாட்டு பயிர்கள்',
      mr: 'विदेशी पिके',
      pa: 'ਵਿਦੇਸ਼ੀ ਫਸਲਾਂ'
    }
  };

  // Common crop name map
  const commonNames: Record<string, Record<LanguageCode, string>> = {
    'paddy/rice': { en: 'Paddy/Rice', te: 'వరి వడ్లు / బియ్యం', hi: 'धान / चावल', ta: 'நெல் / அரிசி', mr: 'भात / तांदूळ', pa: 'ਝੋਨਾ / ਚਾਵਲ' },
    'wheat/flour/atta': { en: 'Wheat/Flour/Atta', te: 'గోధుమలు / పిండి', hi: 'गेहूँ / चक्की आटा', ta: 'கோதுமை / மாவு', mr: 'गहू / पीठ', pa: 'ਕਣਕ / ਆਟਾ' },
    'maize/flour': { en: 'Maize/Flour', te: 'మొక్కజొన్నలు / పిండి', hi: 'मक्का / मक्के का आटा', ta: 'மக்காச்சோளம் / மாவு', mr: 'मका / पीठ', pa: 'ਮੱਕੀ / ਆਟਾ' },
    'oats': { en: 'Oats', te: 'ఓట్స్ గింజలు', hi: 'साबुत ओट्स / जई', ta: 'ஓட்ஸ் தானியம்', mr: 'ओट्स / जव', pa: 'ਓਟਸ / ਜਵੀ' },
    'sorghum': { en: 'Sorghum', te: 'తెల్ల జొన్నలు', hi: 'सफेद ज्वार', ta: 'வெள்ளை சோளம்', mr: 'पांढरी ज्वारी', pa: 'ਚਿੱਟੀ ਜਵਾਰ' },
    'pearl millet': { en: 'Pearl Millet', te: 'సజ్జలు', hi: 'देसी बाजरा', ta: 'கம்பு', mr: 'बाजरी', pa: 'ਦੇਸੀ ਬਾਜਰਾ' },
    'finger millet': { en: 'Finger Millet', te: 'రాగులు / తైదలు', hi: 'रागी / मड़ुआ', ta: 'கேழ்வரகு (ராகி)', mr: 'नाचणी / रागी', pa: 'ਕੋਧਰਾ / ਰਾਗੀ' },
    'foxtail millet': { en: 'Foxtail Millet', te: 'కొర్రలు', hi: 'कंगनी (फॉक्सटेल)', ta: 'தினை', mr: 'कांग / बाटी', pa: 'ਕੰਗਣੀ' },
    'little millet': { en: 'Little Millet', te: 'సామలు', hi: 'कुटकी बाजरा', ta: 'சாமை', mr: 'वरी / कुटकी', pa: 'ਕੁਟਕੀ' },
    'green gram': { en: 'Green gram', te: 'పచ్చ పెసలు', hi: 'साबुत हरी मूंग', ta: 'பச்சைப்பயறு', mr: 'अख्खा मूग', pa: 'ਸਾਬਤ ਹਰੀ ਮੂੰਗੀ' },
    'black gram': { en: 'Black gram', te: 'మినుములు / ఉద్దిపప్పు', hi: 'साबुत उड़द', ta: 'உளுந்து', mr: 'काळी उडीद', pa: 'ਕਾਲੀ ਮਾਂਹ ਦਾਲ' },
    'kidney bean': { en: 'Kidney Bean', te: 'రాజ్మా గింజలు', hi: 'कश्मीरी राजमा', ta: 'ராஜ்மா பீன்ஸ்', mr: 'लाल राजमा', pa: 'ਲਾਲ ਰਾਜਮਾਂਹ' },
    'redgram': { en: 'Redgram', te: 'కందులు / కందిపప్పు', hi: 'अरहर / तुअर दाल', ta: 'துவரம்பருப்பு', mr: 'तूर डाळ', pa: 'ਅਰਹਰ ਦਾਲ' },
    'chickpea': { en: 'Chickpea', te: 'శనగలు', hi: 'देसी चना', ta: 'கொண்டைக்கடலை', mr: 'देशी हरभरा', pa: 'ਦੇਸੀ ਕਾਲਾ ਛੋਲੇ' },
    'lentil': { en: 'Lentil', te: 'ఎర్ర కందిపప్పు / మసూర్', hi: 'लाल मसूर दाल', ta: 'மைசூர் பருப்பு', mr: 'मसूर डाळ', pa: 'ਲਾਲ ਮਸਰ ਦਾਲ' },
    'tomato': { en: 'Tomato', te: 'నాటు టమోటాలు', hi: 'देसी टमाटर', ta: 'நாட்டு தக்காளி', mr: 'गावरान टोमॅटो', pa: 'ਦੇਸੀ ਟਮਾਟਰ' },
    'green chilli': { en: 'Green chilli', te: 'పచ్చిమిర్చి', hi: 'हरी मिर्च', ta: 'பச்சை மிளகாய்', mr: 'हिरवी मिरची', pa: 'ਹਰੀ ਮਿਰਚ' },
    'red chilli': { en: 'Red Chilli', te: 'ఎండుమిర్చి', hi: 'सूखी लाल मिर्च', ta: 'காய்ந்த மிளகாய்', mr: 'सुकी लाल मिरची', pa: 'ਸੁੱਕੀ ਲਾਲ ਮਿਰਚ' },
    'brinjal': { en: 'Brinjal', te: 'వంకాయలు', hi: 'देसी बैंगन', ta: 'நாட்டு கத்தரிக்காய்', mr: 'काटेरी वांगी', pa: 'ਦੇਸੀ ਬੈਂਗਣ' },
    'onion': { en: 'Onion', te: 'ఎర్ర ఉల్లిపాయలు', hi: 'लाल प्याज़', ta: 'வெங்காயம்', mr: 'लाल कांदा', pa: 'ਲਾਲ ਪਿਆਜ਼' },
    'potato': { en: 'Potato', te: 'బంగాళాదుంపలు', hi: 'पहाड़ी आलू', ta: 'உருளைக்கிழங்கு', mr: 'सेंद्रिय बटाटा', pa: 'ਪਹਾੜੀ ਆਲੂ' },
    'ridge gourd': { en: 'Ridge gourd', te: 'బీరకాయ', hi: 'तोरी / तुरई', ta: 'பீர்க்கங்காய்', mr: 'दोडका / शिराळे', pa: 'ਤੋਰੀ' },
    'cauliflower': { en: 'Cauliflower', te: 'క్యాలీఫ్లవర్', hi: 'फूलगोभी', ta: 'காலிஃபிளவர்', mr: 'फ्लॉवर', pa: 'ਫੁੱਲ ਗੋਭੀ' },
    'cabbage': { en: 'Cabbage', te: 'క్యాబేజీ', hi: 'पत्तागोभी', ta: 'முட்டைக்கோஸ்', mr: 'कोबी', pa: 'ਬੰਦ ਗੋਭੀ' },
    'bitter gourd': { en: 'Bitter gourd', te: 'కాకరకాయ', hi: 'करेला', ta: 'பாகற்காய்', mr: 'कारले', pa: 'ਕਰੇਲਾ' },
    'banana': { en: 'Banana', te: 'చక్కరకేళి అరటిపండ్లు', hi: 'देसी केला', ta: 'வாழைப்பழம்', mr: 'वेलची केळी', pa: 'ਦੇਸੀ ਕੇਲਾ' },
    'guava': { en: 'Guava', te: 'జామపండ్లు', hi: 'इलाहाबादी अमरूद', ta: 'கொய்யாப்பழம்', mr: 'पेरू', pa: 'ਅਮਰੂਦ' },
    'grapes': { en: 'Grapes', te: 'ద్రాక్ష పండ్లు', hi: 'ताज़े अंगूर', ta: 'திராட்சை', mr: 'द्राक्षे', pa: 'ਅੰਗੂਰ' },
    'papaya': { en: 'Papaya', te: 'బొప్పాయి పండు', hi: 'पपीता', ta: 'பப்பாளி', mr: 'पपई', pa: 'ਪਪੀਤਾ' },
    'orange': { en: 'Orange', te: 'కమలా పండ్లు', hi: 'नागपुरी संतरा', ta: 'ஆரஞ்சு', mr: 'नागपूर संत्री', pa: 'ਕਿੰਨੂ / ਸੰਤਰਾ' },
    'pineapple': { en: 'Pineapple', te: 'అనాస పండు', hi: 'अनन्नास', ta: 'அன்னாசிப்பழம்', mr: 'अननस', pa: 'ਅਨਾਨਾਸ' },
    'pomegranite': { en: 'Pomegranite', te: 'దానిమ్మ పండ్లు', hi: 'भगवा अनार', ta: 'மாதுளம்பழம்', mr: 'भगवा डाळिंब', pa: 'ਅਨਾਰ' },
    'mango': { en: 'Mango', te: 'అల్ఫోన్సో మామిడి', hi: 'अल्फांसो आम', ta: 'அல்போன்சா மாம்பழம்', mr: 'हापूस आंबा', pa: 'ਅਲਫੋਂਸੋ ਅੰਬ' },
    'watermelon': { en: 'Watermelon', te: 'పుచ్చకాయ', hi: 'तरबूज', ta: 'தர்பூசணி', mr: 'कलिंगड', pa: 'ਹਦਵਾਣਾ / ਤਰਬੂਜ਼' },
    'litchi': { en: 'Litchi', te: 'లీచీ పండ్లు', hi: 'शाही लीची', ta: 'லிச்சி பழம்', mr: 'लिची', pa: 'ਸ਼ਾਹੀ ਲੀਚੀ' },
    'turmeric': { en: 'Turmeric', te: 'పసుపు కొమ్ములు', hi: 'हल्दी की गांठ', ta: 'விரலி மஞ்சள்', mr: 'हळकुंड', pa: 'ਹਲਦੀ' },
    'ginger': { en: 'Ginger', te: 'తాజా అల్లం', hi: 'ताज़ा अदरक', ta: 'இஞ்சி', mr: 'आले', pa: 'ਅਦਰਕ' },
    'black pepper': { en: 'Black Pepper', te: 'మిరియాలు', hi: 'काली मिर्च', ta: 'கருப்பு மிளகு', mr: 'काळी मिरी', pa: 'ਕਾਲੀ ਮਿਰਚ' },
    'cardamom': { en: 'Cardamom', te: 'ఏలకులు', hi: 'हरी इलायची', ta: 'ஏலக்காய்', mr: 'हिरवी वेलची', pa: 'ਹਰੀ ਇਲਾਇਚੀ' },
    'cloves': { en: 'Cloves', te: 'లవంగాలు', hi: 'लौंग', ta: 'கிராம்பு', mr: 'लवंग', pa: 'ਲੌਂਗ' },
    'cinnamon': { en: 'Cinnamon', te: 'దాల్చిన చెక్క', hi: 'दालचीनी', ta: 'இலவங்கப்பட்டை', mr: 'दालचिनी', pa: 'ਦਾਲਚੀਨੀ' },
    'coffee': { en: 'Coffee', te: 'కాఫీ గింజలు', hi: 'अरेबिका कॉफ़ी', ta: 'காபி கொட்டை', mr: 'सेंद्रिय कॉफी', pa: 'ਕੌਫੀ ਬੀਨਜ਼' },
    'tea': { en: 'Tea', te: 'తేయాకు (టీ)', hi: 'असम चाय पत्ती', ta: 'தேயிலை', mr: 'ऑर्थोडॉक्स चहा', pa: 'ਚਾਹ ਪੱਤੀ' },
    'zucchini': { en: 'Zucchini', te: 'జుకిని', hi: 'ज़ुकिनी (हरी तोरी)', ta: 'சுக்கினி', mr: 'झुकिनी', pa: 'ਜ਼ੂਕੀਨੀ' },
    'broccoli': { en: 'Broccoli', te: 'బ్రోకలీ', hi: 'हरी ब्रोकली', ta: 'ப்ரோக்கோலி', mr: 'हिरवी ब्रोकोली', pa: 'ਬ੍ਰੋਕਲੀ' },
    'kale': { en: 'Kale', te: 'కేల్ ఆకులు', hi: 'केल के पत्ते', ta: 'கேல் கீரை', mr: 'केलची पाने', pa: 'ਕੇਲ' },
    'saffron': { en: 'Saffron', te: 'కుంకుమపువ్వు', hi: 'कश्मीरी केसर', ta: 'குங்குமப்பூ', mr: 'मोगरा केशर', pa: 'ਕਸ਼ਮੀਰੀ ਕੇਸਰ' }
  };

  const lookupKey = fallbackName.trim().toLowerCase();
  const localizedName = commonNames[lookupKey]?.[language] || fallbackName;
  const localizedCat = catNames[category]?.[language] || category;

  return {
    name: localizedName,
    categoryName: localizedCat,
    description: fallbackDesc || 'Organically cultivated without synthetic chemicals.',
    unit: fallbackUnit || 'kg'
  };
}

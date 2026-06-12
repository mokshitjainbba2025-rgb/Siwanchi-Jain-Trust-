/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Trustee,
  RoomCategory,
  LabhOpportunity,
  Contributor,
  NewsItem,
  EventItem,
  GalleryItem,
  LiveAarti
} from './types';

// Multilingual text helpers for core sections
export const staticTranslations = {
  hi: {
    trustName: "श्री सिवांची जैन सेवा समिति ट्रस्ट",
    location: "डूंगरी पुरा (मेली), सिवाना-समदड़ी रोड, जिला बाड़मेर, राजस्थान, भारत",
    trustTagline: "धर्म, सेवा और समाज का संगम",
    trustDescription: "सिवांची जैन समाज की सेवा, साधु-साध्वी विहारधाम विश्राम, और ओसवाल पैलेस के माध्यम से आध्यात्मिक एवं सामाजिक कल्याण के लिए समर्पित एक पावन स्थान।",
    donateNow: "धर्म सहयोग (Dharma Sahyog)",
    bookRoom: "धर्मशाला बुकिंग",
    bookPalace: "ओसवाल पैलेस बुकिंग",
    exploreVihardham: "विहारधाम अन्वेषण",
    heroTitle: "परम पावन आध्यात्मिक धाम",
    home: "मुख्य पृष्ठ",
    about: "ट्रस्ट के बारे में",
    trustees: "ट्रस्टीगण",
    vihardham: "विहारधाम",
    oswalPalace: "ओसवाल पैलेस",
    bookings: "बुकिंग",
    donations: "धर्म सहयोग अवसर",
    donorWall: "लाभार्थी पट्ट (Labharthi Wall)",
    events: "आयोजन",
    liveDarshan: "लाइव दर्शन",
    gallery: "गैलरी और वीडियो",
    community: "समाज",
    contact: "संपर्क करें",
    adminPanel: "प्रशासन",
    
    visionTitle: "हमारा लक्ष्य (Vision)",
    visionDesc: "जैन धर्म के सिद्धांतों अहिंसा, सेवा और परस्पर सहयोग को बढ़ावा देना; साधु-साध्वी वृन्द के विहार अनुकूलन व समाज के जरूरतमंद परिवारों का उत्थान करना।",
    missionTitle: "हमारा संकल्प (Mission)",
    missionDesc: "एक सर्वसुविधायुक्त आध्यात्मिक परिसर 'विहारधाम' और सामाजिक गतिविधियों के लिए 'ओसवाल पैलेस' का संचालन करना, जिससे समाज की पूंजी समाज के ही सेवा कार्यों में पुनर्निवेशित हो।",
    
    statsTitle: "परियोजना प्रगति",
    statArea: "कुल परिसर क्षेत्र",
    statRooms: "कुल शयन कक्ष (Dharamshala)",
    statDonors: "भगीरथ लाभार्थी परिवार",
    statEvents: "प्रति वर्ष आयोजित उत्सव",
    
    liveAartiText: "दैनिक आरती एवं दर्शन समय",
    soundbellText: "आरती घंटी",
    playAudio: "भक्ति संगीत बजाएं",
    stopAudio: "संगीत बंद करें",
    activeLive: "मंदिर लाइव कैमरा (सिम्युलेटेड)",
    liveDarshanDesc: "घर बैठे दर्शन करें श्री सिवांची जैन सेवा समिति ट्रस्ट के नवनिर्मित शिखरबद्ध जैन मंदिर का।",
    
    donorTiers: {
      'Maha Daanveer': 'परम लाभार्थी परिवार ❤️',
      'Platinum': 'प्लैटिनम लाभार्थी 🌟',
      'Gold': 'स्वर्ण लाभार्थी 🟡',
      'Silver': 'रजत लाभार्थी ⚪',
      'Contributor': 'सहयोगी बंधु 🤝'
    }
  },
  en: {
    trustName: "Shri Siwanchi Jain Seva Samiti Trust",
    location: "Dungri Pura (Meli), Siwana-Samdari Road, District Barmer, Rajasthan, India",
    trustTagline: "A Sacred Union of Dharma, Seva, and Samaj",
    trustDescription: "A sacred sanctuary dedicated to serving the Siwanchi Jain community, supporting Jain Sadhus and Sadhvis during their Vihardham stays, and hosting events at Oswal Palace.",
    donateNow: "Dharma Sahyog",
    bookRoom: "Book Dharamshala",
    bookPalace: "Book Oswal Palace",
    exploreVihardham: "Explore Vihardham",
    heroTitle: "A Divine Spiritual Sanctuary",
    home: "Home",
    about: "About Trust",
    trustees: "Trustees",
    vihardham: "Vihardham",
    oswalPalace: "Oswal Palace",
    bookings: "Bookings",
    donations: "Dharma Sahyog",
    donorWall: "Labharthi Wall",
    events: "Events",
    liveDarshan: "Live Darshan",
    gallery: "Gallery & Videos",
    community: "Community",
    contact: "Contact Us",
    adminPanel: "Admin Panel",
    
    visionTitle: "Our Vision",
    visionDesc: "To nourish the values of Jainism—Ahimsa, Compassion, and Unity. Supporting Jain monks during their travel and executing community-centric socio-welfare programs.",
    customImpact: "Samaj ka paisa samaj mein rahe.",
    missionTitle: "Our Mission",
    missionDesc: "To establish a top-tier pilgrimage campus (Vihardham) and community event center (Oswal Palace) where community spending stays within the community for altruistic purposes.",
    
    statsTitle: "Project Progress",
    statArea: "Total Campus Area",
    statRooms: "Dharamshala Rooms",
    statDonors: "Labharthi Families",
    statEvents: "Annual Events Hosted",
    
    liveAartiText: "Daily Aarti & Prayers Schedule",
    soundbellText: "Aarti Bell",
    playAudio: "Play Devotional Audio",
    stopAudio: "Stop Audio",
    activeLive: "Temple Live Camera (Simulated)",
    liveDarshanDesc: "Experience virtual divine blessings live from the main Shikharbandh Jain Temple of Dungri Pura.",
    
    donorTiers: {
      'Maha Daanveer': 'Maha Labharthi ❤️',
      'Platinum': 'Platinum Labharthi 🌟',
      'Gold': 'Gold Labharthi 🟡',
      'Silver': 'Silver Labharthi ⚪',
      'Contributor': 'Sahyogi Parivar 🤝'
    }
  }
};

// Seed Trustees
export const seedTrustees: Trustee[] = [
  {
    id: "tr1",
    name: { hi: "शा. संघवी राजमलजी मफतलालजी भंसाली", en: "Sanghvi Rajmalji Mafatlalji Bhansali" },
    designation: { hi: "अध्यक्ष (President)", en: "President" },
    city: { hi: "पुणे (गढ़ सिवाना)", en: "Pune (Garh Siwana)" },
    message: { 
      hi: "ट्रस्ट का उद्देश्य समाज को सुदृढ़ बनाना, मन्दिर निर्माण पूर्ण करना और संघ सेवा में समर्पित रहना है।", 
      en: "Dedicated to strengthening the Samaj, completing temple constructions, and serving our holy congregation with utmost devotion."
    },
    phone: "+91 98225 38635",
    email: "rajmal.bhansali@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr2",
    name: { hi: "शा. मांगीलालजी नथमलजी भंसाली", en: "Sha Mangilalji Nathmalji Bhansali" },
    designation: { hi: "उपाध्यक्ष (Vice President)", en: "Vice President" },
    city: { hi: "पुणे (गढ़ सिवाना)", en: "Pune (Garh Siwana)" },
    message: { 
      hi: "डूंगरी पुरा परिसर हमारे संपूर्ण सिवांची समाज की आस्था और गौरव शाली ऐतिहासिक धरोहर का जीवंत रूप है।", 
      en: "The Dungri Pura complex represents the heart of our spiritual heritage and the collective power of the Siwanchi community."
    },
    phone: "+91 98221 18776",
    email: "mangilal.n@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr3",
    name: { hi: "शा. अशोककुमारजी सुमेरमलजी सालेचा", en: "Sha Ashokkumarji Sumermalji Salecha" },
    designation: { hi: "महामंत्री (General Secretary)", en: "General Secretary" },
    city: { hi: "पुणे (भोरड़ा)", en: "Pune (Bhorada)" },
    message: { 
      hi: "पारदर्शिता, निस्वार्थ सेवा और प्रत्येक धर्म कार्य में श्रेष्ठ प्रबंधन ही हमारे ट्रस्ट की पहचान व निरंतर संकल्प है।", 
      en: "Transparency, selfless devotion, and efficient administrative execution constitute the foundation of our trust's mission."
    },
    phone: "+91 94220 12213",
    email: "ashok.salecha@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr4",
    name: { hi: "शा. माणकचंदजी सरेमलजी बोकडिया", en: "Sha Manakchandji Saremalji Bokadia" },
    designation: { hi: "कोषाध्यक्ष (Treasurer)", en: "Treasurer" },
    city: { hi: "पुणे (गढ़ सिवाना)", en: "Pune (Garh Siwana)" },
    message: { 
      hi: "दान की एक-एक पाई का प्रभु भक्ति, साधु विहार और समाज हित के पुनीत कार्यों में अधिकतम सदुपयोग हमारी निष्ठा है।", 
      en: "Ensuring proper utilization and strict accountability of each devotional contribution for temple expansion and pilgrim services."
    },
    phone: "+91 98605 58835",
    email: "manak.bokadia@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr5",
    name: { hi: "शा. भंवरलालजी हरकचंदजी जीरावला", en: "Sha Bhanwarlalji Harakchandji Jirawala" },
    designation: { hi: "सहकोषाध्यक्ष (Joint Treasurer)", en: "Joint Treasurer" },
    city: { hi: "पुणे (समदड़ी)", en: "Pune (Samdari)" },
    message: { 
      hi: "सामूहिक सहयोग से बड़े से बड़े स्वप्न साकार होते हैं। हमारा विहारधाम जैन संस्कृति का एक अनुपम उदाहरण बनेगा।", 
      en: "Collective synergy transforms vision into physical reality. Our Vihardham is destined to become a pride of Jain society."
    },
    phone: "+91 94219 45411",
    email: "bhanwar.jirawala@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr6",
    name: { hi: "शा. राजेन्द्रकुमारजी केशवलालजी जीरावला", en: "Sha Rajendrakumarji Keshavlalji Jirawala" },
    designation: { hi: "सहमंत्री (Joint Secretary)", en: "Joint Secretary" },
    city: { hi: "पुणे (गढ़ सिवाना)", en: "Pune (Garh Siwana)" },
    message: { 
      hi: "युवा समाज को धर्म व सेवा पथ पर जोड़ना हमारी अहम भूमिका है। सभी सेवाभावी लोगों का स्वागत है।", 
      en: "Uniting the young generation on the righteous path of service and spirituality remains our core driving motive."
    },
    phone: "+91 90289 74569",
    email: "rajendra.j@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr7",
    name: { hi: "शा. संघवी मिठालालजी नेमीचंदजी जीरावला", en: "Sanghvi Mithalalji Nemichandji Jirawala" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "समदड़ी डीसा (अहमदाबाद)", en: "Samdari Deesa (Ahmedabad)" },
    message: { 
      hi: "साधु-साध्वी भगवंतों के सुखद विहार एवं वैयावृत्य को सुगम बनाना हमारा सर्वोच्च सौभाग्य और कर्तव्य है।", 
      en: "Providing ultimate comfort and service to traveling Jain monks during their walking pilgrimages is our highest luck."
    },
    phone: "+91 94260 12680",
    email: "mithalal.j@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr8",
    name: { hi: "शा. राजुभाई उत्तमचंदजी भंसाली", en: "Sha Rajubhai Uttamchandji Bhansali" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "पुणे (डीसा)", en: "Pune (Deesa)" },
    message: { 
      hi: "नवीन मन्दिर की मंगल अंजनशलाका प्रतिष्ठा एवं भावी धार्मिक गतिविधियों के त्वरित संचालन के लिए हम प्रतिबद्ध हैं।", 
      en: "Deeply committed to organizing religious festivals and accelerating ongoing developments at the holy site."
    },
    phone: "+91 89835 60470",
    email: "raju.bhansali@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr9",
    name: { hi: "शा. संघवी सुरेशकुमारजी बाबुलालजी भंसाली", en: "Sanghvi Sureshkumarji Babulalji Bhansali" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "पुणे (गढ़ सिवाना)", en: "Pune (Garh Siwana)" },
    message: { 
      hi: "हर तीर्थ यात्री डूंगरी पुरा आकर आध्यात्मिक शांति का अनुभव करे, यही हमारा मूल संकल्प है।", 
      en: "Our ultimate purpose is to ensure every visiting seeker experiences unmatched spiritual tranquility."
    },
    phone: "+91 92253 1548",
    email: "suresh.bhansali@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr10",
    name: { hi: "शा. कांतिलालजी चिमनलालजी ढेलडिया मुथा", en: "Sha Kantilalji Chimanlalji Dheldia Mutha" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "पुणे (गढ़ सिवाना)", en: "Pune (Garh Siwana)" },
    message: { 
      hi: "आदिनाथ भोजनशाला एवं परिसर की उत्तम व्यवस्थाओं को हमेशा शुद्धता के साथ सुचारू रखना हमारा ध्येय है।", 
      en: "Endeavoring to maintain absolute hygiene and purest swasthya dining schedules across the entire boarding block."
    },
    phone: "+91 97644 41857",
    email: "kantilal.mutha@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr11",
    name: { hi: "शा. मांगीलालजी गुलाबचंदजी विनायकिया", en: "Sha Mangilalji Gulabchandji Vinayakiya" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "हैदराबाद (धानेरा)", en: "Hyderabad (Dhanera)" },
    message: { 
      hi: "राष्ट्रव्यापी समाज जनों से निरंतर संपर्क साधना और सुदृढ़ सहकार स्थापित करना मेरी सेवा का आधार है।", 
      en: "Fostering long-term cordial associations with nationwide Jain families for unified humanitarian results."
    },
    phone: "+91 93476 0209",
    email: "mangilal.v@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr12",
    name: { hi: "शा. सोहनलालजी मिश्रीमलजी जीरावला", en: "Sha Sohanlalji Mishrimalji Jirawala" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "सुरत (समदड़ी)", en: "Surat (Samdari)" },
    message: { 
      hi: "ओसवाल पैलेस सामाजिक समारोहों को सुखद एवं सुंदर यादों के रूप में विकसित प्रदान करने के प्रति संकल्पित है।", 
      en: "Committed to delivering world-class hospitality and blissful life events at the majestic Oswal Palace complex."
    },
    phone: "+91 99793 09332",
    email: "sohan.jirawala@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr13",
    name: { hi: "शा. संघवी अमृतलालजी धुडाजी भंसाली", en: "Sanghvi Amritlalji Dhudaji Bhansali" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "पुणे (सिवाना)", en: "Pune (Siwana)" },
    message: { 
      hi: "अपनी पावन भूमि सिवाना और मेली रोड क्षेत्र का धार्मिक पुनरुत्थान देखना ही जीवन का परम आनंद है।", 
      en: "Witnessing the glorious religious revival of our historical Siwana regional sectors is a matter of profound joy."
    },
    phone: "+91 94230 01108",
    email: "amrit.bhansali@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr14",
    name: { hi: "शा. ईश्वरलालजी जेरुपचंदजी दांतेवाडीया", en: "Sha Ishwarlalji Jerupchandji Dantewadiya" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "मोकलसर (बारडोली)", en: "Mokalsar (Bardoli)" },
    message: { 
      hi: "तीर्थ क्षेत्र का पर्यावरण शुद्ध, सात्विक एवं हरा-भरा रहे ताकि साधना व तप के लिए अनुकूलता बढ़े।", 
      en: "Nurturing an eco-conscious serene green atmosphere surrounding our sacred temple shrines."
    },
    phone: "+91 94271 24184",
    email: "ishwar.dantewadia@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr15",
    name: { hi: "शा. संघवी बाबुलालजी चिमनलालजी लुंकड", en: "Sanghvi Babulalji Chimanlalji Lunkad" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "पुणे (डीसा)", en: "Pune (Deesa)" },
    message: { 
      hi: "समाज सेवा में समर्पित हर एक क्षण प्रभु सुमिरन के समान है। हम सबको मिलकर इस धर्म ध्वज को बढ़ाना है।", 
      en: "Every single breath spent in humanistic service matches prayer itself. May we all hold this flag of truth high."
    },
    phone: "+91 98230 77511",
    email: "babulal.lunkad@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  }
];

// Room Categories
export const roomCategories: RoomCategory[] = [
  {
    id: "rc1",
    name: { hi: "अभिषेक डीलक्स एसी कमरा (A/C Deluxe Room)", en: "Abhishek Deluxe A/C Room" },
    description: { hi: "उत्कृष्ट वातानुकूलित शयनकक्ष जिसमें दो पलंग, साफ वॉशरूम और बालकनी शामिल है।", en: "Classic air-conditioned room featuring double beds, hygiene-first attached bathroom, and scenic balcony." },
    type: "AC",
    capacity: 3,
    ratePerDay: 1200,
    availableRooms: 20,
    amenities: [
      { hi: "डबल बेड", en: "Double Bed" },
      { hi: "गीजर", en: "Geyser" },
      { hi: "शीतल जल", en: "Filtered Water" },
      { hi: "हाईवे व्यू", en: "Highway/Hill View" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "rc2",
    name: { hi: "मंगला नॉन-एसी सुपीरियर (Non-A/C Superior)", en: "Mangla Non-A/C Superior Room" },
    description: { hi: "हवादार और शीतल प्राकृतिक प्रकाश युक्त कमरा, तीन व्यक्तियों के लिए उपर्युक्त।", en: "Well-ventilated comfortable room with private bathroom, designed for pocket-friendly spiritual family stays." },
    type: "Non-AC",
    capacity: 3,
    ratePerDay: 600,
    availableRooms: 35,
    amenities: [
      { hi: "डबल बेड + सिंगल सोफा", en: "Double Bed + Sofa" },
      { hi: "प्रशंसक और वेंटिलेशन", en: "Fan & Ventilation" },
      { hi: "साफ बाथरूम", en: "Clean Restroom" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "rc3",
    name: { hi: "पारसनाथ सुपर डीलक्स सुइट (Super Deluxe Family Suite)", en: "Parasnath Super Deluxe Family Suite" },
    description: { hi: "बड़े परिवारों के लिए विशेष प्रीमियम सोफा संलग्न सुइट, जिसमें उत्कृष्ट संगमरमर का फर्श है।", en: "Premium marble-floored family suite featuring comfortable sofas, master beds, refrigerator, and panoramic temple view." },
    type: "Suite",
    capacity: 5,
    ratePerDay: 2500,
    availableRooms: 8,
    amenities: [
      { hi: "किंग साइज बेड", en: "King Size Bed" },
      { hi: "एलसीडी टीवी (धार्मिक चैनल)", en: "LCD TV with Jain Channels" },
      { hi: "सिटिंग सोफा सेट", en: "Luxury Living/Sitting Area" },
      { hi: "पहाड़ और मंदिर का विहंगम दृश्य", en: "Scenic Temple & Hill View" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "rc4",
    name: { hi: "साधु-साध्वी विहारधाम कुटीर (Vihardham Holy Stay)", en: "Sadhu-Sadhvi Vihar Kutir" },
    description: { hi: "पूज्य मुनिराजों और महासतीजी के लिए विशेष रूप से निर्मित, उपधि रहित व सर्वथा अनुकूल साधना स्थल।", en: "Custom built with pristine parameters strictly meeting Jain monastic rules. Dedicated strictly for holy Monks & Nuns." },
    type: "Vihardham Stay",
    capacity: 4,
    ratePerDay: 0, // Free of cost as service
    availableRooms: 12,
    amenities: [
      { hi: "काष्ठ पाट (Wooden Beds)", en: "Wooden Pat (Monastic Beds)" },
      { hi: "सचित्त-अचित्त जल प्रबंधन", en: "Perfect Water Filtering Management" },
      { hi: "मौन अनुकूल शांत वातावरण", en: "Vipassana & Silent Environment" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400"
  }
];

// Seed Labh / Chadhava Opportunities
export const seedLabhOpportunities: LabhOpportunity[] = [
  // --- VIHARDHAM OPPORTUNITIES ---
  {
    id: "vlo_dhaw",
    title: { hi: "धर्मशाला विंग निर्माण सहयोग (12 उपलब्ध विंग)", en: "Dharamshala Wing (12 Available Sections)" },
    description: { hi: "विहारधाम परिसर की भव्य वातानुकूलित धर्मशाला के किसी एक पूर्ण विंग के निर्माण में स्थायी धर्म सहयोग का पावन अवसर।", en: "Permanent holy collaboration to construct one of the main A/C wings in the Vihardham Dharamshala complex." },
    amount: 1500000,
    isAvailable: true,
    category: "Dharamshala"
  },
  {
    id: "vlo_kir",
    title: { hi: "कीर्तिस्तंभ नाम लेखन सुवर्ण अवसर (108 सूची)", en: "Kirtistambh Inscription (108 Names)" },
    description: { hi: "परिसर के गौरवशाली कीर्तिस्तंभ पर कुल 108 भाग्यशाली परिवारों के नाम सुवर्ण अक्षरों में अंकित किए जाएंगे।", en: "Inscribe your family name in golden letters on the magnificent central Kirtistambh (Pillar of Glory)." },
    amount: 207000,
    isAvailable: true,
    category: "Temple"
  },
  {
    id: "vlo_mks",
    title: { hi: "मुख्य सहयोगी नाम पट्टिका (108 सूची)", en: "Mukhya Sahyogi (108 Names)" },
    description: { hi: "मुख्य जिनालय के गर्भगृह एवं आंतरिक परिसर की मुख्य सहयोगी पट्टिका पर नाम लेखन का पावन अवसर।", en: "Special recognition name placement under the 'Mukhya Sahyogi' board inside the temple compound." },
    amount: 108000,
    isAvailable: true,
    category: "Temple"
  },
  {
    id: "vlo_sahy",
    title: { hi: "सहयोगी नाम पट्टिका (108 सूची)", en: "Sahyogi (108 Names)" },
    description: { hi: "मंदिर परिसर में स्थापित की जाने वाली सहयोगी लाभार्थी पट्टिका पर नाम अंकित कराने का पावन लाभ लें।", en: "Opportunity to enroll in the collective Sahyogi board of the main Shikharbandh Temple." },
    amount: 54000,
    isAvailable: true,
    category: "Temple"
  },
  {
    id: "vlo_bpt",
    title: { hi: "आदिनाथ भोजनशाला स्थायी भोजन तिथि लाभ", en: "Bhojanshala Permanent Meal Tithi" },
    description: { hi: "वर्ष के किसी एक पावन स्मृति दिवस (जन्मदिन या पुण्यतिथि) पर यात्रियों एवं साधर्मिकों के लिए भोजनशाला में स्थायी तिथि भोजन का लाभ।", en: "Sponsor a permanent yearly lunch/dinner date (tithi) in remembrance of ancestral souls or family milestones." },
    amount: 27000,
    isAvailable: true,
    category: "Bhojanshala"
  },
  {
    id: "vlo_bpbt",
    title: { hi: "आदिनाथ भोजनशाला स्थायी अल्पाहार तिथि लाभ", en: "Bhojanshala Permanent Breakfast Tithi" },
    description: { hi: "वर्ष के किसी एक पावन स्मृति दिवस पर यात्रियों एवं पूज्य जनों हेतु भोजनशाला में स्थायी तिथि अल्पाहार (नाश्ता) वितरण।", en: "Sponsor a permanent yearly breakfast date (tithi) for all visiting pilgrims at Vihardham." },
    amount: 15000,
    isAvailable: true,
    category: "Bhojanshala"
  },
  {
    id: "vlo_spd",
    title: { hi: "दिवंगत आत्मा अथवा श्रद्धा चित्र प्रदर्शन पट्ट", en: "Single Photo Display Labh" },
    description: { hi: "परिजनों की पावन स्मृति में छवि / चित्र स्थायी रूप से वातानुकूलित धर्मशाला परिसर में प्रदर्शित करने का अधिकार।", en: "Have a single portrait of a beloved family member or ancestor respectfully displayed inside the Dharamshala." },
    amount: 11000,
    isAvailable: true,
    category: "Dharamshala"
  },

  // --- OSWAL PALACE OPPORTUNITIES ---
  {
    id: "olo_kit",
    title: { hi: "ओसवाल पैलेस आधुनिक रसोईघर (Modern Kitchen)", en: "Modern Kitchen Main Sponsor" },
    description: { hi: "ओसवाल पैलेस के विशाल भोजन एवं विवाह उत्सवों के लिए अत्याधुनिक, शुद्ध व स्वचालित किचन ब्लॉक की स्थापना में मुख्य सहयोग।", en: "Provide foundational support for the fully-automated, high-capacity, and pristine modern kitchen facility." },
    amount: 2700000,
    isAvailable: true,
    category: "Palace"
  },
  {
    id: "olo_lift",
    title: { hi: "अन्तः परिसर लिफ्ट (Passenger Lifts)", en: "High Speed Passenger Lift" },
    description: { hi: "वृद्धों एवं दिव्यांग साधर्मिकों की सुगम आवाजाही हेतु ओसवाल पैलेस में अत्याधुनिक लिफ्ट की स्थापना में मुख्य सहयोग।", en: "Sponsor one of the high-speed, modern automatic lifts ensuring accessibility across all floors." },
    amount: 1500000,
    isAvailable: true,
    category: "Palace"
  },
  {
    id: "olo_wv",
    title: { hi: "विंग / विशाल बरामदा (Wing or Veranda)", en: "Palace Wing / Spacious Veranda" },
    description: { hi: "ओसवाल पैलेस के एक पूर्ण कॉरिडोर विंग अथवा पारंपरिक खूबसूरत नक्काशीदार बरामदे का निर्माण सहयोग।", en: "Support the magnificent architecture and pillars of one entire wing or premium palace veranda." },
    amount: 1500000,
    isAvailable: true,
    category: "Palace"
  },
  {
    id: "olo_sach",
    title: { hi: "छोटा ए.सी. फंक्शन हॉल (Small AC Function Hall)", en: "Small AC Function Hall" },
    description: { hi: "छोटे सांस्कृतिक कार्यक्रमों, मेहंदी रस्म एवं सामाजिक बैठकों हेतु पूर्ण सुसज्जित वातानुकूलित मिनी हॉल निर्माण का लाभ।", en: "Construct one of the eight small A/C function halls designed for family rituals, sangeet, or seminars." },
    amount: 1300000,
    isAvailable: true,
    category: "Palace"
  },
  {
    id: "olo_dmc",
    title: { hi: "डाइनिंग हॉल मुख्य सहयोगी (Dining Hall Main Contributor)", en: "Dining Hall Main Contributor" },
    description: { hi: "एक साथ सैकड़ों जनों की सात्विक स्वाध्याय भोजन पंगत हेतु मुख्य डाइनिंग हॉल निर्माण का भगीरथ सहयोग प्रसंग।", en: "Become a lead patron for the grand wedding and community dining hall under construction." },
    amount: 1100000,
    isAvailable: true,
    category: "Palace"
  },
  {
    id: "olo_fmc",
    title: { hi: "लार्ज ए.सी. मुख्य समारोह गृह सहयोगी", en: "Function Hall Main Contributor" },
    description: { hi: "विशाल एयरकंडीशंड उत्सव भवन के निर्माण में मुख्य सहयोगी बनने का सौभाग्य, जो भव्य विवाह एवं मांगलिक कार्यों को साकार करेगा।", en: "Gain prime recognition as a leading contributor to the massive central Air-Conditioned main celebration hall." },
    amount: 1100000,
    isAvailable: true,
    category: "Palace"
  },
  {
    id: "olo_acr",
    title: { hi: "डीलक्स ए.सी. कमरा (Classic AC Room)", en: "Air Conditioned Executive Room" },
    description: { hi: "यात्रियों एवं विवाह अतिथियों के सुखद प्रवास हेतु ओसवाल पैलेस में शानदार फर्निचर युक्त एसी शयनकक्ष निर्माण लाभ।", en: "Sponsor one of the 108 air-conditioned primary rooms, featuring modern bathrooms and elegant furniture." },
    amount: 702000,
    isAvailable: true,
    category: "Palace"
  },
  {
    id: "olo_dcr",
    title: { hi: "मेकअप एवं वस्त्र सज्जा कक्ष (Dress Change Room)", en: "Dress Change Room / Cosmetic Suite" },
    description: { hi: "विशिष्ट वर-वधू सज्जा एवं अतिथियों की तैयारी हेतु आधुनिक मेकअप सुविधाओं से युक्त वातानुकूलित विशेष वीआईपी कक्ष।", en: "Support construction of high-end A/C cosmetic change suites for brides, grooms, and performers." },
    amount: 702000,
    isAvailable: true,
    category: "Palace"
  },
  {
    id: "olo_bgh",
    title: { hi: "लक्ज़री विला मुख्य हॉल (Bungalow Main Hall)", en: "Luxury Bungalow Main Hall" },
    description: { hi: "ओसवाल पैलेस की वीआईपी बंगला कॉलोनी में बनने वाले 15 स्वतंत्र बंगलो के भव्य मुख्य हॉल का नामकरण लाभ।", en: "Secure naming rights for the spacious primary reception living room of one of the 15 luxurious bungalows." },
    amount: 702000,
    isAvailable: true,
    category: "Palace"
  },
  {
    id: "olo_bga",
    title: { hi: "विला एसी कमरा (Bungalow AC Room)", en: "Bungalow AC Room" },
    description: { hi: "स्वतंत्र बंगलों के अंतर्गत आने वाले लक्ज़री वातानुकूलित शयनकक्षों के निर्माण में सहयोग का पुण्य अवसर।", en: "Co-sponsor the premium air-conditioned sleeping suite inside the luxury bungalows." },
    amount: 603000,
    isAvailable: true,
    category: "Palace"
  },
  {
    id: "olo_fsn",
    title: { hi: "मुख्य शिलापट्ट नाम लेखन (Foundation Stone Inscription)", en: "Foundation Stone Name" },
    description: { hi: "ओसवाल पैलेस की मुख्य नीव के ऐतिहासिक शिलापट्ट पर आपके पूज्य परिवार का नाम स्थायी रूप से उत्कीर्ण होगा।", en: "Engrave your family name forever on the historical foundation Stone plaque of Oswal Palace complex." },
    amount: 207000,
    isAvailable: true,
    category: "Palace"
  },
  {
    id: "olo_mco",
    title: { hi: "मुख्य हितैषी सहयोगी (Main Contributor)", en: "Oswal Palace Main Contributor" },
    description: { hi: "ओसवाल पैलेस के बुनियादी ढांचे, गार्डन और ड्रेनेज कार्यों के लिए मुख्य हितैषी पट्टिका पर नाम लेखन।", en: "Underwrite primary infrastructure projects like landscapes, gardens, and lifts as a Lead Contributor." },
    amount: 108000,
    isAvailable: true,
    category: "Palace"
  },
  {
    id: "olo_con",
    title: { hi: "परियोजना सामान्य सहयोगी (Contributor)", en: "Oswal Palace Contributor" },
    description: { hi: "ओसवाल पैलेस सामाजिक परिसर का सहयोग करने वाले दानवीरों की सामान्य पट्टिका पर गौरवशाली नाम लेखन।", en: "Inscribe your name on the collective digital and physical contributors list of the community palace." },
    amount: 54000,
    isAvailable: true,
    category: "Palace"
  }
];

// Seed Donor Wall Contributors
export const seedContributors: Contributor[] = [
  {
    id: "d1",
    name: { hi: "श्रीमती हीरादेवी धर्मपत्नी चम्पालाल जी गुलेच्छा", en: "Smt. Heeradevi W/o Champalal Ji Gulechha" },
    city: { hi: "मेली - बंगलुरु", en: "Meli - Bengaluru" },
    family: { hi: "श्री सम्पतराज, अशोक, अरविन्द गुलेच्छा परिवार", en: "Shri Sampatraj, Ashok, Arvind Gulechha Family" },
    tier: "Maha Daanveer",
    amount: 2500000,
    contributionType: { hi: "मुख्य मंदिर भूमि एवं वीहड़धाम मुख्य भूखंड", en: "Main Temple Land and Vihardham Main Plot Donation" },
    year: 2023,
    message: { hi: "परमात्मा की असीम कृपा से ही समाज की सेवा का यह परम अवसर प्राप्त हुआ है।", en: "By divine blessings alone, we have been bestowed with this noble responsibility." },
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "d2",
    name: { hi: "शाह जेठालाल जी हेमराज जी मुथा", en: "Shah Jethalal Ji Hemraj Ji Mutha" },
    city: { hi: "डूंगरी पुरा - मुंबई", en: "Dungri Pura - Mumbai" },
    family: { hi: "मुथा शांतिलाल, रमणिकलाल, किरणकुमार मुथा परिवार", en: "Mutha Shantilal, Ramniklal, Kirankumar Mutha Family" },
    tier: "Platinum",
    amount: 1100000,
    contributionType: { hi: "ओसवाल पैलेस मुख्य केंद्रीय एयर-कूल्ड वैडिंग हॉल", en: "Oswal Palace Central air-cooled grand wedding hall" },
    year: 2024,
    message: { hi: "समाज का धन समाज के कल्याण में ही लगे, यही सच्ची जिन शासन की सेवा है।", en: "Moneys of the community must uplift the community. This is true devotion to Jain principles." }
  },
  {
    id: "d3",
    name: { hi: "श्री माणकचंद जी केसरीमल जी भंडारी", en: "Shri Manakchand Ji Kesarimal Ji Bhandari" },
    city: { hi: "सिवाना - पुणे", en: "Siwana - Pune" },
    family: { hi: "भंडारी राजेश, निलेश, अमोल परिवार", en: "Bhandari Rajesh, Nilesh, Amol Family" },
    tier: "Gold",
    amount: 501000,
    contributionType: { hi: "आदिनाथ भोजनशाला ब्लॉक एवं मॉडर्न किचन उपकरण", en: "Adinath Bhojanshala kitchen block & modern appliances" },
    year: 2024,
    message: { hi: "कोई भी साधरम भाई या यात्री डूंगरी पुरा में भूखा न रहे, हमारा यही स्वप्न था।", en: "That no pilgrim or community traveler stays hungry in Dungri Pura was our core prayer." }
  },
  {
    id: "d4",
    name: { hi: "श्रीमती कंचनबाई चौधरी", en: "Smt. Kanchanbai Choudhary" },
    city: { hi: "समदड़ी - चेन्नई", en: "Samdari - Chennai" },
    family: { hi: "चौधरी दिलीप भाई, जितेन्द्र भाई परिवार", en: "Choudhary Dilip Bhai, Jitendra Bhai Family" },
    tier: "Silver",
    amount: 251000,
    contributionType: { hi: "वीहारधाम ए.सी. अतिथि शयनगृह निर्माण सहयोग", en: "Vihardham Deluxe A.C guest suites support" },
    year: 2025
  },
  {
    id: "d5",
    name: { hi: "शाह वसंतराज जी धर्मचंद जी सिंगवी", en: "Shah Vasantraj Ji Dharamchand Ji Singvi" },
    city: { hi: "कोटड़ी - सूरत", en: "Kotri - Surat" },
    family: { hi: "सिंगवी मयूर, वैभव, संयम परिवार", en: "Singvi Mayur, Vaibhav, Sanyam Family" },
    tier: "Contributor",
    amount: 51000,
    contributionType: { hi: "श्री आदिनाथ जिनालय संगमरमर सुंदर स्तंभ", en: "Carving of Adinath Jinalay pristine marble pillars" },
    year: 2025
  }
];

// Trust News
export const seedNews: NewsItem[] = [
  {
    id: "n1",
    title: { hi: "डूंगरी पुरा जिनालय का गर्भगृह संगमरमर नक्काशी कार्य पूर्ण", en: "Sanctum Marble Engraving Architecture Complete" },
    summary: { hi: "राजस्थान के कुशल कारीगरों द्वारा मकराना संगमरमर का अलौकिक नक्काशी कार्य सम्पन्न हो चुका है।", en: "Highly skilled artisans from Mewar have finished the divine white Makrana marble ceiling carvings." },
    content: { 
      hi: "परम हर्ष के साथ सूचित किया जाता है कि हमारी मुख्य मन्दिर मन्दिर मेली रोड स्थित डूंगरी पुरा में मुख्य गर्भगृह का अलौकिक श्वेत मकराना संगमरमर नक्काशी कार्य पूजनीय संतों के आशीर्वाद से सफलता पूर्वक पूर्ण कर लिया गया है। इस वर्ष के अंत में भव्य अंजनशलाका प्रतिष्ठा महोत्सव का आयोजन किए जाने की योजना है।", 
      en: "We are joyous to announce that the intricate marble work of our principal temple under construction at Dungri Pura has been successfully completed. Highly refined white marble columns and pristine designs now adorn the sanctum. The grand Pratishtha Mahotsav is planned by the end of this year." 
    },
    category: "Construction",
    date: "2026-05-20",
    imageUrl: "https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "n2",
    title: { hi: "विहारधाम में परम पूज्य साधु-साध्वी भगवंतों का अभूतपूर्व आगमन व चातुर्मास स्थापना", en: "Revered Jain Monks Enter Dungri Pura Vihardham for Chaturmas" },
    summary: { hi: "परम पूज्य गच्छाधिपति भगवंतों के पावन चरण डूंगरी पुरा विहारधाम की पावन धरा पर पड़े।", en: "A massive group of holy Jain monks and nuns arrived at our newly built Vihar stay suites." },
    content: { 
      hi: "डूंगरी पुरा (मेली) स्थित श्री सिवांची जैन विहारधाम में आगामी चातुर्मास हेतु पूज्य संतों का मंगल प्रवेश संपन्न हुआ। विहारधाम की व्यवस्थाओं से प्रभावित होकर पूज्य संतों ने संपूर्ण चातुर्मास यही व्यतीत करने की सहर्ष स्वीकृति दी है। प्रतिदिन प्रातः व्याख्यान एवं सांय भक्तामर प्रवचन माला का आयोजन किया जा रहा है।", 
      en: "The Siwanchi Jain community organized a grand welcome procession for the traveling sadhus who arrived in Dungri Pura. Impressed with the strict non-electric and pure warm water management facilities at Vihardham, they have agreed to stay for the holy four-month Chaturmas. Lectures take place daily between 8 AM and 10 AM." 
    },
    category: "Religious",
    date: "2026-06-05",
    imageUrl: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=400"
  }
];

// Upcoming Events
export const seedEvents: EventItem[] = [
  {
    id: "e1",
    title: { hi: "चातुर्मास महाप्रवचन माला 2026", en: "Grand Chaturmas Lecture Series 2026" },
    description: { hi: "पूज्य मुनिराजों के अमृत प्रवचनों की वर्षा, नवकार मंत्र जाप साधना शिविर एवं सात्विक धार्मिक अनुष्ठान।", en: "Daily spiritual discourses on Tattvarta Sutra, specialized Navkar chanting and meditation शिविर." },
    startDate: "2026-07-01",
    endDate: "2026-10-31",
    category: "Chaturmas",
    location: { hi: "श्री सिवांची जैन विहारधाम मुख्य प्रवचन मंडप", en: "Main Spiritual Pavilion, Vihardham Campus" },
    coordinator: "श्री प्रकाशचंद चौधरी",
    coordinatorContact: "+91 94260 55667",
    isRegistrationRequired: true,
    registeredCount: 340
  },
  {
    id: "e2",
    title: { hi: "परम पावन उपधान तप आराधना", en: "Param Holy Updhan Tap Aaradhana 2026" },
    description: { hi: "47 दिवसीय कठोर मौन, स्वाध्याय, भिक्षाचर्या एवं श्रावक धर्म क्रियाओं का उत्कृष्ट सामूहिक अनुष्ठान।", en: "A strict 47-days long Jain purification fast adhering to holy vows, early morning self study, and barefoot disciplines." },
    startDate: "2026-11-15",
    endDate: "2026-12-31",
    category: "Updhan",
    location: { hi: "डूंगरी पुरा जैन मंदिर संकुल", en: "Dungri Pura Temple & Upashray Complex" },
    coordinator: "श्री माणकचंद गुलेच्छा",
    coordinatorContact: "+91 98450 33445",
    isRegistrationRequired: true,
    registeredCount: 88
  }
];

// Gallery Database
export const seedGallery: GalleryItem[] = [
  {
    id: "g1",
    title: { hi: "भव्य श्री आदिनाथ नवनिर्मित शिखरबद्ध जिनालय", en: "The Grand Shikharbandh Adinath Temple" },
    category: "Temple",
    type: "image",
    url: "https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g2",
    title: { hi: "ओसवाल पैलेस आलीशान वेडिंग हॉल एवं मुख्य मंच", en: "Oswal Palace Luxurious Wedding Hall & Main Stage" },
    category: "Oswal Palace",
    type: "image",
    url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g3",
    title: { hi: "साधु-साध्वी पावन विहारधाम बाह्य परिसर दृश्य", en: "Vihardham Spiritual Sanctuary Outer Complex" },
    category: "Construction",
    type: "image",
    url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g4",
    title: { hi: "परम पूज्य संतों का मंगल प्रवेश और धर्म ध्वज रोहण", en: "Procession of Jain Monks and Holy Banner Hoisting" },
    category: "Samaj Events",
    type: "image",
    url: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g5",
    title: { hi: "विहारधाम और ओसवाल पैलेस परियोजना - अधिकारिक वीडियो ट्यूर", en: "Vihardham & Oswal Palace Project - Official Video Tour" },
    category: "Drone",
    type: "video",
    url: "https://www.youtube.com/embed/Cwyn5LCGd0c"
  }
];

// Daily Aarti schedules
export const dailyAartiSchedule: LiveAarti[] = [
  {
    id: "a1",
    name: { hi: "मंगला आरती (प्रातः काल दर्शन)", en: "Mangla Aarti (Early Morning)" },
    time: "06:15 AM",
    description: { hi: "परम शांति की तरंगों के साथ आदिनाथ भगवान का प्रथम अभिषेक दर्शन व भव्यातिभव्य स्तुति गान।", en: "Start the day with deep peaceful vibrations, holy bath visuals, and soft traditional devotional hymns." }
  },
  {
    id: "a2",
    name: { hi: "मुख्य केसर पूजा एवं अष्टप्रकारी महापूजा", en: "Keshar Pooja & Ashtaprakari Mahapooja" },
    time: "09:30 AM",
    description: { hi: "साधार्मिक भाई बहिनों द्वारा शुद्ध वस्त्रों में प्रभु को केसर, पुष्प व अक्षत चढ़ाने का पुण्योत्सव समय।", en: "Devotees perform pure saffron paste offering, fresh marigold worship, and complete eight-fold rituals on the idols." }
  },
  {
    id: "a3",
    name: { hi: "संध्या आरती (महा आरती)", en: "Sandhya Aarti (Grand Evening Chanting)" },
    time: "07:15 PM",
    description: { hi: "घंटियों की दिव्य गूंज, दीपक की लौ और सैकड़ों भावुक श्रद्धालुओं के साथ संपन्न होने वाली महा आरती।", en: "Dazzling brass oil lamps, reverberating silver handbells, and collective divine chanting under starry sky." }
  }
];

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
    location: "विहारधाम(मेली), सिवाना-समदड़ी रोड, जिला बाड़मेर, राजस्थान, भारत",
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
    vatsalyaDham: "वात्सल्य धाम",
    events: "आयोजन",
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
    location: "Vihardham (Meli), Siwana-Samdari Road, District Barmer, Rajasthan, India",
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
    vatsalyaDham: "Vatsalya Dham",
    events: "Events",
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
    liveDarshanDesc: "Experience virtual divine blessings live from the main Shikharbandh Jain Temple of Meli Gaon / Siwana Samdari Road.",
    
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
    phone: "",
    email: "rajmal.bhansali@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr2",
    name: { hi: "शा. मांगीलालजी नथमलजी भंसाली", en: "Sha Mangilalji Nathmalji Bhansali" },
    designation: { hi: "उपाध्यक्ष (Vice President)", en: "Vice President" },
    city: { hi: "पुणे (गढ़ सिवाना)", en: "Pune (Garh Siwana)" },
    message: { 
      hi: "मेली गाँव (सिवाना समदड़ी मार्ग) परिसर हमारे संपूर्ण सिवांची समाज की आस्था और गौरव शाली ऐतिहासिक धरोहर का जीवंत रूप है।", 
      en: "The Meli Gaon / Siwana Samdari Road complex represents the heart of our spiritual heritage and the collective power of the Siwanchi community."
    },
    phone: "",
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
    phone: "",
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
    phone: "",
    email: "manak.bokadia@siwanchitrust.org",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr5",
    name: { hi: "शा. भंवरलालजी हरकचंदजी जीरावला", en: "Sha Bhanwarlalji Harakchandji Jirawala" },
    designation: { hi: "सहकोषाध्यक्ष (Joint Treasurer)", en: "Joint Treasurer" },
    city: { hi: "पुणे (समदड़ी)", en: "Pune (Samdari)" },
    message: { 
      hi: "ट्रस्ट के सेवा कार्य निस्वार्थ रूप से समाज के हर वर्ग तक पहुँचे, यही हमारा ध्येय है।", 
      en: "Our ultimate goal is to ensure every pilgrim visiting Meli Gaon / Siwana Samdari Road experiences profound peace."
    },
    phone: "",
    email: "",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr6",
    name: { hi: "शा. राजेन्द्रकुमारजी केशवलालजी जीरावला", en: "Sha Rajendrakumarji Keshavlalji Jirawala" },
    designation: { hi: "सहमंत्री (Joint Secretary)", en: "Joint Secretary" },
    city: { hi: "पुणे (गढ़ सिवाना)", en: "Pune (Garh Siwana)" },
    message: { 
      hi: "पारस्परिक सहयोग, साधना व सेवा ही हमारे जीवन के आभूषण हैं।", 
      en: "Mutual support, meditation, and service are the ornaments of our lives."
    },
    phone: "",
    email: "",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr7",
    name: { hi: "शा. संघवी मिठालालजी नेमीचंदजी जीरावला", en: "Sanghvi Mithalalji Nemichandji Jirawala" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "समदड़ी डीसा (अहमदाबाद)", en: "Samdari Deesa (Ahmedabad)" },
    message: {
      hi: "साधु-साध्वी विहार सेवा और पदयात्रियों की भक्ति हमारी संस्कृति का मुख्य स्तंभ है।",
      en: "Serving the holy monks and walking pilgrimages is our highest luck."
    },
    phone: "",
    email: "",
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
    phone: "",
    email: "",
    photoUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr9",
    name: { hi: "शा. संघवी सुरेशकुमारजी बाबुलालजी भंसाली", en: "Sanghvi Sureshkumarji Babulalji Bhansali" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "पुणे (गढ़ सिवाना)", en: "Pune (Garh Siwana)" },
    message: { 
      hi: "हर तीर्थ यात्री मेली गाँव (सिवाना समदड़ी मार्ग) आकर आध्यात्मिक शांति का अनुभव करे, यही हमारा मूल संकल्प है।", 
      en: "Our ultimate goal is that every pilgrim visits Meli Gaon / Siwana Samdari Road and experiences spiritual peace."
    },
    phone: "",
    email: "",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr11",
    name: { hi: "शा. कांतीलालजी चिमनलालजी ढेलडिया मुथा", en: "Sha Kantilalji Chimanlalji Dheldia Mutha" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "पुणे (गढ़ सिवाना)", en: "Pune (Garh Siwana)" },
    message: { 
      hi: "परम भक्ति, स्वाध्याय व शुद्ध संयमपूर्ण समाज निर्माण ही जीवन का सार है।", 
      en: "Supreme devotion, study of self, and building a disciplined society is the essence of life."
    },
    phone: "",
    email: "",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr12",
    name: { hi: "शा. मांगीलालजी गुलाबचंदजी विनायकीया", en: "Sha Mangilalji Gulabchandji Vinaykiya" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "हैदराबाद (धानेरा)", en: "Hyderabad (Dhanera)" },
    message: { 
      hi: "साधु सेवा और तीर्थोद्धार के पावन कार्यों से जुड़कर धन्यता की अनुभूति होती है।", 
      en: "Feeling blessed by engaging in holy tasks of monastic service and temple elevation."
    },
    phone: "",
    email: "",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr13",
    name: { hi: "शा. सोहनलालजी मिश्रीमलजी जीरावला", en: "Sha Sohanlalji Mishrishmalji Jirawala" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "सूरत (समदड़ी)", en: "Surat (Samdari)" },
    message: { 
      hi: "साधार्मिक सेवा और धर्म प्रभावना धर्म का वास्तविक मर्म है।", 
      en: "Serving fellow brothers and glorifying the dharma is the real essence of religion."
    },
    phone: "",
    email: "",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr10",
    name: { hi: "शा. संघवी अमृतलालजी धुडाजी भंसाली", en: "Sanghvi Amritlalji Dhudaji Bhansali" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "पुणे (सिवाना)", en: "Pune (Siwana)" },
    message: { 
      hi: "अपनी पावन भूमि सिवाना और मेली रोड क्षेत्र का धार्मिक पुनरुत्थान देखना ही जीवन का परम आनंद है।", 
      en: "Witnessing the glorious religious revival of our historical Siwana regional sectors is a matter of profound joy."
    },
    phone: "",
    email: "",
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
    phone: "",
    email: "",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr15",
    name: { hi: "शा. संघवी बाबुलालजी चिमनलालजी लुंकड", en: "Sanghvi Babulalji Chimanlalji Lunkad" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "पुणे (डीसा) (सिवाना)", en: "Pune (Deesa) (Siwana)" },
    message: { 
      hi: "समाज सेवा में समर्पित हर एक क्षण प्रभु सुमिरन के समान है। हम सबको मिलकर इस धर्म ध्वज को बढ़ाना है।", 
      en: "Every single breath spent in humanistic service matches prayer itself. May we all hold this flag of truth high."
    },
    phone: "",
    email: "",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr16",
    name: { hi: "शा. बाबुलालजी राजमलजी भंसाली", en: "Sha Babulalji Rajmalji Bhansali" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "मुंबई (पाटी)", en: "Mumbai (Pati)" },
    message: { 
      hi: "नियमित धार्मिक सेवा एवं जन-कल्याण हमारी संस्था के मुख्य अंग हैं।", 
      en: "Regular religious services and public welfare are core organs of our institution."
    },
    phone: "",
    email: "",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "tr17",
    name: { hi: "शा. भंवरलालजी मगनीरामजी सिंघवी", en: "Sha Bhanwarlalji Maganiramji Singhvi" },
    designation: { hi: "ट्रस्टी (Trustee)", en: "Trustee" },
    city: { hi: "हैदराबाद (राखी)", en: "Hyderabad (Rakhi)" },
    message: { 
      hi: "समाज उत्थान और संघ सेवा हमारे जीवन के सर्वोच्च लक्ष्य हैं।", 
      en: "Social upliftment and congregation service are the highest milestones of our lives."
    },
    phone: "",
    email: "",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  }
];

// Room Categories
export const roomCategories: RoomCategory[] = [
  {
    id: "rc1",
    name: { hi: "सामूहिक हॉल बुकिंग (Full Hall Booking)", en: "Full Hall Booking" },
    description: {
      hi: "बड़े समूहों, यात्रियों, धार्मिक सम्मेलनों और सामूहिक प्रवास के लिए अत्यंत सुविधाजनक स्थान।",
      en: "Suitable for large groups, yatris, religious gatherings, and community stays."
    },
    type: "Hall",
    capacity: 35,
    ratePerDay: 3000,
    availableRooms: 3,
    amenities: [
      { hi: "बिछौने व गद्दे", en: "Comfortable Beddings" },
      { hi: "उत्कृष्ट वातानुकूलन", en: "Central Air Cooling" },
      { hi: "अटैच्ड वाशरूम", en: "Attached Washrooms" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=400",
    images: {
      exterior: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600",
      interior: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600",
      beds: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=600",
      washroom: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
      storage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600",
      common: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
    }
  },
  {
    id: "rc2",
    name: { hi: "हॉल सिंगल बेड बुकिंग (Hall Bed Booking)", en: "Hall Bed Booking" },
    description: {
      hi: "सामूहिक हॉल के भीतर व्यक्तिगत बेड आबंटन एवं तिजोरी (लॉकर) की वैकल्पिक व्यवस्था। (बेड: ₹200, लॉकर: ₹100)",
      en: "Individual bed allocation within the hall with optional locker facility. (Bed: INR 200, Locker: INR 100)"
    },
    type: "Hall Bed",
    capacity: 1,
    ratePerDay: 200,
    availableRooms: 60,
    amenities: [
      { hi: "एकल गद्दे व बेड", en: "Single Clean Bed" },
      { hi: "सुरक्षित लॉकर (₹100)", en: "Optional Locker (INR 100)" },
      { hi: "साफ कॉमन बाथरूम", en: "Clean Shared Bathrooms" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1555854877-abab0e564b86?auto=format&fit=crop&q=80&w=400",
    images: {
      exterior: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
      interior: "https://images.unsplash.com/photo-1555854877-abab0e564b86?auto=format&fit=crop&q=80&w=600",
      beds: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600",
      washroom: "https://images.unsplash.com/photo-1620626011761-996317b69763?auto=format&fit=crop&q=80&w=600",
      storage: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=600",
      common: "https://images.unsplash.com/photo-1521791136368-1a46827d0af1?auto=format&fit=crop&q=80&w=600"
    }
  },
  {
    id: "rc3",
    name: { hi: "वातानुकूलित पारिवारिक कमरा - 4 बेड (AC Family Room)", en: "AC Family Room" },
    description: {
      hi: "सुरक्षित सुविधाओं और बेहतरीन वातानुकूलन के साथ ४ बेड वाला कमरा परिवारों तथा सम्मानीय यात्रियों के लिए उत्तम चुनाव।",
      en: "Air-conditioned room with 4 beds suitable for families and visitors."
    },
    type: "AC",
    capacity: 4,
    ratePerDay: 700,
    availableRooms: 1,
    amenities: [
      { hi: "चार आरामदेह पलंग", en: "4 Comfortable Beds" },
      { hi: "शक्तिशाली एसी", en: "High-Cooling A/C" },
      { hi: "अटैच्ड वाशरूम व गीजर", en: "Private Bathroom & Geyser" },
      { hi: "वार्डरोब स्टोरेज", en: "Spacious Wardrobe" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1611891404114-5090f2046b45?auto=format&fit=crop&q=80&w=400",
    images: {
      exterior: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600",
      interior: "https://images.unsplash.com/photo-1611891404114-5090f2046b45?auto=format&fit=crop&q=80&w=600",
      beds: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600",
      washroom: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
      storage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600",
      common: "https://images.unsplash.com/photo-1445991842772-097fea258e7b?auto=format&fit=crop&q=80&w=600"
    }
  }
];

// Seed Labh / Chadhava Opportunities
export const seedLabhOpportunities: LabhOpportunity[] = [
  // --- VIHARDHAM OPPORTUNITIES ---
  {
    id: "vlo_dhaw",
    title: { hi: "धर्मशाला विंग निर्माण सहयोग (12 विंग उपलब्ध)", en: "Dharamshala Wing (12 Available Sections)" },
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
    title: { hi: "शांताबा भोजनशाला स्थायी भोजन तिथि लाभ", en: "Shantaba Bhojanshala Permanent Meal Tithi" },
    description: { hi: "वर्ष के किसी एक पावन स्मृति दिवस (जन्मदिन या पुण्यतिथि) पर यात्रियों एवं साधर्मिकों के लिए भोजनशाला में स्थायी तिथि भोजन का लाभ।", en: "Sponsor a permanent yearly lunch/dinner date (tithi) in remembrance of ancestral souls or family milestones." },
    amount: 27000,
    isAvailable: true,
    category: "Bhojanshala"
  },
  {
    id: "vlo_bpbt",
    title: { hi: "शांताबा भोजनशाला स्थायी अल्पाहार तिथि लाभ", en: "Shantaba Bhojanshala Permanent Breakfast Tithi" },
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

// Trust News
export const seedNews: NewsItem[] = [
  {
    id: "n1",
    title: { hi: "मेली गाँव (सिवाना समदड़ी मार्ग) जिनालय का गर्भगृह संगमरमर नक्काशी कार्य पूर्ण", en: "Sanctum Marble Engraving Architecture Complete" },
    summary: { hi: "राजस्थान के कुशल कारीगरों द्वारा मकराना संगमरमर का अलौकिक नक्काशी कार्य सम्पन्न हो चुका है।", en: "Highly skilled artisans from Mewar have finished the divine white Makrana marble ceiling carvings." },
    content: { 
      hi: "परम हर्ष के साथ सूचित किया जाता है कि हमारी मुख्य मन्दिर मन्दिर मेली रोड स्थित मेली गाँव (सिवाना समदड़ी मार्ग) में मुख्य गर्भगृह का अलौकिक श्वेत मकराना संगमरमर नक्काशी कार्य पूजनीय संतों के आशीर्वाद से सफलता पूर्वक पूर्ण कर लिया गया है। इस वर्ष के अंत में भव्य अंजनशलाका प्रतिष्ठा महोत्सव का आयोजन किए जाने की योजना है।", 
      en: "We are joyous to announce that the intricate marble work of our principal temple under construction at Meli Gaon / Siwana Samdari Road has been successfully completed. Highly refined white marble columns and pristine designs now adorn the sanctum. The grand Pratishtha Mahotsav is planned by the end of this year." 
    },
    category: "Construction",
    date: "2026-05-20",
    imageUrl: "https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "n2",
    title: { hi: "विहारधाम में परम पूज्य साधु-साध्वी भगवंतों का अभूतपूर्व आगमन व चातुर्मास स्थापना", en: "Revered Jain Monks Enter Meli Gaon / Siwana Samdari Road Vihardham for Chaturmas" },
    summary: { hi: "परम पूज्य गच्छाधिपति भगवंतों के पावन चरण मेली गाँव (सिवाना समदड़ी मार्ग) विहारधाम की पावन धरा पर पड़े।", en: "A massive group of holy Jain monks and nuns arrived at our newly built Vihar stay suites." },
    content: { 
      hi: "मेली गाँव (सिवाना समदड़ी मार्ग) स्थित श्री सिवांची जैन विहारधाम में आगामी चातुर्मास हेतु पूज्य संतों का मंगल प्रवेश संपन्न हुआ। विहारधाम की व्यवस्थाओं से प्रभावित होकर पूज्य संतों ने संपूर्ण चातुर्मास यही व्यतीत करने की सहर्ष स्वीकृति दी है। प्रतिदिन प्रातः व्याख्यान एवं सांय भक्तामर प्रवचन माला का आयोजन किया जा रहा है।", 
      en: "The Siwanchi Jain community organized a grand welcome procession for the traveling sadhus who arrived at Meli Gaon / Siwana Samdari Road. Impressed with the strict non-electric and pure warm water management facilities at Vihardham, they have agreed to stay for the holy four-month Chaturmas. Lectures take place daily between 8 AM and 10 AM." 
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
    location: { hi: "मेली गाँव (सिवाना समदड़ी मार्ग) जैन मंदिर संकुल", en: "Meli Gaon / Siwana Samdari Road Temple & Upashray Complex" },
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



/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Phone, Mail, Award, X, Heart, Shield, Globe } from 'lucide-react';

// Data types & assets imports
import { RoomCategory, Language, RoomBooking, PalaceBooking, Donation, Volunteer, TrustMember, AuditLog, ContactQuery, LabhInquiry, GalleryItem, SlideshowImage } from './types';
import { roomCategories, staticTranslations, seedNews, seedEvents, seedGallery } from './data';
import { db, auth, OperationType, handleFirestoreError } from './firebase';
import { collection, getDocs as firestoreGetDocs, doc, setDoc, deleteDoc, Query, QuerySnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
// @ts-ignore
import campusPanoramicLayout from './assets/images/campus_panoramic_layout_1781257618429.jpg';

// Component imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutTab from './components/AboutTab';
import VihardhamTab from './components/VihardhamTab';
import OswalPalaceTab from './components/OswalPalaceTab';
import DonationSystem from './components/DonationSystem';
import LabhChadhava from './components/LabhChadhava';
import VatsalyaDhamTab from './components/VatsalyaDhamTab';
import ContactTab from './components/ContactTab';
import AdminDashboard from './components/AdminDashboard';
import ProjectVideoPlayer from './components/ProjectVideoPlayer';
import GalleryVideosTab from './components/GalleryVideosTab';

// Helper function to compress large custom base64 uploaded files to prevent Firestore write limit failures (1MB)
function compressBase64Image(base64Str: string, maxDim = 900, quality = 0.6): Promise<string> {
  return new Promise((resolve) => {
    if (!base64Str || !base64Str.startsWith('data:image/')) {
      resolve(base64Str);
      return;
    }
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(base64Str);
        }
      } catch (e) {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
    img.src = base64Str;
  });
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAdminUser(
        user !== null && (
          user.email === 'mokshit.jain.bba2025@atlasskilltech.university' ||
          user.email === 'kamal.bhandari@yahoo.com' ||
          user.email === 'team.siwanchitrust@gmail.com'
        )
      );
    });
    return () => unsubscribe();
  }, []);

  const [currentLang, setLang] = useState<Language>('hi');
  const [activeTab, _setActiveTab] = useState<string>(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    if (path === 'dharma-sahyog' || path === 'donations') return 'donations';
    if (path === 'oswal-palace' || path === 'palace') return 'palace';
    const validTabs = ['home', 'about', 'vihardham', 'palace', 'vatsalya', 'donations', 'gallery', 'contact', 'admin'];
    return validTabs.includes(path) ? path : 'home';
  });

  const setActiveTab = (tab: string) => {
    _setActiveTab(tab);
    let pathSegment = tab;
    if (tab === 'donations') pathSegment = 'dharma-sahyog';
    if (tab === 'palace') pathSegment = 'oswal-palace';
    const newPath = tab === 'home' ? '/' : `/${pathSegment}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
    // Scroll to top on tab change for smoother transition
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const [showVideoModal, setShowVideoModal] = useState(false);

  // Sync back/forward button clicks to active tab state
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      if (path === 'dharma-sahyog' || path === 'donations') {
        _setActiveTab('donations');
        return;
      }
      if (path === 'oswal-palace' || path === 'palace') {
        _setActiveTab('palace');
        return;
      }
      const validTabs = ['home', 'about', 'vihardham', 'palace', 'vatsalya', 'donations', 'gallery', 'contact', 'admin'];
      _setActiveTab(validTabs.includes(path) ? path : 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Persistence States synced manually to LocalStorage
  const [roomBookings, setRoomBookings] = useState<RoomBooking[]>([]);
  const [palaceBookings, setPalaceBookings] = useState<PalaceBooking[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [valunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [membersList, setMembersList] = useState<TrustMember[]>([]);
  const [contactQueries, setContactQueries] = useState<ContactQuery[]>([]);
  const [labhInquiries, setLabhInquiries] = useState<LabhInquiry[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Serialization trackers to dynamically prevent duplicate Firestore writes (quota protection)
  const loadedRoomBookingsRef = useRef<Record<string, string>>({});
  const loadedPalaceBookingsRef = useRef<Record<string, string>>({});
  const loadedDonationsRef = useRef<Record<string, string>>({});
  const loadedVolunteersRef = useRef<Record<string, string>>({});
  const loadedMembersRef = useRef<Record<string, string>>({});
  const loadedAuditLogsRef = useRef<Record<string, string>>({});
  const loadedGalleryItemsRef = useRef<Record<string, string>>({});
  const loadedSlideshowImagesRef = useRef<Record<string, string>>({});
  const loadedRoomCategoriesRef = useRef<Record<string, string>>({});

  const [dbQuotaExceeded, setDbQuotaExceeded] = useState(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      return localStorage.getItem('siwanchi_quota_exceeded_day') === today;
    } catch (_) {
      return false;
    }
  });

  const handleQuotaError = () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('siwanchi_quota_exceeded_day', today);
    } catch (_) {}
    setDbQuotaExceeded(true);
  };

  const getDocs = async <T, U>(colRef: Query<T, U>): Promise<QuerySnapshot<T, U>> => {
    const today = new Date().toISOString().split('T')[0];
    if (dbQuotaExceeded || localStorage.getItem('siwanchi_quota_exceeded_day') === today) {
      throw new Error('resource-exhausted: Quota limit exceeded');
    }
    try {
      return await firestoreGetDocs(colRef);
    } catch (err: any) {
      const errStr = String(err?.message || err || '');
      const errCode = String(err?.code || '');
      if (errStr.includes('resource-exhausted') || errStr.includes('Quota exceeded') || errStr.includes('quota') || errCode.includes('resource-exhausted')) {
        handleQuotaError();
      }
      throw err;
    }
  };
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const local = localStorage.getItem('siwanchi_gallery');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (_) {}
    }
    return [];
  });
  const [slideshowImages, setSlideshowImages] = useState<SlideshowImage[]>(() => {
    const local = localStorage.getItem('siwanchi_slideshow_images');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (_) {}
    }
    return [];
  });
  const [roomCategoriesList, setRoomCategoriesList] = useState<RoomCategory[]>(() => {
    const localCat = localStorage.getItem('siwanchi_room_categories');
    return localCat ? JSON.parse(localCat) : roomCategories;
  });

  const t = staticTranslations[currentLang];

  // Safe utility to handle Firestore writes without crashing the app flow
  const safeFirestoreWrite = async (op: () => Promise<any>, opType: OperationType, path: string) => {
    if (dbQuotaExceeded) return;
    try {
      await op();
    } catch (err: any) {
      const errStr = String(err?.message || err || '');
      const errCode = String(err?.code || '');
      if (errStr.includes('resource-exhausted') || errStr.includes('Quota exceeded') || errStr.includes('quota') || errCode.includes('resource-exhausted')) {
        handleQuotaError();
      }
      try {
        handleFirestoreError(err, opType, path);
      } catch (_) {}
    }
  };

  // Load Seed Database from Firestore (or fallback to LocalStorage/static seeds)
  useEffect(() => {
    async function loadAllFromFirestore() {
      const today = new Date().toISOString().split('T')[0];
      const isQuotaExceededToday = dbQuotaExceeded || localStorage.getItem('siwanchi_quota_exceeded_day') === today;
      // 1. Slideshow images
      try {
        if (isQuotaExceededToday) {
          throw new Error('resource-exhausted: Quota limit exceeded');
        }
        const slideshowSnap = await getDocs(collection(db, 'slideshow_images'));
        
        // Define our grand 12 default slides
        const defaultSlideshow: SlideshowImage[] = [
          {
            id: "slide_1",
            url: campusPanoramicLayout,
            title: { hi: "विहारधाम जैन मंदिर एवं ओसवाल पैलेस संकुल", en: "Vihardham Jain Temple & Oswal Palace Complex" },
            caption: { hi: "मेली गाँव (सिवाना समदड़ी मार्ग) जैन मंदिर संकुल का विहंगम दृश्य - अध्यात्म एवं संस्कृति का संगम", en: "Panoramic layout overview of the divine spiritual and wedding venue campus" }
          },
          {
            id: "slide_2",
            url: "https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=1200",
            title: { hi: "भव्य श्री आदिनाथ शिखरबद्ध जिनालय", en: "The Grand Shikharbandh Adinath Temple" },
            caption: { hi: "नवानीर्मित पावन जैन मंदिर - भक्ति, शांति और ध्यान का पावन धाम", en: "Newly built sacred Jain Temple - A hub of devotion, peace, and mindfulness" }
          },
          {
            id: "slide_3",
            url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200",
            title: { hi: "ओसवाल पैलेस आलीशान वेडिंग हॉल", en: "Oswal Palace Luxurious Hall" },
            caption: { hi: "सामाजिक सम्मेलनों, मांगलिक प्रसंगों एवं दिव्य विवाह आयोजनों के लिए उत्कृष्ट स्थल", en: "A premium multi-purpose venue equipped with all modern amenities for marriages" }
          },
          {
            id: "slide_4",
            url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1200",
            title: { hi: "साधु-साध्वी पावन विहारधाम परिसर", en: "Vihardham Spiritual Sanctuary" },
            caption: { hi: "पूज्य जैन संतों के लिए वातानुकूलित कमरे, व्याख्यान हॉल एवं नि:शुल्क सेवाएं", en: "Comfortable air-conditioned rooms, large discourse halls, and free facilities for monks" }
          },
          {
            id: "slide_5",
            url: "https://images.unsplash.com/photo-1609137882641-59ac9d3bf30a?auto=format&fit=crop&q=80&w=1200",
            title: { hi: "साधना भवन एवं आध्यात्मिक आराधना", en: "Sadhana Bhavan & Spiritual Aradhana" },
            caption: { hi: "परम शांति की खोज में ध्यान, प्राणायाम एवं सात्विक स्वाध्याय साधना शिविर", en: "Spiritual discourse rooms, yoga spaces and peace-seeking self-realization chambers" }
          },
          {
            id: "slide_6",
            url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200",
            title: { hi: "विशाल रसोड़ा एवं नवकारसी भोजनशाला", en: "Grand Dining Hall & Pure Rasoda" },
            caption: { hi: "यात्रियों के लिए शुद्ध सात्विक घी युक्त उत्तम जैन भोजन की सुचारू व्यवस्था", en: "Exquisite pure traditional Jain food served under pristine hygienic standards" }
          },
          {
            id: "slide_7",
            url: "https://images.unsplash.com/photo-1501379900244-479cf85a97bc?auto=format&fit=crop&q=80&w=1200",
            title: { hi: "नयनाभिराम गुरुकृपा वाटिका एवं उद्यान", en: "Gurukrupa Nature Gardens" },
            caption: { hi: "चारों ओर हरी-भरी सुंदर वाटिकाओं से सुसज्जित शांत प्राकृतिक और आध्यात्मिक वातावरण", en: "Relaxing lush green surroundings offering fresh breeze and beautiful meditation spots" }
          },
          {
            id: "slide_8",
            url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200",
            title: { hi: "आधुनिक  डीलक्स धर्मशाला वातानुकूलित रूम", en: "Comfortable AC Dharamshala Lodging" },
            caption: { hi: "दूर-दराज से पधारे श्रावक-श्राविकाओं के सुखद आरामदायक निवास हेतु स्वच्छ  डीलक्स कमरे", en: "High quality AC rooms equipped with modern attach bathrooms and pristine quality linen" }
          },
          {
            id: "slide_9",
            url: "https://images.unsplash.com/photo-1598977123418-45f04b61b49e?auto=format&fit=crop&q=80&w=1200",
            title: { hi: "राजपूताना मारवाड़ी भव्य पाषाण नक्काशी", en: "Traditional Pink Stone Architecture" },
            caption: { hi: "कला संस्कृति की धरोहर संजोए बेजोड़ गुलाबी शिल्पकारों की अनुपम कलाकृति", en: "Beautiful hand-carved pillars and custom arches demonstrating stunning Rajasthani architecture" }
          },
          {
            id: "slide_10",
            url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200",
            title: { hi: "स्वाध्याय ज्ञान केंद्र पुस्तकालय", en: "Swadhyay Jain Literature Library" },
            caption: { hi: "जैन आगम, इतिहास, दर्शन एवं धर्म ग्रंथों का अध्ययन करने हेतु शांत स्वाध्याय भवन", en: "A peaceful air-conditioned room housing historic literature, spiritual scriptures and texts" }
          },
          {
            id: "slide_11",
            url: "https://images.unsplash.com/photo-1469571486040-0b3b27574b7c?auto=format&fit=crop&q=80&w=1200",
            title: { hi: "अनुकंपा जीवदया एवं परोपकार गतिविधियां", en: "Jivdaya & Community Compassion Projects" },
            caption: { hi: "अहिंसा परमो धर्म के सिद्धांत पर जरूरतमंदों की सेवा, चिकित्सा एवं परमार्थ सेवा", en: "Regular free health diagnosis camps and relief operations supporting our core values" }
          },
          {
            id: "slide_12",
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
            title: { hi: "संध्या कालीन आकर्षक विद्युत सज्जा", en: "Magical Light Illumination Ceremony" },
            caption: { hi: "रात्रि के पावन समय विद्युत दीपों व रोशनी की चकाचौंध से जगमगाता मंदिर", en: "Stunning night setup of the whole compound shining with celestial spiritual lights" }
          }
        ];

        if (!slideshowSnap.empty) {
          const list: SlideshowImage[] = [];
          slideshowSnap.forEach(docSnap => {
            list.push({ id: docSnap.id, ...docSnap.data() } as SlideshowImage);
          });
          
          // Check if firestore is holding ONLY the old 4 default slides
          const oldDefaultIds = ['slide_1', 'slide_2', 'slide_3', 'slide_4'];
          const isOnlyOldDefaultsInFirestore = list.length <= 4 && list.every(s => oldDefaultIds.includes(s.id));

          // PROTECT LOCAL CUSTOM IMAGES FROM OVERWRITE BY STALE DB DEFAULTS
          const localStr = localStorage.getItem('siwanchi_slideshow_images');
          let hasCustomLocal = false;
          if (localStr) {
            try {
              const parsedLocal = JSON.parse(localStr) as SlideshowImage[];
              const default12Ids = defaultSlideshow.map(s => s.id);
              const hasCustomInLocal = parsedLocal.some(s => !default12Ids.includes(s.id));
              if (hasCustomInLocal && isOnlyOldDefaultsInFirestore) {
                hasCustomLocal = true;
                parsedLocal.forEach(s => {
                  loadedSlideshowImagesRef.current[s.id] = JSON.stringify(s);
                });
                setSlideshowImages(parsedLocal);
              }
            } catch (_) {}
          }
          if (!hasCustomLocal) {
            if (isOnlyOldDefaultsInFirestore) {
              defaultSlideshow.forEach(s => {
                loadedSlideshowImagesRef.current[s.id] = JSON.stringify(s);
              });
              setSlideshowImages(defaultSlideshow);
              if (isAdminUser) {
                for (const s of defaultSlideshow) {
                  await safeFirestoreWrite(() => setDoc(doc(db, 'slideshow_images', s.id), s), OperationType.WRITE, `slideshow_images/${s.id}`);
                }
              }
            } else {
              list.forEach(s => {
                loadedSlideshowImagesRef.current[s.id] = JSON.stringify(s);
              });
              setSlideshowImages(list);
            }
          }
        } else {
          defaultSlideshow.forEach(s => {
            loadedSlideshowImagesRef.current[s.id] = JSON.stringify(s);
          });
          setSlideshowImages(defaultSlideshow);
          if (isAdminUser) {
            for (const s of defaultSlideshow) {
              await safeFirestoreWrite(() => setDoc(doc(db, 'slideshow_images', s.id), s), OperationType.WRITE, `slideshow_images/${s.id}`);
            }
          }
        }
      } catch (err: any) {
        const errStr = String(err?.message || err || '');
        if (errStr.includes('resource-exhausted') || errStr.includes('Quota exceeded') || errStr.includes('quota')) {
          setDbQuotaExceeded(true);
        }
        try { handleFirestoreError(err, OperationType.GET, 'slideshow_images'); } catch (_) {}
        const localSlideshow = localStorage.getItem('siwanchi_slideshow_images');
        if (localSlideshow) {
          try {
            const parsed = JSON.parse(localSlideshow);
            parsed.forEach((s: any) => {
              loadedSlideshowImagesRef.current[s.id] = JSON.stringify(s);
            });
            setSlideshowImages(parsed);
          } catch (_) {}
        }
      }

      // 2. Gallery items
      try {
        if (isQuotaExceededToday) {
          throw new Error('resource-exhausted: Quota limit exceeded');
        }
        const gallerySnap = await getDocs(collection(db, 'gallery_items'));
        if (!gallerySnap.empty) {
          const list: GalleryItem[] = [];
          gallerySnap.forEach(docSnap => {
            list.push({ id: docSnap.id, ...docSnap.data() } as GalleryItem);
          });
          
          // PROTECT LOCAL GALLERY FROM OVERWRITE BY LATE INITIALIZATIONS
          const localGalleryStr = localStorage.getItem('siwanchi_gallery');
          let hasCustomLocalGallery = false;
          if (localGalleryStr) {
            try {
              const parsedLocalGallery = JSON.parse(localGalleryStr) as GalleryItem[];
              if (parsedLocalGallery.length > list.length) {
                hasCustomLocalGallery = true;
                parsedLocalGallery.forEach(g => {
                  loadedGalleryItemsRef.current[g.id] = JSON.stringify(g);
                });
                setGalleryItems(parsedLocalGallery);
              }
            } catch (_) {}
          }
          if (!hasCustomLocalGallery) {
            list.forEach(g => {
              loadedGalleryItemsRef.current[g.id] = JSON.stringify(g);
            });
            setGalleryItems(list);
          }
        } else {
          seedGallery.forEach(g => {
            loadedGalleryItemsRef.current[g.id] = JSON.stringify(g);
          });
          setGalleryItems(seedGallery);
          if (isAdminUser) {
            for (const g of seedGallery) {
              await safeFirestoreWrite(() => setDoc(doc(db, 'gallery_items', g.id), g), OperationType.WRITE, `gallery_items/${g.id}`);
            }
          }
        }
      } catch (err: any) {
        const errStr = String(err?.message || err || '');
        if (errStr.includes('resource-exhausted') || errStr.includes('Quota exceeded') || errStr.includes('quota')) {
          setDbQuotaExceeded(true);
        }
        try { handleFirestoreError(err, OperationType.GET, 'gallery_items'); } catch (_) {}
        const localGallery = localStorage.getItem('siwanchi_gallery');
        if (localGallery) {
          try {
            const parsed = JSON.parse(localGallery);
            parsed.forEach((g: any) => {
              loadedGalleryItemsRef.current[g.id] = JSON.stringify(g);
            });
            setGalleryItems(parsed);
          } catch (_) {}
        } else {
          seedGallery.forEach(g => {
            loadedGalleryItemsRef.current[g.id] = JSON.stringify(g);
          });
          setGalleryItems(seedGallery);
        }
      }

      // 3. Room categories
      try {
        if (isQuotaExceededToday) {
          throw new Error('resource-exhausted: Quota limit exceeded');
        }
        const rcSnap = await getDocs(collection(db, 'room_categories'));
        if (!rcSnap.empty) {
          const list: RoomCategory[] = [];
          rcSnap.forEach(docSnap => {
            list.push({ id: docSnap.id, ...docSnap.data() } as RoomCategory);
          });
          list.forEach(rc => {
            loadedRoomCategoriesRef.current[rc.id] = JSON.stringify(rc);
          });
          setRoomCategoriesList(list);
        } else {
          roomCategories.forEach(rc => {
            loadedRoomCategoriesRef.current[rc.id] = JSON.stringify(rc);
          });
          setRoomCategoriesList(roomCategories);
          if (isAdminUser) {
            for (const rc of roomCategories) {
              await safeFirestoreWrite(() => setDoc(doc(db, 'room_categories', rc.id), rc), OperationType.WRITE, `room_categories/${rc.id}`);
            }
          }
        }
      } catch (err: any) {
        const errStr = String(err?.message || err || '');
        if (errStr.includes('resource-exhausted') || errStr.includes('Quota exceeded') || errStr.includes('quota')) {
          setDbQuotaExceeded(true);
        }
        try { handleFirestoreError(err, OperationType.GET, 'room_categories'); } catch (_) {}
        roomCategories.forEach(rc => {
          loadedRoomCategoriesRef.current[rc.id] = JSON.stringify(rc);
        });
        setRoomCategoriesList(roomCategories);
      }

      // 4. Room bookings
      try {
        if (isQuotaExceededToday) {
          throw new Error('resource-exhausted: Quota limit exceeded');
        }
        const roomsSnap = await getDocs(collection(db, 'room_bookings'));
        const list: RoomBooking[] = [];
        roomsSnap.forEach(docSnap => {
          if (docSnap.id !== "rb_seed_1") {
            const item = { id: docSnap.id, ...docSnap.data() } as RoomBooking;
            list.push(item);
            loadedRoomBookingsRef.current[item.id] = JSON.stringify(item);
          } else {
            // Cleanup the default seed document from database
            safeFirestoreWrite(() => deleteDoc(doc(db, 'room_bookings', 'rb_seed_1')), OperationType.DELETE, 'room_bookings/rb_seed_1');
          }
        });
        setRoomBookings(list);
      } catch (err: any) {
        const errStr = String(err?.message || err || '');
        if (errStr.includes('resource-exhausted') || errStr.includes('Quota exceeded') || errStr.includes('quota')) {
          setDbQuotaExceeded(true);
        }
        try { handleFirestoreError(err, OperationType.GET, 'room_bookings'); } catch (_) {}
        const localRooms = localStorage.getItem('siwanchi_rooms');
        if (localRooms) {
          try {
            const parsed = JSON.parse(localRooms).filter((r: any) => r.id !== "rb_seed_1");
            parsed.forEach((r: any) => {
              loadedRoomBookingsRef.current[r.id] = JSON.stringify(r);
            });
            setRoomBookings(parsed);
          } catch (_) {}
        }
      }

      // 5. Palace bookings
      try {
        if (isQuotaExceededToday) {
          throw new Error('resource-exhausted: Quota limit exceeded');
        }
        const palaceSnap = await getDocs(collection(db, 'palace_bookings'));
        const list: PalaceBooking[] = [];
        palaceSnap.forEach(docSnap => {
          if (docSnap.id !== "pb_seed_1") {
            const item = { id: docSnap.id, ...docSnap.data() } as PalaceBooking;
            list.push(item);
            loadedPalaceBookingsRef.current[item.id] = JSON.stringify(item);
          } else {
            // Cleanup the default seed document from database
            safeFirestoreWrite(() => deleteDoc(doc(db, 'palace_bookings', 'pb_seed_1')), OperationType.DELETE, 'palace_bookings/pb_seed_1');
          }
        });
        setPalaceBookings(list);
      } catch (err: any) {
        const errStr = String(err?.message || err || '');
        if (errStr.includes('resource-exhausted') || errStr.includes('Quota exceeded') || errStr.includes('quota')) {
          setDbQuotaExceeded(true);
        }
        try { handleFirestoreError(err, OperationType.GET, 'palace_bookings'); } catch (_) {}
        const localPalace = localStorage.getItem('siwanchi_palace');
        if (localPalace) {
          try {
            const parsed = JSON.parse(localPalace).filter((p: any) => p.id !== "pb_seed_1");
            parsed.forEach((p: any) => {
              loadedPalaceBookingsRef.current[p.id] = JSON.stringify(p);
            });
            setPalaceBookings(parsed);
          } catch (_) {}
        }
      }

      // 6. Donations
      try {
        if (isQuotaExceededToday) {
          throw new Error('resource-exhausted: Quota limit exceeded');
        }
        const donationSnap = await getDocs(collection(db, 'donations'));
        const list: Donation[] = [];
        donationSnap.forEach(docSnap => {
          if (docSnap.id !== "don_seed_1") {
            const item = { id: docSnap.id, ...docSnap.data() } as Donation;
            list.push(item);
            loadedDonationsRef.current[item.id] = JSON.stringify(item);
          } else {
            // Cleanup the default seed document from database
            safeFirestoreWrite(() => deleteDoc(doc(db, 'donations', 'don_seed_1')), OperationType.DELETE, 'donations/don_seed_1');
          }
        });
        setDonations(list);
      } catch (err: any) {
        const errStr = String(err?.message || err || '');
        if (errStr.includes('resource-exhausted') || errStr.includes('Quota exceeded') || errStr.includes('quota')) {
          setDbQuotaExceeded(true);
        }
        try { handleFirestoreError(err, OperationType.GET, 'donations'); } catch (_) {}
        const localDonations = localStorage.getItem('siwanchi_donations');
        if (localDonations) {
          try {
            const parsed = JSON.parse(localDonations).filter((d: any) => d.id !== "don_seed_1");
            parsed.forEach((d: any) => {
              loadedDonationsRef.current[d.id] = JSON.stringify(d);
            });
            setDonations(parsed);
          } catch (_) {}
        }
      }

      // 8. Volunteers
      try {
        if (isQuotaExceededToday) {
          throw new Error('resource-exhausted: Quota limit exceeded');
        }
        const volSnap = await getDocs(collection(db, 'volunteers'));
        if (!volSnap.empty) {
          const list: Volunteer[] = [];
          volSnap.forEach(docSnap => {
            const item = { id: docSnap.id, ...docSnap.data() } as Volunteer;
            list.push(item);
            loadedVolunteersRef.current[item.id] = JSON.stringify(item);
          });
          setVolunteers(list);
        } else {
          const seedVols: Volunteer[] = [
            {
              id: "vol_seed_1",
              name: "प्रमोद मुथा",
              mobile: "9425023491",
              email: "pramod.mutha@gmail.com",
              city: "Meli Siwana",
              wing: "Youth Wing",
              skills: "Event Management, Audio systems setups",
              registeredAt: new Date().toISOString()
            }
          ];
          seedVols.forEach(v => {
            loadedVolunteersRef.current[v.id] = JSON.stringify(v);
          });
          setVolunteers(seedVols);
          if (isAdminUser) {
            for (const v of seedVols) {
              await safeFirestoreWrite(() => setDoc(doc(db, 'volunteers', v.id), v), OperationType.WRITE, `volunteers/${v.id}`);
            }
          }
        }
      } catch (err: any) {
        const errStr = String(err?.message || err || '');
        if (errStr.includes('resource-exhausted') || errStr.includes('Quota exceeded') || errStr.includes('quota')) {
          setDbQuotaExceeded(true);
        }
        try { handleFirestoreError(err, OperationType.GET, 'volunteers'); } catch (_) {}
        const localVols = localStorage.getItem('siwanchi_vols');
        if (localVols) {
          try {
            const parsed = JSON.parse(localVols);
            parsed.forEach((v: any) => {
              loadedVolunteersRef.current[v.id] = JSON.stringify(v);
            });
            setVolunteers(parsed);
          } catch (_) {}
        }
      }

      // 9. Members
      try {
        if (isQuotaExceededToday) {
          throw new Error('resource-exhausted: Quota limit exceeded');
        }
        const memberSnap = await getDocs(collection(db, 'members'));
        if (!memberSnap.empty) {
          const list: TrustMember[] = [];
          memberSnap.forEach(docSnap => {
            const item = { id: docSnap.id, ...docSnap.data() } as TrustMember;
            list.push(item);
            loadedMembersRef.current[item.id] = JSON.stringify(item);
          });
          setMembersList(list);
        } else {
          const seedMembers: TrustMember[] = [
            {
              id: "mem_seed_1",
              name: "कमल चंद्र भंडारी",
              mobile: "9845033481",
              email: "kamal.bhandari@yahoo.com",
              city: "Samdari Barmer",
              memberType: "Life Member",
              registeredAt: new Date().toISOString()
            }
          ];
          seedMembers.forEach(m => {
            loadedMembersRef.current[m.id] = JSON.stringify(m);
          });
          setMembersList(seedMembers);
          if (isAdminUser) {
            for (const m of seedMembers) {
              await safeFirestoreWrite(() => setDoc(doc(db, 'members', m.id), m), OperationType.WRITE, `members/${m.id}`);
            }
          }
        }
      } catch (err: any) {
        const errStr = String(err?.message || err || '');
        if (errStr.includes('resource-exhausted') || errStr.includes('Quota exceeded') || errStr.includes('quota')) {
          setDbQuotaExceeded(true);
        }
        try { handleFirestoreError(err, OperationType.GET, 'members'); } catch (_) {}
        const localMembers = localStorage.getItem('siwanchi_members');
        if (localMembers) {
          try {
            const parsed = JSON.parse(localMembers);
            parsed.forEach((m: any) => {
              loadedMembersRef.current[m.id] = JSON.stringify(m);
            });
            setMembersList(parsed);
          } catch (_) {}
        }
      }

    }
    loadAllFromFirestore();
  }, []);

  // 10. Load Audit Logs when admin resolves securely
  useEffect(() => {
    async function loadAuditLogs() {
      if (isAdminUser) {
        const today = new Date().toISOString().split('T')[0];
        const isQuotaExceededToday = dbQuotaExceeded || localStorage.getItem('siwanchi_quota_exceeded_day') === today;
        try {
          if (isQuotaExceededToday) {
            throw new Error('resource-exhausted: Quota limit exceeded');
          }
          const auditSnap = await getDocs(collection(db, 'audit_logs'));
          if (!auditSnap.empty) {
            const list: AuditLog[] = [];
            auditSnap.forEach(docSnap => {
              const item = { id: docSnap.id, ...docSnap.data() } as AuditLog;
              list.push(item);
              loadedAuditLogsRef.current[item.id] = JSON.stringify(item);
            });
            setAuditLogs(list);
          } else {
            const initialLogs: AuditLog[] = [
              {
                id: "log_init",
                actor: "System Sentinel Daemon",
                role: "Super Admin",
                action: "Secure database session boot initialized",
                details: "All local caches synced, preloaded donor wall parameters operational.",
                timestamp: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
              }
            ];
            initialLogs.forEach(a => {
              loadedAuditLogsRef.current[a.id] = JSON.stringify(a);
            });
            setAuditLogs(initialLogs);
            for (const a of initialLogs) {
              await safeFirestoreWrite(() => setDoc(doc(db, 'audit_logs', a.id), a), OperationType.WRITE, `audit_logs/${a.id}`);
            }
          }
        } catch (err: any) {
          const errStr = String(err?.message || err || '');
          if (errStr.includes('resource-exhausted') || errStr.includes('Quota exceeded') || errStr.includes('quota')) {
            setDbQuotaExceeded(true);
          }
          try { handleFirestoreError(err, OperationType.GET, 'audit_logs'); } catch (_) {}
          const localAudit = localStorage.getItem('siwanchi_audit');
          if (localAudit) {
            try { setAuditLogs(JSON.parse(localAudit)); } catch (_) {}
          }
        }
      } else {
        const localAudit = localStorage.getItem('siwanchi_audit');
        if (localAudit) {
          try { setAuditLogs(JSON.parse(localAudit)); } catch (_) {}
        } else {
          setAuditLogs([
            {
              id: "log_init",
              actor: "System Sentinel Daemon",
              role: "Super Admin",
              action: "Secure database session boot initialized",
              details: "All local caches synced, preloaded donor wall parameters operational.",
              timestamp: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
            }
          ]);
        }
      }
    }
    loadAuditLogs();
  }, [isAdminUser]);

  // Safe localStorage helper to avoid crashing on QuotaExceededError or empty arrays
  const safeSaveLocal = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Local Storage write failed for ${key}:`, e);
    }
  };

  // Sync state modifications dynamically to both LocalStorage and Cloud Firestore
  useEffect(() => {
    if (roomBookings.length > 0) {
      safeSaveLocal('siwanchi_rooms', roomBookings);
      if (isAdminUser) {
        roomBookings.forEach(async (item) => {
          const serialized = JSON.stringify(item);
          if (loadedRoomBookingsRef.current[item.id] !== serialized) {
            loadedRoomBookingsRef.current[item.id] = serialized;
            await safeFirestoreWrite(() => setDoc(doc(db, 'room_bookings', item.id), item), OperationType.WRITE, `room_bookings/${item.id}`);
          }
        });
      }
    }
  }, [roomBookings, isAdminUser]);

  useEffect(() => {
    if (palaceBookings.length > 0) {
      safeSaveLocal('siwanchi_palace', palaceBookings);
      if (isAdminUser) {
        palaceBookings.forEach(async (item) => {
          const serialized = JSON.stringify(item);
          if (loadedPalaceBookingsRef.current[item.id] !== serialized) {
            loadedPalaceBookingsRef.current[item.id] = serialized;
            await safeFirestoreWrite(() => setDoc(doc(db, 'palace_bookings', item.id), item), OperationType.WRITE, `palace_bookings/${item.id}`);
          }
        });
      }
    }
  }, [palaceBookings, isAdminUser]);

  useEffect(() => {
    if (donations.length > 0) {
      safeSaveLocal('siwanchi_donations', donations);
      if (isAdminUser) {
        donations.forEach(async (item) => {
          const serialized = JSON.stringify(item);
          if (loadedDonationsRef.current[item.id] !== serialized) {
            loadedDonationsRef.current[item.id] = serialized;
            await safeFirestoreWrite(() => setDoc(doc(db, 'donations', item.id), item), OperationType.WRITE, `donations/${item.id}`);
          }
        });
      }
    }
  }, [donations, isAdminUser]);

  useEffect(() => {
    if (valunteers.length > 0) {
      safeSaveLocal('siwanchi_vols', valunteers);
      if (isAdminUser) {
        valunteers.forEach(async (item) => {
          const serialized = JSON.stringify(item);
          if (loadedVolunteersRef.current[item.id] !== serialized) {
            loadedVolunteersRef.current[item.id] = serialized;
            await safeFirestoreWrite(() => setDoc(doc(db, 'volunteers', item.id), item), OperationType.WRITE, `volunteers/${item.id}`);
          }
        });
      }
    }
  }, [valunteers, isAdminUser]);

  useEffect(() => {
    if (membersList.length > 0) {
      safeSaveLocal('siwanchi_members', membersList);
      if (isAdminUser) {
        membersList.forEach(async (item) => {
          const serialized = JSON.stringify(item);
          if (loadedMembersRef.current[item.id] !== serialized) {
            loadedMembersRef.current[item.id] = serialized;
            await safeFirestoreWrite(() => setDoc(doc(db, 'members', item.id), item), OperationType.WRITE, `members/${item.id}`);
          }
        });
      }
    }
  }, [membersList, isAdminUser]);

  useEffect(() => {
    if (auditLogs.length > 0) {
      safeSaveLocal('siwanchi_audit', auditLogs);
      if (isAdminUser) {
        auditLogs.forEach(async (item) => {
          const serialized = JSON.stringify(item);
          if (loadedAuditLogsRef.current[item.id] !== serialized) {
            loadedAuditLogsRef.current[item.id] = serialized;
            await safeFirestoreWrite(() => setDoc(doc(db, 'audit_logs', item.id), item), OperationType.WRITE, `audit_logs/${item.id}`);
          }
        });
      }
    }
  }, [auditLogs, isAdminUser]);

  useEffect(() => {
    if (galleryItems.length > 0) {
      safeSaveLocal('siwanchi_gallery', galleryItems);
      const syncGallery = async () => {
        if (isAdminUser) {
          await safeFirestoreWrite(async () => {
            const promises = galleryItems.map(async (item) => {
              const serialized = JSON.stringify(item);
              if (loadedGalleryItemsRef.current[item.id] !== serialized) {
                try {
                  await setDoc(doc(db, 'gallery_items', item.id), item);
                  loadedGalleryItemsRef.current[item.id] = serialized;
                } catch (e: any) {
                  console.error(`Failed to sync gallery doc ${item.id}:`, e);
                  throw new Error(`Media "${item.title.hi || item.title.en || 'Untitled'}" (Error: ${e.message || String(e)})`);
                }
              }
            });
            const results = await Promise.allSettled(promises);
            const failures = results.filter(r => r.status === 'rejected') as PromiseRejectedResult[];
            if (failures.length > 0) {
              const errors = failures.map(f => f.reason.message).join('\n');
              alert(`⚠️ Some gallery items failed to sync with the database server:\n\n${errors}\n\nTry using more compressed images under 1MB.`);
            }

            // Sync deletes cleanly without redundant server reads
            const currentIds = galleryItems.map(x => x.id);
            for (const id of Object.keys(loadedGalleryItemsRef.current)) {
              if (!currentIds.includes(id)) {
                try {
                  await deleteDoc(doc(db, 'gallery_items', id));
                  delete loadedGalleryItemsRef.current[id];
                } catch (e) {
                  console.error("Delete failed:", e);
                }
              }
            }
          }, OperationType.WRITE, 'gallery_items');
        }
      };
      syncGallery();
    }
  }, [galleryItems, isAdminUser]);

  useEffect(() => {
    if (slideshowImages.length > 0) {
      safeSaveLocal('siwanchi_slideshow_images', slideshowImages);
      const syncSlideshow = async () => {
        if (isAdminUser) {
          await safeFirestoreWrite(async () => {
            const promises = slideshowImages.map(async (item) => {
              const serialized = JSON.stringify(item);
              if (loadedSlideshowImagesRef.current[item.id] !== serialized) {
                try {
                  await setDoc(doc(db, 'slideshow_images', item.id), item);
                  loadedSlideshowImagesRef.current[item.id] = serialized;
                } catch (e: any) {
                  console.error(`Failed to sync slideshow doc ${item.id}:`, e);
                  throw new Error(`Slide "${item.title.hi || item.title.en || 'Untitled'}" (Error: ${e.message || String(e)})`);
                }
              }
            });
            const results = await Promise.allSettled(promises);
            const failures = results.filter(r => r.status === 'rejected') as PromiseRejectedResult[];
            if (failures.length > 0) {
              const errors = failures.map(f => f.reason.message).join('\n');
              alert(`⚠️ Some slideshow items failed to sync with the database server:\n\n${errors}\n\nTypical原因 is that image file size exceeds 1MB limit. Try using internet image URLs or more compressed files.`);
            }

            // Sync deletes cleanly without redundant server reads
            const currentIds = slideshowImages.map(x => x.id);
            for (const id of Object.keys(loadedSlideshowImagesRef.current)) {
              if (!currentIds.includes(id)) {
                try {
                  await deleteDoc(doc(db, 'slideshow_images', id));
                  delete loadedSlideshowImagesRef.current[id];
                } catch (e) {
                  console.error("Delete failed:", e);
                }
              }
            }
          }, OperationType.WRITE, 'slideshow_images');
        }
      };
      syncSlideshow();
    }
  }, [slideshowImages, isAdminUser]);


  // Note: Background image compression is removed since AdminDashboard compresses images perfectly on manual upload,
  // which avoids infinite reactivity/re-render loops and quota-exhaustion issues on client load.


  useEffect(() => {
    safeSaveLocal('siwanchi_room_categories', roomCategoriesList);
    if (roomCategoriesList.length > 0) {
      if (isAdminUser) {
        roomCategoriesList.forEach(async (item) => {
          const serialized = JSON.stringify(item);
          if (loadedRoomCategoriesRef.current[item.id] !== serialized) {
            loadedRoomCategoriesRef.current[item.id] = serialized;
            await safeFirestoreWrite(() => setDoc(doc(db, 'room_categories', item.id), item), OperationType.WRITE, `room_categories/${item.id}`);
          }
        });
      }
    }
  }, [roomCategoriesList, isAdminUser]);

  // Scroll to top automatically when navigation activeTab switches
  useEffect(() => {
    // Immediate scroll jump for general viewports
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    
    // Delayed fallback to handle async layout rendering / expansion delays
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }, 60);

    return () => clearTimeout(timer);
  }, [activeTab]);


  // Global Append Handlers
  const handleAddRoomBooking = (booking: RoomBooking) => {
    setRoomBookings(prev => [booking, ...prev]);
    safeFirestoreWrite(() => setDoc(doc(db, 'room_bookings', booking.id), booking), OperationType.WRITE, `room_bookings/${booking.id}`);
  };

  const handleAddPalaceBooking = (booking: PalaceBooking) => {
    setPalaceBookings(prev => [booking, ...prev]);
    safeFirestoreWrite(() => setDoc(doc(db, 'palace_bookings', booking.id), booking), OperationType.WRITE, `palace_bookings/${booking.id}`);
  };

  const handleAddDonation = (donation: Donation) => {
    setDonations(prev => [donation, ...prev]);
    safeFirestoreWrite(() => setDoc(doc(db, 'donations', donation.id), donation), OperationType.WRITE, `donations/${donation.id}`);
  };

  const handleAddVolunteer = (vol: Volunteer) => {
    setVolunteers(prev => [vol, ...prev]);
    safeFirestoreWrite(() => setDoc(doc(db, 'volunteers', vol.id), vol), OperationType.WRITE, `volunteers/${vol.id}`);
  };

  const handleAddMember = (mem: TrustMember) => {
    setMembersList(prev => [mem, ...prev]);
    safeFirestoreWrite(() => setDoc(doc(db, 'members', mem.id), mem), OperationType.WRITE, `members/${mem.id}`);
  };

  const handleAddContactQuery = (query: ContactQuery) => {
    setContactQueries(prev => [query, ...prev]);
  };

  const handleAddLabhInquiry = (inq: LabhInquiry) => {
    setLabhInquiries(prev => [inq, ...prev]);
  };


  // Main View Switiching dispatcher
  const renderActiveTabContent = () => {
    switch(activeTab) {
      case 'about':
        return <AboutTab currentLang={currentLang} />;
        
      case 'vihardham':
        return <VihardhamTab currentLang={currentLang} onAddRoomBooking={handleAddRoomBooking} roomCategories={roomCategoriesList} />;
        
      case 'palace':
        return <OswalPalaceTab currentLang={currentLang} onAddPalaceBooking={handleAddPalaceBooking} />;
        
      case 'donations':
        return (
          <div className="space-y-16">
            <DonationSystem currentLang={currentLang} onAddDonation={handleAddDonation} />
            <LabhChadhava currentLang={currentLang} onAddLabhInquiry={handleAddLabhInquiry} />
          </div>
        );
        
      case 'vatsalya':
        return <VatsalyaDhamTab currentLang={currentLang} />;
        
      case 'gallery':
        return <GalleryVideosTab currentLang={currentLang} galleryItems={galleryItems} />;
        
      case 'contact':
        return <ContactTab currentLang={currentLang} onAddContactQuery={handleAddContactQuery} />;
        
      case 'admin':
        return (
          <AdminDashboard 
            currentLang={currentLang}
            roomBookings={roomBookings}
            setRoomBookings={setRoomBookings}
            palaceBookings={palaceBookings}
            setPalaceBookings={setPalaceBookings}
            donations={donations}
            setDonations={setDonations}
            valunteers={valunteers}
            membersList={membersList}
            auditLogs={auditLogs}
            setAuditLogs={setAuditLogs}
            galleryItems={galleryItems}
            setGalleryItems={setGalleryItems}
            slideshowImages={slideshowImages}
            setSlideshowImages={setSlideshowImages}
            roomCategories={roomCategoriesList}
            setRoomCategories={setRoomCategoriesList}
          />
        );
        
      default:
        // 'home' tab displays Hero slideshow + stats snapshot + interactive triggers
        return (
          <div className="space-y-10">
            <Hero 
              currentLang={currentLang} 
              onNavigate={(tab) => setActiveTab(tab)} 
              onOpenVideoModal={() => setShowVideoModal(true)} 
              slideshowImages={slideshowImages}
            />

            {/* DEDICATED VIRTUAL TOUR SECTION */}
            <div className="bg-cream-100/50 border-t-3 border-b-3 border-charcoal py-16">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-maroon-700 text-xs font-black uppercase tracking-widest block font-mono">🕊️ Experience Meli Gaon / Siwana Samdari Road Campus Live</span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-maroon-850 uppercase tracking-tight font-sans">
                    {currentLang === 'hi' ? "विहारधाम एवं ओसवाल पैलेस - वर्चुअल ट्यूर" : "Virtual Tour: Vihardham & Oswal Palace"}
                  </h2>
                  <p className="text-charcoal/80 text-xs sm:text-sm font-bold max-w-2xl mx-auto md:leading-relaxed">
                    {currentLang === 'hi' 
                      ? "मेली गाँव (सिवाना समदड़ी मार्ग) परिसर की विहंगम दृश्य गैलरी और नवनिर्मित शिखरबद्ध जिनालय का भव्य वीडियो ट्यूर अनुभव करें।"
                      : "Experience the official high-resolution walkthrough of our upcoming spiritual oasis and social welfare event venues."}
                  </p>
                  <div className="w-24 h-0.5 bg-gold-450 mx-auto mt-2"></div>
                </div>

                <ProjectVideoPlayer 
                  currentLang={currentLang}
                  videoId="Cwyn5LCGd0c"
                  title={{
                    hi: "राजाशाही विहारधाम और ओसवाल पैलेस परियोजना",
                    en: "Vihardham & Oswal Palace Project Tour"
                  }}
                  description={{
                    hi: "श्री सिवांची जैन सेवा समिति ट्रस्ट के तत्वाधान में निर्माणाधीन सुप्रसिद्ध विहारधाम, धर्मशाला तथा सामाजिक सुविधाओं से सुसज्जित ओसवाल पैलेस का आधिकारिक भव्य वीडियो ट्यूर दर्शन का आनंद उठाएं।",
                    en: "Official walkthrough presentation of the masterplan layout, monk chambers (Vihardham), dynamic wedding setups inside Oswal Palace, and peaceful architectural facades."
                  }}
                  category="Featured Project Walkthrough"
                />
              </div>
            </div>

            {/* Dedicated video / walkthrough ending container and spacers */}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col justify-between overflow-x-hidden selection:bg-maroon-800 selection:text-white">
      
      {/* Dynamic Header / Navbar */}
      <Navbar 
        currentLang={currentLang} 
        setLang={setLang} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Database Quota Information Notice */}
      {dbQuotaExceeded && (
        <div className="bg-amber-50 border-y-3 border-amber-500 text-amber-900 py-3 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm font-medium shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-start md:items-center space-x-2">
              <span className="text-lg">📢</span>
              <div>
                <p className="font-bold">
                  {currentLang === 'hi' 
                    ? "सर्वर कोटा सीमा समाप्त (कल ठीक हो जाएगी)" 
                    : "Database Quota Limit Exceeded (Will Auto-Reset Tomorrow)"}
                </p>
                <p className="text-amber-800 text-xs mt-0.5 font-normal leading-relaxed">
                  {currentLang === 'hi'
                    ? "हमारे क्लाउड डेटाबेस (Firestore) पर दैनिक मुफ़्त राइट कोटा समाप्त हो गया है। कृपया चिंता न करें: आपकी कोई भी नई प्रविष्टि, सुधार और परिवर्तन आपके ब्राउज़र में सुरक्षित रूप से सहेजे गए हैं और पूरी तरह से काम कर रहे हैं। कोटा कल दोपहर पुनः सक्रिय हो जाएगा!"
                    : "The Daily Free Read/Write limit on Google Firestore database has been reached. No data is lost: all your edits, image uploads, slot bookings, and slideshow additions are actively preserved in your browser and will synch automatically. Quotas restore in 24 hours."}
                </p>
              </div>
            </div>
            {isAdminUser && (
              <a 
                href="https://console.firebase.google.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-3 py-1.5 border border-amber-600 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded font-bold text-xs uppercase tracking-wide transition-colors shrink-0"
              >
                {currentLang === 'hi' ? "फायरबेस कंसोल खोलें" : "Open Firebase Console"} →
              </a>
            )}
          </div>
        </div>
      )}

      {/* Main Dynamic View Content */}
      <main className="flex-grow">
        {renderActiveTabContent()}
      </main>

      {/* Elegant Divine Footer matching luxury style mandates */}
      <footer className="bg-maroon-gradient text-white border-t-4 border-gold-500 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Trust Logo & Name */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-cream-50 flex items-center justify-center text-maroon-800 text-xl font-bold shadow border border-gold-400">
                🪔
              </div>
              <div>
                <h4 className="font-display font-black text-base text-gold-400 tracking-tight">
                  {t.trustName}
                </h4>
                <span className="text-[10px] text-cream-200 block uppercase tracking-widest font-black leading-none">
                  SIWANCHI JAIN SAMAJ GARV
                </span>
              </div>
            </div>
            
            <p className="text-gold-300/80 text-xs leading-relaxed max-w-sm font-semibold space-y-2">
              <span className="block">Supporting spiritual ascension, Jain traveling monk rest shelters, and social weddings in Barmer, Rajasthan. All administrative expenditures are strictly audited.</span>
              <span className="block text-[11px] text-cream-205/90 font-medium">आध्यात्मिक उन्नति, जैन पदयात्री साधु-साध्वी विश्राम गृह (विहारधाम) और बाड़मेर, राजस्थान में सामाजिक विवाह आयोजनों में सहयोग। सभी प्रशासनिक व्यय कड़ाई से ऑडिट किए जाते हैं।</span>
            </p>

            <div className="text-[10px] text-gold-400 font-mono font-bold block pt-1">
              <span>Shri Siwanchi Jain Seva Samiti Trust, Rajasthan, India</span>
            </div>
          </div>

          {/* Col 2: Fast nav triggers */}
          <div className="md:col-span-3 space-y-4 text-xs font-bold text-cream-200">
            <h5 className="text-gold-400 uppercase tracking-widest font-black font-display text-[11px]">Quick Directories</h5>
            <ul className="space-y-2 block">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors cursor-pointer text-left">{currentLang === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</button></li>
              <li><button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors cursor-pointer text-left">{currentLang === 'hi' ? 'ट्रस्ट के बारे में' : 'About Trust'}</button></li>
              <li><button onClick={() => setActiveTab('vihardham')} className="hover:text-white transition-colors cursor-pointer text-left">{currentLang === 'hi' ? 'विहारधाम' : 'Vihardham'}</button></li>
              <li><button onClick={() => setActiveTab('palace')} className="hover:text-white transition-colors cursor-pointer text-left">{currentLang === 'hi' ? 'ओसवाल पैलेस' : 'Oswal Palace'}</button></li>
              <li><button onClick={() => setActiveTab('vatsalya')} className="hover:text-white transition-colors cursor-pointer text-left">{currentLang === 'hi' ? 'वात्सल्य धाम' : 'Vatsalya Dham'}</button></li>
              <li><button onClick={() => setActiveTab('donations')} className="hover:text-white transition-colors cursor-pointer text-left">{currentLang === 'hi' ? 'धर्म सहयोग' : 'Dharma Sahyog'}</button></li>
              <li><button onClick={() => setActiveTab('gallery')} className="hover:text-white transition-colors cursor-pointer text-left">{currentLang === 'hi' ? 'गैलरी और वीडियो' : 'Gallery & Videos'}</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors cursor-pointer text-left">{currentLang === 'hi' ? 'संपर्क करें' : 'Contact Us'}</button></li>
            </ul>
          </div>

          {/* Col 3: Direct contact details */}
          <div className="md:col-span-4 space-y-4 text-xs font-semibold text-cream-205">
            <h5 className="text-gold-400 uppercase tracking-widest font-black font-display text-[11px] block">Immediate Contact Office</h5>
            <div className="leading-relaxed space-y-1 block">
              <p className="font-semibold">📍 Siwana-Samdari Road, Opp Bhagvanti Petrol Pump, Meli Gaon, Siwana Samdari Road, District Barmer, Rajasthan, India</p>
              <p className="text-gold-300 font-medium text-[11px]">📍 सिवाना-समदड़ी मार्ग, भगवती पेट्रोल पंप के सामने, मेली गाँव (सिवाना समदड़ी मार्ग), जिला बाड़मेर, राजस्थान, भारत</p>
            </div>
            <div className="space-y-1 block font-mono">
              <a href="tel:+919426055667" className="block hover:text-white transition-colors">📞 Phone: +91 9822538635</a>
              <a href="mailto:team.siwanchitrust@gmail.com" className="block hover:text-white transition-colors text-xs">✉️ Email: team.siwanchitrust@gmail.com</a>
            </div>
          </div>

        </div>

        {/* Legal copyrights line */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gold-500/20 text-center text-[10px] text-gold-350 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-gold-300/60 font-medium">
          <p>© {new Date().getFullYear()} Shri Siwanchi Jain Seva Samiti Trust Meli Gaon / Siwana Samdari Road. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Jain monastic disciplines are strictly applicable inside the school campus."); }} className="hover:text-white">Monastic Code Mandate</a>
            <span className="text-gold-500/30">|</span>
            <a href="#admin" onClick={(e) => { e.preventDefault(); setActiveTab('admin'); }} className="hover:text-white">Admin Portal Secure entry</a>
          </div>
        </div>

        {/* Dedicated Pure Devotion Credit Statement */}
        <div className="max-w-7xl mx-auto mt-5 text-center text-[11px] sm:text-xs text-gold-400/75 font-medium tracking-wide border-t border-gold-500/10 pt-4 space-y-1.5">
          <p>Website crafted and made by <span className="font-bold text-gold-300">Mokshit Ratanji Salecha</span> with pure devotion (+91 7096505331)</p>
          <p className="text-sm sm:text-base font-semibold text-gold-300">संकलन: मोक्षित सालेचा (भोरड़ा), सूरत</p>
        </div>
      </footer>

      {/* TEMPLE VIDEO INTERACTIVE OVERLAY MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 flex items-center justify-center p-4">
          <div className="relative bg-cream-50 w-full max-w-3xl rounded-none border-3 border-charcoal shadow-flat-lg overflow-hidden animate-fade-in">
            <div className="bg-maroon-gradient p-4 flex justify-between items-center text-white border-b-2 border-charcoal">
              <span className="font-display font-black text-gold-300 text-xs uppercase tracking-widest font-mono">
                📹 Vihardham & Oswal Palace Walkthrough
              </span>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="p-1.5 hover:bg-white/10 text-white border-2 border-charcoal cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Embedded simulated project walkthrough */}
            <div className="aspect-video bg-black">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/Cwyn5LCGd0c?autoplay=1&rel=0" 
                title="Vihardham & Oswal Palace Project tour" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 bg-cream-100 text-charcoal text-xs text-center border-t-2 border-charcoal font-bold leading-normal">
              This interactive video walkthrough details the majestic design and master plan of Vihardham & Oswal Palace on (Meli Road), Siwana.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

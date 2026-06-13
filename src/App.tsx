/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, Mail, Award, X, Heart, Shield, Globe } from 'lucide-react';

// Data types & assets imports
import { Language, RoomBooking, PalaceBooking, Donation, Contributor, Volunteer, TrustMember, AuditLog, ContactQuery, LabhInquiry, GalleryItem, SlideshowImage } from './types';
import { staticTranslations, seedContributors, seedNews, seedEvents, seedGallery } from './data';
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
import DonorWall from './components/DonorWall';
import VatsalyaDhamTab from './components/VatsalyaDhamTab';
import ContactTab from './components/ContactTab';
import AdminDashboard from './components/AdminDashboard';
import ProjectVideoPlayer from './components/ProjectVideoPlayer';
import GalleryVideosTab from './components/GalleryVideosTab';

export default function App() {
  const [currentLang, setLang] = useState<Language>('hi');
  const [activeTab, _setActiveTab] = useState<string>(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    if (path === 'dharma-sahyog' || path === 'donations') return 'donations';
    if (path === 'oswal-palace' || path === 'palace') return 'palace';
    const validTabs = ['home', 'about', 'vihardham', 'palace', 'vatsalya', 'donations', 'donorwall', 'gallery', 'contact', 'admin'];
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
      const validTabs = ['home', 'about', 'vihardham', 'palace', 'vatsalya', 'donations', 'donorwall', 'gallery', 'contact', 'admin'];
      _setActiveTab(validTabs.includes(path) ? path : 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Persistence States synced manually to LocalStorage
  const [roomBookings, setRoomBookings] = useState<RoomBooking[]>([]);
  const [palaceBookings, setPalaceBookings] = useState<PalaceBooking[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [contributorsList, setContributorsList] = useState<Contributor[]>([]);
  const [valunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [membersList, setMembersList] = useState<TrustMember[]>([]);
  const [contactQueries, setContactQueries] = useState<ContactQuery[]>([]);
  const [labhInquiries, setLabhInquiries] = useState<LabhInquiry[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [slideshowImages, setSlideshowImages] = useState<SlideshowImage[]>([]);

  const t = staticTranslations[currentLang];

  // Load Seed Database from LocalStorage or seed on first spin
  useEffect(() => {
    // 1. Room bookings seed
    const localRooms = localStorage.getItem('siwanchi_rooms');
    if (localRooms) {
      setRoomBookings(JSON.parse(localRooms));
    } else {
      const initialRooms: RoomBooking[] = [
        {
          id: "rb_seed_1",
          bookingCode: "RM382942",
          name: "सुभाष जी शाह (मेहता)",
          mobile: "9822340578",
          email: "subhash.shah@outlook.com",
          address: "बाड़मेर - सूरत",
          checkIn: "2026-06-15",
          checkOut: "2026-06-18",
          guests: 3,
          roomType: "A/C Deluxe Room",
          roomsCount: 1,
          specialRequests: "Ground floor preferred for grand parents stay",
          paymentOption: "UPI",
          paymentStatus: "Approved",
          approvalStatus: "Approved",
          totalAmount: 3600,
          createdAt: new Date().toISOString()
        }
      ];
      setRoomBookings(initialRooms);
      localStorage.setItem('siwanchi_rooms', JSON.stringify(initialRooms));
    }

    // 2. Palace bookings seed
    const localPalace = localStorage.getItem('siwanchi_palace');
    if (localPalace) {
      setPalaceBookings(JSON.parse(localPalace));
    } else {
      const initialPalace: PalaceBooking[] = [
        {
          id: "pb_seed_1",
          bookingCode: "OP829471",
          eventType: { hi: "शुभ जैन पाणिग्रहण (विवाह)", en: "Wedding" },
          date: "2026-11-20",
          guestCount: 600,
          organizerName: "शांतिलाल भंडारी",
          contact: "9426055667",
          email: "bhandari.wedding@outlook.com",
          requirements: ["Catering (Pure Organic Meal Service)", "Royal Mandap Flower Decoration"],
          paymentStatus: "Pending",
          approvalStatus: "Pending",
          estimatedCost: 115000,
          createdAt: new Date().toISOString()
        }
      ];
      setPalaceBookings(initialPalace);
      localStorage.setItem('siwanchi_palace', JSON.stringify(initialPalace));
    }

    // 3. Donations seed
    const localDonations = localStorage.getItem('siwanchi_donations');
    if (localDonations) {
      setDonations(JSON.parse(localDonations));
    } else {
      const initialDons: Donation[] = [
        {
          id: "don_seed_1",
          receiptNumber: "REC329481",
          donorName: "कंचनबाई चौधरी",
          mobile: "9820123740",
          email: "kanchan.choudhary@gmail.com",
          address: "समदड़ी - चेन्नई",
          panNumber: "ABCDE1234F",
          amount: 251000,
          category: "Room",
          paymentMethod: "Bank Transfer",
          transactionId: "TXN32948719324",
          is80GRequested: true,
          createdAt: "2026-06-10T12:00:00Z",
          city: "Samdari"
        }
      ];
      setDonations(initialDons);
      localStorage.setItem('siwanchi_donations', JSON.stringify(initialDons));
    }

    // 4. Contributor Donor Wall seed
    const localContributors = localStorage.getItem('siwanchi_contributors');
    if (localContributors) {
      setContributorsList(JSON.parse(localContributors));
    } else {
      setContributorsList(seedContributors);
      localStorage.setItem('siwanchi_contributors', JSON.stringify(seedContributors));
    }

    // 5. Volunteers seed
    const localVols = localStorage.getItem('siwanchi_vols');
    if (localVols) {
      setVolunteers(JSON.parse(localVols));
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
      setVolunteers(seedVols);
      localStorage.setItem('siwanchi_vols', JSON.stringify(seedVols));
    }

    // 6. Member list seed
    const localMembers = localStorage.getItem('siwanchi_members');
    if (localMembers) {
      setMembersList(JSON.parse(localMembers));
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
      setMembersList(seedMembers);
      localStorage.setItem('siwanchi_members', JSON.stringify(seedMembers));
    }

    // 7. Audit log seed
    const localAudit = localStorage.getItem('siwanchi_audit');
    if (localAudit) {
      setAuditLogs(JSON.parse(localAudit));
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
      setAuditLogs(initialLogs);
      localStorage.setItem('siwanchi_audit', JSON.stringify(initialLogs));
    }

    // 8. Gallery items seed
    const localGallery = localStorage.getItem('siwanchi_gallery');
    if (localGallery) {
      setGalleryItems(JSON.parse(localGallery));
    } else {
      setGalleryItems(seedGallery);
      localStorage.setItem('siwanchi_gallery', JSON.stringify(seedGallery));
    }

    // 9. Slideshow images seed
    const localSlideshow = localStorage.getItem('siwanchi_slideshow_images');
    let parsedSlideshow: SlideshowImage[] = [];
    try {
      parsedSlideshow = localSlideshow ? JSON.parse(localSlideshow) : [];
    } catch (_) {}

    if (Array.isArray(parsedSlideshow) && parsedSlideshow.length > 0) {
      setSlideshowImages(parsedSlideshow);
    } else {
      const defaultSlideshow: SlideshowImage[] = [
        {
          id: "slide_1",
          url: campusPanoramicLayout,
          title: { hi: "विहारधाम जैन मंदिर एवं ओसवाल पैलेस संकुल", en: "Vihardham Jain Temple & Oswal Palace Complex" },
          caption: { hi: "डूंगरी पुरा जैन मंदिर संकुल का विहंगम दृश्य - अध्यात्म एवं संस्कृति का संगम", en: "Panoramic layout overview of the divine spiritual and wedding venue campus" }
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
        }
      ];
      setSlideshowImages(defaultSlideshow);
      localStorage.setItem('siwanchi_slideshow_images', JSON.stringify(defaultSlideshow));
    }

  }, []);

  // Safe localStorage helper to avoid crashing on QuotaExceededError or empty arrays
  const safeSaveLocal = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Local Storage write failed for ${key}:`, e);
    }
  };

  // Update localStorage automatically whenever states mutate
  useEffect(() => {
    if (roomBookings.length > 0) safeSaveLocal('siwanchi_rooms', roomBookings);
  }, [roomBookings]);

  useEffect(() => {
    if (palaceBookings.length > 0) safeSaveLocal('siwanchi_palace', palaceBookings);
  }, [palaceBookings]);

  useEffect(() => {
    if (donations.length > 0) safeSaveLocal('siwanchi_donations', donations);
  }, [donations]);

  useEffect(() => {
    if (contributorsList.length > 0) safeSaveLocal('siwanchi_contributors', contributorsList);
  }, [contributorsList]);

  useEffect(() => {
    if (valunteers.length > 0) safeSaveLocal('siwanchi_vols', valunteers);
  }, [valunteers]);

  useEffect(() => {
    if (membersList.length > 0) safeSaveLocal('siwanchi_members', membersList);
  }, [membersList]);

  useEffect(() => {
    if (auditLogs.length > 0) safeSaveLocal('siwanchi_audit', auditLogs);
  }, [auditLogs]);

  useEffect(() => {
    // Save empty state as well so deletion works seamlessly
    safeSaveLocal('siwanchi_gallery', galleryItems);
  }, [galleryItems]);

  useEffect(() => {
    safeSaveLocal('siwanchi_slideshow_images', slideshowImages);
  }, [slideshowImages]);

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
  };

  const handleAddPalaceBooking = (booking: PalaceBooking) => {
    setPalaceBookings(prev => [booking, ...prev]);
  };

  const handleAddDonation = (donation: Donation) => {
    setDonations(prev => [donation, ...prev]);
    
    // Also append immediately onto the Donor Wall list dynamically for a unified visual experience!
    const newWallDonor: Contributor = {
      id: "donor_auto_" + Date.now(),
      name: { hi: donation.donorName, en: donation.donorName },
      city: { hi: donation.city, en: donation.city },
      family: { hi: "सहयोगी परिवार", en: "Sahyogi Parivar" },
      tier: donation.amount >= 250000 ? 'Maha Daanveer' : donation.amount >= 100000 ? 'Platinum' : donation.amount >= 50000 ? 'Gold' : donation.amount >= 10000 ? 'Silver' : 'Contributor',
      amount: donation.amount,
      contributionType: { 
        hi: `${donation.category === 'General' ? 'सामान्य वैयावृत्य' : donation.category === 'Temple' ? 'जिनालय निर्माण' : donation.category === 'Room' ? 'धर्मशाला व्यवस्था' : donation.category === 'Bhojanshala' ? 'भोजनशाला व्यवस्था' : 'परिसर विकास'} धर्म सहयोग`, 
        en: `Contributed for ${donation.category} Seva Fund` 
      },
      year: new Date().getFullYear(),
      message: { hi: "जिन शासन सदैव जयवंत हो", en: "Always in services of the holy Jain Samaj" }
    };
    setContributorsList(prev => [newWallDonor, ...prev]);
  };

  const handleAddVolunteer = (vol: Volunteer) => {
    setVolunteers(prev => [vol, ...prev]);
  };

  const handleAddMember = (mem: TrustMember) => {
    setMembersList(prev => [mem, ...prev]);
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
        return <VihardhamTab currentLang={currentLang} onAddRoomBooking={handleAddRoomBooking} />;
        
      case 'palace':
        return <OswalPalaceTab currentLang={currentLang} onAddPalaceBooking={handleAddPalaceBooking} />;
        
      case 'donations':
        return (
          <div className="space-y-16">
            <DonationSystem currentLang={currentLang} onAddDonation={handleAddDonation} />
            <LabhChadhava currentLang={currentLang} onAddLabhInquiry={handleAddLabhInquiry} />
          </div>
        );
        
      case 'donorwall':
        return <DonorWall currentLang={currentLang} contributorsList={contributorsList} />;
        
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
            contributorsList={contributorsList}
            setContributorsList={setContributorsList}
            valunteers={valunteers}
            membersList={membersList}
            auditLogs={auditLogs}
            setAuditLogs={setAuditLogs}
            galleryItems={galleryItems}
            setGalleryItems={setGalleryItems}
            slideshowImages={slideshowImages}
            setSlideshowImages={setSlideshowImages}
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
                  <span className="text-maroon-700 text-xs font-black uppercase tracking-widest block font-mono">🕊️ Experience Dungri Pura Campus Live</span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-maroon-850 uppercase tracking-tight font-sans">
                    {currentLang === 'hi' ? "विहारधाम एवं ओसवाल पैलेस - वर्चुअल ट्यूर" : "Virtual Tour: Vihardham & Oswal Palace"}
                  </h2>
                  <p className="text-charcoal/80 text-xs sm:text-sm font-bold max-w-2xl mx-auto md:leading-relaxed">
                    {currentLang === 'hi' 
                      ? "डूंगरी पुरा परिसर की विहंगम दृश्य गैलरी और नवनिर्मित शिखरबद्ध जिनालय का भव्य वीडियो ट्यूर अनुभव करें।"
                      : "Experience the official high-resolution walkthrough of our upcoming spiritual oasis and social welfare event venues."}
                  </p>
                  <div className="w-24 h-0.5 bg-gold-450 mx-auto mt-2"></div>
                </div>

                <ProjectVideoPlayer 
                  currentLang={currentLang}
                  videoId="Cwyn5LCGd0c"
                  title={{
                    hi: "डूंगरी पुरा (मेली) राजशाही विहारधाम और ओसवाल पैलेस परियोजना",
                    en: "Dungri Pura Vihardham & Oswal Palace Project Tour"
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
            
            <p className="text-gold-300/80 text-xs leading-relaxed max-w-sm font-semibold">
              Supporting spiritual ascension, Jain traveling monk rest shelters, and social weddings in Barmer, Rajasthan. All administrative expenditures are strictly audited.
            </p>

            <div className="text-[10px] text-gold-400 font-mono font-bold block pt-1">
              <span>Shri Siwanchi Jain Seva Samiti Trust, Rajasthan, India</span>
            </div>
          </div>

          {/* Col 2: Fast nav triggers */}
          <div className="md:col-span-3 space-y-4 text-xs font-bold text-cream-200">
            <h5 className="text-gold-400 uppercase tracking-widest font-black font-display text-[11px]">Quick Directories</h5>
            <ul className="space-y-2 block">
              <li><button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors cursor-pointer">About Governing Trustees</button></li>
              <li><button onClick={() => setActiveTab('vihardham')} className="hover:text-white transition-colors cursor-pointer">Dharamshala Room Listings</button></li>
              <li><button onClick={() => setActiveTab('palace')} className="hover:text-white transition-colors cursor-pointer">Oswal Palace Reservations</button></li>
              <li><button onClick={() => setActiveTab('donations')} className="hover:text-white transition-colors cursor-pointer">Spiritual Sponsoring (धर्म सहयोग)</button></li>
            </ul>
          </div>

          {/* Col 3: Direct contact details */}
          <div className="md:col-span-4 space-y-4 text-xs font-semibold text-cream-205">
            <h5 className="text-gold-400 uppercase tracking-widest font-black font-display text-[11px] block">Immediate Contact Office</h5>
            <p className="leading-relaxed">
              📍 Siwana-Samdari Road,Opp Bhagvanti Petrol Pump DurgaPura (Meli) District Barmer, Rajasthan, India
            </p>
            <div className="space-y-1 block font-mono">
              <a href="tel:+919426055667" className="block hover:text-white transition-colors">📞 Phone: +91 94260 55667</a>
              <a href="mailto:connect@siwanchitrust.org" className="block hover:text-white transition-colors text-xs">✉️ Email: connect@siwanchitrust.org</a>
            </div>
          </div>

        </div>

        {/* Legal copyrights line */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gold-500/20 text-center text-[10px] text-gold-350 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-gold-300/60 font-medium">
          <p>© {new Date().getFullYear()} Shri Siwanchi Jain Seva Samiti Trust Dungri Pura. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Jain monastic disciplines are strictly applicable inside the school campus."); }} className="hover:text-white">Monastic Code Mandate</a>
            <span className="text-gold-500/30">|</span>
            <a href="#admin" onClick={(e) => { e.preventDefault(); setActiveTab('admin'); }} className="hover:text-white">Admin Portal Secure entry</a>
          </div>
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

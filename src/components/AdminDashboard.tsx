/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, CheckCircle, ClipboardList, RefreshCcw, Landmark, UserPlus, Heart, Award, FileText, Check, X, ShieldAlert, Sparkles, PlusCircle, Upload, Lock, LogOut } from 'lucide-react';
import { Language, RoomBooking, PalaceBooking, Donation, Volunteer, TrustMember, Contributor, AuditLog, GalleryItem, SlideshowImage } from '../types';
import { auth, googleProvider } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';

interface AdminDashboardProps {
  currentLang: Language;
  
  // States passed from App.tsx
  roomBookings: RoomBooking[];
  setRoomBookings: React.Dispatch<React.SetStateAction<RoomBooking[]>>;
  
  palaceBookings: PalaceBooking[];
  setPalaceBookings: React.Dispatch<React.SetStateAction<PalaceBooking[]>>;
  
  donations: Donation[];
  setDonations: React.Dispatch<React.SetStateAction<Donation[]>>;
  
  contributorsList: Contributor[];
  setContributorsList: React.Dispatch<React.SetStateAction<Contributor[]>>;
  
  valunteers: Volunteer[];
  membersList: TrustMember[];
  
  auditLogs: AuditLog[];
  setAuditLogs: React.Dispatch<React.SetStateAction<AuditLog[]>>;

  galleryItems: GalleryItem[];
  setGalleryItems: React.Dispatch<React.SetStateAction<GalleryItem[]>>;

  slideshowImages?: SlideshowImage[];
  setSlideshowImages: React.Dispatch<React.SetStateAction<SlideshowImage[]>>;
}

export default function AdminDashboard({
  currentLang,
  roomBookings,
  setRoomBookings,
  palaceBookings,
  setPalaceBookings,
  donations,
  setDonations,
  contributorsList,
  setContributorsList,
  valunteers,
  membersList,
  auditLogs,
  setAuditLogs,
  galleryItems,
  setGalleryItems,
  slideshowImages = [],
  setSlideshowImages
}: AdminDashboardProps) {

  const [activeAdminSub, setActiveAdminSub] = useState<'stats' | 'rooms' | 'palace' | 'donations' | 'add_donor' | 'gallery_mgmt' | 'slideshow_mgmt' | 'people' | 'audit'>('stats');

  // Firebase auth state tracking
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error("Sign in failed:", err);
      setAuthError(err?.message || String(err));
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  const AUTHORIZED_EMAIL = 'mokshit.jain.bba2025@atlasskilltech.university';
  const isAuthorized = currentUser && currentUser.email === AUTHORIZED_EMAIL;

  // New Donor Form state
  const [newDonorNameHI, setNewDonorNameHI] = useState('');
  const [newDonorNameEN, setNewDonorNameEN] = useState('');
  const [newDonorCityHI, setNewDonorCityHI] = useState('');
  const [newDonorCityEN, setNewDonorCityEN] = useState('');
  const [newDonorFamilyHI, setNewDonorFamilyHI] = useState('');
  const [newDonorFamilyEN, setNewDonorFamilyEN] = useState('');
  const [newDonorTier, setNewDonorTier] = useState<'Maha Daanveer' | 'Platinum' | 'Gold' | 'Silver' | 'Contributor'>('Contributor');
  const [newDonorAmount, setNewDonorAmount] = useState<number | ''>('');
  const [newDonorTargetHI, setNewDonorTargetHI] = useState('');
  const [newDonorTargetEN, setNewDonorTargetEN] = useState('');
  const [newDonorMsgHI, setNewDonorMsgHI] = useState('');
  const [newDonorMsgEN, setNewDonorMsgEN] = useState('');
  const [isDonorAddedMsg, setIsDonorAddedMsg] = useState(false);

  // New Gallery Item Upload Form state
  const [newMediaTitleHI, setNewMediaTitleHI] = useState('');
  const [newMediaTitleEN, setNewMediaTitleEN] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState<'Drone' | 'Temple' | 'Construction' | 'Oswal Palace' | 'Samaj Events'>('Temple');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [isMediaAddedMsg, setIsMediaAddedMsg] = useState(false);

  // Slideshow manager form states
  const [slideTitleHI, setSlideTitleHI] = useState('');
  const [slideTitleEN, setSlideTitleEN] = useState('');
  const [slideCaptionHI, setSlideCaptionHI] = useState('');
  const [slideCaptionEN, setSlideCaptionEN] = useState('');
  const [slideUrl, setSlideUrl] = useState('');
  const [slideDragActive, setSlideDragActive] = useState(false);
  const [isSlideAddedMsg, setIsSlideAddedMsg] = useState(false);


  // Drag and drop states & handlers for image upload
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      readFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      readFile(file);
    }
  };

  const readFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file (PNG, JPG, JPEG, GIF, etc.)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_DIM = 950;
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.72);
            setNewMediaUrl(compressedBase64);
          } else {
            setNewMediaUrl(e.target?.result as string);
          }
        };
        img.onerror = () => {
          setNewMediaUrl(e.target?.result as string);
        };
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  // Administrative Logs Helper
  const logAction = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: "log_" + Date.now() + "_" + Math.floor(Math.random() * 100),
      actor: "Sanghvi Shantilal (Super Admin)",
      role: "Super Admin",
      action,
      details,
      timestamp: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Approval functions
  const handleRoomApproval = (id: string, code: string, isApprove: boolean) => {
    setRoomBookings(prev => prev.map(book => {
      if (book.id === id) {
        const updateStatus = isApprove ? 'Approved' : 'Rejected';
        logAction(`Room booking ${code}`, `Switched approval classification to: ${updateStatus}`);
        return { 
          ...book, 
          approvalStatus: updateStatus as any,
          paymentStatus: isApprove ? 'Approved' : book.paymentStatus
        };
      }
      return book;
    }));
  };

  const handlePalaceApproval = (id: string, code: string, isApprove: boolean) => {
    setPalaceBookings(prev => prev.map(book => {
      if (book.id === id) {
        const updateStatus = isApprove ? 'Approved' : 'Rejected';
        logAction(`Palace venue booking ${code}`, `Switched approval classification to: ${updateStatus}`);
        return { 
          ...book, 
          approvalStatus: updateStatus as any,
          paymentStatus: isApprove ? 'Paid' : book.paymentStatus
        };
      }
      return book;
    }));
  };

  // Add customized donor dynamically onto the live global Donor Wall
  const handleAddDonorLive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonorAmount || newDonorAmount <= 0) return;

    const newContrib: Contributor = {
      id: "donor_" + Date.now(),
      name: { hi: newDonorNameHI, en: newDonorNameEN },
      city: { hi: newDonorCityHI, en: newDonorCityEN },
      family: { hi: newDonorFamilyHI, en: newDonorFamilyEN },
      tier: newDonorTier,
      amount: Number(newDonorAmount),
      contributionType: { hi: newDonorTargetHI, en: newDonorTargetEN },
      year: new Date().getFullYear(),
      message: newDonorMsgHI || newDonorMsgEN ? { hi: newDonorMsgHI, en: newDonorMsgEN } : undefined
    };

    setContributorsList(prev => [newContrib, ...prev]);
    logAction("Appended New Donor Wall contributor row", `Added: ${newDonorNameEN} under ${newDonorTier} (₹${newDonorAmount})`);

    // Reset Form
    setNewDonorNameHI('');
    setNewDonorNameEN('');
    setNewDonorCityHI('');
    setNewDonorCityEN('');
    setNewDonorFamilyHI('');
    setNewDonorFamilyEN('');
    setNewDonorAmount('');
    setNewDonorTargetHI('');
    setNewDonorTargetEN('');
    setNewDonorMsgHI('');
    setNewDonorMsgEN('');
    setIsDonorAddedMsg(true);

    setTimeout(() => setIsDonorAddedMsg(false), 3000);
  };

  const handleAddMediaItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl) return;

    // Standardize URL for YouTube
    let finalUrl = newMediaUrl;
    if (newMediaType === 'video') {
      if (newMediaUrl.includes('youtube.com/watch?v=')) {
        const id = newMediaUrl.split('v=')[1]?.split('&')[0];
        if (id) finalUrl = `https://www.youtube.com/embed/${id}`;
      } else if (newMediaUrl.includes('youtu.be/')) {
        const id = newMediaUrl.split('youtu.be/')[1]?.split('?')[0];
        if (id) finalUrl = `https://www.youtube.com/embed/${id}`;
      }
    }

    const newItem: GalleryItem = {
      id: "media_" + Date.now(),
      title: { hi: newMediaTitleHI || newMediaTitleEN, en: newMediaTitleEN || newMediaTitleHI },
      category: newMediaCategory,
      type: newMediaType,
      url: finalUrl
    };

    setGalleryItems(prev => [...prev, newItem]);
    logAction("Appended New Gallery/Video item", `Added ${newMediaType} item: ${newMediaTitleEN}`);

    // Reset Form
    setNewMediaTitleHI('');
    setNewMediaTitleEN('');
    setNewMediaUrl('');
    setIsMediaAddedMsg(true);
    setTimeout(() => setIsMediaAddedMsg(false), 3000);
  };

  const handleDeleteMediaItem = (id: string, titleEN: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
    logAction("Removed Gallery item", `Deleted item: ${titleEN}`);
  };

  const handleSlideFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      readSlideFile(file);
    }
  };

  const handleSlideDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setSlideDragActive(true);
    } else if (e.type === "dragleave") {
      setSlideDragActive(false);
    }
  };

  const handleSlideDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSlideDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      readSlideFile(file);
    }
  };

  const readSlideFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file (PNG, JPG, JPEG, GIF, etc.)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_DIM = 1200;
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
            setSlideUrl(compressedBase64);
          } else {
            setSlideUrl(e.target?.result as string);
          }
        };
        img.onerror = () => {
          setSlideUrl(e.target?.result as string);
        };
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSlideItem = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = slideUrl.trim();
    if (!finalUrl) {
      alert("Please enter an image URL or drop an image file!");
      return;
    }

    const newSlide: SlideshowImage = {
      id: "slide_" + Date.now(),
      url: finalUrl,
      title: { hi: slideTitleHI || slideTitleEN, en: slideTitleEN || slideTitleHI },
      caption: { hi: slideCaptionHI, en: slideCaptionEN }
    };

    setSlideshowImages(prev => [...prev, newSlide]);
    logAction("Appended Hero Slideshow item", `Added slide: ${slideTitleEN}`);

    // Reset Form
    setSlideTitleHI('');
    setSlideTitleEN('');
    setSlideCaptionHI('');
    setSlideCaptionEN('');
    setSlideUrl('');
    setIsSlideAddedMsg(true);
    setTimeout(() => setIsSlideAddedMsg(false), 3000);
  };

  const handleDeleteSlideItem = (id: string, titleEN: string) => {
    setSlideshowImages(prev => prev.filter(item => item.id !== id));
    logAction("Removed Slideshow static slide", `Deleted slide item: ${titleEN}`);
  };

  const handleResetSlideshow = () => {
    if (window.confirm("Are you sure you want to restore the default 4-image slideshow (Vihardham Layout, Temple, Wedding Hall & Monk sanctuary)? This will override any custom uploads.")) {
      localStorage.removeItem('siwanchi_slideshow_images');
      window.location.reload();
    }
  };


  // Dynamic Statistics Counters
  const totalDonationsAmount = donations.reduce((sum, item) => sum + item.amount, 0);
  const activeReservationsCount = roomBookings.filter(b => b.approvalStatus === 'Approved').length;
  const pendingInquiriesCount = roomBookings.filter(b => b.approvalStatus === 'Pending').length + palaceBookings.filter(b => b.approvalStatus === 'Pending').length;

  // --- AUTH SECURITY GATE GUARDS ---
  if (authLoading) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 bg-white border-3 border-charcoal shadow-flat text-center space-y-4">
        <div className="inline-block w-8 h-8 border-4 border-maroon-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-mono font-black uppercase text-charcoal/70 tracking-widest">
          Verifying Authority Credentials...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="max-w-lg mx-auto my-16 p-8 bg-cream-50 border-3 border-charcoal shadow-flat text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-maroon-700 border-2 border-charcoal flex items-center justify-center text-gold-300 text-3xl font-bold mx-auto shadow-flat-sm">
          🔑
        </div>
        
        <div className="space-y-2">
          <h2 className="font-display font-black text-xl sm:text-2xl text-maroon-850 uppercase tracking-tight">
            Trust Authority Entrance Gate
          </h2>
          <p className="text-[11px] text-charcoal/60 font-mono font-bold uppercase tracking-wider block">
            श्री सिवांची जैन सेवा समिति ट्रस्ट • Admin Portal
          </p>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto"></div>
        </div>

        <p className="text-xs text-charcoal/85 leading-relaxed font-semibold">
          Access to these administrative tools is restricted to authorized trust members. To modify, approve, or reject bookings, update the gallery, and seed donors, please sign in with your verified Google email account.
        </p>

        <div className="bg-amber-50 border-2 border-dashed border-amber-300 p-4 rounded-none space-y-1.5 text-left">
          <span className="text-[11px] font-black text-amber-800 uppercase block tracking-wider">🔒 Restricted Access:</span>
          <p className="text-[10px] text-amber-900 font-bold leading-normal">
            Only the registered and verified Trust Chairman / Administrator Google account is allowed to access the control panel.
          </p>
        </div>

        {authError && (
          <div className="p-3 bg-red-50 border-2 border-red-300 text-red-700 text-[10px] font-mono leading-normal rounded text-left">
            <strong>Authentication Error:</strong> {authError}
          </div>
        )}

        <button
          onClick={handleSignIn}
          className="w-full bg-maroon-gradient hover:bg-gold-500 hover:text-maroon-900 text-gold-300 hover:scale-[1.01] transition-transform font-black py-3 rounded-none border-3 border-charcoal cursor-pointer uppercase text-xs tracking-wider shadow-flat flex items-center justify-center space-x-2"
        >
          <ShieldCheck className="w-5 h-5 text-current animate-pulse" />
          <span>Sign In with google</span>
        </button>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="max-w-lg mx-auto my-16 p-8 bg-cream-50 border-3 border-charcoal shadow-flat text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-700 border-2 border-charcoal flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-flat-sm animate-bounce">
          ⚠️
        </div>

        <div className="space-y-2">
          <h2 className="font-display font-black text-xl sm:text-2xl text-red-800 uppercase tracking-tight">
            Access Restrict Alert
          </h2>
          <p className="text-[11px] text-charcoal/60 font-mono font-bold uppercase tracking-wider block">
            Permission Refused • Security Invariant Enforced
          </p>
          <div className="w-16 h-0.5 bg-red-600 mx-auto"></div>
        </div>

        <p className="text-xs text-charcoal/85 leading-relaxed font-semibold">
          Your account <span className="font-mono text-maroon-800 lowercase bg-white border border-charcoal/10 px-1 py-0.5">{currentUser.email}</span> does not have standard administrative privileges on the Shri Siwanchi Jain Seva Samiti database.
        </p>

        <div className="bg-red-50 border-2 border-dashed border-red-300 p-4 rounded-none text-left text-[11px] text-red-950 font-bold space-y-1">
          <span className="uppercase block text-red-800 font-black">Authorized Directives:</span>
          <p className="leading-normal">
            If you are the designated administrator, please sign out and sign back in using your registered admin Google Account.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleSignOut}
            className="bg-white hover:bg-cream-100 text-charcoal font-black py-2.5 rounded-none border-2 border-charcoal cursor-pointer uppercase text-xs shadow-flat transition-transform active:translate-y-0.5"
          >
            Sign Out
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-maroon-700 hover:bg-maroon-800 text-white font-black py-2.5 rounded-none border-2 border-charcoal cursor-pointer uppercase text-xs shadow-flat transition-transform active:translate-y-0.5"
          >
            Retry Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-charcoal">
      
      {/* Top Admin Header */}
      <div className="bg-maroon-gradient border-2 border-gold-500 rounded-2xl p-6 shadow-xl relative overflow-hidden divine-border flex flex-col md:flex-row justify-between items-center text-white text-center md:text-left">
        <div className="flex items-center space-x-3.5 flex-col md:flex-row space-y-3.5 md:space-y-0">
          <div className="w-14 h-14 rounded-full bg-gold-500 border-2 border-white flex items-center justify-center text-maroon-850 text-2xl font-black">
            👑
          </div>
          <div>
            <h1 className="font-display font-black text-2xl text-gold-300 flex items-center justify-center md:justify-start">
              <span>Trust Authority Admin Dashboard</span>
              <ShieldCheck className="w-5.5 h-5.5 text-green-400 ml-1.5 animate-pulse" />
            </h1>
            <span className="text-[10px] sm:text-xs text-cream-200 block uppercase font-bold tracking-widest mt-0.5">
              Super Admin Control Session ({currentUser.email})
            </span>
          </div>
        </div>

        {/* Live system status readout & Sign out */}
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-3.5">
          <div className="bg-maroon-800 text-[10px] px-3.5 py-2 rounded-xl border border-gold-500/30 text-center font-mono font-bold font-sans">
            <span>● Database Session ACTIVE</span>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-gold-500 hover:bg-gold-450 text-maroon-950 font-black px-4.5 py-2 border-2 border-charcoal/30 text-[11px] uppercase cursor-pointer flex items-center space-x-1.5 active:translate-y-0.5 shadow-flat font-mono rounded"
          >
            <LogOut className="w-3.5 h-3.5 mr-0.5" />
            <span>Sign Out Control</span>
          </button>
        </div>
      </div>

      {/* Admin SUB-NAVIGATION */}
      <div className="flex flex-wrap border-b border-gold-400/35 gap-1.5 justify-center sm:justify-start">
        {[
          { id: 'stats', label: '📊 Stats Overview' },
          { id: 'rooms', label: `🛌 Rooms Bookings (${roomBookings.length})` },
          { id: 'palace', label: `🏰 Palace Bookings (${palaceBookings.length})` },
          { id: 'donations', label: `💖 Dharma Sahyog Logs (${donations.length})` },
          { id: 'add_donor', label: '✍️ Append Labharthi Wall Row' },
          { id: 'gallery_mgmt', label: `🖼️ Gallery & Videos (${galleryItems.length})` },
          { id: 'slideshow_mgmt', label: `✨ Hero Slideshow (${slideshowImages.length})` },
          { id: 'people', label: '👥 Members/Volunteers' },
          { id: 'audit', label: `📜 System Audit Logs (${auditLogs.length})` }
        ].map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveAdminSub(sub.id as any)}
            className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-all cursor-pointer ${
              activeAdminSub === sub.id
                ? 'bg-maroon-700 text-gold-300 border-t border-x border-gold-450'
                : 'text-charcoal/70 hover:bg-gold-500/10'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* SUBVIEW 1: Interactive Stats Overview */}
      {activeAdminSub === 'stats' && (
        <div className="space-y-8 animate-fade-in text-xs font-bold">
          
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white border border-gold-400 p-5 rounded-2xl shadow-sm relative divine-border flex justify-between items-center text-charcoal">
              <div>
                <span className="text-charcoal/50 block font-bold leading-none uppercase text-[9px] mb-1">Dharma Sahyog Funds</span>
                <strong className="text-green-700 text-xl font-sans font-black block">₹{totalDonationsAmount.toLocaleString('en-IN')}</strong>
                <span className="text-[9px] text-charcoal/40 block mt-1 font-medium">From Online & UPI triggers</span>
              </div>
              <span className="text-3xl">🪙</span>
            </div>

            <div className="bg-white border border-gold-400 p-5 rounded-2xl shadow-sm relative divine-border flex justify-between items-center text-charcoal">
              <div>
                <span className="text-charcoal/50 block font-bold leading-none uppercase text-[9px] mb-1">Approved Stays</span>
                <strong className="text-maroon-800 text-xl font-black block">{activeReservationsCount} active checks</strong>
                <span className="text-[9px] text-charcoal/40 block mt-1 font-medium">In dharamshala blocks</span>
              </div>
              <span className="text-3xl">🛏️</span>
            </div>

            <div className="bg-white border border-gold-400 p-5 rounded-2xl shadow-sm relative divine-border flex justify-between items-center text-charcoal">
              <div>
                <span className="text-charcoal/50 block font-bold leading-none uppercase text-[9px] mb-1">Pending Approvals</span>
                <strong className={`text-xl font-black block ${pendingInquiriesCount > 0 ? 'text-red-700 font-sans' : 'text-charcoal'}`}>
                  {pendingInquiriesCount} inquiries pending
                </strong>
                <span className="text-[9px] text-charcoal/40 block mt-1 font-medium">Requires visual review</span>
              </div>
              <span className="text-3xl">⏳</span>
            </div>

            <div className="bg-white border border-gold-400 p-5 rounded-2xl shadow-sm relative divine-border flex justify-between items-center text-charcoal text-xs">
              <div>
                <span className="text-charcoal/50 block font-bold leading-none uppercase text-[9px] mb-1">Registered Sevadars</span>
                <strong className="text-charcoal text-xl font-black block">{valunteers.length + membersList.length} Accounts</strong>
                <span className="text-[9px] text-charcoal/40 block mt-1 font-medium">In youth & ladies wings</span>
              </div>
              <span className="text-3xl">👥</span>
            </div>

          </div>

          {/* Quick audit highlights / help notes */}
          <div className="bg-cream-100/50 border border-gold-400/30 p-5 rounded-xl space-y-2.5 max-w-2xl">
            <span className="text-maroon-800 text-sm block">💡 Quick Admin Instructions:</span>
            <ul className="list-disc list-inside text-[11px] text-charcoal/80 space-y-1 font-semibold block leading-relaxed.">
              <li>Review incoming Dharamshala check-in stays. Switiching status pushes immediate state updates.</li>
              <li>You can dynamically append new लाभार्थी (Labharthi Wall entries) inside the "Append Labharthi Wall Row" submenu. The additions immediately update the main digital wall tab above!</li>
              <li>Always print/save audited receipt sheets locally to maintain trust transparency.</li>
            </ul>
          </div>

        </div>
      )}

      {/* SUBVIEW 2: Dharamshala Room Bookings list */}
      {activeAdminSub === 'rooms' && (
        <div className="space-y-4 animate-fade-in text-xs">
          <div className="border-b border-gold-400/20 pb-2">
            <h3 className="font-display font-bold text-lg text-maroon-800">Dharamshala Room Bookings Index</h3>
            <p className="text-[10px] text-charcoal/40">Review, approve, and cancel incoming guest room reservations.</p>
          </div>

          {roomBookings.length > 0 ? (
            <div className="overflow-x-auto border border-gold-404/20 rounded-xl bg-white">
              <table className="w-full text-left border-collapse font-bold">
                <thead>
                  <tr className="bg-maroon-700 text-gold-300 text-[10px] uppercase">
                    <th className="p-3">Receipt Code</th>
                    <th className="p-3">Primary Occupant</th>
                    <th className="p-3">Suite Type</th>
                    <th className="p-3">Check-In / Out</th>
                    <th className="p-3 font-sans">Bill Amt</th>
                    <th className="p-3">Approval</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-400/10">
                  {roomBookings.map((room) => (
                    <tr key={room.id} className="hover:bg-cream-100/40">
                      <td className="p-3 font-mono text-maroon-707">{room.bookingCode}</td>
                      <td className="p-3">
                        <span className="block">{room.name}</span>
                        <span className="text-[9px] text-charcoal/40 block font-normal font-sans">{room.mobile} | {room.address}</span>
                      </td>
                      <td className="p-3 font-mono">{room.roomType} x {room.roomsCount}</td>
                      <td className="p-3 font-mono">{room.checkIn} to {room.checkOut}</td>
                      <td className="p-3 font-sans text-green-700">₹{room.totalAmount}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] block uppercase font-black text-center max-w-[80px] ${
                          room.approvalStatus === 'Approved' ? 'bg-green-100 text-green-700' :
                          room.approvalStatus === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {room.approvalStatus}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1 whitespace-nowrap">
                        {room.approvalStatus === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleRoomApproval(room.id, room.bookingCode, true)}
                              className="bg-green-600 hover:bg-green-500 text-white rounded px-2.5 py-1 text-[10px] font-black cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRoomApproval(room.id, room.bookingCode, false)}
                              className="bg-red-603 bg-red-700 hover:bg-red-500 text-white rounded px-2.5 py-1 text-[10px] font-black cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => alert(`Full Stay Slip Details:\nName: ${room.name}\nPhone: ${room.mobile}\nCheckIn: ${room.checkIn}\nCheckOut: ${room.checkOut}\nCategory: ${room.roomType}\nAmt: INR ${room.totalAmount}\nRequests: ${room.specialRequests || 'Nil'}`)}
                          className="border border-gold-400 bg-white hover:bg-cream-100 rounded px-2.5 py-1 text-[10px] cursor-pointer"
                        >
                          Invoice Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-6 bg-white border border-gold-400/20 rounded-xl">No Room reservations logged.</div>
          )}
        </div>
      )}

      {/* SUBVIEW 3: Palace Event Bookings index */}
      {activeAdminSub === 'palace' && (
        <div className="space-y-4 animate-fade-in text-xs">
          <div className="border-b border-gold-404/20 pb-2">
            <h3 className="font-display font-bold text-lg text-maroon-800">Oswal Palace event Bookings Ledger</h3>
            <p className="text-[10px] text-charcoal/40">Review marital receptions, samaj directories, and community gathering permissions.</p>
          </div>

          {palaceBookings.length > 0 ? (
            <div className="overflow-x-auto border border-gold-400/20 rounded-xl bg-white">
              <table className="w-full text-left border-collapse font-bold">
                <thead>
                  <tr className="bg-maroon-700 text-gold-300 text-[10px] uppercase">
                    <th className="p-3">Quota Code</th>
                    <th className="p-3">Organizer</th>
                    <th className="p-3">Event classification</th>
                    <th className="p-3 font-sans">Target Date</th>
                    <th className="p-3 font-sans">Estimate Bill</th>
                    <th className="p-3 uppercase">State</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-400/10">
                  {palaceBookings.map((pal) => (
                    <tr key={pal.id} className="hover:bg-cream-100/40">
                      <td className="p-3 font-mono text-logo text-maroon-707">{pal.bookingCode}</td>
                      <td className="p-3">
                        <span className="block">{pal.organizerName}</span>
                        <span className="text-[9px] text-charcoal/40 block font-normal font-sans">{pal.contact} | {pal.email || 'N/A'}</span>
                      </td>
                      <td className="p-3 text-maroon-805">{pal.eventType.en}</td>
                      <td className="p-3 font-mono">{pal.date}</td>
                      <td className="p-3 font-sans text-green-700">₹{pal.estimatedCost}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-black block text-center max-w-[80px] ${
                          pal.approvalStatus === 'Approved' ? 'bg-green-100 text-green-700' :
                          pal.approvalStatus === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {pal.approvalStatus}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1 whitespace-nowrap">
                        {pal.approvalStatus === 'Pending' && (
                          <>
                            <button
                              onClick={() => handlePalaceApproval(pal.id, pal.bookingCode, true)}
                              className="bg-green-600 hover:bg-green-500 text-white rounded px-2.5 py-1 text-[10px] font-black cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handlePalaceApproval(pal.id, pal.bookingCode, false)}
                              className="bg-red-603 bg-red-700 hover:bg-red-500 text-white rounded px-2.5 py-1 text-[10px] font-black cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => alert(`Oswal Convention Quote Details:\nOrganizer: ${pal.organizerName}\nContact: ${pal.contact}\nEvent: ${pal.eventType.en}\nDate: ${pal.date}\nEstimated Bill: INR ${pal.estimatedCost}\nRequested Decor/Catering: ${pal.requirements.join(', ') || 'None'}`)}
                          className="border border-gold-400 bg-white hover:bg-cream-100 rounded px-2.5 py-1 text-[10px] cursor-pointer"
                        >
                          Quotation Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-6 bg-white border border-gold-400/20 rounded-xl">No Palace event reservations found in ledger.</div>
          )}
        </div>
      )}

      {/* SUBVIEW 4: General Donations Logs Tracker */}
      {activeAdminSub === 'donations' && (
        <div className="space-y-4 animate-fade-in text-xs">
          <div className="border-b border-gold-404/20 pb-2">
            <h3 className="font-display font-bold text-lg text-maroon-800">Dharma Sahyog Core Ledger (Labh Sweekar Indices)</h3>
            <p className="text-[10px] text-charcoal/40 font-bold">Searchable repository of all verified online transaction contributions.</p>
          </div>

          <div className="overflow-x-auto border border-gold-400/20 rounded-xl bg-white">
            <table className="w-full text-left border-collapse font-bold">
              <thead>
                <tr className="bg-maroon-700 text-gold-300 text-[10px] uppercase">
                  <th className="p-3">Receipt No</th>
                  <th className="p-3">Labharthi Name</th>
                  <th className="p-3 font-sans">Amount</th>
                  <th className="p-3">Welfare Category</th>
                  <th className="p-3">Txn Channel</th>
                  <th className="p-3 font-sans">PAN ID (80G)</th>
                  <th className="p-3 text-right">Receipt Sheet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-400/10">
                {donations.map((don) => (
                  <tr key={don.id} className="hover:bg-cream-100/40">
                    <td className="p-3 font-mono text-maroon-707">{don.receiptNumber}</td>
                    <td className="p-3">
                      <span className="block">{don.donorName}</span>
                      <span className="text-[9px] text-charcoal/40 block font-normal">{don.mobile} | {don.city}</span>
                    </td>
                    <td className="p-3 font-sans text-green-700">₹{don.amount.toLocaleString('en-IN')}</td>
                    <td className="p-3">{don.category}</td>
                    <td className="p-3 font-mono text-[10px]">{don.paymentMethod}</td>
                    <td className="p-3 font-mono uppercase text-maroon-600 font-bold">{don.panNumber || 'N/A'}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => alert(`Tribute Receipt Index:\nNo: ${don.receiptNumber}\nLabharthi: ${don.donorName}\nPAN ID: ${don.panNumber || 'N/A'}\nAmount: INR ${don.amount}\nCategory: ${don.category}\nTxn: ${don.transactionId || 'Offline Netbanking'}`)}
                        className="bg-maroon-700 hover:bg-gold-505 hover:text-maroon-850 text-white rounded px-2.5 py-1 text-[10px] cursor-pointer"
                      >
                        Metadata
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBVIEW 5: Interactive Append Donor Wall Row Form */}
      {activeAdminSub === 'add_donor' && (
        <div className="bg-white border rounded-2xl shadow p-6 relative divine-border space-y-6 animate-fade-in text-xs font-bold text-charcoal">
          
          <div className="border-b border-gold-404/20 pb-2">
            <h3 className="font-display font-bold text-lg text-maroon-800 flex items-center">
              <PlusCircle className="w-5.5 h-5.5 mr-2 text-gold-550" />
              <span>लाभार्थी पट्ट प्रविष्टि (Append Labharthi Wall Row)</span>
            </h3>
            <p className="text-[10px] text-charcoal/40 font-semibold">Instantly register a new contributor block onto the central searchable, filterable Digital Labharthi Wall above.</p>
          </div>

          <form onSubmit={handleAddDonorLive} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="flex flex-col space-y-1">
              <label>Labharthi Name (Hindi) *</label>
              <input 
                type="text" 
                required 
                placeholder="उदा. शाह शांतिलाल मुथा" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={newDonorNameHI}
                onChange={(e) => setNewDonorNameHI(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Labharthi Name (English) *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Shah Shantilal Mutha" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={newDonorNameEN}
                onChange={(e) => setNewDonorNameEN(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Labharthi Native City (Hindi) *</label>
              <input 
                type="text" 
                required 
                placeholder="उदा. डूंगरी पुरा" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={newDonorCityHI}
                onChange={(e) => setNewDonorCityHI(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Labharthi Native City (English) *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Dungri Pura" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={newDonorCityEN}
                onChange={(e) => setNewDonorCityEN(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Family Details (Hindi)</label>
              <input 
                type="text" 
                placeholder="उदा. संघवी शांतिलाल जी परिवार" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={newDonorFamilyHI}
                onChange={(e) => setNewDonorFamilyHI(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Family Details (English)</label>
              <input 
                type="text" 
                placeholder="e.g. Sanghvi Shantilal Family" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={newDonorFamilyEN}
                onChange={(e) => setNewDonorFamilyEN(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Dharma Sahyog Amount (INR) *</label>
              <input 
                type="number" 
                required 
                placeholder="e.g. 501000" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs font-mono font-bold"
                value={newDonorAmount}
                onChange={(e) => setNewDonorAmount(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Sponsorship Tier Level *</label>
              <select
                required
                className="p-2.5 border border-gold-400/35 bg-white rounded outline-none text-xs"
                value={newDonorTier}
                onChange={(e: any) => setNewDonorTier(e.target.value)}
              >
                <option value="Maha Daanveer">❤️ Maha Labharthi (₹11 Lakhs+)</option>
                <option value="Platinum">🌟 Platinum Sahyogi (₹5 Lakhs+)</option>
                <option value="Gold">🟡 Gold Sahyogi (₹2.5 Lakhs+)</option>
                <option value="Silver">⚪ Silver Sahyogi (₹1 Lakhs+)</option>
                <option value="Contributor">🤝 General Sahyogi (Under ₹1 Lakhs)</option>
              </select>
            </div>

            {/* Target sponsorship segment */}
            <div className="flex flex-col space-y-1">
              <label>Labh Opportunity Category / Subject (Hindi) *</label>
              <input 
                type="text" 
                required 
                placeholder="उदा. संगमरमर केंद्रीय खंभा निर्माण सहायता" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={newDonorTargetHI}
                onChange={(e) => setNewDonorTargetHI(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Labh Opportunity Category / Subject (English) *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Marble Pillar Carving Core Support" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={newDonorTargetEN}
                onChange={(e) => setNewDonorTargetEN(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Tribute Message (Hindi)</label>
              <input 
                type="text" 
                placeholder="उदा. सदा सर्वदा जिन शासन का जय जयकार हो" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={newDonorMsgHI}
                onChange={(e) => setNewDonorMsgHI(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Tribute Message (English)</label>
              <input 
                type="text" 
                placeholder="e.g. Always in Service of monk shelters" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={newDonorMsgEN}
                onChange={(e) => setNewDonorMsgEN(e.target.value)}
              />
            </div>

            <div className="col-span-1 sm:col-span-2 pt-2 text-center space-y-3">
              {isDonorAddedMsg && (
                <div className="p-2.5 bg-green-50 text-green-800 border-l-4 border-green-600 rounded inline-block animate-fade-in text-xs font-bold w-full">
                  ✓ Labharthi row compiled and injected successfully! Check out the digital Labharthi Wall above.
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-maroon-gradient hover:bg-gold-505 hover:text-maroon-900 text-gold-300 font-black py-4 rounded-xl border border-gold-500 shadow transition-all cursor-pointer text-xs sm:text-sm"
              >
                Inscribe Labharthi Details Onto Wall Database
              </button>
            </div>

          </form>

        </div>
      )}

      {/* SUBVIEW FOR GALLERY & VIDEOS MANAGEMENT */}
      {activeAdminSub === 'gallery_mgmt' && (
        <div className="bg-white border rounded-2xl shadow p-6 relative divine-border space-y-8 animate-fade-in text-xs font-bold text-charcoal">
          
          <div className="border-b border-gold-400/20 pb-2">
            <h3 className="font-display font-bold text-lg text-maroon-800 flex items-center">
              <Sparkles className="w-5.5 h-5.5 mr-2 text-gold-550" />
              <span>गैलरी और वीडियो प्रबंधन (Manage Gallery & Videos)</span>
            </h3>
            <p className="text-[10px] text-charcoal/40 font-semibold">Add new drone video tours, YouTube embedded project walkthroughs, or construction pictures.</p>
          </div>

          {/* Form to add item */}
          <form onSubmit={handleAddMediaItem} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="flex flex-col space-y-1">
              <label>Media Title (Hindi) *</label>
              <input 
                type="text" 
                required 
                placeholder="उदा. शानदार विवाह सभा मंडप" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={newMediaTitleHI}
                onChange={(e) => setNewMediaTitleHI(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Media Title (English) *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Grand Marriage Assembly Hall" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={newMediaTitleEN}
                onChange={(e) => setNewMediaTitleEN(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Section / Category *</label>
              <select 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs font-semibold"
                value={newMediaCategory}
                onChange={(e) => setNewMediaCategory(e.target.value as any)}
              >
                <option value="Temple">Main Temple</option>
                <option value="Construction">Vihardham Stays</option>
                <option value="Oswal Palace">Oswal Palace</option>
                <option value="Drone">Aerial Drone</option>
                <option value="Samaj Events">Community Events</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label>Media Type *</label>
              <select 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs font-semibold"
                value={newMediaType}
                onChange={(e) => setNewMediaType(e.target.value as any)}
              >
                <option value="image">🖼️ Photo Image</option>
                <option value="video">🎥 YouTube Video</option>
              </select>
            </div>

            <div className="col-span-1 sm:col-span-2 flex flex-col space-y-2">
              <label className="text-maroon-800 font-bold block mb-1">
                {newMediaType === 'video' ? 'YouTube URL / Share Link *' : 'Image Source'}
              </label>
              
              {newMediaType === 'video' ? (
                <>
                  <input 
                    type="url" 
                    required 
                    placeholder="https://youtu.be/Cwyn5LCGd0c or watch URL" 
                    className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs font-mono"
                    value={newMediaUrl}
                    onChange={(e) => setNewMediaUrl(e.target.value)}
                  />
                  <span className="text-[10px] text-charcoal/45 font-mono font-medium block">
                    Paste any YouTube regular or share link. Our player parses the ID and configures lazy-loading automatically.
                  </span>
                </>
              ) : (
                <div className="space-y-4">
                  {/* Image input via text url */}
                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] text-charcoal/60 block">Option A: Paste a Web Image URL or relative path</span>
                    <input 
                      type="text" 
                      placeholder="e.g. https://images.unsplash.com/... or relative assets path" 
                      className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs font-mono"
                      value={newMediaUrl.startsWith('data:image/') ? '' : newMediaUrl}
                      onChange={(e) => setNewMediaUrl(e.target.value)}
                    />
                  </div>

                  {/* Drag and Drop Zone */}
                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] text-charcoal/60 block">Option B: Drag-and-drop or browse an image file from your device</span>
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('media-file-input')?.click()}
                      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                        dragActive 
                          ? 'border-gold-500 bg-gold-100/10' 
                          : newMediaUrl.startsWith('data:image/') 
                            ? 'border-green-600 bg-green-50/10' 
                            : 'border-gold-400/40 hover:border-maroon-700 bg-cream-50/10'
                      }`}
                    >
                      <input 
                        id="media-file-input"
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                      
                      <div className="flex flex-col items-center justify-center space-y-2">
                        {newMediaUrl.startsWith('data:image/') ? (
                          <>
                            <div className="relative w-20 h-20 border-2 border-charcoal/30 bg-white shadow-md rounded">
                              <img src={newMediaUrl} className="w-full h-full object-cover" alt="Uploaded Thumbnail" />
                              <button 
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setNewMediaUrl('');
                                }}
                                className="absolute -top-2 -right-2 bg-red-700 text-white rounded-full p-1 border border-charcoal hover:bg-red-850 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-green-800 text-xs font-bold font-sans">✓ Image uploaded successfully via client file selector!</span>
                            <span className="text-[9px] text-charcoal/40 font-semibold">(Encoded securely in Base64 for instant preview & persistence)</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gold-500 animate-pulse" />
                            <p className="text-xs text-charcoal font-black">
                              Drag & Drop your image file here, or <span className="text-maroon-700 font-bold underline">click to browse</span>
                            </p>
                            <p className="text-[9px] text-charcoal/40 font-semibold">Supports PNG, JPG, JPEG, GIF, WEBP</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="col-span-1 sm:col-span-2 pt-2 text-center space-y-3">
              {isMediaAddedMsg && (
                <div className="p-2.5 bg-green-50 text-green-800 border-l-4 border-green-600 rounded inline-block animate-fade-in text-xs font-bold w-full">
                  ✓ Media item registered successfully! It will now appear on relevant pages and the Gallery page.
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-maroon-gradient hover:bg-gold-505 hover:text-maroon-900 text-gold-300 font-black py-4 rounded-xl border border-gold-500 shadow transition-all cursor-pointer text-xs sm:text-sm"
              >
                Publish Media Element to Gallery Database
              </button>
            </div>

          </form>

          {/* Active items management listing */}
          <div className="space-y-3 border-t-2 border-gold-400/20 pt-6">
            <h4 className="font-display font-medium text-maroon-850 text-sm">Active Gallery Items ({galleryItems.length})</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {galleryItems.map((item) => {
                const getValidUrl = (url: string) => {
                  if (!url) return 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=800';
                  const clean = url.trim();
                  if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('data:image/') || clean.startsWith('/') || clean.startsWith('blob:')) {
                    return clean;
                  }
                  return 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=800';
                };
                const imageUrl = item.type === 'image' ? getValidUrl(item.url) : '';

                return (
                  <div key={item.id} className="border-2 border-charcoal/20 p-3 flex justify-between items-center gap-3 bg-cream-50/40">
                    <div className="flex items-center space-x-2.5">
                      {item.type === 'image' ? (
                        <img 
                          src={imageUrl} 
                          className="w-12 h-12 object-cover border border-charcoal shrink-0" 
                          alt="Preview" 
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=800';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-red-800 text-white shrink-0 flex items-center justify-center font-mono text-[9px]">VIDEO</div>
                      )}
                      <div>
                        <span className="text-maroon-800 text-[10px] font-mono block">[{item.category}] ({item.type})</span>
                        <strong className="text-charcoal text-xs block line-clamp-1">{item.title.en}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteMediaItem(item.id, item.title.en)}
                      className="border-2 border-red-700 text-red-700 hover:bg-red-50 px-2 py-1 text-[10px] rounded cursor-pointer font-bold uppercase"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* SUBVIEW: Manage Hero Slideshow Images */}
      {activeAdminSub === 'slideshow_mgmt' && (
        <div className="bg-white border rounded-2xl shadow p-6 relative divine-border space-y-8 animate-fade-in text-xs font-bold text-charcoal">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gold-400/20 pb-4 gap-4">
            <div>
              <h3 className="font-display font-bold text-lg text-maroon-800 flex items-center">
                <Sparkles className="w-5.5 h-5.5 mr-2 text-gold-550" />
                <span>हीरो स्लाइड शो प्रबंधन (Manage Hero Slideshow)</span>
              </h3>
              <p className="text-[10px] text-charcoal/40 font-semibold mt-0.5">Add, modify, or delete the slideshow images that are featured on your homepage's hero banner instead of static placeholders.</p>
            </div>
            <button
              onClick={handleResetSlideshow}
              className="bg-gold-500 hover:bg-gold-450 text-maroon-900 font-extrabold px-3.5 py-2 border border-charcoal/30 flex items-center space-x-1 uppercase text-[10px] hover:scale-[1.01] active:translate-y-0.5 transition-transform shadow-flat cursor-pointer"
            >
              🔄 Restore 4 Default Slides
            </button>
          </div>

          {/* Form to add item */}
          <form onSubmit={handleAddSlideItem} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="flex flex-col space-y-1">
              <label>Slide Title (Hindi) *</label>
              <input 
                type="text" 
                required 
                placeholder="उदा. भव्य श्री आदिनाथ शिखरबद्ध जिनालय" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={slideTitleHI}
                onChange={(e) => setSlideTitleHI(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Slide Title (English) *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Grand Shikharbandh Adinath Temple" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs"
                value={slideTitleEN}
                onChange={(e) => setSlideTitleEN(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Slide Caption/Subtitle (Hindi) - Optional</label>
              <input 
                type="text" 
                placeholder="उदा. नवनिर्मित पावन जैन मंदिर - भक्ति, शांति और ध्यान का पावन धाम" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs animate-none"
                value={slideCaptionHI}
                onChange={(e) => setSlideCaptionHI(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label>Slide Caption/Subtitle (English) - Optional</label>
              <input 
                type="text" 
                placeholder="e.g. Newly built sacred Jain Temple - A hub of devotion and peace" 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs animate-none"
                value={slideCaptionEN}
                onChange={(e) => setSlideCaptionEN(e.target.value)}
              />
            </div>

            {/* Drag and drop / URL Input block */}
            <div className="col-span-1 sm:col-span-2 flex flex-col space-y-2 pt-2">
              <label className="text-maroon-800 font-bold block">Slide Image Asset *</label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1 justify-center">
                  <span className="text-[10px] text-charcoal/60 block font-mono">🚀 Option A: Paste a Web Image URL:</span>
                  <input 
                    type="text" 
                    placeholder="https://images.unsplash.com/... or local assets path" 
                    className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-[11px] font-mono"
                    value={slideUrl.startsWith('data:image/') ? '' : slideUrl}
                    onChange={(e) => setSlideUrl(e.target.value)}
                  />
                  <span className="text-[9px] text-charcoal/40 font-semibold mt-1">Useful for embedding high-res stock photography directly.</span>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-[10px] text-charcoal/60 block font-mono">📸 Option B: Upload direct from device (Auto compressed):</span>
                  <div 
                    onDragEnter={handleSlideDrag}
                    onDragOver={handleSlideDrag}
                    onDragLeave={handleSlideDrag}
                    onDrop={handleSlideDrop}
                    className={`border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center p-3 transition-colors relative cursor-pointer ${
                      slideDragActive 
                        ? 'border-maroon-750 bg-maroon-50/30 text-maroon-900 border-dashed animate-pulse' 
                        : slideUrl.startsWith('data:image/')
                          ? 'border-green-600 bg-green-50/20 text-green-800'
                          : 'border-gold-400/30 hover:border-gold-500 bg-cream-50/5'
                    }`}
                  >
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-20"
                      onChange={handleSlideFileChange}
                    />
                    {slideUrl.startsWith('data:image/') ? (
                      <div className="text-center space-y-1 pointer-events-none">
                        <span className="text-xl">✨</span>
                        <p className="text-[10px] font-mono font-black text-green-700 uppercase">IMAGE STREAM READY</p>
                        <p className="text-[9px] text-green-600/70">Automatic canvas scale and compression complete</p>
                      </div>
                    ) : (
                      <div className="text-center space-y-1 pointer-events-none">
                        <span className="text-xl text-charcoal/40">📤</span>
                        <p className="text-[10px] text-charcoal/80 font-bold uppercase">Drag photo here or browse</p>
                        <p className="text-[9px] text-charcoal/45">Will compress layout for high speeds</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full bg-maroon-gradient border-2 border-charcoal/40 hover:bg-gold-500 hover:text-maroon-950 text-gold-300 font-extrabold py-3 uppercase tracking-wider text-xs shadow-flat hover:scale-[1.005] transition-transform cursor-pointer"
              >
                ➕ Inject Slide into Hero Banner
              </button>
            </div>
          </form>

          {isSlideAddedMsg && (
            <div className="p-3.5 bg-green-50 rounded border-2 border-green-300 text-green-800 text-[11px] font-semibold flex items-center space-x-2">
              <span>🎉</span>
              <span><strong>Success:</strong> Appended new hero slide to trust assets! It is now rendering live in real-time on the homepage banner.</span>
            </div>
          )}

          {/* List of active slides */}
          <div className="space-y-4 pt-4 border-t border-gold-400/20">
            <h4 className="font-display font-extrabold text-sm text-maroon-800 tracking-tight uppercase">📺 Current Active Slides ({slideshowImages.length})</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slideshowImages.map((slide, idx) => {
                return (
                  <div key={slide.id} className="bg-cream-50/30 border-2 border-charcoal/20 p-3.5 flex flex-col justify-between relative shadow-flat-sm space-y-3.5">
                    
                    {/* Index badge */}
                    <span className="absolute top-2 right-2 bg-charcoal text-white text-[10px] font-mono font-black w-6 h-6 flex items-center justify-center rounded-none shadow-flat-sm">
                      #{idx + 1}
                    </span>

                    <div className="flex space-x-3.5 items-center">
                      <img 
                        src={slide.url} 
                        alt="Slide preview" 
                        className="w-20 h-16 object-cover object-center border border-charcoal shrink-0 shadow-flat-xs"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      <div className="space-y-1">
                        <strong className="text-charcoal font-black text-[12px] block line-clamp-1 pr-6">{slide.title.en}</strong>
                        {slide.caption?.en && (
                          <p className="text-charcoal/60 text-[10px] font-medium leading-relaxed font-sans line-clamp-2">{slide.caption.en}</p>
                        )}
                        <span className="text-maroon-850 text-[10px] font-bold block">Hindi Title: "{slide.title.hi}"</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-charcoal/5">
                      <span className="text-[9px] text-charcoal/40 font-mono font-bold uppercase truncate max-w-[200px]">{slide.url.startsWith('data:image/') ? '[Compressed base64 File]' : slide.url}</span>
                      <button
                        onClick={() => handleDeleteSlideItem(slide.id, slide.title.en)}
                        className="border-2 border-red-700 hover:bg-red-50 text-red-700 font-black px-2.5 py-1 text-[10px] uppercase cursor-pointer transition-transform hover:scale-102"
                      >
                        Delete Slide
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {slideshowImages.length === 0 && (
              <div className="bg-amber-50 border-2 border-dashed border-amber-300 p-6 text-center space-y-1">
                <p className="text-amber-850 font-black uppercase text-xs">⚠️ No Custom Slides Active</p>
                <p className="text-amber-900/80 text-[11px] font-semibold leading-normal">
                  You do not have any customized slide images. The webpage is currently falling back to rendering the default single Vihardham rendering and stock photography slides. You can add one anytime above!
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* SUBVIEW 6: Members / Volunteer Directory registrations listing */}
      {activeAdminSub === 'people' && (
        <div className="space-y-8 animate-fade-in text-xs font-bold text-charcoal">
          
          {/* Section: Volunteers */}
          <div className="bg-white border p-5 rounded-2xl relative divine-border space-y-3">
            <h4 className="font-display font-medium text-maroon-800 text-sm">Enrolled Volunteers ({valunteers.length})</h4>
            {valunteers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-maroon-50ed text-maroon-800 text-[10px] uppercase">
                      <th className="p-2">Name</th>
                      <th className="p-2">Mobile Contact</th>
                      <th className="p-2">Wing Selection</th>
                      <th className="p-2">Sectors / Skills</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-400/10">
                    {valunteers.map((vol) => (
                      <tr key={vol.id} className="hover:bg-cream-100/20">
                        <td className="p-2">{vol.name} ({vol.city})</td>
                        <td className="p-2 font-mono">{vol.mobile}</td>
                        <td className="p-2 text-gold-600">{vol.wing}</td>
                        <td className="p-2 text-charcoal/65">{vol.skills || 'All Round Seva'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-charcoal/40 text-[11px]">No volunteers registered yet.</p>
            )}
          </div>

          {/* Section: Members */}
          <div className="bg-white border p-5 rounded-2xl relative divine-border space-y-3">
            <h4 className="font-display font-medium text-maroon-805 text-sm">Life & Board Members ({membersList.length})</h4>
            {membersList.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-maroon-50ed text-maroon-800 text-[10px] uppercase">
                      <th className="p-2">Member Name</th>
                      <th className="p-2">Sub-city Location</th>
                      <th className="p-2">Subscription Tier Level</th>
                      <th className="p-2">Enrollment Date Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-400/10">
                    {membersList.map((mem) => (
                      <tr key={mem.id} className="hover:bg-cream-100/20">
                        <td className="p-2">{mem.name}</td>
                        <td className="p-2">{mem.city}</td>
                        <td className="p-2 text-green-700">{mem.memberType}</td>
                        <td className="p-2 font-mono text-[10px] text-charcoal/50">{mem.registeredAt.substring(0, 10)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-charcoal/40 text-[11px]">No formal subscribers registered yet.</p>
            )}
          </div>

        </div>
      )}

      {/* SUBVIEW 7: System Audit Logs Panel */}
      {activeAdminSub === 'audit' && (
        <div className="space-y-4 animate-fade-in text-xs font-bold text-charcoal">
          <div className="border-b border-gold-404/20 pb-2 flex justify-between items-center">
            <div>
              <h3 className="font-display font-bold text-lg text-maroon-800">CCTV System & Executive Audit Log Track</h3>
              <p className="text-[10px] text-charcoal/40">Secure trace logs mapping admin activities took during current live session.</p>
            </div>
            <button 
              onClick={() => { setAuditLogs([]); logAction("Cleared Audit registries", "Internal logs scrubbed cleanly"); }}
              className="text-maroon-700 border hover:bg-maroon-50ed rounded px-2.5 py-1 text-[10px] cursor-pointer"
            >
              Clear Logs
            </button>
          </div>

          <div className="bg-white border border-gold-400/25 p-4 rounded-xl space-y-2.5 max-h-72 overflow-y-auto font-mono text-[10px]">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-2 border-b border-cream-100 flex justify-between items-start gap-3 hover:bg-cream-50/50">
                <div>
                  <span className="text-maroon-700 font-extrabold mr-1">[{log.timestamp}]</span>
                  <span className="text-gold-600 font-black mr-1">{log.actor} ({log.role})</span>
                  <strong className="text-charcoal block mt-0.5">{log.action}: <span className="font-normal text-charcoal/70">{log.details}</span></strong>
                </div>
                <span className="bg-cream-200 text-maroon-900 border font-bold text-[8px] px-1 rounded inline-block">SECURE</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

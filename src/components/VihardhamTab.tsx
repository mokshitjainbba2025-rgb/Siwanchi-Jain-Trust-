/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, MapPin, Check, Heart, ShieldAlert, Sparkles, Building, ChevronRight, X, Printer, BedDouble } from 'lucide-react';
import { Language, RoomBooking, RoomCategory } from '../types';
import { staticTranslations } from '../data';
import ProjectVideoPlayer from './ProjectVideoPlayer';

interface VihardhamTabProps {
  currentLang: Language;
  onAddRoomBooking: (booking: RoomBooking) => void;
  roomCategories: RoomCategory[];
}

function RoomSlideshow({ images, currentLang, type }: { images: RoomCategory['images']; currentLang: Language; type: string }) {
  const views: { key: keyof typeof images; labelHi: string; labelEn: string; icon: string }[] = [
    { key: 'exterior', labelHi: 'बाहरी रूप', labelEn: 'Exterior', icon: '🏛️' },
    { key: 'interior', labelHi: 'कमरा', labelEn: 'Interior', icon: '🛌' },
    { key: 'beds', labelHi: 'बिस्तर', labelEn: 'Beds', icon: '🛏️' },
    { key: 'washroom', labelHi: 'बाथरूम', labelEn: 'Washroom', icon: '🚿' },
    { key: 'storage', labelHi: 'लॉकर', labelEn: 'Storage', icon: '🔑' },
    { key: 'common', labelHi: 'सामान्य', labelEn: 'Common', icon: '🏡' }
  ];

  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % views.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeView = views[activeIdx];
  const activeUrl = images ? images[activeView.key] : '';

  return (
    <div className="relative h-52 sm:h-60 w-full flex flex-col justify-between border-b-2 border-charcoal overflow-hidden group/slide bg-charcoal/5">
      {/* Active Image */}
      <div className="absolute inset-x-0 top-0 bottom-12 overflow-hidden bg-cream-50 flex items-center justify-center">
        {activeUrl ? (
          <img
            src={activeUrl}
            alt={activeView.labelEn}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-750 transform scale-100 group-hover/slide:scale-103"
          />
        ) : (
          <div className="text-[10px] text-charcoal/40 font-mono">No Image Configured</div>
        )}
        
        {/* Navigation Overlays */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2 flex justify-between items-end">
          <span className="text-[10px] text-yellow-300 font-extrabold uppercase font-mono tracking-wider">
            {activeView.icon} {currentLang === 'hi' ? activeView.labelHi : activeView.labelEn}
          </span>
          <span className="text-[8px] bg-black/45 text-white/80 px-1 py-0.5 rounded font-mono">
            {activeIdx + 1}/6
          </span>
        </div>
      </div>

      {/* Header Overlay Badges */}
      <div className="absolute top-2 left-2 pointer-events-none z-10">
        <div className="bg-maroon-800 text-gold-300 font-bold text-[9px] px-2 py-0.5 border border-charcoal uppercase shadow-flat-sm font-mono tracking-wider">
          {type}
        </div>
      </div>

      {/* Manual buttons tab bar at bottom */}
      <div className="h-12 w-full mt-auto bg-cream-50 border-t-2 border-charcoal flex items-center justify-between px-0.5 overflow-x-auto divide-x divide-charcoal/20 select-none">
        {views.map((v, i) => (
          <button
            key={v.key}
            onClick={() => setActiveIdx(i)}
            type="button"
            className={`flex-1 h-full flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
              activeIdx === i
                ? 'bg-gold-450 hover:bg-gold-500 bg-gold-400 text-maroon-950 font-black'
                : 'text-charcoal/70 hover:text-charcoal hover:bg-cream-100/60 text-[9px]'
            }`}
          >
            <span className="text-xs shrink-0 leading-none mb-0.5">{v.icon}</span>
            <span className="text-[8px] font-black uppercase tracking-tighter leading-none block font-mono">
              {currentLang === 'hi' ? v.labelHi : v.labelEn}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function VihardhamTab({ currentLang, onAddRoomBooking, roomCategories }: VihardhamTabProps) {
  const [selectedRoomCategory, setSelectedRoomCategory] = useState<RoomCategory | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isBookedSuccess, setIsBookedSuccess] = useState(false);
  const [generatedBooking, setGeneratedBooking] = useState<RoomBooking | null>(null);

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [roomsRequired, setRoomsRequired] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentOption, setPaymentOption] = useState<'UPI' | 'Bank Transfer' | 'Online Gateway' | 'Pay at Counter'>('Pay at Counter');

  const t = staticTranslations[currentLang];

  const handleOpenBooking = (category: RoomCategory) => {
    setSelectedRoomCategory(category);
    setShowBookingModal(true);
    setIsBookedSuccess(false);
  };

  const handleCloseBooking = () => {
    setShowBookingModal(false);
    setSelectedRoomCategory(null);
    setIsBookedSuccess(false);
    // Reset Form
    setFullName('');
    setMobile('');
    setEmail('');
    setAddress('');
    setCheckIn('');
    setCheckOut('');
    setGuestCount(1);
    setRoomsRequired(1);
    setSpecialRequests('');
    setPaymentOption('Pay at Counter');
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoomCategory) return;

    // Calculate nights
    let nights = 1;
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) nights = diffDays;
    }

    const totalCost = selectedRoomCategory.ratePerDay * roomsRequired * nights;
    const bookingCode = "RM" + Math.floor(100000 + Math.random() * 900000);

    const newBooking: RoomBooking = {
      id: "b_" + Date.now(),
      bookingCode,
      name: fullName,
      mobile,
      email,
      address,
      checkIn,
      checkOut,
      guests: Number(guestCount),
      roomType: selectedRoomCategory.name[currentLang],
      roomsCount: Number(roomsRequired),
      specialRequests,
      paymentOption,
      paymentStatus: paymentOption === 'Pay at Counter' ? 'Pending' : 'Approved',
      approvalStatus: 'Pending',
      totalAmount: totalCost,
      createdAt: new Date().toISOString()
    };

    onAddRoomBooking(newBooking);
    setGeneratedBooking(newBooking);
    setIsBookedSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* SECTION 1: Spiritual Overview of Vihardham */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-12 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-maroon-50ed text-maroon-700 font-black px-3 py-1.5 rounded-none border-2 border-charcoal text-xs uppercase shadow-flat">
            <Sparkles className="w-4.5 h-4.5 text-gold-500" />
            <span className="font-mono">Dedicated Monastic and Secular Resort</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-maroon-850 uppercase tracking-tight">
            विहारधाम और सुविधायुक्त धर्मशाला परिसर
          </h1>
          <p className="text-charcoal text-sm sm:text-base max-w-3xl mx-auto font-bold leading-relaxed">
            पूज्य साधु-साध्वी भगवंतों के पद-विहार आनंद और गृहस्थों के सात्विक आध्यात्मिक विश्राम के लिए डूंगरी पुरा में उत्कृष्ट धार्मिक पर्यावरण समन्वित परिसर।
          </p>
          <div className="w-32 h-1 bg-charcoal mx-auto mt-2"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Monks Stays Philosophy & Facilities list */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-maroon-gradient border-3 border-charcoal text-white p-6 sm:p-8 rounded-none shadow-flat-lg space-y-6">
            <div className="flex items-center space-x-3 border-b border-gold-500/30 pb-4">
              <span className="text-3xl">🌿</span>
              <div>
                <h3 className="text-gold-400 font-display font-black text-lg leading-tight uppercase tracking-tight">
                  Jain Maryada Framework
                </h3>
                <span className="text-[10px] text-cream-200 uppercase tracking-widest font-black block font-mono">
                  Strictly Devoted to Ascetic Vows
                </span>
              </div>
            </div>

            <p className="text-gold-300 font-bold text-xs sm:text-sm leading-relaxed">
              {currentLang === 'hi' 
                ? "पूज्य श्रमण-श्रमणी वृन्द की कठोर साधु चर्या के पूर्ण अनुपालन के लिए विहारधाम का ढांचा विद्युत रहित मिट्टी और लकड़ी की पाटो से सज्जित है।" 
                : "Perfect non-electric and organic layouts ensuring optimal execution of Jain monastic norms during long walking intervals (Vihars)."}
            </p>

            <ul className="space-y-3.5 text-xs sm:text-sm text-gold-300 font-bold font-mono">
              <li className="flex items-start space-x-2">
                <ShieldAlert className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span>No electricity or digital wiring inside Sadhu complexes.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Pristine triple-layered filtered water (Achitta Upakarsh).</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Dedicated Upashray hall for spiritual sermons & Pratikraman.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Spacious rooms with attached low-moisture custom closets.</span>
              </li>
            </ul>
          </div>

          {/* Authentic Bhojanshala Timing & Rates Bulletin Card */}
          <div className="bg-[#FFFDF0] border-3 border-amber-600 p-5 rounded-none space-y-4 shadow-flat-sm text-charcoal font-sans relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full translate-x-4 -translate-y-4"></div>
            
            <div className="text-center space-y-1 pb-1.5 border-b border-amber-500/30">
              <span className="text-maroon-800 text-xs font-mono font-black uppercase tracking-widest block">
                {currentLang === 'hi' ? "★ भोजन व्यवस्था ★" : "★ SACRED CATERING ★"}
              </span>
              <h4 className="font-display font-black text-maroon-900 text-base sm:text-lg uppercase tracking-tight block">
                {currentLang === 'hi' ? "संघवी शान्ताबाय जैन भोजनशाला" : "Sanghvi Shantaba Jain Bhojanshala"}
              </h4>
              <p className="text-[10px] text-amber-900 font-bold bg-amber-100 px-2 py-0.5 inline-block font-mono">
                {currentLang === 'hi' ? "दिनांक : 01 फरवरी 2026 से प्रभावी" : "Effective Date: From 01 February 2026"}
              </p>
            </div>

            {/* Timings & Cost Grid */}
            <div className="border border-amber-600/40 divide-y divide-amber-600/40 text-[11px] font-bold">
              {/* Header row */}
              <div className="grid grid-cols-12 bg-amber-600/10 text-[10px] text-maroon-850 font-black uppercase tracking-wider p-2">
                <span className="col-span-5">{currentLang === 'hi' ? "विवरण (Meal Type)" : "Meal Type"}</span>
                <span className="col-span-3 text-center">{currentLang === 'hi' ? "दर (Rate)" : "Rate"}</span>
                <span className="col-span-4 text-right">{currentLang === 'hi' ? "समय / नियम" : "Time / Rule"}</span>
              </div>
              
              {/* Navkarsi */}
              <div className="grid grid-cols-12 p-2 items-center bg-white">
                <div className="col-span-5 pr-1">
                  <span className="text-maroon-800 block text-xs font-black">{currentLang === 'hi' ? "सुबह की नवकारसी" : "Morning Navkarsi"}</span>
                </div>
                <div className="col-span-3 text-center text-xs font-black text-green-700">60 रू. (₹60)</div>
                <div className="col-span-4 text-right text-[10px] text-charcoal/80">
                  {currentLang === 'hi' ? "नवकारसी आने के बाद" : "After Navkarsi"}
                </div>
              </div>

              {/* Lunch */}
              <div className="grid grid-cols-12 p-2 items-center bg-white/70">
                <div className="col-span-5 pr-1">
                  <span className="text-maroon-800 block text-xs font-black">{currentLang === 'hi' ? "दोपहर का भोजन" : "Afternoon Lunch"}</span>
                </div>
                <div className="col-span-3 text-center text-xs font-black text-green-700">80 रू. (₹80)</div>
                <div className="col-span-4 text-right text-[10px] text-charcoal/80">
                  {currentLang === 'hi' ? "प्रातः 11 से दोपहर 1 बजे" : "11:00 AM to 01:00 PM"}
                </div>
              </div>

              {/* Dinner */}
              <div className="grid grid-cols-12 p-2 items-center bg-white">
                <div className="col-span-5 pr-1">
                  <span className="text-maroon-800 block text-xs font-black">{currentLang === 'hi' ? "शाम का भोजन" : "Evening Dinner"}</span>
                </div>
                <div className="col-span-3 text-center text-xs font-black text-green-700">80 रू. (₹80)</div>
                <div className="col-span-4 text-right text-[10px] text-charcoal/80 font-black text-amber-800">
                  {currentLang === 'hi' ? "सूर्यास्त पूर्व" : "Before Sunset"}
                </div>
              </div>
            </div>

            {/* Rules Block */}
            <div className="bg-amber-50 border border-amber-500/20 p-3 text-[10px] sm:text-xs text-amber-950 space-y-1.5 leading-snug">
              <span className="font-display font-black text-maroon-850 uppercase tracking-wider block text-center border-b border-amber-550/25 pb-0.5 mb-1 text-[11px]">
                📢 {currentLang === 'hi' ? "आवश्यक सूचना एवं नियम" : "Important Room Rules & Notice"}
              </span>
              <p className="flex items-start">
                <span className="mr-1.5 text-amber-600">⚖️</span>
                <span>
                  {currentLang === 'hi' 
                    ? "अधिक यात्री होने से आगामी जानकारी अवश्य प्रदान करें।" 
                    : "For larger pilgrim groups, please inform the management in advance."}
                </span>
              </p>
              <p className="flex items-start font-black text-maroon-850">
                <span className="mr-1.5 text-amber-600">🚫</span>
                <span>
                  {currentLang === 'hi' 
                    ? "कृपया थाली में जूठा भोजन बिल्कुल न छोड़ें।" 
                    : "Do not leave any leftover food on your dining plate."}
                </span>
              </p>
              <p className="flex items-start">
                <span className="mr-1.5 text-amber-600">🥛</span>
                <span>
                  {currentLang === 'hi' 
                    ? "कृपया थाली धोकर पीने (आचमन करने) का पावन आग्रह रखें।" 
                    : "We highly request rinsing the plate and sipping the water (zero waste ritual)."}
                </span>
              </p>
            </div>

            {/* Contacts & Trust Mandli */}
            <div className="bg-white border border-amber-400 p-2.5 text-center space-y-1 font-mono text-[10px] sm:text-xs">
              <span className="text-charcoal/60 block font-bold uppercase">{currentLang === 'hi' ? "भोजनशाला प्रबंधक संपर्क सूत्र" : "Bhojanshala Manager Contacts"}</span>
              <div className="flex justify-center gap-3 text-maroon-800 font-black">
                <a href="tel:+918233984114" className="underline hover:text-amber-700">8233984114</a>
                <span>|</span>
                <a href="tel:+918824654807" className="underline hover:text-amber-700">8824654807</a>
              </div>
              <p className="text-[9px] italic text-charcoal/75 pt-1 border-t border-dashed border-amber-300">
                {currentLang === 'hi' 
                  ? "कृपया अपना सुझाव भी जरूर-जरूर अवश्य देवें। ...ट्रस्ट मण्डल" 
                  : "Please share your helpful suggestions. ...Trust Board"}
              </p>
            </div>
          </div>
        </div>

        {/* Accommodation Booking Room Grid (Right side columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-b-2 border-charcoal pb-4">
            <h3 className="font-display font-black text-xl sm:text-2xl text-maroon-800 flex items-center uppercase tracking-tight">
              <Building className="w-6 h-6 mr-2 text-maroon-700" />
              <span>धर्मशाला अतिथि गृह: उपलब्ध कमरे</span>
            </h3>
            <p className="text-xs text-charcoal font-semibold mt-1">Book clean, premium, values-aligned rooms inside the Vihardham campus instantly.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {roomCategories.map((rc) => (
              <div 
                key={rc.id} 
                className="bg-white border-3 border-charcoal rounded-none shadow-flat hover:shadow-flat-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
              >
                <RoomSlideshow images={rc.images} currentLang={currentLang} type={rc.type} />

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex justify-between items-start gap-2 border-b border-charcoal/10 pb-2">
                      <h4 className="font-display font-black text-sm text-maroon-800 uppercase tracking-tight">
                        {rc.name[currentLang]}
                      </h4>
                      <span className="text-maroon-900 font-black text-xs sm:text-sm font-mono shrink-0 bg-gold-400/30 px-2 py-0.5 rounded">
                        ₹{rc.ratePerDay}{rc.id === 'rc2' ? '/Bed' : '/Day'}
                      </span>
                    </div>
                    <p className="text-charcoal text-[11px] mt-2 leading-relaxed font-semibold">
                      {rc.description[currentLang]}
                    </p>
                    
                    {/* Amenities list */}
                    <div className="flex flex-wrap gap-1 pt-3.5">
                      {rc.amenities.map((am, idx) => (
                        <span key={idx} className="bg-cream-100 text-[10px] text-maroon-750 font-black px-2 py-1 rounded-none border border-charcoal font-mono">
                          ✓ {am[currentLang]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t-2 border-charcoal flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs text-charcoal font-bold uppercase tracking-wide font-mono">
                      Cap: <strong>{rc.capacity} Guests</strong>
                    </span>

                    {rc.ratePerDay === 0 ? (
                      <span className="text-[10px] text-red-700 font-black uppercase font-mono py-1">Monks Block Only</span>
                    ) : (
                      <button
                        onClick={() => handleOpenBooking(rc)}
                        className="bg-maroon-700 hover:bg-gold-500 hover:text-maroon-950 text-white text-xs font-black px-4 py-2.5 rounded-none border-2 border-charcoal shadow-flat uppercase tracking-wider transition-all flex items-center space-x-1 cursor-pointer"
                      >
                        <span>Book Room</span>
                        <ChevronRight className="w-3.5 h-3.5 text-current" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: Virtual Project Walkthrough Video */}
      <div className="bg-cream-105 border-3 border-charcoal/30 p-6 sm:p-10 rounded-none shadow-flat space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-maroon-700 text-xs font-black uppercase tracking-widest block font-mono">🎥 Video Guide Tour</span>
          <h2 className="font-display font-black text-3xl text-maroon-850 uppercase">Vihardham Dharamshala Walkthrough</h2>
          <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-2"></div>
        </div>

        <ProjectVideoPlayer 
          currentLang={currentLang}
          videoId="Cwyn5LCGd0c"
          title={{
            hi: "विहारधाम परिसर - सुखद साधु विहार व तीर्थ यात्रा मार्ग दर्शन",
            en: "Vihardham Complex - Spiritual Resting Sanctuary & Pilgrim Walkthrough"
          }}
          description={{
            hi: "परम पावन डूंगरी पुरा में साधु-साध्वी भगवंतों के लिए नवनिर्मित विहारधाम, धर्मशाला ब्लॉक एवं प्राकृतिक बगीचे का सम्पूर्ण वीडियो ट्यूर।",
            en: "Interactive visual walk of the custom-built Vihardham rooms, pure-meal Shantaba Bhojanshala kitchen system, and serene organic gardens designed for traveling Jain Monks and holy patrons."
          }}
          category="Vihardham Preview"
        />
      </div>

      {/* BOOKING PROCESS MODAL */}
      {showBookingModal && selectedRoomCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 col-span-2">
          <div className="relative bg-cream-50 w-full max-w-2xl rounded-none border-3 border-charcoal shadow-flat-lg overflow-hidden animate-fade-in">
            
                   {/* Modal Content */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 relative">
              <button 
                onClick={handleCloseBooking}
                className="absolute top-4 right-4 p-1.5 border-2 border-charcoal hover:bg-cream-100 text-charcoal transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="text-center p-4 space-y-6">
                <div className="w-16 h-16 bg-cream-100 border-2 border-charcoal text-maroon-700 rounded-none flex items-center justify-center text-3xl mx-auto shadow-flat animate-bounce">
                  🗓️
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-display font-black text-xl sm:text-2xl text-maroon-850 uppercase tracking-tight">
                    {currentLang === 'hi' ? "ऑनलाइन धर्मशाला बुकिंग: शीघ्र ही प्रारंभ" : "Online Room Booking: Coming Soon"}
                  </h4>
                  
                  <div className="text-maroon-800 bg-amber-50 border border-amber-300 px-3 py-1 text-[11px] font-black uppercase font-mono tracking-widest inline-block shadow-flat-sm">
                    {currentLang === 'hi' ? "ऑफलाइन बुकिंग उपलब्ध है (Offline Booking is Active)" : "Offline Booking is fully available"}
                  </div>
                  
                  <p className="text-charcoal text-xs sm:text-sm font-semibold leading-relaxed">
                    {currentLang === 'hi' ? (
                      <>
                        विहारधाम धर्मशाला में कमरों की <strong>ऑनलाइन बुकिंग सेवा शीघ्र ही शुरू की जाएगी</strong>। वर्तमान में यात्रीगण व तीर्थयात्री <strong>सीधे आगमन पर (Offline) अथवा ट्रस्ट पदाधिकारियों से दूरभाष पर संपर्क करके</strong> अपना प्रस्थान कक्ष पूर्व-सुरक्षित करा सकते हैं।
                      </>
                    ) : (
                      <>
                        The <strong>online booking system is currently scheduled to open soon</strong>. However, <strong>offline bookings and arrival reservations are fully active</strong> and operational. You can book your stay seamlessly on arrival or by contacting the Trust management beforehand.
                      </>
                    )}
                  </p>
                </div>

                {/* Selected Room Metadata for reference */}
                <div className="bg-white border-2 border-charcoal p-3.5 rounded-none flex items-center justify-between shadow-flat-sm text-left">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={selectedRoomCategory.imageUrl} 
                      alt="selected room" 
                      className="w-14 h-14 object-cover rounded-none border border-charcoal" 
                    />
                    <div>
                      <span className="text-[10px] text-maroon-800 block font-bold uppercase tracking-wide">Selected Suite Type:</span>
                      <span className="font-display font-black text-sm text-charcoal tracking-tight block uppercase">{selectedRoomCategory.name[currentLang]}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-charcoal/60 block font-bold uppercase">Rate / Night:</span>
                    <span className="text-maroon-700 font-extrabold text-sm block">₹{selectedRoomCategory.ratePerDay}</span>
                  </div>
                </div>

                {/* Direct Contact Numbers box */}
                <div className="bg-cream-100 border-2 border-charcoal p-4 rounded-none text-left space-y-3 shadow-flat-sm font-sans">
                  <span className="text-maroon-900 block text-xs font-black uppercase tracking-widest border-b-2 border-charcoal/20 pb-1">
                    📞 {currentLang === 'hi' ? "तत्काल ऑफलाइन बुकिंग हेतु संपर्क सूत्र:" : "Direct Room Reservation lines:"}
                  </span>
                  
                  <div className="font-mono text-xs text-charcoal font-bold space-y-1.5">
                    <div className="flex justify-between items-center text-maroon-850">
                      <span>• {currentLang === 'hi' ? "श्री शांतिलाल मुथा (मुख्य प्रबंधक)" : "Shantilal Mutha (Manager)"}:</span>
                      <a href="tel:+919426055667" className="underline font-black hover:text-gold-650">+91 94260 55667</a>
                    </div>
                    <div className="flex justify-between items-center text-maroon-850">
                      <span>• {currentLang === 'hi' ? "श्री राजमलजी भंसाली (अध्यक्ष)" : "Rajmalji Bhansali (President)"}:</span>
                      <a href="tel:+919822538635" className="underline font-black hover:text-gold-650">+91 98225 38635</a>
                    </div>
                  </div>
                </div>

                {/* Rules Footer */}
                <div className="bg-white/80 border border-charcoal/30 p-3 text-[10px] text-charcoal font-bold font-mono uppercase text-center leading-normal">
                  ⚠️ {currentLang === 'hi' 
                    ? "धार्मिक मर्यादा का पालन अनिवार्य है (शुद्ध शाकाहारी भोजन, धूम्रपान/शराब वर्जित है)" 
                    : "Strict Jain parameters applicable (Pure vegetarian food only, absolutely no meat or liquor)"}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCloseBooking}
                    className="bg-maroon-700 text-gold-300 font-extrabold text-xs px-8 py-3 rounded-none border-2 border-charcoal shadow-flat hover:bg-gold-500 hover:text-maroon-950 transition-colors uppercase cursor-pointer"
                  >
                    {currentLang === 'hi' ? "खिड़की बंद करें" : "Close Portal Window"}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

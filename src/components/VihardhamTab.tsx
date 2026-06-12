/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, MapPin, Check, Heart, ShieldAlert, Sparkles, Building, ChevronRight, X, Printer, BedDouble } from 'lucide-react';
import { Language, RoomBooking, RoomCategory } from '../types';
import { roomCategories, staticTranslations } from '../data';
import ProjectVideoPlayer from './ProjectVideoPlayer';

interface VihardhamTabProps {
  currentLang: Language;
  onAddRoomBooking: (booking: RoomBooking) => void;
}

export default function VihardhamTab({ currentLang, onAddRoomBooking }: VihardhamTabProps) {
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

          {/* Quick timing alert */}
          <div className="bg-cream-100 border-2 border-charcoal p-5 rounded-none space-y-2 shadow-flat-sm">
            <h4 className="font-black text-maroon-800 text-sm flex items-center uppercase tracking-tight">
              🍲 आदिनाथ भोजनशाला समय (Prasadam Timings)
            </h4>
            <div className="text-xs text-charcoal space-y-1 block font-bold leading-relaxed">
              <p>• Navkarshi / Breakfast: <strong>07:30 AM to 09:00 AM</strong></p>
              <p>• Main Lunch meal: <strong>11:30 AM to 01:30 PM</strong></p>
              <p>• Chauvihar (strictly before Sunset Close): <strong>05:30 PM to Sunset</strong></p>
            </div>
          </div>
        </div>

        {/* Accommodation Booking Room Grid (Right side columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-b-2 border-charcoal pb-4">
            <h3 className="font-display font-black text-2xl text-maroon-800 flex items-center uppercase tracking-tight">
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
                <div className="relative h-44 overflow-hidden border-b-2 border-charcoal">
                  <img 
                    src={rc.imageUrl} 
                    alt={rc.name[currentLang]} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-maroon-800 text-gold-300 font-bold text-[10px] px-2.5 py-1 rounded-none border border-charcoal uppercase shadow-flat-sm font-mono tracking-wider">
                    {rc.type}
                  </div>
                  {rc.ratePerDay === 0 ? (
                    <div className="absolute bottom-3 right-3 bg-green-700 text-white font-black text-[10px] px-2.5 py-1 rounded-none border border-charcoal shadow-flat-sm uppercase tracking-wider font-mono">
                      FREE SERVICE
                    </div>
                  ) : (
                    <div className="absolute bottom-3 right-3 bg-gold-400 text-maroon-950 font-black text-xs px-2.5 py-1 rounded-none border border-charcoal shadow-flat-sm font-mono">
                      ₹{rc.ratePerDay}/Day
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-display font-black text-base text-maroon-800 line-clamp-1 uppercase tracking-tight">
                      {rc.name[currentLang]}
                    </h4>
                    <p className="text-charcoal text-xs mt-1 line-clamp-2 leading-relaxed font-semibold">
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
            en: "Interactive visual walk of the custom-built Vihardham rooms, pure-meal Adinath Bhojanshala kitchen system, and serene organic gardens designed for traveling Jain Monks and holy patrons."
          }}
          category="Vihardham Preview"
        />
      </div>

      {/* BOOKING PROCESS MODAL */}
      {showBookingModal && selectedRoomCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 col-span-2">
          <div className="relative bg-cream-50 w-full max-w-2xl rounded-none border-3 border-charcoal shadow-flat-lg overflow-hidden animate-fade-in">
            
            {/* Header */}
            <div className="bg-maroon-gradient p-5 border-b-2 border-charcoal flex justify-between items-center text-white">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏨</span>
                <div>
                  <h3 className="font-display font-black text-lg text-gold-300 uppercase tracking-tight">
                    Dharamshala Room Booking Portal
                  </h3>
                  <span className="text-[10px] tracking-wider uppercase block text-cream-100 font-black font-mono">
                    Shri Siwanchi Jain Seva Samiti Trust
                  </span>
                </div>
              </div>
              <button 
                onClick={handleCloseBooking}
                className="p-1 px-2 hover:bg-white/10 text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
              {!isBookedSuccess ? (
                /* Dynamic Booking Form */
                <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-black uppercase font-mono tracking-wide text-charcoal">
                  
                  {/* Selected Room Metadata Container */}
                  <div className="col-span-2 bg-white border-2 border-charcoal p-3.5 rounded-none flex items-center justify-between shadow-flat-sm">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={selectedRoomCategory.imageUrl} 
                        alt="selected room" 
                        className="w-14 h-14 object-cover rounded-none border border-charcoal" 
                      />
                      <div>
                        <span className="text-xs text-maroon-800 block">Selected Suite:</span>
                        <span className="font-display font-black text-sm text-charcoal tracking-tight lowercase first-line:uppercase">{selectedRoomCategory.name[currentLang]}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-charcoal/60 block">Rate / Night:</span>
                      <span className="text-maroon-700 font-extrabold text-sm block">₹{selectedRoomCategory.ratePerDay}</span>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="flex flex-col space-y-1">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Ramesh Kumar Jain" 
                      className="p-3 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>Mobile Number *</label>
                    <input 
                      type="tel" 
                      required 
                      pattern="[0-9]{10}"
                      placeholder="10-digit phone" 
                      className="p-3 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. connect@domain.com" 
                      className="p-3 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>Residential City *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Pune, Maharashtra" 
                      className="p-3 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>Check In Date *</label>
                    <input 
                      type="date" 
                      required 
                      min={new Date().toISOString().split('T')[0]}
                      className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>Check Out Date *</label>
                    <input 
                      type="date" 
                      required 
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>Total Guest Count *</label>
                    <input 
                      type="number" 
                      min="1" 
                      max={selectedRoomCategory.capacity * roomsRequired}
                      required 
                      className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>Rooms Required *</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="5" 
                      required 
                      className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={roomsRequired}
                      onChange={(e) => setRoomsRequired(Number(e.target.value))}
                    />
                  </div>

                  <div className="col-span-2 flex flex-col space-y-1">
                    <label>Special Requests (e.g. Senior Citizen ground floor preference)</label>
                    <textarea 
                      rows={2} 
                      placeholder="Any spiritual or physical needs..." 
                      className="p-3 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </div>

                  {/* Payment Type */}
                  <div className="col-span-2 space-y-2 pt-2 border-t-2 border-charcoal">
                    <label className="text-maroon-800 text-xs block font-black font-display uppercase tracking-tight">Select Payment Mode *</label>
                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] sm:text-xs">
                      {[
                        { id: 'Pay at Counter', label: '🚶 Pay Cash on Arrival' },
                        { id: 'UPI', label: '📲 UPI Instant QR Scan' },
                        { id: 'Bank Transfer', label: '🏛️ NetBanking Transfer' },
                        { id: 'Online Gateway', label: '💳 Simulated Gateway' }
                      ].map((pay) => (
                        <button
                          key={pay.id}
                          type="button"
                          onClick={() => setPaymentOption(pay.id as any)}
                          className={`p-2.5 border-2 border-charcoal text-xs font-black uppercase tracking-wider rounded-none cursor-pointer transition-colors shadow-flat-sm ${
                            paymentOption === pay.id
                              ? 'bg-maroon-700 text-gold-300'
                              : 'bg-white text-charcoal hover:bg-cream-100'
                          }`}
                        >
                          {pay.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Frame */}
                  <div className="col-span-2 pt-4 flex flex-col space-y-2 items-center text-center">
                    <p className="text-[10px] text-charcoal/80 font-bold lowercase font-sans">
                      By proceeding, you promise to abide by strict Jain code parameters (pure attire, no meat, no smoking/drinking) on the campus premises.
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-maroon-gradient hover:bg-gold-500 hover:text-maroon-950 text-gold-300 font-black py-4 rounded-none border-2 border-charcoal shadow-flat-lg transition-all active:translate-y-0.5 cursor-pointer uppercase tracking-wider"
                    >
                      Process Booking Request (Estimated: ₹{selectedRoomCategory.ratePerDay * roomsRequired * Math.max(1, (checkIn && checkOut) ? Math.ceil(Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 1)})
                    </button>
                  </div>

                </form>
              ) : (
                /* Booking Success Receipt Page */
                <div className="text-center p-4 space-y-6">
                  <div className="w-16 h-16 bg-green-100 border-2 border-charcoal text-green-700 rounded-none flex items-center justify-center text-3xl mx-auto shadow-flat animate-bounce">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-2xl text-maroon-850 uppercase tracking-tight">Booking Request Submitted!</h4>
                    <p className="text-xs text-charcoal font-bold">Your booking receipt is successfully registered and awaiting automatic check-in review.</p>
                  </div>

                  {/* Printable Receipt visual block */}
                  {generatedBooking && (
                    <div id="receipt-dharamshala" className="bg-white border-2 border-charcoal rounded-none p-5 text-left text-xs text-charcoal space-y-3.5 shadow-flat uppercase font-mono tracking-wider font-bold">
                      <div className="flex justify-between border-b-2 border-charcoal pb-3">
                        <div>
                          <span className="font-black text-maroon-800 text-sm block tracking-tight uppercase">{t.trustName}</span>
                          <span className="text-[9px] text-charcoal font-black mt-1">Dungri Pura Trust Dharamshala Receipt</span>
                        </div>
                        <div className="text-right">
                          <span className="bg-gold-400 border border-charcoal text-maroon-950 font-black text-[9px] px-2 py-1 rounded-none uppercase font-mono block shadow-flat-sm">Status: PENDING</span>
                          <span className="text-[10px] text-charcoal font-bold block mt-1.5">CODE: {generatedBooking.bookingCode}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[10px]">
                        <div>
                          <span className="text-charcoal/60 block font-mono">Donor/Primary Occupant:</span>
                          <strong className="text-charcoal text-xs">{generatedBooking.name}</strong>
                        </div>
                        <div>
                          <span className="text-charcoal/60 block font-mono">Phone Contact:</span>
                          <strong>{generatedBooking.mobile}</strong>
                        </div>
                        <div>
                          <span className="text-charcoal/60 block font-mono">Selected Suite:</span>
                          <strong className="text-maroon-700 font-mono">{generatedBooking.roomType} x {generatedBooking.roomsCount}</strong>
                        </div>
                        <div>
                          <span className="text-charcoal/60 block font-mono">Estimated Bill Total:</span>
                          <strong className="text-green-700 text-xs">₹{generatedBooking.totalAmount} ({generatedBooking.paymentOption})</strong>
                        </div>
                        <div>
                          <span className="text-charcoal/60 block font-mono">Occupancy Interval:</span>
                          <strong className="text-[11px] font-mono">{generatedBooking.checkIn} to {generatedBooking.checkOut}</strong>
                        </div>
                        <div>
                          <span className="text-charcoal/60 block font-mono">Total Guests List:</span>
                          <strong>{generatedBooking.guests} Residents</strong>
                        </div>
                      </div>

                      <div className="border-t border-charcoal/20 pt-3.5 text-center text-[9px] text-charcoal/70 font-sans tracking-normal font-bold lowercase first-line:uppercase">
                        Please present a digital copy of this booking receipt & valid identity card (Aadhar Card/Voter ID) at the campus front reception.
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 justify-center pt-2">
                    <button
                      onClick={() => window.print()}
                      className="border-2 border-charcoal bg-white text-maroon-700 font-black text-xs px-5 py-2.5 rounded-none flex items-center space-x-1 hover:bg-cream-105 shadow-flat transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Document</span>
                    </button>
                    <button
                      onClick={handleCloseBooking}
                      className="bg-maroon-700 text-gold-350 font-black text-xs px-5 py-2.5 rounded-none border-2 border-charcoal shadow-flat hover:bg-gold-500 hover:text-maroon-950 transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

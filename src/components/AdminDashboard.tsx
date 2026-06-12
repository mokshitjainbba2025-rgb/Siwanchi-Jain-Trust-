/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, CheckCircle, ClipboardList, RefreshCcw, Landmark, UserPlus, Heart, Award, FileText, Check, X, ShieldAlert, Sparkles, PlusCircle } from 'lucide-react';
import { Language, RoomBooking, PalaceBooking, Donation, Volunteer, TrustMember, Contributor, AuditLog, GalleryItem } from '../types';

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
  setGalleryItems
}: AdminDashboardProps) {

  const [activeAdminSub, setActiveAdminSub] = useState<'stats' | 'rooms' | 'palace' | 'donations' | 'add_donor' | 'gallery_mgmt' | 'people' | 'audit'>('stats');

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

  // Dynamic Statistics Counters
  const totalDonationsAmount = donations.reduce((sum, item) => sum + item.amount, 0);
  const activeReservationsCount = roomBookings.filter(b => b.approvalStatus === 'Approved').length;
  const pendingInquiriesCount = roomBookings.filter(b => b.approvalStatus === 'Pending').length + palaceBookings.filter(b => b.approvalStatus === 'Pending').length;

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
              Role: Super Admin (Sanghvi Shantilal Ji) • Secured Local State Session
            </span>
          </div>
        </div>

        {/* Live system status readout */}
        <div className="mt-4 md:mt-0 bg-maroon-800 text-[10px] px-3.5 py-2 rounded-xl border border-gold-500/30 text-center font-mono font-bold font-sans">
          <span>● Database connection ACTIVE</span>
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

            <div className="col-span-1 sm:col-span-2 flex flex-col space-y-1">
              <label>{newMediaType === 'video' ? 'YouTube URL / Share Link *' : 'Image URL *'}</label>
              <input 
                type="url" 
                required 
                placeholder={newMediaType === 'video' ? 'https://youtu.be/Cwyn5LCGd0c or watch URL' : 'https://images.unsplash.com/...'} 
                className="p-2.5 border border-gold-400/35 bg-cream-50/20 rounded outline-none text-xs font-mono"
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
              />
              <span className="text-[10px] text-charcoal/45 font-mono font-medium block mt-1">
                {newMediaType === 'video' 
                  ? 'Paste any YouTube regular or share link. Our player parses the ID and configures lazy-loading automatically.' 
                  : 'Provide a valid image file address hosted online.'}
              </span>
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
              {galleryItems.map((item) => (
                <div key={item.id} className="border-2 border-charcoal/20 p-3 flex justify-between items-center gap-3 bg-cream-50/40">
                  <div className="flex items-center space-x-2.5">
                    {item.type === 'image' ? (
                      <img src={item.url} className="w-12 h-12 object-cover border border-charcoal shrink-0" alt="Preview" />
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
              ))}
            </div>
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

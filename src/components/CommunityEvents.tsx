/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, UserPlus, Users, Sparkles, BookOpen, Clock, Heart, ArrowRight, ShieldCheck, X, FileText, CheckCircle2, Phone, Mail, Award, MessageSquare } from 'lucide-react';
import { Language, NewsItem, EventItem, Volunteer, TrustMember } from '../types';
import { seedNews, seedEvents, staticTranslations } from '../data';

interface CommunityEventsProps {
  currentLang: Language;
  onAddVolunteer: (vol: Volunteer) => void;
  onAddMember: (mem: TrustMember) => void;
  newsList: NewsItem[];
  eventsList: EventItem[];
}

export default function CommunityEvents({ currentLang, onAddVolunteer, onAddMember, newsList, eventsList }: CommunityEventsProps) {
  const [activeSubTab, setActiveSubTab] = useState<'news' | 'events' | 'directory'>('news');
  const [newsFilter, setNewsFilter] = useState<string>('All');
  
  // Registration Modals
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [showEventRegisterModal, setShowEventRegisterModal] = useState(false);
  const [eventRegSuccess, setEventRegSuccess] = useState(false);
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regGuests, setRegGuests] = useState(1);

  // Volunteer form state
  const [showVolModal, setShowVolModal] = useState(false);
  const [volSuccess, setVolSuccess] = useState(false);
  const [volName, setVolName] = useState('');
  const [volMobile, setVolMobile] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volCity, setVolCity] = useState('');
  const [volWing, setVolWing] = useState<'Youth Wing' | 'Women\'s Wing' | 'General' | 'Senior Citizens'>('General');
  const [volSkills, setVolSkills] = useState('');

  // Membership form state
  const [showMemModal, setShowMemModal] = useState(false);
  const [memSuccess, setMemSuccess] = useState(false);
  const [memName, setMemName] = useState('');
  const [memMobile, setMemMobile] = useState('');
  const [memEmail, setMemEmail] = useState('');
  const [memCity, setMemCity] = useState('');
  const [memberType, setMemberType] = useState<'Life Member' | 'Patron Member' | 'Yearly Subscriber'>('Life Member');

  const t = staticTranslations[currentLang];

  const handleOpenEventReg = (ev: EventItem) => {
    setSelectedEvent(ev);
    setShowEventRegisterModal(true);
    setEventRegSuccess(false);
  };

  const handleCloseEventReg = () => {
    setShowEventRegisterModal(false);
    setSelectedEvent(null);
    setEventRegSuccess(false);
    setRegName('');
    setRegMobile('');
    setRegGuests(1);
  };

  const handleEventRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    
    // Simulate updating count
    selectedEvent.registeredCount += Number(regGuests);
    setEventRegSuccess(true);
  };

  const handleSubmitVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    const newVol: Volunteer = {
      id: "vol_" + Date.now(),
      name: volName,
      mobile: volMobile,
      email: volEmail,
      city: volCity,
      wing: volWing,
      skills: volSkills,
      registeredAt: new Date().toISOString()
    };
    onAddVolunteer(newVol);
    setVolSuccess(true);
  };

  const handleCloseVol = () => {
    setShowVolModal(false);
    setVolSuccess(false);
    setVolName('');
    setVolMobile('');
    setVolEmail('');
    setVolCity('');
    setVolWing('General');
    setVolSkills('');
  };

  const handleSubmitMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newMem: TrustMember = {
      id: "mem_" + Date.now(),
      name: memName,
      mobile: memMobile,
      email: memEmail,
      city: memCity,
      memberType,
      registeredAt: new Date().toISOString()
    };
    onAddMember(newMem);
    setMemSuccess(true);
  };

  const handleCloseMem = () => {
    setShowMemModal(false);
    setMemSuccess(false);
    setMemName('');
    setMemMobile('');
    setMemEmail('');
    setMemCity('');
    setMemberType('Life Member');
  };

  const filteredNews = newsList.filter((item) => {
    return newsFilter === 'All' || item.category === newsFilter;
  });

  const newsCategories = ['All', 'Construction', 'Donation', 'Religious', 'Announcement'];

  const directoryWings = [
    {
      name: "Samaj Youth Wing (युवा संगठन)",
      purpose: "Dedicated to youth development, organizing sports meets, blood donation drives, and cultural seminars.",
      members: "240+ Active Volunteers",
      leadership: "Shri Ashok Kumar Gulechha (Convenor)"
    },
    {
      name: "Samaj Mahila Mandal (महिला संगठन)",
      purpose: "Empowering local women through skill building workshops, organic cottage industries, and devotional bhajan bands.",
      members: "180+ Active Members",
      leadership: "Smt. Heeradevi Mutha (President)"
    },
    {
      name: "Dharma Sanskar Pathshala (पाठशाला)",
      purpose: "Inculcating moral parameters, non-violence principles, and Jain scriptural teachings inside children.",
      members: "120+ Enrolled Kids",
      leadership: "Pandit Shri Shreyans Kumar Shastri"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Dynamic Sub-Navigation Header tab bars */}
      <div className="flex border-b-3 border-charcoal gap-2 items-center justify-center sm:justify-start">
        {[
          { id: 'news', label: '📰 ' + (currentLang === 'hi' ? 'समाचार एवं प्रगति' : 'Latest News & construction Logs') },
          { id: 'events', label: '📅 ' + (currentLang === 'hi' ? 'आगामी आध्यात्मिक उत्सव' : 'Spiritual Events Calendar') },
          { id: 'directory', label: '👥 ' + (currentLang === 'hi' ? 'समाज संगठन' : 'Community Wings') }
        ].map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveSubTab(sub.id as any)}
            className={`pb-3 px-4 text-xs sm:text-sm font-black border-b-3 transition-all cursor-pointer font-mono uppercase tracking-tight ${
              activeSubTab === sub.id
                ? 'border-charcoal text-maroon-800 -mb-[3px]'
                : 'border-transparent text-charcoal hover:text-maroon-700'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* VIEW 1: Latest News & Updates */}
      {activeSubTab === 'news' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
            {newsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setNewsFilter(cat)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-none border-2 cursor-pointer transition-transform font-mono shadow-flat-sm active:translate-y-0.5 ${
                  newsFilter === cat
                    ? 'bg-maroon-700 text-gold-300 border-charcoal shadow-flat'
                    : 'bg-cream-50 text-charcoal border-charcoal hover:bg-gold-100 shadow-flat-sm'
                }`}
              >
                <span>{cat === 'All' ? 'All Updates' : cat}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredNews.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border-3 border-charcoal rounded-none shadow-flat flex flex-col sm:flex-row relative hover:-translate-y-1 transition-transform group"
              >
                <div className="relative w-full sm:w-44 h-48 sm:h-auto overflow-hidden bg-cream-50 shrink-0 border-r-0 sm:border-r-3 border-charcoal">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title[currentLang]} 
                    className="w-full h-full object-cover rounded-none" 
                  />
                  <div className="absolute top-2.5 left-2.5 bg-maroon-700 text-gold-300 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-none border-2 border-charcoal shadow-flat-sm">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] text-charcoal/60 font-mono font-black uppercase tracking-wider block">Date: {item.date}</span>
                    <h3 className="font-display font-black text-base text-maroon-850 leading-snug tracking-tight">
                      {item.title[currentLang]}
                    </h3>
                    <p className="text-charcoal font-bold text-xs line-clamp-3 leading-relaxed">
                      {item.summary[currentLang]}
                    </p>
                  </div>
                  
                  {/* Detailed summary button */}
                  <div className="border-t-2 border-charcoal pt-3.5 flex items-center justify-between text-[11px] font-black font-mono uppercase tracking-wide">
                    <span className="text-gold-600 block leading-none">Dungri Pura construction Desk</span>
                    <button 
                      onClick={() => alert(`Full Log:\n\n${item.content[currentLang]}`)}
                      className="text-maroon-800 hover:text-gold-600 flex items-center cursor-pointer font-black"
                    >
                      <span>Read Log</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-0.5 text-maroon-800 font-extrabold" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* VIEW 2: Spiritual Event Calendars */}
      {activeSubTab === 'events' && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventsList.map((ev) => (
              <div 
                key={ev.id} 
                className="bg-white border-3 border-charcoal p-6 rounded-none shadow-flat relative flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  
                  <div className="flex justify-between items-center">
                    <span className="bg-maroon-100 text-maroon-800 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-none border-2 border-charcoal font-mono">
                      📅 {ev.category}
                    </span>
                    <span className="text-[10px] text-green-800 font-extrabold bg-green-50 px-2.5 py-1.5 rounded-none border-2 border-charcoal shadow-flat-sm font-mono">
                      Registered: {ev.registeredCount} DEVOTEES
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-black text-xl text-maroon-850 leading-tight uppercase tracking-tight">
                      {ev.title[currentLang]}
                    </h3>
                    <div className="flex flex-col space-y-1 pt-2 text-xs text-charcoal font-black tracking-wide font-mono uppercase">
                      <span>• Timing: <strong>{ev.startDate} to {ev.endDate}</strong></span>
                      <span>• Location: <strong>{ev.location[currentLang]}</strong></span>
                    </div>

                    <p className="text-charcoal font-bold text-xs sm:text-sm pt-4 leading-relaxed border-t-2 border-charcoal mt-4">
                      {ev.description[currentLang]}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-charcoal flex items-center justify-between">
                  {/* Coordinator Details */}
                  <div className="text-[10px] sm:text-xs text-charcoal font-mono uppercase tracking-wide leading-snug">
                    <span className="block font-black text-maroon-800">Event Secretary:</span>
                    <strong className="text-charcoal block font-black">{ev.coordinator}</strong>
                    <span className="block">{ev.coordinatorContact}</span>
                  </div>

                  {ev.isRegistrationRequired ? (
                    <button
                      onClick={() => handleOpenEventReg(ev)}
                      className="bg-maroon-700 hover:bg-gold-500 hover:text-maroon-950 text-white font-black text-xs px-4 py-2.5 rounded-none border-2 border-charcoal shadow-flat cursor-pointer uppercase font-mono tracking-wider active:translate-y-0.5"
                    >
                      <span>Join / Register Seva</span>
                    </button>
                  ) : (
                    <span className="text-[10px] text-green-800 font-black bg-green-50 px-2.5 py-1.5 rounded-none border-2 border-charcoal font-mono uppercase tracking-wide">Open for General Public</span>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* VIEW 3: Community Organization Hub */}
      {activeSubTab === 'directory' && (
        <div className="space-y-12 animate-fade-in">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-xs font-bold">
            
            {/* Left side: Directory wings details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b-3 border-charcoal pb-3">
                <h3 className="font-display font-black text-2xl text-maroon-800 flex items-center uppercase tracking-tight">
                  <Users className="w-6 h-6 mr-2 text-gold-500 stroke-[3]" />
                  <span>सिवांची जैन समाज कार्यवाहक विंग्स</span>
                </h3>
                <p className="text-xs text-charcoal font-bold mt-1">Dedicated associations executing social and value operations within Rajasthan and Barmer samaj.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {directoryWings.map((wing, i) => (
                  <div key={i} className="bg-white border-3 border-charcoal p-5 rounded-none shadow-flat flex items-start gap-4">
                    <div className="w-10 h-10 rounded-none border-2 border-charcoal bg-gold-100 text-charcoal flex items-center justify-center font-black text-lg shrink-0 shadow-flat-sm">
                      ★
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-black text-maroon-800 text-sm sm:text-base leading-tight uppercase tracking-tight">
                        {wing.name}
                      </h4>
                      <p className="text-charcoal font-bold text-xs sm:text-sm leading-relaxed">
                        {wing.purpose}
                      </p>
                      <div className="flex flex-wrap gap-4 pt-1 text-[10px] text-charcoal font-black font-mono uppercase tracking-wide">
                        <span className="bg-cream-100 border-2 border-charcoal px-2 py-1">👥 Members: {wing.members}</span>
                        <span className="bg-gold-50 border-2 border-charcoal px-2 py-1">👑 Anchor: {wing.leadership}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Quick engagement buttons */}
            <div className="lg:col-span-5 space-y-5 bg-white border-3 border-charcoal p-6 rounded-none shadow-flat relative">
              <h4 className="font-display font-black text-maroon-805 text-lg border-b-2 border-charcoal pb-3 block uppercase tracking-tight">
                Join Community Efforts
              </h4>
              <p className="text-xs text-charcoal leading-relaxed font-bold">
                By entering either directory below, you sync with our general notifications database. Become a registered lifetime member or enroll inside youth wings dynamic listings.
              </p>

              <div className="flex flex-col gap-4 pt-2">
                <button
                  onClick={() => { setShowVolModal(true); setVolSuccess(false); }}
                  className="w-full bg-maroon-700 text-gold-300 hover:bg-gold-500 hover:text-maroon-950 border-2 border-charcoal font-black py-4 rounded-none shadow-flat cursor-pointer text-xs sm:text-sm flex items-center justify-center space-x-2 uppercase font-mono tracking-wider transition-all active:translate-y-0.5"
                >
                  <UserPlus className="w-4.5 h-4.5" />
                  <span>Enroll as Volunteer Secretary</span>
                </button>

                <button
                  onClick={() => { setShowMemModal(true); setMemSuccess(false); }}
                  className="w-full bg-white text-maroon-800 hover:bg-cream-150 border-2 border-charcoal font-black py-4 rounded-none shadow-flat cursor-pointer text-xs sm:text-sm flex items-center justify-center space-x-2 uppercase font-mono tracking-wider transition-all active:translate-y-0.5"
                >
                  <span>📜 Lifetime Trust Membership</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* MODALS SECTION */}

      {/* EVENT REGISTER MODAL */}
      {showEventRegisterModal && selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
          <div className="relative bg-cream-50 w-full max-w-md rounded-none border-3 border-charcoal shadow-flat-lg overflow-hidden animate-fade-in text-charcoal">
            
            <div className="bg-maroon-gradient p-5 border-b-3 border-charcoal flex justify-between items-center text-white font-mono uppercase tracking-tight">
              <div>
                <h3 className="font-display font-black text-base text-gold-300">Join Sacred Event Seva</h3>
                <span className="text-[10px] block text-cream-100 font-bold lowercase first-line:uppercase">Register for: {selectedEvent.title[currentLang]}</span>
              </div>
              <button onClick={handleCloseEventReg} className="text-white hover:text-gold-200 cursor-pointer border-2 border-white p-1 rounded-none"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs font-black uppercase font-mono tracking-wider">
              {!eventRegSuccess ? (
                <form onSubmit={handleEventRegistration} className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <label>Your Full Name *</label>
                    <input type="text" required value={regName} onChange={(e)=>setRegName(e.target.value)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold"/>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>WhatsApp Contact Mobile *</label>
                    <input type="text" required pattern="[0-9]{10}" placeholder="10 Digits" value={regMobile} onChange={(e)=>setRegMobile(e.target.value)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold"/>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>No. of Family Members *</label>
                    <input type="number" min="1" max="100" value={regGuests} onChange={(e)=>setRegGuests(Number(e.target.value))} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold" />
                  </div>
                  <button type="submit" className="w-full bg-maroon-gradient hover:bg-gold-500 hover:text-maroon-950 text-gold-300 py-4 rounded-none border-2 border-charcoal font-black uppercase tracking-wider shadow-flat active:translate-y-0.5 cursor-pointer">
                    Submit RSVP Registration
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4 font-mono uppercase text-xs">
                  <div className="w-12 h-12 bg-green-150 border-2 border-charcoal text-green-700 rounded-none flex items-center justify-center text-2xl mx-auto shadow-flat animate-bounce">✓</div>
                  <h4 className="font-display font-black text-lg text-maroon-850 tracking-tight">RSVP Confirmed!</h4>
                  <p className="text-[11px] font-bold text-charcoal lowercase first-line:uppercaseNormal">Registration code generated successfully. Please check your WhatsApp mobile for event badges and coordinates.</p>
                  <button onClick={handleCloseEventReg} className="bg-maroon-700 hover:bg-gold-500 hover:text-maroon-950 text-white border-2 border-charcoal px-5 py-2.5 rounded-none font-black cursor-pointer shadow-flat">Done</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VOLUNTEER ENROLL MODAL */}
      {showVolModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 font-mono">
          <div className="relative bg-cream-50 w-full max-w-md rounded-none border-3 border-charcoal shadow-flat-lg overflow-hidden animate-fade-in text-charcoal">
            
            <div className="bg-maroon-gradient p-5 border-b-3 border-charcoal flex justify-between items-center text-white uppercase tracking-tight">
              <h3 className="font-display font-black text-base text-gold-300">Enroll as Trust Volunteer</h3>
              <button onClick={handleCloseVol} className="text-white hover:text-gold-200 cursor-pointer border-2 border-white p-1 rounded-none"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-6 text-xs font-black uppercase tracking-wider space-y-4">
              {!volSuccess ? (
                <form onSubmit={handleSubmitVolunteer} className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <label>Full Name *</label>
                    <input type="text" required placeholder="e.g. Ramesh Mutha" value={volName} onChange={(e)=>setVolName(e.target.value)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold"/>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>WhatsApp Contact Mobile *</label>
                    <input type="text" required pattern="[0-9]{10}" placeholder="10 Digits" value={volMobile} onChange={(e)=>setVolMobile(e.target.value)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold"/>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>Email Address</label>
                    <input type="email" placeholder="name@domain.com" value={volEmail} onChange={(e)=>setVolEmail(e.target.value)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold lowercase"/>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>Suburban City *</label>
                    <input type="text" required placeholder="e.g. Barmer Town" value={volCity} onChange={(e)=>setVolCity(e.target.value)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold"/>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>Target Association Group *</label>
                    <select value={volWing} onChange={(e): any => setVolWing(e.target.value as any)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold">
                      <option value="Youth Wing">🔥 Samaj Youth Wing (युवा संगठन)</option>
                      <option value="Women's Wing">🌸 Samaj Mahila Mandal (महिला मंडल)</option>
                      <option value="General">🤝 General Social Seva Voluntary Force</option>
                      <option value="Senior Citizens">👵 Elder Council Wing</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>Primary Skills or Specialized Expertise</label>
                    <input type="text" placeholder="e.g. Accounting, Stage Coordination" value={volSkills} onChange={(e)=>setVolSkills(e.target.value)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold"/>
                  </div>
                  <button type="submit" className="w-full bg-maroon-gradient hover:bg-gold-500 hover:text-maroon-950 text-gold-300 py-4 rounded-none border-2 border-charcoal font-black cursor-pointer shadow-flat uppercase tracking-wider active:translate-y-0.5">
                    Register Volunteer Credentials
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4 uppercase text-xs">
                  <div className="w-12 h-12 bg-green-150 border-2 border-charcoal text-green-700 rounded-none flex items-center justify-center text-2xl mx-auto shadow-flat animate-bounce">✓</div>
                  <h4 className="font-display font-black text-lg text-maroon-850 tracking-tight">Volunteer Enrolled!</h4>
                  <p className="text-[11px] font-bold text-charcoal lowercase first-line:uppercaseNormal">Your volunteer profile is added to local state securely. Our secretary will notify you via SMS when organizing the next Chaturmas event.</p>
                  <button onClick={handleCloseVol} className="bg-maroon-700 hover:bg-gold-500 hover:text-maroon-950 text-white border-2 border-charcoal px-5 py-2.5 rounded-none font-black cursor-pointer shadow-flat">Done</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MEMBERSHIP MODAL */}
      {showMemModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 font-mono">
          <div className="relative bg-cream-50 w-full max-w-md rounded-none border-3 border-charcoal shadow-flat-lg overflow-hidden animate-fade-in text-charcoal">
            
            <div className="bg-maroon-gradient p-5 border-b-3 border-charcoal flex justify-between items-center text-white uppercase tracking-tight">
              <h3 className="font-display font-black text-base text-gold-300">Lifetime Membership</h3>
              <button onClick={handleCloseMem} className="text-white hover:text-gold-200 cursor-pointer border-2 border-white p-1 rounded-none"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-6 text-xs font-black uppercase tracking-wider space-y-4">
              {!memSuccess ? (
                <form onSubmit={handleSubmitMember} className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <label>Member Full Name *</label>
                    <input type="text" required value={memName} onChange={(e)=>setMemName(e.target.value)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold"/>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>WhatsApp Contact Mobile *</label>
                    <input type="text" required pattern="[0-9]{10}" placeholder="10 Digits" value={memMobile} onChange={(e)=>setMemMobile(e.target.value)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold"/>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>Email Address</label>
                    <input type="email" placeholder="connect@domain.com" value={memEmail} onChange={(e)=>setMemEmail(e.target.value)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold lowercase"/>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>Native Residential City *</label>
                    <input type="text" required placeholder="e.g. Siwana Barmer" value={memCity} onChange={(e)=>setMemCity(e.target.value)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold"/>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>Target Subscription Tier Type *</label>
                    <select value={memberType} onChange={(e): any => setMemberType(e.target.value as any)} className="p-3 border-2 border-charcoal rounded-none bg-white outline-none font-bold">
                      <option value="Life Member">🏅 Lifetime Patron Member (₹21,000 Specific Daan)</option>
                      <option value="Patron Member">⭐ Core Board Patron Member (₹51,000 Daan)</option>
                      <option value="Yearly Subscriber">📅 Yearly Regular General Subscriber (₹2,100 / Year)</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-maroon-gradient hover:bg-gold-500 hover:text-maroon-955 text-gold-300 py-4 rounded-none border-2 border-charcoal font-black cursor-pointer shadow-flat uppercase tracking-wider active:translate-y-0.5">
                    Apply for Formal Trust Subscription
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4 uppercase text-xs">
                  <div className="w-12 h-12 bg-green-150 border-2 border-charcoal text-green-700 rounded-none flex items-center justify-center text-2xl mx-auto shadow-flat animate-bounce">✓</div>
                  <h4 className="font-display font-black text-lg text-maroon-850 tracking-tight">Application Logged!</h4>
                  <p className="text-[11px] font-bold text-charcoal lowercase first-line:uppercaseNormal">Your membership requests have been logged in. After verification by our treasury coordinator, we will dispatch your formal laminated board certificate directly to your address.</p>
                  <button onClick={handleCloseMem} className="bg-maroon-700 hover:bg-gold-500 hover:text-maroon-950 text-white border-2 border-charcoal px-5 py-2.5 rounded-none font-black cursor-pointer shadow-flat">Done</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

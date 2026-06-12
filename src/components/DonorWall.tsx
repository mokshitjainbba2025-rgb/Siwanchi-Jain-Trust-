/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Heart, Sparkles, Filter, Award, ShieldAlert, FileText, User, Printer, X, Download, Landmark } from 'lucide-react';
import { Language, Contributor } from '../types';
import { seedContributors, staticTranslations } from '../data';

interface DonorWallProps {
  currentLang: Language;
  contributorsList: Contributor[];
}

export default function DonorWall({ currentLang, contributorsList }: DonorWallProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTier, setActiveTier] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTribute, setSelectedTribute] = useState<Contributor | null>(null);
  const [showTributeModal, setShowTributeModal] = useState(false);

  const t = staticTranslations[currentLang];

  const handleOpenTribute = (donor: Contributor) => {
    setSelectedTribute(donor);
    setShowTributeModal(true);
  };

  const handleCloseTribute = () => {
    setShowTributeModal(false);
    setSelectedTribute(null);
  };

  // Search parameters filter: supporting Family Name, City, Labh Taken (contribution type), Year, Recognition Category
  const filteredContributors = contributorsList.filter((donor) => {
    const familyText = donor.family ? donor.family[currentLang] : '';
    const nameText = donor.name[currentLang];
    const cityText = donor.city[currentLang];
    const contributionText = donor.contributionType[currentLang];
    const yearText = donor.year ? String(donor.year) : '';
    const tierText = donor.tier || '';

    const matchesSearch = 
      nameText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cityText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      familyText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contributionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      yearText.includes(searchTerm) ||
      tierText.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesTier = activeTier === 'All' || donor.tier === activeTier;

    return matchesSearch && matchesTier;
  });

  // Unique Tiers aligned with static translations
  const tiers = ['All', 'Maha Daanveer', 'Platinum', 'Gold', 'Silver', 'Contributor'];

  const getTierLocalizedName = (tierKey: string) => {
    if (tierKey === 'All') return currentLang === 'hi' ? "सभी लाभार्थी" : "All Labharthi";
    return t.donorTiers[tierKey] || tierKey;
  };

  // Colors based on tier levels
  const getTierBadgeStyle = (tier: string) => {
    switch(tier) {
      case 'Maha Daanveer': 
        return 'bg-red-50 text-red-700 border-red-300 outline-dotted outline-red-650/40 font-black';
      case 'Platinum': 
        return 'bg-amber-50 text-amber-700 border-amber-300 outline-dashed outline-amber-600/30 font-black';
      case 'Gold': 
        return 'bg-yellow-50 text-yellow-700 border-yellow-300 font-bold';
      case 'Silver': 
        return 'bg-slate-100 text-slate-800 border-slate-300 font-semibold';
      default: 
        return 'bg-cream-100 text-charcoal/80 border-gold-400/20 font-medium';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* SECTION 1: Tribute Banner */}
      <div className="bg-maroon-gradient border-3 border-charcoal rounded-none p-6 sm:p-10 shadow-flat-lg relative overflow-hidden flex flex-col items-center justify-center text-center text-white space-y-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-white/5 pointer-events-none select-none font-display uppercase tracking-wider leading-none">
          {currentLang === 'hi' ? "पुण्य" : "LEGACY"}
        </div>
        
        <span className="text-3xl animate-bounce">👑</span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-gold-400 relative tracking-tight uppercase">
          {currentLang === 'hi' ? "परम गौरवशाली डिजिटल लाभार्थी पट्ट" : "Digital Labharthi Wall of Honor"}
        </h1>
        <p className="text-gold-200 font-bold text-xs sm:text-sm max-w-2xl relative leading-relaxed">
          {currentLang === 'hi' 
            ? '"जिन शासन के गौरव, समाज के कर्णधार, जिन्होंने अपनी न्यायोपार्जित लक्ष्मी का एक पवित्र अंश विहारधाम और मंदिर निर्माण में समर्पित किया है। आपकी उदारता युगों-युगों तक स्वर्ण अक्षरों में स्मरण की जाएगी।"'
            : '"Guarding the golden values of Jainism, these noble families have dedicated sacred shares of their earnings to erect Vihardham as a holy shelter for our walking monks."'}
        </p>
      </div>

      {/* SEARCH INSTRUCTIONS BAR */}
      <div className="bg-cream-100 border-2 border-charcoal p-4 text-center font-bold text-xs text-maroon-850">
        📢 {currentLang === 'hi' 
          ? "आप इस पट्टिका को 'परिवार का नाम', 'शहर', 'लिया गया लाभ अवसर', 'वर्ष' अथवा 'श्रेणी' द्वारा सीधे सर्च कर सकते हैं।" 
          : "You can instantaneously search the digital wall by: Family Name, Native City, Labh Taken, Year, or Category."}
      </div>

      {/* FILTER AND SEARCH CONTROLS BUILD */}
      <div className="bg-white border-3 border-charcoal p-5 rounded-none shadow-flat flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        {/* Search Input bar */}
        <div className="relative w-full lg:max-w-md">
          <Search className="w-4 h-4 text-charcoal absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={currentLang === 'hi' ? "नाम, शहर, वर्ष या लाभ श्रेणी से खोजें..." : "Search family name, city, year, or labh taken..."}
            className="w-full pl-10 pr-4 py-2.5 bg-cream-50 text-xs border-2 border-charcoal rounded-none outline-none font-bold text-charcoal shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tier filter tabs */}
        <div className="flex flex-wrap gap-1.5 justify-center lg:justify-end">
          {tiers.map((tName) => (
            <button
              key={tName}
              onClick={() => setActiveTier(tName)}
              className={`px-3 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-none border-2 border-charcoal cursor-pointer transition-all shadow-flat-sm active:translate-y-0.5 ${
                activeTier === tName
                  ? 'bg-maroon-700 text-gold-300'
                  : 'bg-cream-55 text-charcoal/80 hover:bg-gold-500/10'
              }`}
            >
              <span>{getTierLocalizedName(tName)}</span>
            </button>
          ))}
        </div>

      </div>

      {/* CONTRIBUTORS DATA GRID VIEW */}
      {filteredContributors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContributors.map((donor) => {
            const isMaha = donor.tier === 'Maha Daanveer';
            return (
              <div 
                key={donor.id} 
                className={`bg-white border-3 border-charcoal p-5 rounded-none shadow-flat hover:shadow-flat-lg hover:-translate-y-0.5 flex flex-col justify-between space-y-4 relative transition-all ${
                  isMaha 
                    ? 'bg-gradient-to-br from-gold-50 to-white' 
                    : ''
                }`}
              >
                {/* Visual Seal absolute to mark heavy daanveers */}
                {isMaha && (
                  <div className="absolute top-3 right-3 text-red-700 font-mono font-black text-[9px] bg-red-50 border-2 border-charcoal px-2 py-0.5 rounded-none uppercase tracking-wider shadow-flat-sm">
                    {currentLang === 'hi' ? "★ महा लाभार्थी" : "★ Maha Labharthi"}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-0.5 border-2 border-charcoal text-[9px] font-black uppercase rounded-none shadow-flat-sm ${getTierBadgeStyle(donor.tier)}`}>
                      {getTierLocalizedName(donor.tier)}
                    </span>
                    <span className="text-[10px] font-mono text-charcoal font-black uppercase">{currentLang === 'hi' ? `वर्ष: ${donor.year}` : `Year: ${donor.year}`}</span>
                  </div>

                  <div>
                    <h3 className="font-display font-black text-lg text-maroon-850 uppercase tracking-tight">
                      {donor.name[currentLang]}
                    </h3>
                    
                    {/* Native City & Family Details */}
                    <div className="flex flex-col space-y-1 text-[10px] text-charcoal/90 mt-1 font-black uppercase font-mono">
                      <div className="flex items-center gap-1.5">
                        <span>📍 {currentLang === 'hi' ? "मूल गाँव/शहर" : "Native"}: {donor.city[currentLang]}</span>
                      </div>
                      {donor.family && (
                        <div className="flex items-center gap-1.5 text-maroon-800">
                          <span>👨‍👩‍👧 {currentLang === 'hi' ? "सहयोगी परिवार" : "Sahyogi Parivar"}: {donor.family[currentLang]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sponsoring/Labh Details Area */}
                  <div className="bg-cream-100 p-3.5 rounded-none border-2 border-charcoal shadow-flat-sm space-y-1">
                    <span className="text-[9px] text-charcoal font-black uppercase tracking-wider font-mono block border-b border-charcoal/20 pb-1">
                      {currentLang === 'hi' ? "चढ़ावा / स्वीकृत लाभ अवसर:" : "Approved Labh Option Taken:"}
                    </span>
                    <strong className="text-maroon-800 text-xs block font-black leading-snug">
                      {donor.contributionType[currentLang]}
                    </strong>
                    {donor.message && (
                      <p className="text-charcoal/90 text-[10px] font-bold leading-relaxed border-t border-charcoal/10 pt-2 mt-2 italic">
                        "{donor.message[currentLang]}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Bar: Amount Representation and Tribute Button */}
                <div className="pt-3.5 border-t-2 border-charcoal flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-charcoal font-black font-mono uppercase tracking-wider block">{currentLang === 'hi' ? "धर्म सहयोग निधि:" : "Total Dharma Sahyog:"}</span>
                    <strong className="text-green-700 text-base font-black">₹{donor.amount.toLocaleString('en-IN')}</strong>
                  </div>

                  <button
                    onClick={() => handleOpenTribute(donor)}
                    className="bg-maroon-700 hover:bg-gold-500 hover:text-maroon-950 px-3 py-2 rounded-none border-2 border-charcoal text-white font-black text-[10px] uppercase tracking-wider flex items-center space-x-1 outline-none cursor-pointer shadow-flat transition-all active:translate-y-0.5"
                  >
                    <Award className="w-3.5 h-3.5 text-gold-400" />
                    <span>{currentLang === 'hi' ? "प्रशस्ति पत्र" : "Legacy Plaque"}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Empty results state */
        <div className="text-center bg-white border-3 border-charcoal p-12 rounded-none relative space-y-3 shadow-flat">
          <span className="text-4xl block">📜</span>
          <h3 className="font-display font-black text-lg text-maroon-800 uppercase tracking-tight">{currentLang === 'hi' ? "कोई मिलान नहीं मिला" : "No record matched"}</h3>
          <p className="text-charcoal text-xs max-w-sm mx-auto font-bold">{currentLang === 'hi' ? "कृपया सही वर्तनी (Spelling) की जांच करें अथवा 'सभी लाभार्थी' टैब पर क्लिक करें।" : "Try checking alternative spelling or toggle All Labhartis to see the full list."}</p>
        </div>
      )}

      {/* DETAILED DIGITAL TRIBUTE WINDOW MODAL (GOLDEN AKSHAR SAMMAN CERTIFICATE) */}
      {showTributeModal && selectedTribute && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
          <div className="relative bg-cream-50 w-full max-w-lg rounded-none border-3 border-charcoal shadow-flat-lg overflow-hidden animate-fade-in">
            
            <div className="bg-maroon-gradient p-4 border-b-2 border-charcoal flex justify-between items-center text-white">
              <span className="font-mono font-black text-gold-300 text-xs uppercase tracking-wider">
                🏆 {currentLang === 'hi' ? "गोल्डन अक्षर सम्मान प्रशस्ति पत्र" : "Golden Akshar Samman Plaque"}
              </span>
              <button 
                onClick={handleCloseTribute}
                className="p-1 hover:bg-white/10 text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 text-center space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Certificate Layout suitable for high value print frames */}
              <div id="donor-digital-frame" className="border-3 border-charcoal bg-white p-6 sm:p-8 rounded-none text-charcoal space-y-5 text-left relative overflow-hidden shadow-flat">
                
                {/* Watermark symbol overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] text-gold-500/[0.04] font-black rotate-12 select-none pointer-events-none font-display">
                  SAMAJ
                </div>

                <div className="text-center border-b border-charcoal/20 pb-3">
                  <span className="text-maroon-800 text-base font-display font-black block tracking-tight uppercase">{t.trustName}</span>
                  <span className="text-[9px] text-charcoal block uppercase font-black font-mono tracking-widest mt-1">Dungri Pura, Siwana-Samdari Road, Rajasthan</span>
                  <span className="text-[10px] text-gold-700 block font-black uppercase tracking-wider mt-1.5">🏆 {currentLang === 'hi' ? "स्वर्ण अक्षर सम्मान" : "GOLDEN AKSHAR SAMMAN"} 🏆</span>
                </div>

                <div className="space-y-4 text-xs leading-relaxed text-center font-bold">
                  <p className="text-charcoal/80">
                    {currentLang === 'hi' 
                      ? "अत्यंत हर्ष व गौरव के साथ श्री सिवांची जैन सेवा समिति ट्रस्ट आपके पूजनीय परिवार की धर्म प्रभावना को सादर अभिनंदित करता है:" 
                      : "With deep spiritual gratitude, the executive trustee body honors the noble dharma services of:"}
                  </p>
                  
                  <div className="space-y-1">
                    <strong className="text-maroon-850 font-display font-black text-lg block uppercase tracking-tight">
                      {selectedTribute.name[currentLang]}
                    </strong>
                    {selectedTribute.family && (
                      <span className="text-[10px] text-charcoal/70 block font-bold font-mono uppercase">({selectedTribute.family[currentLang]})</span>
                    )}
                    <span className="bg-cream-105 border border-charcoal text-maroon-700 font-black text-[9px] px-2.5 py-1 rounded-none inline-block uppercase mt-1.5 shadow-flat-sm font-mono">
                      {getTierLocalizedName(selectedTribute.tier)} • {currentLang === 'hi' ? `मूल ग्राम: ${selectedTribute.city[currentLang]}` : `Resident of ${selectedTribute.city[currentLang]}`}
                    </span>
                  </div>

                  <p className="border-y border-charcoal/20 py-3.5 text-charcoal leading-relaxed font-bold bg-cream-50 px-3 font-sans">
                    {currentLang === 'hi' ? (
                      <>
                        आपने डूंगरी पुरा तीर्थ परिसर में <strong>"{selectedTribute.contributionType[currentLang]}"</strong> हेतु कुल <strong>₹{selectedTribute.amount.toLocaleString('en-IN')}</strong> की न्यायोपार्जित धर्म सहयोग उदारता प्रदान कर शासन प्रभावना का अनुपम कार्य किया है। आप समाज के लिए एक आदर्श प्रेरणापुंज हैं।
                      </>
                    ) : (
                      <>
                        For committing self-earned wealth of <strong>₹{selectedTribute.amount.toLocaleString('en-IN')}</strong> to build the monumental <strong>"{selectedTribute.contributionType[currentLang]}"</strong> under Vihardham. This legacy serves future generations of Jain pilgrim communities forever.
                      </>
                    )}
                  </p>
                </div>

                <div className="flex justify-between items-end text-[9px] text-charcoal pt-2 font-mono uppercase tracking-wider font-bold">
                  <div>
                    <span className="block">{currentLang === 'hi' ? "अंकन वर्ष" : "Inscribed"}: {selectedTribute.year}</span>
                    <span className="block text-green-700">✓ Audited & Verified</span>
                  </div>
                  <div className="text-center font-black">
                    <span className="block font-display italic text-[10px] text-maroon-800">R. M. Bhansali</span>
                    <span className="block border-t border-charcoal/40 pt-1 text-[8px]">{currentLang === 'hi' ? "अध्यक्ष मुहर" : "Trust President Seal"}</span>
                  </div>
                </div>

              </div>

              {/* Modal trigger buttons */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="border-2 border-charcoal bg-white hover:bg-cream-100 text-maroon-700 font-black text-xs px-5 py-2.5 rounded-none flex items-center space-x-1 cursor-pointer shadow-flat active:translate-y-0.5"
                >
                  <Printer className="w-4 h-4 text-maroon-700" />
                  <span>{currentLang === 'hi' ? "प्रशस्ति पत्र प्रिंट करें" : "Print Legacy Plaque"}</span>
                </button>
                <button
                  onClick={handleCloseTribute}
                  className="bg-maroon-700 text-gold-300 hover:bg-gold-500 hover:text-maroon-900 font-black text-xs px-5 py-2.5 rounded-none border-2 border-charcoal shadow-flat cursor-pointer transition-colors"
                >
                  {currentLang === 'hi' ? "बंद करें" : "Close"}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

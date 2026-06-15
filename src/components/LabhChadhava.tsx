/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Calendar, BookOpen, Clock, Users, ArrowRight, ShieldCheck, Mail, Phone, MapPin, CheckCircle2, X, Award } from 'lucide-react';
import { Language, LabhOpportunity, LabhInquiry } from '../types';
import { seedLabhOpportunities, staticTranslations } from '../data';

interface LabhChadhavaProps {
  currentLang: Language;
  onAddLabhInquiry: (inquiry: LabhInquiry) => void;
}

export default function LabhChadhava({ currentLang, onAddLabhInquiry }: LabhChadhavaProps) {
  const [selectedOpp, setSelectedOpp] = useState<LabhOpportunity | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [isDone, setIsDone] = useState(false);
  
  // Inquiry Fields
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const opportunities: LabhOpportunity[] = seedLabhOpportunities;
  const t = staticTranslations[currentLang];

  const handleOpenInquiry = (opp: LabhOpportunity) => {
    setSelectedOpp(opp);
    setShowInquiryModal(true);
    setIsDone(false);
  };

  const handleCloseInquiry = () => {
    setShowInquiryModal(false);
    setSelectedOpp(null);
    setIsDone(false);
    // Clear fields
    setName('');
    setMobile('');
    setEmail('');
    setCity('');
    setMessage('');
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;

    const newInquiry: LabhInquiry = {
      id: "inq_" + Date.now(),
      labhId: selectedOpp.id,
      labhTitle: selectedOpp.title[currentLang],
      name,
      mobile,
      email,
      city,
      message,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    onAddLabhInquiry(newInquiry);
    setIsDone(true);
  };

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'Temple': return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'Dharamshala': return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'Palace': return 'bg-purple-50 text-purple-800 border-purple-300';
      case 'Bhojanshala': return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      default: return 'bg-cream-100 text-charcoal/80 border-gold-400/20';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'Temple': return currentLang === 'hi' ? "जिनालय / कीर्तिस्तंभ" : "Temple / Pillar";
      case 'Dharamshala': return currentLang === 'hi' ? "धर्मशाला कक्ष विकास" : "Dharamshala Chambers";
      case 'Palace': return currentLang === 'hi' ? "ओसवाल पैलेस सामाजिक भाग" : "Oswal Palace Complex";
      case 'Bhojanshala': return currentLang === 'hi' ? "शांताबा भोजनशाला" : "Shantaba Bhojanshala";
      default: return currentLang === 'hi' ? "सामान्य ट्रस्ट सामाजिक" : "General Samaj";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* SECTION 1: Traditional Jain Labh value description */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-gold-700 text-xs font-black uppercase tracking-widest block font-mono">✦ Bhagyashali Labharthi Avsar ✦</span>
        <h2 className="font-display font-black text-3xl text-maroon-800 uppercase tracking-tight">
          {currentLang === 'hi' ? "नाम लेखन एवं परम मंगलकारी लाभ अवसर" : "Available Labh & Naam Lekhan Opportunities"}
        </h2>
        <p className="text-charcoal text-xs sm:text-sm font-bold mt-1 max-w-xl mx-auto md:leading-relaxed">
          {currentLang === 'hi' ? (
            <>
              अपने पूजनीय माता-पिता, पूर्वजों अथवा परिवार की पुण्यावली में डूंगरी पुरा (मेली) संकुल के धार्मिक व सामाजिक अंग निर्माण में स्थायी सहयोग कर सुवर्ण अक्षरों में नाम अंकन का लाभ लें।
            </>
          ) : (
            <>
              In piously dedicated remembrance of beloved family ancestors, associate your family with specific wings, rooms, and monuments across our holy Rajasthan campus.
            </>
          )}
        </p>
        <div className="w-24 h-1 bg-charcoal mx-auto mt-2"></div>
      </div>

      {/* Grid of Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opp) => (
          <div 
            key={opp.id} 
            className="bg-white border-3 border-charcoal rounded-none shadow-flat hover:shadow-flat-lg hover:-translate-y-0.5 flex flex-col justify-between space-y-6 p-6 transition-all"
          >
            <div className="space-y-3">
              <span className={`inline-block border text-[10px] font-black px-3 py-1 rounded-none uppercase tracking-wider shadow-flat-sm ${getCategoryColor(opp.category)}`}>
                🏢 {getCategoryLabel(opp.category)}
              </span>
              <h3 className="font-display font-black text-lg text-maroon-850 leading-snug">
                {opp.title[currentLang]}
              </h3>
              <p className="text-charcoal font-bold text-xs sm:text-sm leading-relaxed">
                {opp.description[currentLang]}
              </p>
            </div>

            <div className="pt-4 border-t-2 border-charcoal/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-charcoal/40 block font-black uppercase tracking-wider font-mono">
                  {currentLang === 'hi' ? "चढ़ावा / न्यूनतम राशि:" : "Minimum Dharma Sahyog:"}
                </span>
                {opp.amount ? (
                  <span className="text-maroon-800 font-extrabold text-base sm:text-lg">₹{opp.amount.toLocaleString('en-IN')}</span>
                ) : (
                  <span className="text-gold-600 font-extrabold text-sm uppercase">संपर्क करें / On Query</span>
                )}
              </div>
              
              <button
                onClick={() => handleOpenInquiry(opp)}
                className="bg-maroon-700 hover:bg-gold-500 hover:text-maroon-950 transition-all border-2 border-charcoal text-white text-xs font-black px-4.5 py-2.5 rounded-none flex items-center space-x-1 cursor-pointer shadow-flat active:translate-y-0.5"
              >
                <span>{currentLang === 'hi' ? "लाभ निवेदन" : "Request Labh"}</span>
                <ArrowRight className="w-4 h-4 text-current" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* INQUIRY MODAL (नाम लेखन एवं लाभ अवसर पूछताछ) */}
      {showInquiryModal && selectedOpp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
          <div className="relative bg-cream-50 w-full max-w-lg rounded-none border-3 border-charcoal shadow-flat-lg overflow-hidden animate-fade-in">
            
            <div className="bg-maroon-gradient p-5 border-b-2 border-charcoal flex justify-between items-center text-white font-mono">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📥</span>
                <div>
                  <h3 className="font-display font-black text-base text-gold-300 uppercase tracking-tight">
                    {currentLang === 'hi' ? "नाम लेखन एवं लाभ चर्चा" : "Naam Lekhan Inquiry"}
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest block text-cream-200 mt-0.5">
                    Shri Siwanchi Jain Seva Samiti Trust
                  </span>
                </div>
              </div>
              <button 
                onClick={handleCloseInquiry}
                className="p-1 hover:bg-white/10 text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {!isDone ? (
                /* Dynamic form */
                <form onSubmit={handleSubmitInquiry} className="grid grid-cols-1 gap-4 text-xs font-black uppercase text-charcoal font-sans">
                  
                  {/* Target details */}
                  <div className="bg-white border-2 border-charcoal p-4 rounded-none shadow-flat-sm">
                    <span className="text-[10px] text-charcoal/50 block font-black font-mono">SELECTED LABH OPPORTUNITY:</span>
                    <strong className="text-maroon-800 text-sm block font-display mt-1 tracking-tight leading-snug">{selectedOpp.title[currentLang]}</strong>
                    <span className="text-[10px] text-green-700 block mt-1">✓ Your selection registers securely in real-time.</span>
                  </div>

                  {/* Fields */}
                  <div className="flex flex-col space-y-1">
                    <label>{currentLang === 'hi' ? "आपका पूरा नाम *" : "Your Full Name *"}</label>
                    <input 
                      type="text" 
                      required 
                      placeholder={currentLang === 'hi' ? "उदा. शा. राजमलजी भंसाली" : "e.g. Sanghvi Rajmalji Bhansali"} 
                      className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>{currentLang === 'hi' ? "मोबाइल नंबर (WhatsApp) *" : "Mobile Number (WhatsApp) *"}</label>
                    <input 
                      type="tel" 
                      required 
                      pattern="[0-9]{10}"
                      placeholder="e.g. 9426055667" 
                      className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>{currentLang === 'hi' ? "ईमेल एड्रेस (वैकल्पिक)" : "Email Address (Optional)"}</label>
                    <input 
                      type="email" 
                      placeholder="e.g. name@domain.com" 
                      className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>{currentLang === 'hi' ? "मूल गाँव / वर्तमान शहर *" : "Town & State of Residence *"}</label>
                    <input 
                      type="text" 
                      required 
                      placeholder={currentLang === 'hi' ? "उदा. डूंगरी पुरा (बेंगलुरु)" : "e.g. Dungri Pura (Bengaluru)"} 
                      className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>{currentLang === 'hi' ? "पारिवारिक धार्मिक संकल्प अथवा संदेश" : "Family Resolution or Message"}</label>
                    <textarea 
                      rows={3} 
                      placeholder={currentLang === 'hi' ? "जैसे: पूज्य दादीजी की पुण्य स्मृति में नाम अंकन प्रस्ताव।" : "e.g. In sacred memory of our beloves grandparents"} 
                      className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      className="w-full bg-maroon-gradient text-gold-300 hover:bg-gold-550 hover:text-maroon-950 font-black py-4 rounded-none border-2 border-charcoal shadow-flat uppercase tracking-wider transition-all cursor-pointer text-xs"
                    >
                      {currentLang === 'hi' ? "मंगलकारी लाभ अवसर चर्चा निवेदन भेजें" : "Submit Sacred Naam Lekhan Request"}
                    </button>
                    <p className="text-[9px] text-charcoal/50 font-bold mt-2 font-mono">
                      {currentLang === 'hi' 
                        ? "आपके निवेदन प्राप्ति के पश्चात ट्रस्ट कार्यकारिणी समिति आपके परिवार से व्यक्तिगत संपर्क स्थापित करेगी।"
                        : "Post submission, our corporate secretary Prakash Ji will initiate home briefing calls."}
                    </p>
                  </div>

                </form>
              ) : (
                /* Success */
                <div className="text-center p-4 space-y-6">
                  <div className="w-16 h-16 bg-green-100 text-green-700 rounded-none border-2 border-charcoal flex items-center justify-center text-3xl mx-auto shadow-flat animate-bounce">
                    ✓
                  </div>
                  <div className="space-y-1 font-mono uppercase text-xs">
                    <h4 className="font-display font-black text-lg text-maroon-850">{currentLang === 'hi' ? "निवेदन पंजीकृत हुआ!" : "Naam Lekhan Request Logged!"}</h4>
                    <p className="text-[10px] text-charcoal font-bold mt-1 lowercase first-line:uppercase">
                      {currentLang === 'hi' 
                        ? "हर्ष का विषय है! आपकी श्रद्धा भावना का यह निवेदन यशस्वी रूप से दर्ज हो चुका है। संघ कार्यकारिणी शीघ्र संपर्क करेगी।" 
                        : "The system has securely transmitted your request. Shasan Prabhavna blessings to your entire parivar."}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseInquiry}
                    className="bg-maroon-700 text-gold-300 hover:bg-gold-500 hover:text-maroon-900 border-2 border-charcoal font-black text-xs px-6 py-2.5 rounded-none shadow-flat transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

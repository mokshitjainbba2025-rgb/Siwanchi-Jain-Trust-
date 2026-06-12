/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Calendar, BookOpen, Clock, Users, ArrowRight, ShieldCheck, CheckCircle2, X, Printer, IndianRupee, MapPin } from 'lucide-react';
import { Language, PalaceBooking } from '../types';
import { staticTranslations } from '../data';
import ProjectVideoPlayer from './ProjectVideoPlayer';

interface OswalPalaceTabProps {
  currentLang: Language;
  onAddPalaceBooking: (booking: PalaceBooking) => void;
}

export default function OswalPalaceTab({ currentLang, onAddPalaceBooking }: OswalPalaceTabProps) {
  const [showPalaceModal, setShowPalaceModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedPalaceBooking, setGeneratedPalaceBooking] = useState<PalaceBooking | null>(null);

  // Form Fields State
  const [eventType, setEventType] = useState('Wedding');
  const [customEvent, setCustomEvent] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState(500);
  const [organizerName, setOrganizerName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [requirements, setRequirements] = useState<string[]>([]);

  const t = staticTranslations[currentLang];

  const handleRequirementToggle = (req: string) => {
    if (requirements.includes(req)) {
      setRequirements(requirements.filter(r => r !== req));
    } else {
      setRequirements([...requirements, req]);
    }
  };

  const handleOpenPalaceBooking = () => {
    setShowPalaceModal(true);
    setIsSuccess(false);
  };

  const handleClosePalaceBooking = () => {
    setShowPalaceModal(false);
    setIsSuccess(false);
    // Reset fields
    setEventType('Wedding');
    setCustomEvent('');
    setEventDate('');
    setGuestCount(500);
    setOrganizerName('');
    setContactPhone('');
    setContactEmail('');
    setRequirements([]);
  };

  const handleSubmitPalaceBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Baseline calculation
    let baseRate = 30000; // General Samaj Meeting base
    if (eventType === 'Wedding') baseRate = 85000; // Rich wedding base
    else if (eventType === 'Reception') baseRate = 60000;
    else if (eventType === 'Social Function') baseRate = 45000;

    // Requirements add margin
    let reqCost = requirements.length * 15000;
    const finalEstimated = baseRate + reqCost;
    const bookingCode = "OP" + Math.floor(100000 + Math.random() * 900000);

    const newBooking: PalaceBooking = {
      id: "op_" + Date.now(),
      bookingCode,
      eventType: {
        hi: eventType === 'Wedding' ? 'शुभ जैन पाणिग्रहण (विवाह)' : eventType,
        en: eventType
      },
      date: eventDate,
      guestCount,
      organizerName,
      contact: contactPhone,
      email: contactEmail,
      requirements,
      paymentStatus: 'Pending',
      approvalStatus: 'Pending',
      estimatedCost: finalEstimated,
      createdAt: new Date().toISOString()
    };

    onAddPalaceBooking(newBooking);
    setGeneratedPalaceBooking(newBooking);
    setIsSuccess(true);
  };

  const features = [
    { title: "Grand Wedding Hall", desc: "Spacious air-cooled pillarless assembly hall holding up to 1,500 guests with marble elevations." },
    { title: "Sanctified Dining Block", desc: "Separated, fully equipped kitchen maintaining strictly pure, onion-garlic-free food guidelines." },
    { title: "Luxury Guest Suites", desc: "Over 20 attached air-conditioned suites with fine closets, ideal for welcoming wedding parties." },
    { title: "Massive Parking Area", desc: "Secured outer parking driveway accommodating more than 150 light vehicles smoothly." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* SECTION 1: Palace Narrative and Social Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-maroon-50ed text-maroon-700 font-bold px-3 py-1.5 rounded-full text-xs sm:text-sm uppercase tracking-wide">
            <span>🏰 Oswal Palace Community Event Venue</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-maroon-850">
            ओसवाल पैलेस: समाज कल्याण का भव्य मांगलिक केंद्र
          </h1>

          <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed">
            {currentLang === 'hi' ? (
              <>
                <strong>ओसवाल पैलेस</strong> की स्थापना का मूल सिद्धांत अत्यंत पवित्र है: समाज का धन समाज के ही सेवा कार्यों में पुनर्निवेशित हो। सिवांची जैन समाज के परिवारों के विवाह प्रसंग, धार्मिक सम्मलेन व मांगलिक उत्सवों के आयोजन से प्राप्त नाममात्र किराया राशि को सीधे वृद्ध आश्रम, अनाथ सहायता व जरूरतमंद विद्यार्थियों की शिक्षा निधि में प्रदान किया जाता है।
              </>
            ) : (
              <>
                The sacred philosophy of <strong>Oswal Palace</strong> is simple: community wealth remains within the community for social welfare. The basic rentals generated from organizing Jain weddings, conferences, and Samaj celebrations are immediately transferred into maintaining senior citizen stays, widow security programs, and merit-based education funds.
              </>
            )}
          </p>

          <div className="bg-cream-100 border-l-4 border-gold-500 p-4 rounded-xl italic text-xs sm:text-sm text-maroon-800 font-semibold space-y-1 block">
            <span>"Money spent by the community should remain within the community and be used for social welfare."</span>
            <span className="block text-right text-[11px] text-charcoal/50">— Trust Core Philosophy</span>
          </div>

          <button
            onClick={handleOpenPalaceBooking}
            className="bg-maroon-gradient hover:bg-gold-500 hover:text-maroon-900 text-gold-300 font-black px-8 py-3.5 rounded-xl border border-gold-500 shadow-xl flex items-center space-x-2 transition-transform scale-100 active:scale-98 cursor-pointer"
          >
            <span>🏰 Booking Palace Venue</span>
            <ArrowRight className="w-4 h-4 text-current" />
          </button>
        </div>

        {/* Palace Render Frame Layout */}
        <div className="lg:col-span-5 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl"></div>
          <div className="p-3 bg-white border border-gold-400 rounded-2xl shadow-xl divine-border group overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=650" 
              alt="Oswal Palace Hall Reception" 
              className="rounded-xl w-full h-80 object-cover group-hover:scale-103 transition-transform duration-500" 
            />
            <div className="absolute bottom-5 left-5 right-5 bg-black/50 backdrop-blur-xs p-3.5 rounded-xl text-white">
              <span className="text-[10px] text-gold-300 uppercase font-black block">Central Assembly hall</span>
              <span className="text-xs sm:text-sm font-bold block">Capacity: Up to 1,500 seats with dining hall.</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Facilities Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-gold-600 text-xs font-bold uppercase tracking-widest block">Complete Amenity Infrastructure</span>
          <h2 className="font-display font-bold text-3xl text-maroon-800">आलीशान मंगल सुविधाएं</h2>
          <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div key={i} className="bg-white border border-gold-400/30 p-5 rounded-2xl shadow-sm relative divine-border flex flex-col space-y-3 justify-between">
              <div>
                <div className="w-10 h-10 bg-maroon-50ed rounded-lg text-maroon-700 font-bold text-lg flex items-center justify-center mb-3">
                  ✨
                </div>
                <h4 className="font-display font-extrabold text-base text-maroon-850">{feat.title}</h4>
                <p className="text-charcoal/70 text-xs. sm:text-sm leading-relaxed mt-1.5">{feat.desc}</p>
              </div>
              <div className="text-xs text-gold-600 font-bold flex items-center">
                <span>Fully Configured</span>
                <CheckCircle2 className="w-4 h-4 ml-1.5 text-green-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Virtual Project Walkthrough Video */}
      <div className="bg-cream-100/55 border-3 border-charcoal p-6 sm:p-10 rounded-none shadow-flat space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-maroon-700 text-xs font-black uppercase tracking-widest block font-mono">🎥 Video Guide Tour</span>
          <h2 className="font-display font-black text-3xl text-maroon-850 uppercase">Oswal Palace Project walkthrough</h2>
          <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-2"></div>
        </div>

        <ProjectVideoPlayer 
          currentLang={currentLang}
          videoId="Cwyn5LCGd0c"
          title={{
            hi: "ओसवाल पैलेस - भव्य वास्तुकला एवं निर्माण परिकल्पना",
            en: "Oswal Palace - Majestic Architecture & Project Conceptualization"
          }}
          description={{
            hi: "ओसवाल पैलेस के केंद्रीय एयर-कूल्ड वैडिंग हॉल, रसोई ब्लॉक और संगमरमर सुइट्स की निर्माण शैली का पूर्ण वीडियो विवरण।",
            en: "Comprehensive structural tour showcasing the centralized air-cooled assembly block, separate pure bhojanshala dining setup, and fine marble elevations scheduled at Oswal Palace, Dungri Pura campus."
          }}
          category="Oswal Palace Preview"
        />
      </div>

      {/* OSWAL PALACE VENUE BOOKING DIALOG */}
      {showPalaceModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
          <div className="relative bg-cream-50 w-full max-w-2xl rounded-2xl border-2 border-gold-500 shadow-2xl overflow-hidden animate-fade-in divine-border">
            
            <div className="bg-maroon-gradient p-5 border-b border-gold-400 flex justify-between items-center text-white">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏰</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-gold-300">
                    Oswal Palace Booking inquiry
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-cream-200 block">
                    Siwanchi Jain Samaj Social Welfare Center
                  </span>
                </div>
              </div>
              <button 
                onClick={handleClosePalaceBooking}
                className="p-1 hover:bg-white/10 text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
              {!isSuccess ? (
                /* Interactive Form */
                <form onSubmit={handleSubmitPalaceBooking} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-charcoal">
                  
                  <div className="col-span-2 bg-cream-100/50 outline-dotted outline-gold-400 p-4 rounded-xl">
                    <span className="text-maroon-800 block text-[13px] font-display font-extrabold">🚨 Important Jain Monastic Mandates:</span>
                    <span className="text-charcoal/80 text-[10px] block mt-1 leading-relaxed font-semibold">
                      Please note that strict vegetarian / organic rules are applicable. Garlic and onion usage is prohibited in kitchen halls, and absolutely no alcohol, meat, or tobacco is permitted inside the campus.
                    </span>
                  </div>

                  {/* Form fields */}
                  <div className="flex flex-col space-y-1">
                    <label>Event Type *</label>
                    <select
                      className="p-2.5 border border-gold-400/35 rounded bg-white text-xs outline-none"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                    >
                      <option value="Wedding">💍 Shubha Vivah (Wedding Event)</option>
                      <option value="Reception">🎉 Reception Function</option>
                      <option value="Social Function">🗣️ Samaj Meeting & Gatherings</option>
                      <option value="Conference">📚 Educational / Seminar Program</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>Target Event Date *</label>
                    <input 
                      type="date" 
                      required 
                      min={new Date().toISOString().split('T')[0]}
                      className="p-2.5 border border-gold-400/35 rounded bg-white text-xs outline-none" 
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>Estimated Guest Count *</label>
                    <input 
                      type="number" 
                      min="100" 
                      max="3000" 
                      required 
                      className="p-2.5 border border-gold-400/35 rounded bg-white text-xs outline-none" 
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>Organizer / Sanghji Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Shantilal Mutha" 
                      className="p-2.5 border border-gold-400/35 rounded bg-white text-xs outline-none" 
                      value={organizerName}
                      onChange={(e) => setOrganizerName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>Contact Phone (WhatsApp Mobile) *</label>
                    <input 
                      type="tel" 
                      required 
                      pattern="[0-9]{10}"
                      placeholder="10 digit Whatsapp" 
                      className="p-2.5 border border-gold-400/35 rounded bg-white text-xs outline-none" 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label>Contact Email</label>
                    <input 
                      type="email" 
                      placeholder="e.g. connect@oswal.com" 
                      className="p-2.5 border border-gold-400/35 rounded bg-white text-xs outline-none" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>

                  {/* Requirements Multi-Checkboxes */}
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs text-maroon-800 block">Select Luxury Requirements (Optional):</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { key: "Catering (Pure Organic Meal Service)", estimate: "Based on Count" },
                        { key: "Royal Mandap Flower Decoration", estimate: "₹25k baseline" },
                        { key: "LED Background Backdrops & Stage light", estimate: "₹15k baseline" },
                        { key: "20+ Attached AC Suites allotment", estimate: "Included in high package" }
                      ].map((item, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleRequirementToggle(item.key)}
                          className={`p-3 border rounded-xl flex justify-between items-center cursor-pointer transition-colors ${
                            requirements.includes(item.key)
                              ? 'bg-maroon-700/10 border-maroon-700 text-maroon-800 font-bold'
                              : 'bg-white border-gold-400/20 hover:bg-cream-100'
                          }`}
                        >
                          <span>{item.key}</span>
                          <span className="text-[9px] text-charcoal/40 font-mono font-bold font-sans">({item.estimate})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2 pt-4 flex flex-col space-y-2 items-center text-center">
                    <button
                      type="submit"
                      className="w-full bg-maroon-gradient hover:bg-gold-500 hover:text-maroon-950 text-gold-300 font-black py-4 rounded-xl border border-gold-500 shadow-xl transition-all scale-100 active:scale-98 cursor-pointer"
                    >
                      Process Palace Reservation request
                    </button>
                  </div>

                </form>
              ) : (
                /* Success receipt output design */
                <div className="text-center p-4 space-y-6">
                  <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-3xl mx-auto shadow-md animate-pulse">
                    🏰
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-2xl text-maroon-850">Palace Inquiry Filed!</h4>
                    <p className="text-xs text-charcoal/70">The event inquiry has been logged. Our trust manager will coordinate with your family shortly.</p>
                  </div>

                  {generatedPalaceBooking && (
                    <div id="receipt-palace" className="bg-white border-2 border-dashed border-gold-400 rounded-xl p-5 text-left text-xs text-charcoal space-y-4 shadow-inner">
                      <div className="flex justify-between border-b border-gold-400/20 pb-3">
                        <div>
                          <span className="font-bold text-maroon-800 text-sm block">Oswal Palace Convention Hub</span>
                          <span className="text-[9px] text-charcoal/50 block font-medium">Shri Siwanchi Jain Seva Samiti Trust</span>
                        </div>
                        <div className="text-right">
                          <span className="bg-gold-400 text-maroon-900 font-extrabold text-[9px] px-2.5 py-0.5 rounded uppercase font-mono block">Status: PENDING Manager approval</span>
                          <span className="text-[10px] text-charcoal/50 font-mono block mt-1">QUOTATION: OP-{generatedPalaceBooking.bookingCode}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                        <div>
                          <span className="text-charcoal/50 block">Sangh / Organizer:</span>
                          <strong className="text-charcoal text-sm">{generatedPalaceBooking.organizerName}</strong>
                        </div>
                        <div>
                          <span className="text-charcoal/50 block">Target phone Contact:</span>
                          <strong>{generatedPalaceBooking.contact}</strong>
                        </div>
                        <div>
                          <span className="text-charcoal/50 block">Event Category:</span>
                          <strong className="text-maroon-700">{generatedPalaceBooking.eventType[currentLang]}</strong>
                        </div>
                        <div>
                          <span className="text-charcoal/50 block">Estimated base quotation:</span>
                          <strong className="text-green-700 text-sm">₹{generatedPalaceBooking.estimatedCost} (Subject to catering/decor additions)</strong>
                        </div>
                        <div>
                          <span className="text-charcoal/50 block">Booking Date Requested:</span>
                          <strong className="text-maroon-800 font-mono">{generatedPalaceBooking.date}</strong>
                        </div>
                        <div>
                          <span className="text-charcoal/50 block">Target Guest Capacity:</span>
                          <strong>{generatedPalaceBooking.guestCount} Attendees</strong>
                        </div>
                      </div>

                      {generatedPalaceBooking.requirements.length > 0 && (
                        <div className="border-t border-gold-400/20 pt-3.5">
                          <span className="text-xs text-charcoal/60 block mb-1">Requested elements:</span>
                          <div className="flex flex-wrap gap-1">
                            {generatedPalaceBooking.requirements.map((item, idx) => (
                              <span key={idx} className="bg-cream-100 border border-gold-400/20 text-maroon-850 font-bold px-2 py-0.5 rounded text-[9px]">
                                • {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="border-t border-gold-400/20 pt-3 text-center text-[10px] text-charcoal/50 italic">
                        The reservation status is temporary. Upon visual confirmation by the Trust board secretary, the booking confirmation code will be updated.
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 justify-center pt-2">
                    <button
                      onClick={() => window.print()}
                      className="border border-gold-500 bg-white text-maroon-700 font-black text-xs px-5 py-2.5 rounded-lg flex items-center space-x-1 hover:bg-cream-100 transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Quotation</span>
                    </button>
                    <button
                      onClick={handleClosePalaceBooking}
                      className="bg-maroon-700 text-gold-300 font-black text-xs px-5 py-2.5 rounded-lg shadow hover:bg-gold-500 hover:text-maroon-900 transition-colors"
                    >
                      Close Window
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

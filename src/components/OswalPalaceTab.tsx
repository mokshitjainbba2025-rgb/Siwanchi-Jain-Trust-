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

          <div className="bg-amber-50 border-2 border-amber-500/30 p-4 rounded-xl text-xs sm:text-sm text-amber-900 font-semibold flex items-center space-x-2 w-fit">
            <span className="animate-pulse">🔔</span>
            <span>
              {currentLang === 'hi' 
                ? "ओसवाल पैलेस प्रसंग बुकिंग शीघ्र ही उपलब्ध होगी!" 
                : "Oswal Palace bookings will be available soon!"}
            </span>
          </div>

          <button
            onClick={handleOpenPalaceBooking}
            className="bg-maroon-gradient hover:bg-gold-500 hover:text-maroon-900 text-gold-300 font-black px-8 py-3.5 rounded-xl border border-gold-500 shadow-xl flex items-center space-x-2 transition-transform scale-100 active:scale-98 cursor-pointer text-xs uppercase"
          >
            <span>🏰 {currentLang === 'hi' ? "बुकिंग स्थिति व विवरण" : "Booking Status & Contact"}</span>
            <ArrowRight className="w-4 h-4 text-current font-black" />
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

      {/* SECTION 2.5: Special Social Welfare & Event Support Integrations */}
      <div className="space-y-8 bg-amber-50/40 p-6 sm:p-8 border-2 border-amber-500/20 rounded-none">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-maroon-800 text-xs font-black uppercase tracking-widest block font-mono">🌟 सामाजिक कल्याण व धार्मिक सेवा प्रभाग 🌟</span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-maroon-850 uppercase">सामूहिक विवाह, टेंट एवं शुद्ध खाद्य व्यवस्था</h2>
          <p className="text-xs text-charcoal font-semibold mt-1">Specialized non-profit alignments ensuring auspicious execution of your events at minimal to zero costs.</p>
          <div className="w-24 h-0.5 bg-amber-500 mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Samuhik Vivah Facilities */}
          <div className="bg-white border-2 border-charcoal p-5 flex flex-col justify-between space-y-4 shadow-flat-sm">
            <div>
              <div className="w-10 h-10 bg-rose-50 border border-rose-300 text-rose-700 flex items-center justify-center text-xl font-bold mb-3">
                💝
              </div>
              <h3 className="font-display font-black text-sm uppercase text-maroon-800 tracking-tight">
                {currentLang === 'hi' ? "सामूहिक विवाह व्यवस्था सहयोग" : "Samuhik Vivah Support"}
              </h3>
              <p className="text-charcoal leading-relaxed text-xs mt-2 font-semibold">
                {currentLang === 'hi' ? (
                  "समाज कल्याण के पावन उद्देश्य हेतु हम सामूहिक विवाह (समूह विवाह) प्रसंगों का पूर्ण समर्थन और व्यवस्था सहयोग करते हैं। यह सेवा पूर्णतः निःशुल्क नहीं है, परंतु इसमें अत्यंत कम खर्च (Minimal Expenses) आता है, जिससे परिवारों पर कोई भारी वित्तीय भार नहीं पड़ता।"
                ) : (
                  "For community welfare, we support and facilitate mass marriages (Samuhik Vivah). While not completely free, it incurs highly reduced, minimal expenses to prevent heavy financial burdens on families."
                )}
              </p>
            </div>
            <span className="text-[10px] text-maroon-700 font-mono tracking-wider uppercase block font-black border-t pt-2 border-charcoal/10">★ Minimal & Highly Economical Costs</span>
          </div>

          {/* Card 2: Event Support Services */}
          <div className="bg-white border-2 border-charcoal p-5 flex flex-col justify-between space-y-4 shadow-flat-sm">
            <div>
              <div className="w-10 h-10 bg-blue-50 border border-blue-300 text-blue-700 flex items-center justify-center text-xl font-bold mb-3">
                🎪
              </div>
              <h3 className="font-display font-black text-sm uppercase text-maroon-800 tracking-tight">
                {currentLang === 'hi' ? "मांगलिक टेंट एवं कैटरिंग व्यवस्था" : "Tent & Catering Arrangements"}
              </h3>
              <p className="text-charcoal leading-relaxed text-xs mt-2 font-semibold">
                {currentLang === 'hi' ? (
                  "मांगलिक प्रसंगों को यादगार बनाने हेतु हम उच्च गुणवत्ता (High Quality) वाली टेंट सजावट, मांगलिक साउंड और सात्विक जैन कैटरर/रसोईया सेवा को बेहद कम और किफायती दामों (Low Price) पर बुक व व्यवस्थित कराने में पूरा सहयोग करते हैं।"
                ) : (
                  "To streamline divine wedding events, we help you arrange high-quality tent setups, decorators, pure Jain catering services, and sound systems at exceptionally low and optimized rates."
                )}
              </p>
            </div>
            <span className="text-[10px] text-maroon-700 font-mono tracking-wider uppercase block font-black border-t pt-2 border-charcoal/10">★ Low Price & High Quality</span>
          </div>

          {/* Card 3: Pure Flour & Kirana Facility */}
          <div className="bg-white border-2 border-charcoal p-5 flex flex-col justify-between space-y-4 shadow-flat-sm">
            <div>
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center text-xl font-bold mb-3">
                🌾
              </div>
              <h3 className="font-display font-black text-sm uppercase text-maroon-800 tracking-tight">
                {currentLang === 'hi' ? "शुद्ध आटा चक्की व किराना आपूर्ति" : "Pure Flour & Grocery Support"}
              </h3>
              <p className="text-charcoal leading-relaxed text-xs mt-2 font-semibold">
                {currentLang === 'hi' ? (
                  "हम परिसर में पारंपरिक हाइजीनिक आटा चक्की (शुद्ध पिसाई) का संचालन करने के साथ-साथ दैनिक व मांगलिक प्रसंगों हेतु उच्च गुणवत्ता वाले राशन व आवश्यक किराना सामान (Kirana Items) भी अत्यंत उचित और वाजिब दामों (Best Price Range) पर उपलब्ध कराते हैं।"
                ) : (
                  "Along with our traditional, hygiene-audited flour mill (Aata Chakki Setup), we coordinate high-quality essential grocery and Kirana items at incredibly competitive and affordable price ranges."
                )}
              </p>
            </div>
            <span className="text-[10px] text-maroon-700 font-mono tracking-wider uppercase block font-black border-t pt-2 border-charcoal/10">★ In-House Milling & Best Price Kirana</span>
          </div>
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
              <div className="text-center p-4 space-y-6">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-5xl mx-auto border-3 border-amber-500 shadow-md animate-pulse">
                  🏰
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-display font-black text-2xl text-maroon-850 uppercase tracking-tight">
                    {currentLang === 'hi' ? "ओसवाल पैलेस बुकिंग: शीघ्र ही उपलब्ध" : "Oswal Palace Booking: Available Soon"}
                  </h4>
                  
                  <div className="w-16 h-1 bg-amber-505 mx-auto"></div>
                  
                  <p className="text-charcoal text-xs sm:text-sm font-semibold leading-relaxed">
                    {currentLang === 'hi' ? (
                      <>
                        ओसवाल पैलेस कम्युनिटी इवेंट वेन्यू का निर्माण एवं आंतरिक साज-सज्जा कार्य वर्तमान में प्रगति पर है। यह दिव्य और सर्वसुविधायुक्त मांगलिक केंद्र शीघ्र ही समाज बंधुओं को समर्पित किया जाएगा, जिसके बाद ऑनलाइन और ऑफलाइन प्रसंग बुकिंग प्रणाली पूर्ण रूप से कार्यान्वित कर दी जाएगी।
                      </>
                    ) : (
                      <>
                        The construction and interior layout modeling for the Oswal Palace complex are currently underway. This grand community wedding and event venue will be fully completed and dedicated soon, after which our online and offline reservations will be fully operational.
                      </>
                    )}
                  </p>
                </div>

                {/* Important notice container */}
                <div className="bg-cream-100 border-2 border-dashed border-gold-500 p-4 rounded-xl text-left space-y-2.5">
                  <span className="text-maroon-800 block text-xs font-black font-display uppercase tracking-wide">
                    🚨 {currentLang === 'hi' ? "विशेष धार्मिक निर्देश:" : "Religious & Pure Monastic Guidelines:"}
                  </span>
                  <p className="text-charcoal text-[11px] font-bold leading-relaxed">
                    {currentLang === 'hi' ? (
                      "यहाँ भोजन में लहसुन व प्याज का उपयोग पूर्णतः वर्जित रहेगा तथा परिसर के भीतर शराब, मांस या किसी भी प्रकार के नशीले पदार्थों का सेवन सख्त मना है।"
                    ) : (
                      "Strict pure-vegetarian parameters apply. Onion and garlic usage is absolutely prohibited in the catering/kitchen blocks, and no tobacco, liquor, or non-veg food elements are allowed anywhere inside the campus."
                    )}
                  </p>
                </div>

                {/* Trust contact directory */}
                <div className="bg-white border-2 border-charcoal p-4 rounded-xl text-left space-y-3 shadow-sm font-sans">
                  <span className="text-maroon-900 block text-xs font-extrabold uppercase tracking-widest border-b pb-1">
                    📞 {currentLang === 'hi' ? "अग्रिम पूछताछ एवं सहयोग हेतु संपर्क सूत्र:" : "Early Inquiries & Trustees Contact:"}
                  </span>
                  <div className="font-mono text-xs text-charcoal font-black space-y-1.5">
                    <div className="flex justify-between items-center text-maroon-800">
                      <span>• श्री राजमलजी भंसाली (President):</span>
                      <a href="tel:+919822538635" className="underline hover:text-gold-650">+91 98225 38635</a>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleClosePalaceBooking}
                    className="bg-maroon-700 text-gold-300 font-black text-xs px-8 py-3 rounded-lg border-2 border-charcoal shadow-flat hover:bg-gold-505 hover:text-maroon-900 transition-colors uppercase cursor-pointer"
                  >
                    {currentLang === 'hi' ? "खिड़की बंद करें" : "Close Window"}
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

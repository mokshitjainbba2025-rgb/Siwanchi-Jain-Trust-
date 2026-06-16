/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Users2, Sparkles, Phone, MessageSquare, Landmark, Info, Calendar, HandHeart, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface VatsalyaDhamTabProps {
  currentLang: Language;
}

export default function VatsalyaDhamTab({ currentLang }: VatsalyaDhamTabProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header Section */}
      <div className="relative bg-maroon-gradient text-white border-3 border-charcoal p-8 sm:p-12 shadow-flat overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center space-x-2 bg-gold-400 text-maroon-950 px-3 py-1 text-[10px] sm:text-xs font-black uppercase border border-charcoal shadow-flat-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-maroon-900 shrink-0" />
              <span>{currentLang === 'hi' ? "मानवता की सेवा ही सच्चा धर्म है" : "True Dharma is Service to Humanity"}</span>
            </div>
            
            <h1 className="font-display font-black text-3xl sm:text-4.5xl lg:text-5xl text-gold-300 uppercase tracking-tight leading-tight">
              {currentLang === 'hi' ? "श्री वात्सल्य धाम" : "Shri Vatsalya Dham"}
            </h1>
            
            <p className="text-cream-50 font-semibold text-sm sm:text-base leading-relaxed">
              {currentLang === 'hi' 
                ? "निःसहाय, एकाकी और निराश्रित वृद्धजनों के लिए सम्पूर्ण जिम्मेदारी, गरिमापूर्ण आश्रय एवं निःशुल्क सेवा का पावन तीर्थ।" 
                : "A sacred sanctuary offering absolute care, dignified living, and 100% free lifetime support for vulnerable, single elderly souls."}
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] sm:text-xs font-mono font-bold">
              <span className="bg-maroon-800 border border-gold-500/30 px-3 py-1 text-gold-300">
                👩‍🦳 {currentLang === 'hi' ? "२५ महिलाओं हेतु आरक्षित" : "25 Reserved Female Suites"}
              </span>
              <span className="bg-maroon-800 border border-gold-500/30 px-3 py-1 text-gold-300">
                👨‍🦳 {currentLang === 'hi' ? "२५ पुरुषों हेतु आरक्षित" : "25 Reserved Male Suites"}
              </span>
            </div>
          </div>
          
          <div className="shrink-0 flex justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-none bg-gold-400 flex items-center justify-center border-3 border-charcoal shadow-flat animate-bounce">
              <span className="text-maroon-800 text-5xl font-bold">🕊️</span>
            </div>
          </div>
        </div>
      </div>

      {/* CORE VISION & CAPACITY BOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Core Vision Description and Context */}
        <div className="lg:col-span-7 bg-white border-3 border-charcoal p-6 sm:p-10 shadow-flat space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 text-maroon-700 font-black uppercase tracking-wide text-xs">
              <Heart className="w-5 h-5 text-gold-650" />
              <span>{currentLang === 'hi' ? "निःशुल्क सेवा एवं परम सुरक्षा का संकल्प" : "FREE LIFETIME INTEGRATED WELFARE"}</span>
            </div>
            
            <h2 className="font-display font-black text-2xl sm:text-3xl text-maroon-800 tracking-tight">
              {currentLang === 'hi' 
                ? "जिनका कोई सहारा नहीं, उनका सहारा बनेगा श्री संघ" 
                : "A Place of Absolute Care, Comfort and Affection"}
            </h2>

            <p className="text-charcoal text-xs sm:text-sm font-semibold leading-relaxed">
              {currentLang === 'hi' ? (
                <>
                  समाज में कई बार ऐसी परिस्थितियां बन जाती हैं जहाँ हमारे ही परिवार के कई वरिष्ठ सदस्य बुढ़ापे के मोड़ पर बिल्कुल अकेले हो जाते हैं। जिनके जीवन में न कोई आगे पीछे देखभाल करने वाला बचा है और न ही कोई आर्थिक साधन उपलब्ध हैं। ऐसे २५ परम पुजनीय माताओं (Ladies) एवं २५ पितातुल्य पुरुषों (Mens) के लिए <strong>वात्सल्य धाम</strong> में संपूर्ण व्यवस्था निःशुल्क की जाएगी।
                </>
              ) : (
                <>
                  Life throws challenging situations where some of our senior community members find themselves entirely alone in their golden years. With absolutely nobody to take care of them, no source of income, and no place to call home, <strong>Vatsalya Dham</strong> will step in as their family. We have planned full permanent accommodation for 25 ladies and 25 men inside this sanctuary.
                </>
              )}
            </p>

            <p className="text-charcoal text-xs sm:text-sm font-semibold leading-relaxed">
              {currentLang === 'hi' ? (
                <>
                  यहाँ उनके रहने के लिए आरामदायक सुसज्जित कक्ष, अनुकूल सात्विक भोजनशाला की सेवाएं, चिकित्सा और दवाइयाँ, वस्त्र तथा उनकी हर छोटी-बड़ी दैनिक आवश्यकताओं की पूर्ति पूर्णतः निःशुल्क की जाएगी। सेवा करने वाले कर्मचारियों की विशेष देखभाल में उन्हें अत्यंत सम्मान और स्नेह का पारिवारिक वातावरण प्राप्त होगा।
                </>
              ) : (
                <>
                  Every single basic requirement—including well-equipped clean living suites, regular pure vegetarian balanced meals prepared according to physical needs, round-the-clock doctor visits, medicines, clothing, hygiene, and recreational therapy—will be provided completely free of charge. Experienced caregivers will manage their day-to-day requirements with utmost respect and affection.
                </>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-charcoal/20">
            {[
              { hi: "१००% निःशुल्क आजीवन आवास", en: "100% Free Lifetime Living" },
              { hi: "शुद्ध व मर्यादित सात्विक भोजन", en: "Pure & Nutritious Vegetarian Meals" },
              { hi: "२४/७ चिकित्सा व दवाईयों की सेवा", en: "24/7 Healthcare & Medical Support" },
              { hi: "पारिवारिक स्नेह एवं आदर सत्कार", en: "Empathetic Family Environment" }
            ].map((srv, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-[11px] text-maroon-850 font-extrabold bg-cream-50 p-2.5 border border-charcoal/30">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                <span>{currentLang === 'hi' ? srv.hi : srv.en}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Project Progress Indicator (In Progress) */}
        <div className="lg:col-span-5 bg-cream-100 border-3 border-charcoal p-6 sm:p-8 flex flex-col justify-between shadow-flat relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold-450/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="space-y-5">
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 text-[10px] font-black uppercase font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>🛠️ {currentLang === 'hi' ? "निर्माणाधीन परियोजना" : "CONSTRUCTION IN PROGRESS"}</span>
            </div>

            <h3 className="font-display font-black text-xl text-maroon-900 uppercase">
              {currentLang === 'hi' ? "परियोजना की वर्तमान स्थिति" : "Current Project Status"}
            </h3>

            <p className="text-charcoal/85 text-[11px] font-bold leading-relaxed">
              {currentLang === 'hi' ? (
                <>
                  वात्सल्य धाम परियोजना का नागरिक निर्माण एवं ढांचागत विकास का कार्य तीव्र गति से गतिशील है। हमारे परम पूज्य संतों के आशीर्वाद और समाज के सहयोग से हम शीघ्र ही इस दिव्य परिसर का संचालन आरंभ करने के लिए संकल्पित हैं।
                </>
              ) : (
                <>
                  The architectural planning, design, and site development for the Vatsalya Dham block are currently underway in full swing. Guided by our revered Jain Acharyas, we are determined to complete this spiritual sanctuary at the earliest.
                </>
              )}
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase mb-1 text-charcoal/70">
                  <span>{currentLang === 'hi' ? "निर्माण प्रगति" : "Work Stage Progress"}</span>
                  <span>45%</span>
                </div>
                <div className="w-full h-3 bg-white border-2 border-charcoal rounded-none overflow-hidden p-0.5">
                  <div className="h-full bg-gold-500 border border-charcoal" style={{ width: '45%' }}></div>
                </div>
              </div>

              <div className="bg-white border-2 border-charcoal p-3.5 space-y-1">
                <span className="text-[10px] text-maroon-800 font-extrabold uppercase block tracking-wider">{currentLang === 'hi' ? "🎯 प्रमुख लक्ष्य:" : "🎯 Key Milestone:"}</span>
                <p className="text-[10px] text-charcoal/90 font-bold leading-normal">
                  {currentLang === 'hi' 
                    ? "५० विशिष्ट शयन कक्षों, आंतरिक मनोरंजक हॉल, ध्यान केन्द्र एवं पृथक वैयावृत्य प्रकोष्ठों का निर्माण।" 
                    : "Constructing 50 premium personal rooms, central gathering halls, medical checkup rooms, and landscaped meditation areas."}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-charcoal/10 text-center">
            <span className="text-xs text-charcoal/60 font-bold block">{currentLang === 'hi' ? "संभावित सेवा शुभारंभ: २०२७" : "Target Service Launch: 2027"}</span>
          </div>
        </div>

      </div>

      {/* CALL TO ACTION: CONNECT & APPLY OR SPONSOR */}
      <div className="bg-white border-3 border-charcoal shadow-flat-lg grid grid-cols-1 lg:grid-cols-12 overflow-hidden items-stretch">
        
        {/* Left Option: Apply / Take the Labh (लाभार्थी बनें / संपर्क करें) */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between border-b-3 lg:border-b-0 lg:border-r-3 border-charcoal space-y-6">
          <div className="space-y-3.5">
            <div className="w-10 h-10 rounded-none bg-maroon-100 flex items-center justify-center border-2 border-charcoal">
              <Users2 className="w-5 h-5 text-maroon-700" />
            </div>
            
            <h3 className="font-display font-black text-xl sm:text-2xl text-maroon-800 uppercase tracking-tight">
              {currentLang === 'hi' ? "लाभार्थी बनें या सुझायें" : "Take the Benefit or Refer Someone"}
            </h3>

            <p className="text-charcoal text-xs sm:text-xs font-bold leading-relaxed">
              {currentLang === 'hi' ? (
                <>
                  यदि आप स्वयं इस सेवा का लाभ (Labh) लेने के इच्छुक हैं, या आपके परिचय में कोई ऐसा एकाकी साधार्मिक भाई या बहन है जो इस पात्रता को पूर्ण करते हैं, तो कृपया संकोच न करें। आपके द्वारा दी गई जानकारी किसी को एक नया सम्मानजनक जीवन दे सकती है। हमसे संपर्क करें और जानकारी साझा करें।
                </>
              ) : (
                <>
                  If you are personally interested in utilizing this service, or know an elderly, lone soul in the community who perfectly meets these parameters, please don't hesitate. Sharing this information can award someone a new, dignified, happy remainder of life. Apply directly or refer a soul to the Trust Board.
                </>
              )}
            </p>
          </div>

          <div className="pt-4 border-t border-charcoal/15 space-y-4">
            <div className="bg-cream-50 p-4 border border-charcoal/20 space-y-2">
              <span className="text-[11px] font-black text-maroon-900 uppercase block tracking-wider">📞 {currentLang === 'hi' ? "आधिकारिक संपर्क सूत्र:" : "Primary Contact Lines:"}</span>
              <div className="font-mono text-xs text-charcoal font-black space-y-1">
                <a href="tel:+919822538635" className="hover:underline block text-maroon-800">✔️ श्री राजमलजी भंसाली (President): +91 98225 38635</a>
              </div>
            </div>

            <p className="text-[10px] text-maroon-700 font-extrabold italic leading-snug">
              {currentLang === 'hi' 
                ? "वात्सल्य लाभ के लिए आवेदन हेतु कोई भी शुल्क या पंजीकरण राशि देय नहीं है।" 
                : "There is absolutely zero cost or hidden application fee to secure this lifetime care."}
            </p>
          </div>
        </div>

        {/* Right Option: Support / Donate / Sanyojak (धर्म दान व सहयोग) */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-cream-50 space-y-6">
          <div className="space-y-3.5">
            <div className="w-10 h-10 rounded-none bg-gold-200 flex items-center justify-center border-2 border-charcoal">
              <HandHeart className="w-5 h-5 text-maroon-850" />
            </div>
            
            <h3 className="font-display font-black text-xl sm:text-2xl text-maroon-800 uppercase tracking-tight">
              {currentLang === 'hi' ? "धर्म सहयोग एवं सेवा दान" : "Support this Compassionate Cause"}
            </h3>

            <p className="text-charcoal text-xs sm:text-xs font-bold leading-relaxed">
              {currentLang === 'hi' ? (
                <>
                  यह मानव कल्याण का अति महत्वपूर्ण पुनीत कार्य समाज के सामूहिक सहयोग से ही संभव होगा। यदि आप वात्सल्य धाम के निर्माण विकास, वृद्धजनों के भोजन व्यय (Bhojan Fund), चिकित्सा कोष या संपूर्ण कक्ष के प्रायोजक (Sponsor) बनने के इच्छुक हैं, तो कृपया इस पुनीत कार्य में आगे बढ़ें।
                </>
              ) : (
                <>
                  Executing this vital humanitarian sanctuary is only possible with your continuous spiritual backing and financial support. If you wish to sponsor a room, back the general medical or medicine care, or establish a perpetual meal fund (Bhojan Fund) in memory of your ancestors, we welcome you to join hands.
                </>
              )}
            </p>
          </div>

          <div className="pt-4 border-t border-charcoal/15 space-y-4">
            <div className="bg-white p-4 border border-charcoal/20 space-y-1 text-xs">
              <p className="font-extrabold text-charcoal">
                {currentLang === 'hi' 
                  ? "आइए! मानवता और धर्म की रक्षा के इस ऐतिहासिक अनुष्ठान में भागीदार बनें।" 
                  : "Every contribution immediately strengthens our operational capability to nourish these beautiful souls."}
              </p>
            </div>

            <a
              href="#donations"
              className="inline-block text-center bg-maroon-gradient text-gold-300 font-extrabold py-3 px-6 rounded-none border-2 border-charcoal shadow-flat hover:bg-gold-500 hover:text-maroon-950 transition-all cursor-pointer text-xs uppercase tracking-wide w-full sm:w-auto"
            >
              {currentLang === 'hi' ? "वात्सल्य धाम हेतु सहयोग करें" : "Support Vatsalya Dham Now"}
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}

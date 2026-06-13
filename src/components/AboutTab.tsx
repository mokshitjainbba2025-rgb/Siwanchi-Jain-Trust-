/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, Award, MapPin, MessageSquare, History, Check, Heart, Shield, Landmark } from 'lucide-react';
import { Language, Trustee } from '../types';
import { seedTrustees } from '../data';

interface AboutTabProps {
  currentLang: Language;
}

export default function AboutTab({ currentLang }: AboutTabProps) {
  const trustees: Trustee[] = seedTrustees;

  // Timeline events representing correct historical markers
  const timelineEvents = [
    {
      year: "2018",
      title: { hi: "ट्रस्ट की स्थापना और भूमि रजिस्ट्री", en: "Trust Registration & Land Acquisition" },
      desc: { hi: "मेली रोड, डूंगरी पुरा में ४.५ एकड़ पवित्र कृषि भूमि का ट्रस्ट के नाम अधिग्रहण और कानूनी पंजीयन पूर्ण हुआ।", en: "Legally acquired 4.5 acres of highly serene road-touch land at Dungri Pura for constructing Vihardham and temple complex." }
    },
    {
      year: "2020",
      title: { hi: "मंदिर निर्माण का शिलान्यास", en: "Foundation Stone Laying Ceremony" },
      desc: { hi: "परम पूज्य संतों के आशीर्वाद से भूमि पूजन और सर्वोत्कृष्ट सोमपुरा शिल्पी द्वारा प्रथम पत्थर की स्थापना हुई।", en: "Grand foundation stone laying ceremony performed in the presence of hundred of householders and holy monks." }
    },
    {
      year: "2022",
      title: { hi: " भोजनशाला शुभारंभ", en: "Inauguration of Shanataba Bhojanshala" },
      desc: { hi: "तीर्थ यात्रियों एवं साधार्मिक बंधुओं के लिए सात्विक व ताजे भोजन की व्यवस्था के लिए अत्याधुनिक डायनिंग ब्लॉक शुरू हुआ।", en: "Successfully commissioned dining block providing fresh pure organic foods, clean water, and nutritional support." }
    },
    {
      year: "2024",
      title: { hi: "ओसवाल पैलेस की संरचना पूर्ण", en: "Oswal Palace Core Structuring Finished" },
      desc: { hi: "विशाल सामुदायिक उत्सव भवन, संगमरमर फर्श, स्टेज और कमरे की संरचना सफलतापूर्वक तैयार की गयी।", en: "Finished construction on the master marriage and reception hall called Oswal Palace with over 20 integrated premium rooms." }
    },
    {
      year: "2026",
      title: { hi: "शिखर ध्वज रोहण व प्राण प्रतिष्ठा (आगामी)", en: "Gran-Prestige & Prathishtha (Upcoming)" },
      desc: { hi: "नवीन शिखरबद्ध जैन मन्दिर की मंगल अंजनशलाका प्रतिष्ठा उत्सव की भव्य तैयारियां गतिमान हैं।", en: "Nearing final touch-ups, the grand idol installing and flag-hoisting rituals are scheduled for the coming season." }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* SECTION 1: Master History Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-maroon-50 text-maroon-700 font-black px-3 py-1.5 rounded-none border-2 border-charcoal text-xs uppercase shadow-flat-sm">
            <History className="w-4.5 h-4.5 text-gold-500" />
            <span className="font-mono">इतिहास एवं गौरवमयी गाथा • History & Heritage</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-maroon-800 uppercase tracking-tight">
            {currentLang === 'hi' 
              ? "एक पावन स्वप्न से साकार होती भव्य धार्मिक विरासत" 
              : "A Divine Dream Evolving into a Majestic Spiritual Legacy"}
          </h2>

          <p className="text-charcoal text-xs sm:text-sm font-bold leading-relaxed">
            {currentLang === 'hi' ? (
              <>
                श्री सिवांची जैन समाज के इतिहास में डूंगरी पुरा की धरा पर एक ऐसे केन्द्र की कमी सदैव महसूस की जाती थी जहाँ हमारे पूज्य साधु-साध्वी विहार के दौरान विश्राम कर सकें और समाज के परिवार अपने मांगलिक प्रसंगों को एक ही परिसर में संस्कारी वातावरण में मना सकें। इसी लक्ष्य के साथ सन् २०१८ में वरिष्ठ समाजसेवियों के मार्गदर्शन में <strong>श्री सिवांची जैन सेवा समिति ट्रस्ट</strong> का बीजारोपण किया गया।
              </>
            ) : (
              <>
                For generations, the Siwanchi Jain community felt the absolute need of a centralized pilgrimage sanctuary where our holy walking Monks could find modern barefoot accommodation and local families could coordinate life-milestone ceremonies peacefully. Guided by this altruistic seed, the <strong>Shri Siwanchi Jain Seva Samiti Trust</strong> was formally legislated in 2018.
              </>
            )}
          </p>

          <p className="text-charcoal text-xs sm:text-sm font-bold leading-relaxed">
            {currentLang === 'hi' ? (
              <>
                आज यह परिसर न केवल बाड़मेर जिला बल्कि पूरे राजस्थान के लिए उत्कृष्ट जैन स्थापत्य कला और निस्वार्थ समाज सेवा का एक अभूतपूर्व केन्द्र बन रहा है। यहाँ का 'ओसवाल पैलेस' विवाह आयोजनों के माध्यम से होने वाली आय को पुनः समाज के धार्मिक व लोक कल्याणकारी गतिविधियों में निवेश करता है।
              </>
            ) : (
              <>
                Today, this massive infrastructure stands as a shining beacon of Mewar architectural excellence and community empowerment inside Barmer district, Rajasthan. The net revenue gathered from hosting events at Oswal Palace is immediately reinvested into supporting our continuous religious activities, community welfare schemes, and campus development.
              </>
            )}
          </p>

          {/* Quick core objectives list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { hi: "१००% पारदर्शी वित्तीय लेनदेन", en: "100% Audited Account Cycles" },
              { hi: "साधु-साध्वी विहार अनुकूल सेवा", en: "Monastic Support Protocols" },
              { hi: "समाज का धन समाज हित में", en: "Net Profits Reinvested" },
              { hi: "मकराना संगमरमर जैन जिनालय", en: "Pure White Macrana Jain Temple" }
            ].map((obj, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs text-maroon-700 font-black bg-white p-3 rounded-none border-2 border-charcoal shadow-flat">
                <Check className="w-4 h-4 text-green-700 bg-green-100 border border-charcoal p-0.5" />
                <span>{currentLang === 'hi' ? obj.hi : obj.en}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Story Illustration Frame */}
        <div className="lg:col-span-5 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gold-500/10 rounded-none blur-3xl pointer-events-none"></div>
          
          <div className="p-4 bg-white border-3 border-charcoal rounded-none shadow-flat-lg relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=600" 
              alt="Jain Temple Construction" 
              className="w-full h-80 object-cover border border-charcoal"
            />
            <div className="mt-4 p-4 bg-maroon-700 text-gold-300 rounded-none border-2 border-charcoal shadow-flat text-center">
              <span className="text-lg font-black block tracking-wider font-display">ॐ नमो अरिहंताणं</span>
              <span className="text-[10px] uppercase tracking-widest block mt-1 font-mono">In Service of Jain Monasteries</span>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION A: WHY THIS PROJECT MATTERS */}
      <div className="bg-white border-3 border-charcoal p-8 sm:p-12 shadow-flat-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="space-y-8">
          <div className="text-center md:text-left space-y-2">
            <span className="text-gold-700 text-xs font-black uppercase tracking-widest block font-mono">✦ Divine Need & Vision ✦</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-maroon-850 uppercase tracking-tight">
              {currentLang === 'hi' ? "यह परियोजना क्यों महत्वपूर्ण है?" : "Why This Project Matters"}
            </h2>
            <p className="text-charcoal/70 text-xs font-bold font-mono">FOUR PILLARS OF SELF-SUSTAINABLE JAIN COMMUNITY INFRASTRUCTURE</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: { hi: "साधु-साध्वी विहार अनुकूलन", en: "Sadhu-Sadhvi Vihar Support" },
                desc: { 
                  hi: "कठिन पद-विहार करने वाले पूज्य मुनिराजों व महासतीजी के लिए शुद्ध जल, प्राकृतिक प्रकाश व दोषरहित उपधारा युक्त सुरक्षित विश्राम स्थल की कमी को दूर करना।", 
                  en: "Addressing the critical shortage of safe, custom-designed monastic rest chambers conforming strictly to non-electric and absolute purity directives." 
                },
                icon: "🕊️"
              },
              {
                title: { hi: "आधुनिक जैन समुदाय संरचना", en: "Modern Jain Infrastructure" },
                desc: { 
                  hi: "सिवांची क्षेत्र में तीर्थयात्रियों को उच्च कोटि की वातानुकूलित धर्मशाला, निरंतर शुद्ध पेयजल व सुसज्जित अध्यात्म वाटिका एक ही स्थान पर प्रदान करना।", 
                  en: "Equipping visiting devotees and families from across India with fully air-conditioned rooms, serene upashrays, and round-the-clock hygiene." 
                },
                icon: "🏛️"
              },
              {
                title: { hi: "सांस्कृतिक जैन विवाह स्थल", en: "Jain Wedding Venues" },
                desc: { 
                  hi: "व्यावसायिक रिसॉर्ट्स जैन मूल्यों (मर्यादित सात्विक भोजन, रात्रि भोजन निषेध, जीव हिंसा बचाव) के विरुद्ध काम करते हैं। ओसवाल पैलेस एक शुद्ध जैन-अनुकूल विकल्प देता है।", 
                  en: "Commercial resorts operate against traditional Jain ethics. Oswal Palace offers a grand, customized luxury venue that respects strict Jain values." 
                },
                icon: "🎡"
              },
              {
                title: { hi: "आत्मनिर्भर सामाजिक संस्थाएं", en: "Self-Sustaining Institutions" },
                desc: { 
                  hi: "ओसवाल पैलेस की बुकिंग से होने वाली वित्तीय आय को समाज के धार्मिक कार्यों व भविष्य के विकास में पुनर्निवेशित कर आत्मनिर्भरता स्थापित करना।", 
                  en: "Establishing solid autonomy where campus surpluses continuously fund temple maintenance, social welfare, and future pilgrimage expansions." 
                },
                icon: "💰"
              }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-cream-50 border-2 border-charcoal p-6 block hover:shadow-flat transition-shadow rounded-none">
                <span className="text-4xl block mb-4">{pillar.icon}</span>
                <h3 className="font-sans font-black text-sm text-maroon-800 uppercase tracking-wide mb-2">
                  {currentLang === 'hi' ? pillar.title.hi : pillar.title.en}
                </h3>
                <p className="text-charcoal text-[11px] leading-relaxed font-bold">
                  {currentLang === 'hi' ? pillar.desc.hi : pillar.desc.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEW SECTION B: BHOJANSHALA SPOTLIGHT (OPERATIONAL LIVE) */}
      <div className="bg-maroon-gradient text-white border-3 border-charcoal p-8 sm:p-12 shadow-flat relative overflow-hidden">
        <div className="absolute bottom-[-20px] left-[-20px] w-60 h-60 bg-gold-400/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4 rounded-none border-2 border-charcoal overflow-hidden shadow-flat">
            <img 
              src="https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=400" 
              alt="Adinath Bhojanshala Operational kitchen" 
              className="w-full h-64 object-cover"
            />
          </div>
          
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center space-x-2 bg-gold-400 text-maroon-950 px-3 py-1 text-[10px] font-black uppercase border border-charcoal shadow-flat-sm">
              ✨ {currentLang === 'hi' ? "वर्तमान स्थिति: पूर्णतः क्रियाशील" : "CURRENT STATUS: FULLY OPERATIONAL"}
            </div>
            
            <h3 className="font-display font-black text-2xl sm:text-3xl text-gold-300 uppercase tracking-tight">
              {currentLang === 'hi' ? "श्री आदिनाथ भोजनशाला - निरंतर सेवा" : "Shri Adinath Bhojanshala - Serving Daily"}
            </h3>
            
            <p className="text-cream-50 font-semibold text-xs sm:text-sm leading-relaxed">
              {currentLang === 'hi' ? (
                <>
                  हर्ष का विषय है कि हमारी <strong> भोजनशाला</strong> वर्तमान में पूर्णतः चालू है और यहाँ प्रतिदिन डूंगरी पुरा आने वाले श्रद्धालुओं, नवकारशी तपस्वियों, मुमुक्षुओं एवं साधार्मिक बंधुओं को शुद्ध वस्त्रधारी रसोईयों द्वारा तैयार १००% सात्विक औषधीय भोजन परोसा जा रहा है। यहाँ स्वच्छ जल पियू (Pyau) की भी सुंदर व्यवस्था पूर्ण हो चुकी है।
                </>
              ) : (
                <>
                  We are extremely pleased to highlight that the <strong> Bhojanshala</strong> is fully operational and successfully serving sacred organic Jain meals daily. Adhering to strict traditional codes of wellness, specialized cooks in sacred attire prepare wholesome meals. Complimentary pristine drinking water booths (Pyau) are also active.
                </>
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-center font-mono">
              <div className="bg-maroon-800/80 border border-gold-500/20 p-3">
                <span className="block text-[10px] text-gold-300 font-bold uppercase">{currentLang === 'hi' ? "सुबह नवकारशी" : "Morning Navkarshi"}</span>
                <span className="block text-xs font-black mt-1">08:15 AM - 09:15 AM</span>
              </div>
              <div className="bg-maroon-800/80 border border-gold-500/20 p-3">
                <span className="block text-[10px] text-gold-300 font-bold uppercase">{currentLang === 'hi' ? "दोपहर भोजन" : "Afternoon Prasad"}</span>
                <span className="block text-xs font-black mt-1">11:30 AM - 01:15 PM</span>
              </div>
              <div className="bg-maroon-800/80 border border-gold-500/20 p-3">
                <span className="block text-[10px] text-gold-300 font-bold uppercase">{currentLang === 'hi' ? "चौविहार पूर्व भोजन" : "Chauvihar (Sunset) Meal"}</span>
                <span className="block text-xs font-black mt-1">{currentLang === 'hi' ? "सूर्यास्त से ४८ मिनट पूर्व" : "48 Min Before Sunset"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION C: COMMUNITY IMPACT & REINVESTMENT PHILOSOPHY */}
      <div className="bg-cream-100 border-3 border-charcoal p-8 sm:p-12 shadow-flat grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8 space-y-5">
          <div className="inline-flex items-center space-x-1.5 bg-maroon-700 text-gold-300 px-3 py-1 text-[10px] font-black uppercase border border-charcoal">
            <Landmark className="w-4 h-4 text-gold-400" />
            <span className="font-mono">समाज का पैसा समाज में रहे • Community Reinvestment</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-maroon-900 uppercase tracking-tight">
            {currentLang === 'hi' ? "एक अनूठा वित्तीय चक्र: 'समाज का पैसा समाज में रहे'" : "Our Guiding Oath: 'Samaj ka paisa samaj mein rahe'"}
          </h3>

          <p className="text-charcoal font-bold text-xs sm:text-sm leading-relaxed">
            {currentLang === 'hi' ? (
              <>
                अक्सर हमारे मांगलिक विवाह प्रसंगों में समाज के परिवार भारी मात्रा में धन बाहरी व्यावसायिक होटलों व रिसॉर्ट्स में व्यर्थ खर्च कर देते हैं। वह राशि जैन संस्कारों को ठेस पहुँचाने के साथ ही कभी भी समाज हित में नहीं लग पाती। 
                <br /><br />
                <strong>ओसवाल पैलेस</strong> की स्थापना का मूल ध्येय यही है कि हमारे विवाह समारोह एक ही भव्य, जैन-अनुकूल परिवेश में संपन्न हों। यहाँ से जो भी बुकिंग राशि प्राप्त होगी, उसका एक-एक पैसा पूज्य साधु-साध्वी विहारधाम की वैयावृत्य, जैन मंदिर रख-रखाव, छात्रवृत्ति व समाज सुधार कल्याण के पवित्र कार्यों में पुनर्निवेशित किया जायेगा।
              </>
            ) : (
              <>
                For decades, community families spent exorbitant fortunes booking commercial luxury hotels and resorts for marriages. This capital left our social network forever, frequently endorsing venues violating Jain vegetarianism. 
                <br /><br />
                The baseline philosophy of <strong>Oswal Palace</strong> is to capture this economic potential. By selecting our fully-equipped, modern community wedding venue, you guarantee that 100% of event bookings stay within our system. This capital directly funds traveling monk service teams, temple upkeep, medical support, and future community projects.
              </>
            )}
          </p>

          <div className="border-t border-charcoal/30 pt-4 flex flex-wrap gap-4 text-maroon-800 font-black text-[11px] font-mono uppercase">
            <span>✓ धर्म सुरक्षा (Dharma Protection)</span>
            <span>✓ चिकित्सा सेवा (Healthcare Support)</span>
            <span>✓ तीर्थ संरक्षण (Pilgrimage Guard)</span>
            <span>✓ शिक्षा छात्रवृत्ति (Gyan Sahyog)</span>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white border-2 border-charcoal p-6 text-center space-y-4 shadow-flat">
          <span className="text-5xl block">🔄</span>
          <h4 className="font-sans font-black text-xs text-charcoal uppercase tracking-widest block">{currentLang === 'hi' ? "मर्यादित पुनर्चक्र" : "CIRCULAR SOCIAL ECONOMY"}</h4>
          <blockquote className="text-maroon-850 font-black text-base italic leading-snug">
            {currentLang === 'hi' ? '"समाज का पैसा समाज के उत्थान में"' : '"Funds generated by the Samaj, devoted entirely back to the Samaj."'}
          </blockquote>
        </div>
      </div>

      {/* SECTION 2: Dynamic Milestones Timeline */}
      <div className="bg-cream-105 border-y-3 border-charcoal py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-gold-600 text-xs font-black uppercase tracking-widest block font-mono">The Journey Thus Far</span>
            <h2 className="font-display font-black text-3xl text-maroon-800 uppercase tracking-tight">विकास गाथा: समयरेखा (Timeline)</h2>
            <div className="w-24 h-1 bg-charcoal mx-auto mt-2"></div>
          </div>

          <div className="relative border-l-3 border-charcoal mx-auto max-w-3xl pl-6 sm:pl-10 space-y-12">
            {timelineEvents.map((ev, i) => (
              <div key={i} className="relative group">
                <span className="absolute -left-[37px] sm:-left-[53px] top-1.5 w-6 h-6 rounded-none bg-maroon-700 border-2 border-charcoal flex items-center justify-center text-gold-300 text-[10px] font-black shadow-flat group-hover:bg-gold-500 group-hover:text-maroon-900 transition-colors">
                  {i + 1}
                </span>

                <div className="bg-white border-2 border-charcoal p-5 rounded-none shadow-flat hover:shadow-flat-lg transition-all">
                  <span className="inline-block bg-gold-400 text-maroon-950 font-black text-[10px] px-2.5 py-0.5 rounded-none border border-charcoal mb-2 shadow-flat-sm uppercase tracking-wide font-mono">
                    {ev.year}
                  </span>
                  <h3 className="font-display font-black text-lg text-maroon-800 mb-1 uppercase tracking-tight">
                    {currentLang === 'hi' ? ev.title.hi : ev.title.en}
                  </h3>
                  <p className="text-charcoal text-xs sm:text-sm leading-relaxed font-semibold">
                    {currentLang === 'hi' ? ev.desc.hi : ev.desc.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: Governing Body - Trustees Board */}
      <div id="trustees" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-gold-600 text-xs font-black uppercase tracking-widest block font-mono">Governing Board of Trustees</span>
          <h2 className="font-display font-black text-3xl text-maroon-800 uppercase tracking-tight">मुख्य प्रबंधन कार्यकारिणी एवं ट्रस्टी मंडल</h2>
          <div className="w-24 h-1 bg-charcoal mx-auto mt-2"></div>
        </div>

        {/* Trustees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustees.map((tr) => (
            <div 
              key={tr.id} 
              className="bg-white border-3 border-charcoal rounded-none shadow-flat hover:shadow-flat-lg hover:-translate-y-1 transition-all group relative flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden bg-cream-50 border-b-2 border-charcoal">
                <img 
                  src={tr.photoUrl} 
                  alt={tr.name[currentLang]} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal to-transparent p-4 pt-10 text-white">
                  <span className="text-gold-400 text-[10px] font-black uppercase tracking-widest block font-mono">
                    {tr.designation[currentLang]}
                  </span>
                  <span className="font-display font-black text-base sm:text-lg block mt-0.5">
                    {tr.name[currentLang]}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-charcoal font-bold font-mono uppercase">
                    <MapPin className="w-3.5 h-3.5 text-gold-600 mr-1.5" />
                    <span>{tr.city[currentLang]}</span>
                  </div>

                  <p className="text-charcoal/90 text-xs leading-relaxed italic border-l-2 border-maroon-700 pl-3.5 pt-0.5 relative">
                    <MessageSquare className="w-3 h-3 text-gold-500 absolute -top-1 -left-1 opacity-50" />
                    "{tr.message[currentLang]}"
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-charcoal flex flex-col space-y-2 text-xs font-bold font-mono">
                  <a href={`tel:${tr.phone}`} className="flex items-center text-charcoal hover:text-maroon-700 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-maroon-700 mr-2" />
                    <span>{tr.phone}</span>
                  </a>
                  <a href={`mailto:${tr.email}`} className="flex items-center text-charcoal hover:text-maroon-700 transition-colors truncate">
                    <Mail className="w-3.5 h-3.5 text-maroon-700 mr-2" />
                    <span className="truncate">{tr.email}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

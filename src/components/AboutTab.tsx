/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, Award, MapPin, MessageSquare, History, Check, Heart, Shield, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, Trustee } from '../types';
import { seedTrustees } from '../data';
import templeAboutStone from '../assets/images/temple_about_stone_1781623735251.jpg';

interface AboutTabProps {
  currentLang: Language;
}

export default function AboutTab({ currentLang }: AboutTabProps) {
  const trustees: Trustee[] = seedTrustees;
  
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % trustees.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, trustees.length]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? trustees.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % trustees.length);
  };

  // Timeline events representing correct historical markers
  const timelineEvents = [
    {
      year: "2018",
      title: { hi: "ट्रस्ट की स्थापना और भूमि रजिस्ट्री", en: "Trust Registration & Land Acquisition" },
      desc: { hi: "मेली रोड, मेली गाँव (सिवाना समदड़ी मार्ग) में ४.५ एकड़ पवित्र कृषि भूमि का ट्रस्ट के नाम अधिग्रहण और कानूनी पंजीयन पूर्ण हुआ।", en: "Legally acquired 4.5 acres of highly serene road-touch land at Meli Gaon / Siwana Samdari Road for constructing Vihardham and temple complex." }
    },
    {
      year: "2019",
      title: { hi: "मन्दिर निर्माण का भव्य शिलान्यास", en: "Grand Temple Foundation Stone Laying (Shilanyas)" },
      desc: { hi: "परम पूज्य संतों के पावन आशीर्वाद से मंदिर निर्माण का भूमि पूजन और शिलान्यास पूर्वक प्रथम पत्थर की स्थापना हुई।", en: "Sacred foundation stone laying ceremony (Shilanyas) for the temple completed with the divine blessings of highly revered Jain Saints." }
    },
    {
      year: "2022",
      title: { hi: "भोजनशाला, शिखर ध्वजारोहण व भव्य प्राण प्रतिष्ठा", en: "Bhojanshala, Shikar Dhwaja & Grand Pratistha" },
      desc: { hi: "शान्ताबाय जैन भोजनशाला का शुभारंभ, शिखरबद्ध मन्दिर का शिखर ध्वजारोहण तथा मंगल प्राण प्रतिष्ठा महामहोत्सव सफलतापूर्वक संपन्न हुआ।", en: "Inauguration of the pure Shantaba Bhojanshala kitchen system, alongside Shikar Dhwaja hoisting and grand temple idol Pratistha rituals." }
    },
    {
      year: "2026",
      title: { hi: "विहारधाम बुकिंग प्रारंभ (अभी बुक करें)", en: "Vihardham Bookings Officially Open" },
      desc: { hi: "साधु-साध्वी विहारधाम एवं धर्मशाला के २० सुसज्जित कमरों व ४ विशाल हॉलों की बुकिंग श्रद्धालुओं एवं यात्रियों हेतु सफलतापूर्वक प्रारंभ कर दी गई है।", en: "Online/offline bookings for Vihardham's 20 luxurious guest rooms and 4 spacious halls have officially opened for all patrons." }
    },
    {
      year: "2026",
      title: { hi: "ओसवाल पैलेस की भव्य पूर्णता (वर्ष के अंत तक)", en: "Oswal Palace Scheduled Completion (By End of 2026)" },
      desc: { hi: "अत्याधुनिक सर्वसुविधायुक्त सामुदायिक उत्सव भवन 'ओसवाल पैलेस' का निर्माण कार्य वर्ष २०२६ के अंत तक पूर्ण हो जाएगा।", en: "The construction of highly detailed, air-cooled grand Oswal Palace wedding hall with guest suites is scheduled for full completion by late 2026." }
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
                श्री सिवांची जैन समाज के इतिहास में मेली गाँव (सिवाना समदड़ी मार्ग) की पावन धरा पर एक ऐसे केन्द्र की कमी सदैव महसूस की जाती थी जहाँ हमारे पूज्य साधु-साध्वी विहार के दौरान विश्राम कर सकें और समाज के परिवार अपने मांगलिक प्रसंगों को एक ही परिसर में संस्कारी वातावरण में मना सकें। इसी लक्ष्य के साथ सन् २०१८ में वरिष्ठ समाजसेवियों के मार्गदर्शन में <strong>श्री सिवांची जैन सेवा समिति ट्रस्ट</strong> का बीजारोपण किया गया।
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
              src={templeAboutStone} 
              alt="Jain Temple Construction" 
              className="w-full h-80 object-cover border border-charcoal"
              referrerPolicy="no-referrer"
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
                title: { hi: "सांस्कृतिक विवाह स्थल", en: "Cultural Wedding Venues" },
                desc: { 
                  hi: "व्यावसायिक रिसॉर्ट्स पारंपरिक मूल्यों (मर्यादित सात्विक भोजन, जीव हिंसा बचाव) के विरुद्ध काम करते हैं। ओसवाल पैलेस एक शुद्ध एवं अनुकूल विकल्प देता है।", 
                  en: "Commercial resorts operate against traditional values. Oswal Palace offers a grand, customized luxury venue that respects strict cultural values." 
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
                अक्सर हमारे मांगलिक विवाह प्रसंगों में समाज के परिवार भारी मात्रा में धन बाहरी व्यावसायिक होटलों व रिसॉर्ट्स में व्यर्थ खर्च कर देते हैं। वह राशि हमारे पारंपरिक संस्कारों को ठेस पहुँचाने के साथ ही कभी भी समाज हित में नहीं लग पाती। 
                <br /><br />
                <strong>ओसवाल पैलेस</strong> की स्थापना का मूल ध्येय यही है कि हमारे विवाह समारोह एक भव्य एवं अनुकूल परिवेश में संपन्न हों। यहाँ से जो भी बुकिंग राशि प्राप्त होगी, उसका एक-एक पैसा समाज में ही रहेगा और पूर्ण रूप से समाज के विकास तथा समाज हित के कल्याणकारी कार्यों में उपयोग किया जाएगा।
              </>
            ) : (
              <>
                For decades, community families spent exorbitant fortunes booking commercial luxury hotels and resorts for marriages. This capital left our social network forever, frequently endorsing venues violating traditional values. 
                <br /><br />
                The baseline philosophy of <strong>Oswal Palace</strong> is to capture this economic potential. By selecting our fully-equipped, modern community wedding venue, you guarantee that 100% of event bookings stay within our community and are utilized entirely for overall community development and welfare benefits.
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
          <p className="text-xs text-charcoal font-semibold mt-1">Our governing board members guide the mission with volunteer stewardship and financial devotion.</p>
          <div className="w-24 h-1 bg-charcoal mx-auto mt-2"></div>
        </div>

        {/* Big Interactive Slider without Photos */}
        <div 
          className="relative bg-white border-3 border-charcoal p-8 sm:p-14 shadow-flat-lg flex flex-col justify-between items-center text-center overflow-hidden min-h-[380px] group transition-all"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Big decorative quote marks in background */}
          <span className="absolute -top-3 left-4 text-maroon-750/5 text-[150px] sm:text-[200px] font-serif select-none pointer-events-none font-bold">
            “
          </span>
          <span className="absolute -bottom-24 right-4 text-maroon-750/5 text-[150px] sm:text-[200px] font-serif select-none pointer-events-none font-bold">
            ”
          </span>

          {/* Previous/Next Manual Side Buttons */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white border-2 border-charcoal hover:bg-gold-400 text-maroon-900 transition-all flex items-center justify-center cursor-pointer shadow-flat-sm active:translate-y-[-48%] active:shadow-none z-10"
            aria-label="Previous Trustee"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white border-2 border-charcoal hover:bg-gold-400 text-maroon-900 transition-all flex items-center justify-center cursor-pointer shadow-flat-sm active:translate-y-[-48%] active:shadow-none z-10"
            aria-label="Next Trustee"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Content wrapper */}
          <div className="w-full max-w-4xl mx-auto space-y-6 px-4 py-2 animate-fade-in">
            {/* Designation & City Badge Row */}
            <div className="flex flex-wrap justify-center items-center gap-2.5">
              <span className="px-3.5 py-1 bg-maroon-800 text-gold-300 font-extrabold text-[10px] sm:text-xs uppercase border border-charcoal shadow-flat-sm font-mono tracking-wider">
                {trustees[activeIdx].designation[currentLang]}
              </span>
              <span className="px-3 py-1 bg-cream-50 border border-charcoal/30 text-[10px] sm:text-xs text-charcoal font-black uppercase font-mono tracking-wide flex items-center shadow-flat-sm">
                <MapPin className="w-3.5 h-3.5 text-gold-600 mr-1" />
                {trustees[activeIdx].city[currentLang]}
              </span>
            </div>

            {/* Quote / Personal Message */}
            <blockquote className="text-charcoal font-semibold text-lg sm:text-xl lg:text-2xl leading-relaxed italic max-w-3xl mx-auto block py-4 text-maroon-950 font-display">
              "{trustees[activeIdx].message[currentLang]}"
            </blockquote>

            {/* Trustee Name */}
            <div className="border-t-2 border-dashed border-gold-400/50 pt-5 max-w-xl mx-auto">
              <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-maroon-850 uppercase tracking-tight">
                {trustees[activeIdx].name[currentLang]}
              </h3>
              <p className="text-[10px] text-charcoal/50 uppercase tracking-widest font-mono mt-1">श्री सिवांची जैन सेवा समिति ट्रस्ट मंडल • Pune / Rajasthan</p>
            </div>

            {/* Quick action Contacts */}
            {(trustees[activeIdx].phone || trustees[activeIdx].email) && (
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-mono text-xs font-black">
                {trustees[activeIdx].phone && (
                  <a 
                    href={`tel:${trustees[activeIdx].phone}`} 
                    className="flex items-center bg-white border-2 border-charcoal hover:bg-gold-350 text-charcoal hover:text-maroon-950 px-4 py-2 shadow-flat-sm transition-all"
                  >
                    <Phone className="w-4 h-4 text-maroon-700 mr-2" />
                    <span>{trustees[activeIdx].phone}</span>
                  </a>
                )}
                {trustees[activeIdx].email && (
                  <a 
                    href={`mailto:${trustees[activeIdx].email}`} 
                    className="flex items-center bg-white border-2 border-charcoal hover:bg-gold-350 text-charcoal hover:text-maroon-950 px-4 py-2 shadow-flat-sm transition-all truncate max-w-xs"
                  >
                    <Mail className="w-4 h-4 text-maroon-700 mr-2" />
                    <span className="truncate">{trustees[activeIdx].email}</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-1.5 mt-8 flex-wrap">
            {trustees.map((tr, idx) => (
              <button
                key={tr.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`w-3.5 h-3.5 border-2 border-charcoal transition-all cursor-pointer ${
                  idx === activeIdx 
                    ? 'bg-maroon-800 w-7' 
                    : 'bg-white hover:bg-gold-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Directory Navigator (shows all names so user can jump directly or see "every name" at a glance) */}
        <div className="mt-6 bg-cream-50/50 border-2 border-charcoal p-4 group">
          <div className="text-center md:text-left mb-3">
            <h4 className="font-display font-black text-xs sm:text-sm text-maroon-800 uppercase tracking-wide">
              {currentLang === 'hi' ? "त्वरित चयन निर्देशिका: सभी ट्रस्टीगण" : "Quick Selection Directory: All Trustees"}
            </h4>
            <p className="text-[10px] text-charcoal/60 font-semibold">Click any name below to view their message above.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {trustees.map((tr, idx) => (
              <button
                key={tr.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`p-2.5 border text-left rounded-none cursor-pointer transition-all ${
                  idx === activeIdx
                    ? 'bg-gold-400 border-charcoal text-maroon-950 font-black shadow-flat-sm'
                    : 'bg-white border-charcoal/20 hover:border-charcoal hover:bg-cream-50 text-charcoal font-semibold'
                }`}
              >
                <span className="block text-[11px] font-bold line-clamp-1 leading-snug">
                  {tr.name[currentLang]}
                </span>
                <span className="block text-[9px] text-maroon-700 font-mono tracking-wider uppercase font-semibold mt-0.5">
                  {tr.designation[currentLang].split('(')[0].trim()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

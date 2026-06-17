/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, Calendar, ShieldCheck, Award, Eye, Play, Sparkles } from 'lucide-react';
import { Language, SlideshowImage } from '../types';
import { staticTranslations } from '../data';
// @ts-ignore
import campusPanoramicLayout from '../assets/images/campus_panoramic_layout_1781257618429.jpg';

interface HeroProps {
  currentLang: Language;
  onNavigate: (tabId: string) => void;
  onOpenVideoModal: () => void;
  slideshowImages?: SlideshowImage[];
}

export default function Hero({ currentLang, onNavigate, onOpenVideoModal, slideshowImages = [] }: HeroProps) {
  const t = staticTranslations[currentLang];

  const fallbackSlides: SlideshowImage[] = [
    {
      id: 'default_col',
      url: campusPanoramicLayout,
      title: { hi: "विहारधाम जैन मंदिर एवं ओसवाल पैलेस संकुल", en: "Vihardham Jain Temple & Oswal Palace Complex" },
      caption: { hi: "मेली गाँव (सिवाना समदड़ी मार्ग) जैन मंदिर संकुल का विहंगम दृश्य - अध्यात्म एवं संस्कृति का संगम", en: "Panoramic layout overview of the divine spiritual and wedding venue campus" }
    }
  ];

  const slides = slideshowImages && slideshowImages.length > 0 ? slideshowImages : fallbackSlides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play interval
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  const handleNextSlide = () => {
    if (slides.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 200); // short fade out/in delay
  };

  const handlePrevSlide = () => {
    if (slides.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 200);
  };
  
  // Custom statistics counter variables
  const stats = [
    { value: '12 Acres', label: t.statArea, icon: '🏛️' },
    { value: '250+', label: currentLang === 'hi' ? '250+ लाभार्थी परिवार' : '250+ labharthi families', icon: '📜' },
    { value: '600+', label: currentLang === 'hi' ? '600+ लोगों के लिए बेड सहित सुविधा' : '600+ people bed sahit suvidha', icon: '🛏️' }
  ];

  return (
    <section className="bg-cream-50 relative overflow-hidden">
      {/* Decorative stark border divider */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-charcoal z-10"></div>

      {/* Hero Section Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 lg:pt-16 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Slogan & CTAs (Left Columns) */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center space-x-2 bg-maroon-50ed border-2 border-charcoal px-3 py-1.5 rounded-none text-maroon-700 font-black text-xs uppercase tracking-widest shadow-flat">
              <Sparkles className="w-4 h-4 text-gold-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>श्री सिवांची जैन समाज गौरव</span>
            </div>
            
            <h1 className="font-display leading-tight uppercase select-none space-y-2">
              {currentLang === 'hi' ? (
                <div className="space-y-2.5">
                  <span className="block text-maroon-700 font-sans font-extrabold text-lg sm:text-xl lg:text-2.5xl tracking-wide">
                    🚩 राजस्थान की धन्य धरा पर, नाकोड़ा तीर्थ के समीप,
                  </span>
                  <span className="block text-charcoal font-black text-2xl sm:text-3xl lg:text-[2.2rem] leading-snug">
                    गढ़ सिवाना एवं समदड़ी के मध्य विकसित हो रहा
                  </span>
                  <span className="inline-block text-3xl sm:text-4.5xl lg:text-5xl font-black text-maroon-900 border-b-4 border-gold-500 pb-1 mt-1 font-display">
                    विहारधाम एवं ओसवाल पैलेस
                  </span>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <span className="block text-maroon-700 font-sans font-extrabold text-xs sm:text-sm lg:text-base tracking-widest uppercase">
                    🚩 On the Holy Land of Rajasthan, near Nakoda Teerth,
                  </span>
                  <span className="block text-charcoal font-black text-xl sm:text-2xl lg:text-3xl leading-snug">
                    Developing between Gadh Siwana & Samdari:
                  </span>
                  <span className="inline-block text-2.5xl sm:text-3.5xl lg:text-4xl font-black text-maroon-900 border-b-4 border-gold-500 pb-1 mt-1 font-display">
                    Vihardham & Oswal Palace Complex
                  </span>
                </div>
              )}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-maroon-900 font-extrabold font-sans text-xs sm:text-sm uppercase bg-gold-100 hover:bg-gold-200 transition-colors border-2 border-charcoal px-4 py-2 shadow-flat-sm w-fit">
              {currentLang === 'hi' ? "धर्म • सेवा • समाज • संस्कार" : "Dharma • Seva • Samaj • Sanskar"}
            </div>

            <p className="text-charcoal text-sm sm:text-base font-extrabold leading-relaxed max-w-2xl font-sans text-left border-l-4 border-gold-500 pl-3">
              {currentLang === 'hi' 
                ? "जैन समाज के लिए एक आधुनिक आध्यात्मिक एवं सामाजिक विरासत" 
                : "A modern spiritual and social heritage for the divine Jain community"}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-4">
              <button
                onClick={() => onNavigate('donations')}
                className="bg-maroon-gradient border-3 border-charcoal text-gold-300 font-black px-7 py-3 rounded-none hover:bg-gold-gradient hover:text-maroon-950 transition-all shadow-flat hover:shadow-gold-flat flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <Heart className="w-5 h-5 text-current group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-wider text-xs">{t.donateNow}</span>
                <ArrowRight className="w-4 h-4 text-current transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('vihardham')}
                className="bg-white border-3 border-charcoal text-maroon-800 font-black px-7 py-3 rounded-none hover:bg-cream-100 hover:shadow-flat transition-all shadow-flat flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span className="uppercase tracking-wider text-xs">{t.bookRoom}</span>
              </button>

              <button
                onClick={() => onNavigate('palace')}
                className="bg-gold-400 border-3 border-charcoal text-charcoal font-black px-5 py-3 rounded-none hover:bg-gold-300 transition-all shadow-flat flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span className="uppercase tracking-wider text-xs">🏰 {t.bookPalace}</span>
              </button>
            </div>

            {/* Micro Badges with high-contrast mono labels */}
            <div className="flex flex-wrap gap-y-2 gap-x-5 pt-6 border-t-2 border-charcoal text-[11px] text-maroon-800 font-extrabold uppercase tracking-widest font-sans">
              <span className="flex items-center">⭐ 100% Shuddh Dharma Seva</span>
              <span className="flex items-center">🕊️ Ahimsa Paramo Dharmah</span>
            </div>
          </div>

          {/* Gorgeous Campus Visual Representation (Right Columns) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 select-none">
            {/* Ambient gold rings behind the main frame */}
            <div className="absolute -top-10 -left-10 w-44 h-44 rounded-none border-2 border-charcoal/5 bg-gold-400/5 pointer-events-none animate-pulse"></div>

            {/* Immersive interactive visual frame of slideshow */}
            <div className="relative border-4 border-charcoal rounded-none overflow-hidden shadow-flat-lg divine-border group bg-cream-100 flex flex-col">
              {/* Slider image wrapped in a container that supports smooth transitions */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <img 
                  src={slides[currentIndex]?.url || campusPanoramicLayout} 
                  alt={slides[currentIndex]?.title[currentLang] || "Vihardham Campus Layout"} 
                  className={`w-full h-full object-cover object-center transition-all duration-300 ${isTransitioning ? 'opacity-30 scale-98' : 'opacity-100 scale-100'}`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = campusPanoramicLayout;
                  }}
                />
                
                {/* Visual gradient overlay for text readability at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 pt-10">
                  <div className={`transition-all duration-300 ${isTransitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <h3 className="text-gold-300 font-display font-black text-xs sm:text-sm uppercase tracking-wider drop-shadow-md line-clamp-1">
                      {slides[currentIndex]?.title[currentLang]}
                    </h3>
                    {slides[currentIndex]?.caption?.[currentLang] && (
                      <p className="text-white text-[10px] sm:text-xs font-semibold leading-relaxed font-sans drop-shadow mt-0.5 line-clamp-2">
                        {slides[currentIndex]?.caption?.[currentLang]}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows for Slideshow - visible only on hover on desktop, always visible on mobile */}
              {slides.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevSlide}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-gold-400 text-maroon-900 border-2 border-charcoal w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:scale-105 active:scale-95 shadow-flat-sm z-20"
                    aria-label="Previous slide"
                  >
                    <span className="font-mono text-base font-black">‹</span>
                  </button>
                  
                  <button 
                    onClick={handleNextSlide}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-gold-400 text-maroon-900 border-2 border-charcoal w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:scale-105 active:scale-95 shadow-flat-sm z-20"
                    aria-label="Next slide"
                  >
                    <span className="font-mono text-base font-black">›</span>
                  </button>
                </>
              )}

              {/* Dynamic bottom pagination indicators - dots */}
              {slides.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-20 bg-black/45 px-2 py-1 rounded-full border border-white/10">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setCurrentIndex(idx);
                          setIsTransitioning(false);
                        }, 200);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === idx ? 'w-4 bg-gold-400 border border-charcoal' : 'w-1.5 bg-white/60 hover:bg-white'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Interactive floating label */}
            <div className="absolute top-4 right-4 bg-maroon-800 text-gold-300 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-none border-2 border-charcoal shadow-flat z-10">
              🚧 Campus Slider
            </div>
          </div>
        </div>

        {/* Vision & Mission Snapshot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-12 border-t-3 border-charcoal">
          <div className="bg-white border-3 border-charcoal p-6 rounded-none shadow-flat hover:shadow-flat-lg transition-all relative">
            <div className="h-10 w-10 flex items-center justify-center bg-maroon-50ed rounded-none border-2 border-charcoal shadow-flat-sm text-xl font-bold mb-4">
              🎯
            </div>
            <h3 className="font-display font-black text-xl text-maroon-800 mb-2 uppercase">
              {t.visionTitle}
            </h3>
            <p className="text-charcoal text-xs sm:text-sm font-semibold leading-relaxed">
              {t.visionDesc}
            </p>
          </div>

          <div className="bg-white border-3 border-charcoal p-6 rounded-none shadow-flat hover:shadow-flat-lg transition-all relative">
            <div className="h-10 w-10 flex items-center justify-center bg-gold-400/10 rounded-none border-2 border-charcoal shadow-flat-sm text-gold-600 text-xl font-bold mb-4">
              🤝
            </div>
            <h3 className="font-display font-black text-xl text-maroon-800 mb-2 uppercase">
              {t.missionTitle}
            </h3>
            <p className="text-charcoal text-xs sm:text-sm font-semibold leading-relaxed">
              {t.missionDesc}
            </p>
          </div>
        </div>

        {/* Statistics Banner with decorative borders */}
        <div className="mt-16 bg-[#5D161F] border-4 border-charcoal rounded-none p-6 sm:p-10 shadow-flat-lg relative overflow-hidden">
          {/* Subtle elegant pattern details */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 text-center mb-8">
            <div className="text-[10px] uppercase tracking-[0.25em] font-black text-gold-300 mb-2 flex items-center justify-center space-x-2">
              <span className="h-0.5 w-6 bg-gold-400"></span>
              <span>ESTD 2026</span>
              <span className="h-0.5 w-6 bg-gold-400"></span>
            </div>
            
            <h2 className="font-display font-black text-2xl sm:text-3.5xl text-gold-400 uppercase tracking-tight drop-shadow-md">
              {t.statsTitle}
            </h2>
            
            <div className="flex items-center justify-center space-x-1.5 mt-2">
              <span className="text-gold-500 font-bold text-xs">♦</span>
              <span className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                {currentLang === 'hi' ? "गौरवशाली धरोहर एवं आधुनिक निर्माण के आंकड़े" : "A Glorious Heritage in Real-Time Figures"}
              </span>
              <span className="text-gold-500 font-bold text-xs">♦</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center bg-[#430C12] border-2 border-gold-400 hover:border-gold-300 p-6 sm:p-8 rounded-none transition-all duration-300 transform hover:-translate-y-1.5 active:translate-y-0 hover:shadow-flat shadow-flat-sm relative group overflow-hidden"
              >
                {/* Decorative golden corner markers */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-gold-400/40"></div>
                <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-gold-400/40"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-gold-400/40"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-gold-400/40"></div>
                
                {/* Background glowing layer on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>

                {/* Icon block with glowing ring */}
                <div className="w-14 h-14 bg-gradient-to-b from-[#7F1D1D] to-[#450A0A] rounded-full border-2 border-gold-400/80 group-hover:border-gold-300 flex items-center justify-center text-2xl shadow-inner mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>

                {/* Big number counter text */}
                <span className="text-3.5xl sm:text-4.5xl font-black text-white tracking-tight font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] group-hover:text-gold-100 transition-colors duration-300">
                  {stat.value}
                </span>

                {/* Elegant separator rule */}
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-gold-400/50 to-transparent my-3.5 mx-auto"></div>

                {/* Label text */}
                <span className="text-gold-300 text-xs sm:text-sm uppercase font-extrabold tracking-wider leading-snug drop-shadow min-h-[2.5rem] flex items-center justify-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}

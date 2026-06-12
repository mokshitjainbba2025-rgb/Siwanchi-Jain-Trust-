/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Heart, Calendar, ShieldCheck, Award, Eye, Play, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { staticTranslations } from '../data';
// @ts-ignore
import campusPanoramicLayout from '../assets/images/campus_panoramic_layout_1781257618429.jpg';

interface HeroProps {
  currentLang: Language;
  onNavigate: (tabId: string) => void;
  onOpenVideoModal: () => void;
}

export default function Hero({ currentLang, onNavigate, onOpenVideoModal }: HeroProps) {
  const t = staticTranslations[currentLang];
  
  // Custom statistics counter variables
  const stats = [
    { value: '4.5 Acres', label: t.statArea, icon: '🏛️' },
    { value: '75+ Rooms', label: t.statRooms, icon: '🏨' },
    { value: '1,200+', label: t.statDonors, icon: '📜' },
    { value: '50+ Yearly', label: t.statEvents, icon: '🎉' },
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
              <span>श्री सीवांशी जैन समाज गौरव</span>
            </div>
            
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-maroon-800 tracking-tight leading-tight uppercase">
              {currentLang === 'hi' ? (
                <>
                  धर्म, सेवा और <br />
                  <span className="text-gold-500 underline decoration-charcoal decoration-4 underline-offset-4">समाज का महा पावन</span> संगम
                </>
              ) : (
                <>
                  A Sacred Home for <br />
                  <span className="text-gold-500 underline decoration-charcoal decoration-4 underline-offset-4">Dharma, Community</span> & Future
                </>
              )}
            </h1>

            <p className="text-charcoal text-sm sm:text-base font-bold leading-relaxed max-w-2xl">
              {t.trustDescription}
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
            <div className="flex flex-wrap gap-y-2 gap-x-5 pt-6 border-t-2 border-charcoal text-xs text-charcoal font-black font-mono uppercase tracking-wider">
              <span className="flex items-center"><ShieldCheck className="w-4 h-4 text-green-700 mr-1.5" /> Govt 80G Exempted</span>
              <span className="flex items-center"><Award className="w-4 h-4 text-gold-650 mr-1.5" /> Reg No. E/1802</span>
            </div>
          </div>

          {/* Gorgeous Campus Visual Representation (Right Columns) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Ambient gold rings behind the main frame */}
            <div className="absolute -top-10 -left-10 w-44 h-44 rounded-none border-2 border-charcoal/5 bg-gold-400/5 pointer-events-none animate-pulse"></div>

            {/* Immersive interactive visual frame */}
            <div className="relative border-4 border-charcoal rounded-none overflow-hidden shadow-flat-lg divine-border group">
              <img 
                src={campusPanoramicLayout} 
                alt="Shri Adinath Jain Mandir Dungri Pura Campus Layout" 
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 animate-fade-in"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Interactive floating label */}
            <div className="absolute top-4 right-4 bg-maroon-800 text-gold-300 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-none border-2 border-charcoal shadow-flat">
              🚧 Construction 90% Complete
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
        <div className="mt-16 bg-maroon-gradient border-3 border-charcoal rounded-none p-6 sm:p-8 shadow-flat-lg">
          <h2 className="text-center font-display font-black text-gold-400 text-xs uppercase tracking-widest mb-6 font-mono">
            ✨ {t.statsTitle} ✨
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center bg-black/20 p-4 border-2 border-charcoal shadow-flat-sm">
                <span className="text-3xl mb-1.5">{stat.icon}</span>
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight font-mono">{stat.value}</span>
                <span className="text-gold-300 text-[10px] uppercase font-bold tracking-wider mt-1 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}

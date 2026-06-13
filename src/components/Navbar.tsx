/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu, X, Globe, Shield, Heart } from 'lucide-react';
import { Language } from '../types';
import { staticTranslations } from '../data';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ currentLang, setLang, activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = staticTranslations[currentLang];

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'vihardham', label: t.vihardham },
    { id: 'palace', label: t.oswalPalace },
    { id: 'vatsalya', label: t.vatsalyaDham },
    { id: 'donations', label: t.donations },
    { id: 'donorwall', label: t.donorWall },
    { id: 'gallery', label: t.gallery },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-cream-50 border-b-3 border-charcoal shadow-flat">
      {/* Top Notification bar with high-fidelity status and location */}
      <div className="bg-maroon-700 text-gold-300 text-xs py-1.5 px-4 flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0 border-b border-charcoal">
        <div className="flex items-center space-x-2 font-bold font-mono">
          <span className="inline-block w-2.5 h-2.5 bg-green-400 border border-charcoal"></span>
          <span className="uppercase">📍 {t.location}</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="tel:+919426055667" className="hover:text-white transition-colors font-bold font-mono">📞 +91 9822538635</a>
          <button 
            onClick={() => handleNavClick('admin')}
            className={`flex items-center space-x-1 hover:text-white font-black flex-row text-[10px] uppercase px-2 py-0.5 rounded-none border-2 border-charcoal bg-maroon-800 shadow-flat-sm cursor-pointer transition-transform hover:translate-y-[-1px] ${activeTab === 'admin' ? 'text-white bg-gold-600/30' : ''}`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Control Portal</span>
          </button>
        </div>
      </div>

      {/* Main header block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Trust Title */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group shrink-0"
          >
            {/* Jain Symbol / Kalash Icon */}
            <div className="w-12 h-12 rounded-none bg-maroon-700 flex items-center justify-center border-3 border-charcoal shadow-flat group-hover:-translate-y-0.5 transition-transform shrink-0">
              <span className="text-gold-400 text-2xl font-bold leading-none">🪔</span>
            </div>
            <div className="max-w-[190px] sm:max-w-[240px] md:max-w-xs xl:max-w-sm">
              <h1 className="text-maroon-700 font-display font-black text-sm sm:text-base xl:text-lg leading-tight tracking-tight group-hover:text-maroon-850 transition-colors">
                {t.trustName}
              </h1>
              <p className="text-gold-600 text-[8px] sm:text-[9px] xl:text-[10px] font-black uppercase tracking-widest block whitespace-nowrap overflow-hidden text-ellipsis">
                {t.trustTagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden 2xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-all cursor-pointer font-black uppercase tracking-wider border-2 ${
                  activeTab === item.id
                    ? 'bg-maroon-700 text-gold-300 border-charcoal shadow-flat scale-[0.98]'
                    : 'text-charcoal border-transparent hover:border-charcoal hover:bg-gold-300/10'
                } text-[10px] px-1.5 py-1 2xl:text-xs 2xl:px-3 2xl:py-1.5`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls: Language Selection + Donation CTA */}
          <div className="hidden lg:flex items-center space-x-2 2xl:space-x-4 shrink-0">
            {/* Bilingual toggle widget */}
            <div className="flex items-center bg-cream-100 border-2 border-charcoal p-0.5 2xl:p-1 rounded-none shadow-flat">
              <Globe className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-maroon-700 mr-1 ml-0.5" />
              <button
                onClick={() => setLang('hi')}
                className={`px-1.5 py-0.5 2xl:px-2 2xl:py-1 text-[10px] 2xl:text-xs font-black rounded-none cursor-pointer ${
                  currentLang === 'hi'
                    ? 'bg-maroon-700 text-white border border-charcoal shadow-flat-sm'
                    : 'text-charcoal hover:text-maroon-700'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 2xl:px-2 2xl:py-1 text-[10px] 2xl:text-xs font-black rounded-none cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-maroon-700 text-white border border-charcoal shadow-flat-sm'
                    : 'text-charcoal hover:text-maroon-700'
                }`}
              >
                EN
              </button>
            </div>

            {/* Quick Donation CTA Button */}
            <button
              onClick={() => handleNavClick('donations')}
              className="bg-maroon-gradient text-gold-300 font-extrabold px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-none border-2 border-charcoal hover:bg-gold-gradient hover:text-maroon-950 transition-all shadow-flat flex items-center space-x-1 2xl:space-x-1.5 cursor-pointer hover:shadow-gold-flat text-[10px] 2xl:text-xs"
            >
              <Heart className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-current animate-pulse shrink-0" />
              <span className="uppercase tracking-wider font-black whitespace-nowrap">{t.donateNow}</span>
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <div className="2xl:hidden flex items-center space-x-3">
            {/* Quick Lang Switcher for mobile */}
            <button
               onClick={() => setLang(currentLang === 'en' ? 'hi' : 'en')}
              className="lg:hidden p-2 border-2 border-charcoal rounded-none bg-cream-100 text-maroon-700 text-xs font-black flex items-center space-x-1 shadow-flat"
            >
              <Globe className="w-4.5 h-4.5" />
              <span>{currentLang === 'en' ? 'हिं' : 'EN'}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-none bg-cream-100 text-maroon-700 border-2 border-charcoal hover:bg-gold-400/10 transition-colors shadow-flat"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className="2xl:hidden bg-cream-100 border-t-3 border-charcoal px-4 pt-2 pb-6 space-y-2.0 block shadow-flat-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 text-sm font-black uppercase tracking-wider rounded-none border-2 transition-colors ${
                activeTab === item.id
                  ? 'bg-maroon-700 text-gold-300 border-charcoal shadow-flat'
                  : 'text-charcoal border-transparent hover:border-charcoal hover:bg-gold-200/50 hover:text-maroon-700'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t-2 border-charcoal flex flex-col space-y-3 px-2">
            <button
              onClick={() => handleNavClick('donations')}
              className="w-full bg-maroon-gradient text-gold-300 font-black px-4 py-3 rounded-none border-2 border-charcoal shadow-flat hover:bg-gold-500 hover:text-maroon-900 text-center transition-all flex justify-center items-center space-x-2"
            >
              <Heart className="w-4 h-4 text-current animate-pulse" />
              <span className="uppercase">{t.donateNow}</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full flex items-center justify-center space-x-2 border-2 border-charcoal bg-maroon-800 text-white font-black py-2.5 rounded-none text-xs uppercase shadow-flat cursor-pointer ${activeTab === 'admin' ? 'bg-gold-500/20' : ''}`}
            >
              <Shield className="w-4 h-4" />
              <span>Admin Control Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

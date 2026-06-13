/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, Video, Sparkles, SlidersHorizontal, Image, Maximize2, X, PlusCircle } from 'lucide-react';
import { Language, GalleryItem } from '../types';
import ProjectVideoPlayer from './ProjectVideoPlayer';

interface GalleryVideosTabProps {
  currentLang: Language;
  galleryItems: GalleryItem[];
}

export default function GalleryVideosTab({ currentLang, galleryItems }: GalleryVideosTabProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Drone' | 'Temple' | 'Construction' | 'Oswal Palace' | 'Samaj Events'>('All');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedPhotoTitle, setSelectedPhotoTitle] = useState<string>('');

  // 1. Filter by categories: All vs Specific tags
  const filteredByCategory = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  // 2. Filter by media types: All vs Photos vs Videos
  const finalFilteredItems = mediaTypeFilter === 'all'
    ? filteredByCategory
    : filteredByCategory.filter(item => item.type === mediaTypeFilter);

  const categoriesSet: { id: typeof activeFilter; labelHi: string; labelEn: string }[] = [
    { id: 'All', labelHi: 'सभी अनुभाग', labelEn: 'All Sections' },
    { id: 'Temple', labelHi: 'मुख्य जिनालय', labelEn: 'Main Temple' },
    { id: 'Construction', labelHi: 'विहारधाम एवं धर्मशाला', labelEn: 'Vihardham Stays' },
    { id: 'Oswal Palace', labelHi: 'ओसवाल पैलेस परिसर', labelEn: 'Oswal Palace' },
    { id: 'Drone', labelHi: 'ड्रोन एरियल', labelEn: 'Aerial Drone' },
    { id: 'Samaj Events', labelHi: 'सामुदायिक महोत्सव', labelEn: 'Community Events' }
  ];

  // Extraction of YouTube Video ID helper
  const getYTIdFromUrl = (url: string) => {
    try {
      if (url.includes('/embed/')) {
        return url.split('/embed/')[1]?.split('?')[0] || '';
      }
      if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1]?.split('?')[0] || '';
      }
      if (url.includes('v=')) {
        return url.split('v=')[1]?.split('&')[0] || '';
      }
      return '';
    } catch {
      return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-maroon-50ed text-maroon-700 font-extrabold px-3 py-1.5 rounded-none border-2 border-charcoal text-xs uppercase shadow-flat font-mono tracking-widest">
          <Sparkles className="w-4.5 h-4.5 text-gold-500" />
          <span>Darshan & Campus Visual Gallery</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-maroon-850 uppercase tracking-tight">
          {currentLang === 'hi' ? "परिसर गैलरी एवं वीडियो दर्शन" : "Gallery & Videos Media Room"}
        </h1>
        <p className="text-charcoal text-xs sm:text-sm font-bold leading-relaxed">
          {currentLang === 'hi' 
            ? "घर बैठे डूंगरी पुरा नवनिर्मित शिखरबद्ध जैन मंदिर, विहारधाम और ओसवाल पैलेस की मनमोहक तस्वीरें व ड्रोन टूर देखें।"
            : "Explore beautiful visual memories, aerial drone video tours, and snapshots of our newly inaugurated holy pilgrimage center."}
        </p>
        <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-2"></div>
      </div>

      {/* FILTER CONTROL PANEL */}
      <div className="bg-white border-3 border-charcoal p-5 rounded-none shadow-flat space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Media Type Filter (Photos / Videos / All) */}
          <div className="flex bg-cream-100 border-2 border-charcoal p-1 rounded-none shadow-flat-sm w-full md:w-auto font-mono text-xs uppercase font-black">
            <button
              onClick={() => setMediaTypeFilter('all')}
              className={`flex-1 md:flex-initial px-4 py-2 flex items-center justify-center space-x-1.5 cursor-pointer rounded-none border-2 transition-transform ${
                mediaTypeFilter === 'all' 
                  ? 'bg-maroon-700 text-gold-300 border-charcoal shadow-flat-sm' 
                  : 'text-charcoal border-transparent hover:text-maroon-700'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>All Media ({galleryItems.length})</span>
            </button>
            <button
              onClick={() => setMediaTypeFilter('image')}
              className={`flex-1 md:flex-initial px-4 py-2 flex items-center justify-center space-x-1.5 cursor-pointer rounded-none border-2 transition-transform ${
                mediaTypeFilter === 'image' 
                  ? 'bg-maroon-700 text-gold-300 border-charcoal shadow-flat-sm' 
                  : 'text-charcoal border-transparent hover:text-maroon-700'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Photos ({galleryItems.filter(i => i.type === 'image').length})</span>
            </button>
            <button
              onClick={() => setMediaTypeFilter('video')}
              className={`flex-1 md:flex-initial px-4 py-2 flex items-center justify-center space-x-1.5 cursor-pointer rounded-none border-2 transition-transform ${
                mediaTypeFilter === 'video' 
                  ? 'bg-maroon-700 text-gold-300 border-charcoal shadow-flat-sm' 
                  : 'text-charcoal border-transparent hover:text-maroon-700'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Videos ({galleryItems.filter(i => i.type === 'video').length})</span>
            </button>
          </div>

          {/* Core Categories Tagging Filter */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-1.5 w-full md:w-auto">
            {categoriesSet.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider border-2 transition-all cursor-pointer ${
                  activeFilter === cat.id
                    ? 'bg-maroon-700 text-gold-300 border-charcoal shadow-flat scale-98'
                    : 'bg-white text-charcoal border-transparent hover:border-charcoal hover:bg-gold-100'
                }`}
              >
                {currentLang === 'hi' ? cat.labelHi : cat.labelEn}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* DYNAMIC MEDIA GRID */}
      {finalFilteredItems.length === 0 ? (
        <div className="text-center py-20 bg-white border-3 border-dashed border-charcoal/30">
          <Camera className="w-12 h-12 text-charcoal/40 mx-auto animate-bounce" />
          <h3 className="font-display font-black text-xl text-maroon-850 uppercase mt-4">No Media Elements Found</h3>
          <p className="text-charcoal/85 text-xs font-semibold mt-1">Please change active categorization filters or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finalFilteredItems.map((item) => {
            if (item.type === 'video') {
              const videoId = getYTIdFromUrl(item.url) || "Cwyn5LCGd0c";
              return (
                <div key={item.id} className="md:col-span-2 lg:col-span-3">
                  <ProjectVideoPlayer 
                    currentLang={currentLang}
                    videoId={videoId}
                    title={item.title}
                    description={{
                      hi: `अधिकारिक ड्रोन वीडियो ओवरव्यू। डूंगरी पुरा (मेली) रोड पर स्थित इस भव्य आध्यात्मिक परिसर का विहंगम और अद्भुत दृश्य का आनंद लें।`,
                      en: `Official high-definition drone overview tour of Dungri Pura (Meli Road) campus. Witness the structural marvel and natural visual alignments of the completed temple complex.`
                    }}
                    category={item.category}
                  />
                </div>
              );
            } else {
              // Standard Photo card
              const getValidUrl = (url: string) => {
                if (!url) return 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=800';
                const clean = url.trim();
                if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('data:image/') || clean.startsWith('/') || clean.startsWith('blob:')) {
                  return clean;
                }
                return 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=800';
              };
              const imageUrl = getValidUrl(item.url);

              return (
                <div 
                  key={item.id}
                  className="bg-white border-3 border-charcoal rounded-none overflow-hidden shadow-flat hover:shadow-flat-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between group relative"
                >
                  <div className="relative h-60 overflow-hidden border-b-2 border-charcoal cursor-pointer" onClick={() => {
                    setSelectedPhoto(imageUrl);
                    setSelectedPhotoTitle(item.title[currentLang]);
                  }}>
                    <img 
                      src={imageUrl} 
                      alt={item.title[currentLang]} 
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 animate-fade-in"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 bg-gold-450 border-2 border-charcoal flex items-center justify-center text-charcoal shadow-flat-sm scale-90 group-hover:scale-100 transition-transform">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-cream-100/50 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-maroon-800 text-[10px] font-black uppercase tracking-widest font-mono border-b border-maroon-700/20 pb-1 mb-2 inline-block">
                        🏷️ {item.category}
                      </span>
                      <h4 className="font-display font-black text-sm sm:text-base text-charcoal uppercase tracking-tight line-clamp-2">
                        {item.title[currentLang]}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}

      {/* FULL-SCREEN LIGHTBOX MODAL FOR PHOTOS */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setSelectedPhoto(null)}>
          <div className="relative bg-cream-50 w-full max-w-4xl rounded-none border-3 border-charcoal shadow-flat-lg overflow-hidden animate-fade-in divide-y-2 divide-charcoal" onClick={(e) => e.stopPropagation()}>
            <div className="bg-maroon-gradient p-4 text-white flex justify-between items-center bg-charcoal">
              <span className="font-display font-black text-gold-300 text-xs sm:text-sm uppercase tracking-wider block">
                🖼️ High Definition Visual Preview
              </span>
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 hover:bg-white/10 text-white border-2 border-charcoal rounded-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-black p-1 sm:p-2 flex items-center justify-center max-h-[75vh]">
              <img 
                src={selectedPhoto} 
                alt="Selected Lightbox Render" 
                className="max-w-full max-h-[70vh] object-contain border-2 border-charcoal shadow-flat"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=800';
                }}
              />
            </div>
            {selectedPhotoTitle && (
              <div className="p-4 bg-cream-100 text-charcoal text-xs sm:text-sm text-center font-bold tracking-tight">
                {selectedPhotoTitle}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

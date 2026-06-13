/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, Share2, Youtube, Copy, Check, Facebook, Twitter } from 'lucide-react';
import { Language } from '../types';

interface ProjectVideoPlayerProps {
  currentLang: Language;
  videoId?: string; // e.g. "Cwyn5LCGd0c"
  title: { hi: string; en: string };
  description: { hi: string; en: string };
  category?: string;
}

export default function ProjectVideoPlayer({
  currentLang,
  videoId = "Cwyn5LCGd0c",
  title,
  description,
  category = "Featured Tour"
}: ProjectVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const shareText = currentLang === 'hi'
    ? `राजशाही विहारधाम और ओसवाल पैलेस परियोजना का भव्य वीडियो ट्यूर देखें: ${videoUrl}`
    : `Watch the majestic video tour of Vihardham & Oswal Palace Project: ${videoUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(videoUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white border-3 border-charcoal p-4 sm:p-6 rounded-none shadow-flat relative w-full overflow-hidden">
      
      {/* Category Tag */}
      {category && (
        <span className="absolute top-4 right-4 bg-maroon-700 text-gold-300 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-none border-2 border-charcoal shadow-flat-sm z-10 font-mono">
          {category}
        </span>
      )}

      {/* Video Frame */}
      <div className="relative aspect-video bg-black border-3 border-charcoal overflow-hidden group">
        {!isPlaying ? (
          <div className="absolute inset-0 w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
            {/* Background Thumbnail Image with Lazy Loading */}
            <img 
              src={thumbnailUrl} 
              alt={title[currentLang]} 
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              onError={(e) => {
                // Fallback secondary background if maxresdefault fails for any reason
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            {/* Dark contrast gradient overlay */}
            <div className="absolute inset-0 bg-black/45 transition-colors group-hover:bg-black/35 flex items-center justify-center">
              {/* Pulsating play button overlay */}
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-20 w-20 rounded-full bg-gold-400 opacity-20 animate-ping"></span>
                <div className="w-16 h-16 bg-gold-500 hover:bg-gold-400 border-3 border-charcoal rounded-none flex items-center justify-center text-maroon-850 shadow-flat group-hover:scale-108 transition-all relative z-10 active:translate-y-0.5">
                  <Play className="w-8 h-8 fill-current ml-1 text-maroon-850" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Actual embed loaded lazily only when playing */
          <iframe 
            className="w-full h-full"
            src={embedUrl}
            title={title[currentLang]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>

      {/* Video Metadata Panel */}
      <div className="mt-5 space-y-4">
        <div>
          <h3 className="font-display font-black text-xl sm:text-2xl text-maroon-850 leading-snug uppercase tracking-tight">
            {title[currentLang]}
          </h3>
          <p className="mt-2 text-charcoal font-semibold text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {description[currentLang]}
          </p>
        </div>

        {/* Buttons: Watch on YouTube & Social Sharing Row */}
        <div className="pt-4 border-t-2 border-charcoal/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Watch on YouTube Call-to-Action */}
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-maroon-700 border-2 border-charcoal text-gold-300 hover:bg-gold-500 hover:text-maroon-950 font-black px-4 py-2.5 rounded-none shadow-flat cursor-pointer text-xs flex items-center justify-center space-x-2 uppercase font-mono tracking-wider transition-all active:translate-y-0.5"
          >
            <Youtube className="w-4.5 h-4.5 fill-current" />
            <span>Watch on YouTube</span>
          </a>

          {/* Sharing Buttons Container */}
          <div className="w-full sm:w-auto flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-[10px] text-charcoal/65 uppercase font-black font-mono tracking-wider block">Share:</span>
            
            {/* Copy link button */}
            <button
              onClick={handleCopyLink}
              title="Copy Link to Clipboard"
              className="bg-white hover:bg-cream-100 border-2 border-charcoal text-charcoal p-2 rounded-none shadow-flat-sm cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              {copied ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* WhatsApp forwarding */}
            <button
              onClick={shareOnWhatsApp}
              title="Share on WhatsApp"
              className="bg-green-150 hover:bg-green-200 border-2 border-charcoal text-green-850 p-2 rounded-none shadow-flat-sm cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <span className="font-bold text-xs">💬 WA</span>
            </button>

            {/* Facebook sharing */}
            <button
              onClick={shareOnFacebook}
              title="Share on Facebook"
              className="bg-blue-100 hover:bg-blue-200 border-2 border-charcoal text-blue-800 p-2 rounded-none shadow-flat-sm cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <Facebook className="w-4 h-4 fill-current" />
            </button>

            {/* Twitter/X sharing */}
            <button
              onClick={shareOnTwitter}
              title="Share on Twitter"
              className="bg-slate-100 hover:bg-slate-200 border-2 border-charcoal text-black p-2 rounded-none shadow-flat-sm cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <Twitter className="w-4 h-4 fill-current" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

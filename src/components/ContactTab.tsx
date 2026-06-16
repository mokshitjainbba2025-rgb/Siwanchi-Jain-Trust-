/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, AlertTriangle, CheckCircle2, Map, Users, Calendar } from 'lucide-react';
import { Language, ContactQuery } from '../types';
import { staticTranslations } from '../data';
import trustContactBanner from '../assets/images/trust_contact_banner_1781623752504.jpg';

interface ContactTabProps {
  currentLang: Language;
  onAddContactQuery: (query: ContactQuery) => void;
}

export default function ContactTab({ currentLang, onAddContactQuery }: ContactTabProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const t = staticTranslations[currentLang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const newQuery: ContactQuery = {
      id: "q_" + Date.now(),
      name,
      mobile,
      email,
      subject,
      message,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch("https://formspree.io/f/xgobqzel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          mobile,
          email,
          subject,
          message
        })
      });

      if (response.ok) {
        onAddContactQuery(newQuery);
        setIsSuccess(true);
        // Clear
        setName('');
        setMobile('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit form to Formspree");
      }
    } catch (err: any) {
      console.error("Formspree submission error:", err);
      setSubmitError(currentLang === 'hi' ? 'फॉर्म जमा करने में त्रुटि हुई। कृपया पुनः प्रयास करें।' : 'There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* SECTION 1: Narrative */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-gold-600 text-xs font-black uppercase tracking-widest block font-mono">Get in Touch with our team</span>
        <h2 className="font-display font-black text-3xl text-maroon-800 uppercase tracking-tight">संपर्क करें (Contact Office)</h2>
        <p className="text-xs text-charcoal font-bold mt-1">मेली गाँव (सिवाना समदड़ी मार्ग) तीर्थ संकुल में किसी भी प्रकार की धार्मिक जानकारी, धर्म सहयोग या विशेष बुकिंग सहायता के लिए संपर्क करें।</p>
        <div className="w-24 h-1 bg-charcoal mx-auto mt-2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Contact details & embed map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-3 border-charcoal p-6 rounded-none shadow-flat space-y-5">
            <h3 className="font-display font-black text-lg text-maroon-800 border-b-2 border-charcoal pb-2 uppercase tracking-tight">
              मुख्य प्रशासनिक कार्यालय (Trust HQ)
            </h3>

            {/* Contact Office Visual Banner */}
            <div className="border border-charcoal overflow-hidden aspect-video">
              <img 
                src={trustContactBanner} 
                alt="Trust HQ Office Banner" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 text-xs font-black text-charcoal font-mono uppercase tracking-wide">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-maroon-800 block text-[11px] font-black uppercase">Address coordinates:</span>
                  <span className="font-bold lowercase first-line:uppercase">मेली गाँव (सिवाना समदड़ी मार्ग), जिला बाड़मेर, राजस्थान, ३४४०४४</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-maroon-800 block text-[11px] font-black">Helpline numbers:</span>
                  <a href="tel:+91 98225 38635" className="font-mono text-charcoal font-black hover:text-maroon-700 block">+91 98225 38635 (Chairman Rajmalji Bhansali)</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-maroon-800 block text-[11px] font-black">Email communications:</span>
                  <a href="mailto:team.siwanchitrust@gmail.com" className="text-charcoal font-black hover:text-maroon-700 block lowercase">team.siwanchitrust@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Whatsapp quick channel support */}
            <div className="bg-green-50 rounded-none p-4 border-2 border-charcoal flex items-center justify-between text-xs font-bold text-green-950 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              <div>
                <span className="block text-maroon-800 text-sm font-black uppercase tracking-tight">📲 WhatsApp Desk</span>
                <p className="text-[10px] text-green-700 font-bold block mt-1 lowercase first-line:uppercase">Get immediate responses about bookings and chadhava opportunities.</p>
              </div>
              <a 
                href="https://wa.me/919822538635" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-green-700 hover:bg-green-600 border-2 border-charcoal text-white font-extrabold px-3 py-2 rounded-none text-center flex items-center justify-center space-x-1 ml-auto shrink-0 w-full sm:w-auto shadow-flat active:translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Chat Now</span>
              </a>
            </div>
          </div>

          {/* Map wrapper frame */}
          <div className="bg-white border-3 border-charcoal p-2.5 rounded-none shadow-flat overflow-hidden aspect-video">
            <iframe 
              title="Google Map location Meli Gaon Rajasthan"
              src="https://www.google.com/search?sca_esv=2281bbf698677232&biw=1536&bih=695&sxsrf=ANbL-n4rmT_PfhixwkJn9ABSu3jyiALPVA%3A1781331629999&kgmid=%2Fg%2F11spplw10q&q=Sunanda%20keshav%20jinalay%20(vihardham)&shem=epsd1%2Crimspwouoe&shndl=30&source=sh%2Fx%2Floc%2Funi%2Fm1%2F1&kgs=36f866ed9cb0abb8" 
              className="w-full h-full border-0 rounded-none"
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right Side: Interactive query contact Form */}
        <div className="lg:col-span-7 bg-white border-3 border-charcoal p-6 sm:p-8 rounded-none shadow-flat relative">
          <h3 className="font-display font-black text-xl text-maroon-800 border-b-2 border-charcoal pb-3 mb-6 block uppercase tracking-tight">
            पूछताछ एवं मार्गदर्शन प्रपत्र (Online Query Form)
          </h3>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-black uppercase font-mono tracking-wider text-charcoal">
              
              <div className="flex flex-col space-y-1">
                <label>Your Full Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Ramesh Kumar Jain" 
                  className="p-3 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label>Mobile Number (WhatsApp) *</label>
                <input 
                  type="text" 
                  required 
                  pattern="[0-9]{10}"
                  placeholder="10 Digits" 
                  className="p-3 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. ramesh@gmail.com" 
                  className="p-3 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label>Inquiry Subject *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Room booking confirmation query" 
                  className="p-3 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="col-span-2 flex flex-col space-y-1">
                <label>Detailed Message *</label>
                <textarea 
                  rows={4} 
                  required
                  placeholder="Kindly verify dates block..." 
                  className="p-3 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-bold lowercase first-line:uppercase" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {submitError && (
                <div className="col-span-2 p-3 bg-red-50 border-2 border-red-500 text-red-700 font-bold font-mono text-center normal-case text-xs">
                  ❌ {submitError}
                </div>
              )}

              <div className="col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-maroon-gradient hover:bg-gold-550 hover:text-maroon-950 text-gold-300 font-extrabold py-4 rounded-none border-2 border-charcoal shadow-flat uppercase tracking-wider transition-all active:translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (currentLang === 'hi' ? 'जमा किया जा रहा है...' : 'Submitting Inquiry...') : (currentLang === 'hi' ? 'पूछताछ प्रपत्र भेजें' : 'Submit Inquiry Sheet')}
                </button>
              </div>

            </form>
          ) : (
            <div className="text-center py-10 space-y-5 animate-fade-in uppercase font-mono text-xs">
              <div className="w-14 h-14 bg-green-150 border-2 border-charcoal text-green-700 rounded-none flex items-center justify-center text-2xl mx-auto shadow-flat animate-bounce">
                ✓
              </div>
              <h4 className="font-display font-black text-xl text-maroon-850 tracking-tight">Message Sent Successfully!</h4>
              <p className="text-xs text-charcoal font-bold max-w-sm mx-auto lowercase first-line:uppercase">We have logged your communication query. The trust secretary team will revert back to you within 24 working hours.</p>
              <button
                onClick={() => setIsSuccess(false)}
                className="bg-maroon-700 hover:bg-gold-500 hover:text-maroon-950 border-2 border-charcoal text-white text-xs font-black px-5 py-2.5 rounded-none transition-colors cursor-pointer uppercase tracking-wider shadow-flat"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

      </div>

      {/* NEW SECTION D: TRUST METROPOLIS OUTREACH MEETINGS */}
      <div className="bg-cream-100 border-3 border-charcoal p-8 sm:p-12 shadow-flat space-y-6">
        <div className="text-center max-w-md mx-auto space-y-1.5">
          <span className="text-gold-700 text-xs font-black block font-mono uppercase">🌎 Doorstep Devotion HelpDesk</span>
          <h3 className="font-display font-black text-xl text-maroon-850 uppercase tracking-tight">
            {currentLang === 'hi' ? "शाखा संपर्क एवं महानगर पहुँच" : "Trust Metropolitan Outreach"}
          </h3>
          <div className="w-16 h-0.5 bg-maroon-700 mx-auto"></div>
        </div>

        <p className="text-charcoal/90 text-xs sm:text-sm font-bold text-center leading-relaxed max-w-3xl mx-auto">
          {currentLang === 'hi' ? (
            <>
              श्री सिवांची जैन सेवा समिति ट्रस्ट के सम्मानीय प्रतिनिधिमंडल नियमित अंतराल पर देश के विभिन्न प्रमुख महानगरों (जैसे बेंगलुरु, हुबली, पुणे, मुंबई, अहमदनगर और चेन्नई) का दौरा करते हैं। ट्रस्टीगण सीधे आपके शहरों में सामूहिक बैठकें व गृह संपर्क कर परियोजना के नक्शे, थ्री-डी मॉडल्स और उपलब्ध <strong>लाभ अवसरों (Labh Opportunities)</strong> से जुड़ने की प्रक्रिया व्यक्तिगत रूप से समझाते हैं।
            </>
          ) : (
            <>
              To ensure proximity to our nationwide parivar, authorized delegates of the trust schedule periodic visits to key central hubs (including Bengaluru, Hubli, Pune, Mumbai, Ahmednagar, and Chennai). Our governing officers personally host local Samaj meetings to share architectural Blueprints, 3D walkthrough animations, and answer questions regarding specific <strong>Labh Opportunities</strong>.
            </>
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-center">
          <div className="bg-white border-2 border-charcoal p-4 shadow-flat-sm">
            <Users className="w-8 h-8 text-maroon-700 mx-auto mb-2" />
            <span className="font-sans font-black text-xs block text-maroon-800 uppercase">{currentLang === 'hi' ? "पारिवारिक गृह संपर्क" : "Family Home Visits"}</span>
            <span className="block text-[10px] text-charcoal/60 mt-1">{currentLang === 'hi' ? "आपकी सुविधानुसार समय तय करें" : "Schedule direct visits at your comfort"}</span>
          </div>
          <div className="bg-white border-2 border-charcoal p-4 shadow-flat-sm">
            <Map className="w-8 h-8 text-maroon-700 mx-auto mb-2" />
            <span className="font-sans font-black text-xs block text-maroon-800 uppercase">{currentLang === 'hi' ? "स्थानीय समाज बैठक" : "Samaj Meetings"}</span>
            <span className="block text-[10px] text-charcoal/60 mt-1">{currentLang === 'hi' ? "महानगर परिषदों में संगोष्ठी" : "Educational brief seminars in local hubs"}</span>
          </div>
          <div className="bg-white border-2 border-charcoal p-4 shadow-flat-sm">
            <Calendar className="w-8 h-8 text-maroon-700 mx-auto mb-2" />
            <span className="font-sans font-black text-xs block text-maroon-800 uppercase">{currentLang === 'hi' ? "आगामी तिथि बुकिंग" : "Register Address Interested"}</span>
            <span className="block text-[10px] text-charcoal/60 mt-1">{currentLang === 'hi' ? "प्रतिनिधियों से स्लॉट आरक्षित करें" : "Book custom briefing slots with coordinators"}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

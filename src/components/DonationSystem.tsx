/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Sparkles, Receipt, QrCode, Shield, Download, FileCheck, CheckCircle2, ChevronRight, X, Phone, User, Landmark, ShieldAlert, Award, FileText } from 'lucide-react';
import { Language, Donation } from '../types';
import { staticTranslations } from '../data';

interface DonationSystemProps {
  currentLang: Language;
  onAddDonation: (donation: Donation) => void;
}

export default function DonationSystem({ currentLang, onAddDonation }: DonationSystemProps) {
  const [amount, setAmount] = useState<number | ''>('');
  const [donorName, setDonorName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [category, setCategory] = useState<'General Account' | 'Dev Dravya' | 'Jiv Daya' | 'Other Dharma Sahyog'>('General Account');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Bank Transfer' | 'Online'>('UPI');
  const [is80GRequested, setIs80GRequested] = useState(false);

  // Simulated Checkout Wizard States
  const [checkingOut, setCheckingOut] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'process' | 'done'>('details');
  const [simulatedTxnId, setSimulatedTxnId] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [generatedDonation, setGeneratedDonation] = useState<Donation | null>(null);

  const t = staticTranslations[currentLang];

  const handleQuickAmount = (val: number) => {
    setAmount(val);
  };

  const handleInitiateDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      alert(currentLang === 'hi' ? "कृपया एक मान्य सहयोग राशि दर्ज करें।" : "Please enter a valid contribution amount.");
      return;
    }
    if (!donorName.trim()) {
      alert(currentLang === 'hi' ? "कृपया सहयोगी/लाभार्थी का नाम दर्ज करें।" : "Please enter name of Sahyogi/Labharthi.");
      return;
    }
    if (!mobile.trim() || mobile.trim().length < 10) {
      alert(currentLang === 'hi' ? "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें।" : "Please enter a 10-digit mobile number.");
      return;
    }
    if (!city.trim()) {
      alert(currentLang === 'hi' ? "कृपया मूल ग्राम / शहर दर्ज करें।" : "Please enter Native Town / City.");
      return;
    }

    const receiptNo = "LBH" + Math.floor(100000 + Math.random() * 900000);
    const txnId = "REG" + Math.floor(100000000000 + Math.random() * 900000000000);
    setReceiptNumber(receiptNo);
    setSimulatedTxnId(txnId);

    const newDonation: Donation = {
      id: "don_" + Date.now(),
      receiptNumber: receiptNo,
      donorName,
      mobile,
      email,
      address: city,
      panNumber: panNumber ? panNumber.toUpperCase() : undefined,
      amount: Number(amount),
      category,
      paymentMethod: 'Bank Transfer',
      transactionId: 'Offline Verification Pending',
      is80GRequested,
      createdAt: new Date().toISOString(),
      city
    };

    onAddDonation(newDonation);
    setGeneratedDonation(newDonation);
    setCheckingOut(true);
  };

  const handleReset = () => {
    setCheckingOut(false);
    setAmount('');
    setDonorName('');
    setMobile('');
    setEmail('');
    setCity('');
    setPanNumber('');
    setCategory('General Account');
    setPaymentMethod('UPI');
    setIs80GRequested(false);
    setGeneratedDonation(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* SECTION 1: Spiritual values & 80G benefits heading */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-maroon-50 text-maroon-700 font-bold px-4 py-1.5 rounded-none border-2 border-charcoal text-xs uppercase shadow-flat-sm">
          <Heart className="w-4 h-4 text-gold-500 fill-current animate-pulse" />
          <span>धर्मादा सेवा • Dharma Sahyog Avsar</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-maroon-850 uppercase tracking-tight">
          {currentLang === 'hi' ? "शाश्वत धर्म सहयोग एवं लाभ अवसर" : "Dharma Sahyog & Labh Avsar Portal"}
        </h1>
        <p className="text-charcoal text-xs sm:text-sm font-bold max-w-xl mx-auto md:leading-relaxed">
          {currentLang === 'hi' 
            ? "आपके द्वारा समर्पित धर्म सहयोग राशि का शत-प्रतिशत उपयोग मेली गाँव (सिवाना समदड़ी मार्ग) श्री संघ विहारधाम, जिनालय रख-रखाव व साधु-साध्वी वैयावृत्य में किया जाता है।"
            : "Every rupee committed to the trust is utilized transparently for Vihardham holy stays, temple marble-masonry, and monastic support programs."}
        </p>
        {/* Registration & exemption details hidden at trust request */}
        <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-3"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Trust Transparency & Details panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-3 border-charcoal p-6 rounded-none shadow-flat space-y-5">
            <h3 className="font-display font-black text-lg text-maroon-800 flex items-center border-b-2 border-charcoal pb-2">
              <Landmark className="w-5.5 h-5.5 mr-2 text-gold-600" />
              <span>{currentLang === 'hi' ? "ट्रस्ट बैंक खाता विवरण" : "Trust Bank Account Details"}</span>
            </h3>
            
            <p className="text-xs text-charcoal/80 leading-relaxed font-bold">
              {currentLang === 'hi' 
                ? "जो भामाशाह परिवार सीधे कोर नेट-बैंकिंग / आरटीजीएस द्वारा धर्म सहयोग राशि प्रेषित करना चाहते हैं, वे नीचे दिए गए अधिकृत खाते का उपयोग कर सकते हैं।"
                : "Bhagyashali families wishing to complete direct RTGS / IMPS bank transfers can credit our audited account directly."}
            </p>

            <div className="bg-cream-100 p-4 rounded-none text-xs space-y-2.5 font-mono font-bold text-charcoal border-2 border-charcoal">
              <p>📍 Bank Name: <strong className="text-maroon-800">STATE BANK OF INDIA (SIVANA)</strong></p>
              <p>👤 Account Name: <strong>SHRI SIWANCHI JAIN SEVA SAMITI TRUST</strong></p>
              <p>💳 Account Number: <strong className="text-lg text-maroon-900 font-black">37484558084</strong></p>
              <p>🔑 IFSC Code: <strong className="text-lg text-maroon-900 font-black">SBIN0031178</strong></p>
              <p>🏛️ Branch Code: <strong>31178 (Siwana, District Barmer, RJ)</strong></p>
            </div>

            <p className="text-[10px] text-maroon-800 font-extrabold font-mono uppercase bg-cream-50 p-2 border border-charcoal text-center">
              📞 {currentLang === 'hi' ? "स्थानांतरण के पश्चात रसीद हेतु +91 94260 55667 पर सूचित करें।" : "WhatsApp transaction receipt to +91 94260 55667 for Golden Name Record."}
            </p>

            {/* Exemption details hidden at trust request */}
          </div>

          {/* Core Donation funds list */}
          <div className="bg-maroon-gradient border-3 border-charcoal text-white p-6 rounded-none relative overflow-hidden shadow-flat space-y-4">
            <h4 className="font-display font-black text-gold-400 text-base uppercase tracking-wider">
              {currentLang === 'hi' ? "धर्म सहयोग का सदुपयोग कहाँ?" : "Utilization of Your Dharma Sahyog"}
            </h4>
            {currentLang === 'hi' ? (
              <div className="grid grid-cols-1 gap-3.5 text-xs text-gold-200/90 font-bold font-sans">
                <p>🪔 <strong>जिनालय संवर्धन</strong> (शुद्ध मकराना संगमरमर नक्काशी एवं जिनबिम्ब अंजनशलाका प्रतिष्ठा)</p>
                <p>🛏️ <strong>धर्मशाला रख-रखाव</strong> (AC कमरों की सफाई एवं सौर ऊर्जा विद्युत विन्यास)</p>
                <p>🍲 <strong>भोजनशाला अनुदान</strong> (दैनिक स्वास्थ्यप्रद सात्विक भोजन एवं पदयात्रियों का सहयोग)</p>
                <p>🕊️ <strong>साधु निहार कुटीर</strong> (काष्ठ शय्या व्यवस्था, औषधि सहयोग एवं प्रासुक पारणा व्यवस्था)</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3.5 text-xs text-gold-200/90 font-bold font-sans">
                <p>🪔 <strong>Jinalay Samvardhan</strong> (Pure Makrana Marble architecture & idol prathisthas)</p>
                <p>🛏️ <strong>Dharamshala Maintenance</strong> (AC rooms cleanings & solar electrical backings)</p>
                <p>🍲 <strong>Bhojanshala Donation</strong> (Sponsoring daily swasthya meals and barefoot pilgrims)</p>
                <p>🕊️ <strong>Sadhu Nihar Kuteer</strong> (Maintenance of pure wood stay beds, medicine and parsad)</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Interactive Interest Form and Payment Instructions */}
        <div className="lg:col-span-7 space-y-6">
          {!checkingOut ? (
            /* Part 1: Dharma Sahyog Interest Registration Form */
            <div className="bg-white border-3 border-charcoal p-6 sm:p-8 rounded-none shadow-flat-lg space-y-6">
              <h3 className="font-display font-black text-lg sm:text-xl text-maroon-800 flex items-center border-b-2 border-charcoal pb-4 uppercase tracking-tight">
                <FileText className="w-5.5 h-5.5 mr-2 text-gold-500" />
                <span>{currentLang === 'hi' ? "धर्म सहयोग विवरण प्रविष्टि" : "Dharma Sahyog Interest Form"}</span>
              </h3>

              <form onSubmit={handleInitiateDonation} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-charcoal">
                
                {/* Category selection */}
                <div className="col-span-2 flex flex-col space-y-1 bg-cream-50 p-3 rounded-none border-2 border-charcoal">
                  <label className="text-maroon-800 uppercase tracking-wide font-mono text-[10px]">{currentLang === 'hi' ? "सहयोग / लाभ अवसर श्रेणी *" : "Select Sahyog / Labh Category *"}</label>
                  <select
                    required
                    className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none mt-1 font-bold"
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                  >
                    <option value="General Account">📍 {currentLang === 'hi' ? "साधारण खाता (General Account)" : "General Account"}</option>
                    <option value="Dev Dravya">🪔 {currentLang === 'hi' ? "देव द्रव्य (Dev Dravya)" : "Dev Dravya"}</option>
                    <option value="Jiv Daya">🌾 {currentLang === 'hi' ? "जीव दया (Jiv Daya)" : "Jiv Daya"}</option>
                    <option value="Other Dharma Sahyog">❤️ {currentLang === 'hi' ? "अन्य धर्म सहयोग (Other Dharma Sahyog)" : "Other Dharma Sahyog"}</option>
                  </select>
                </div>

                {/* Amount input & Quick selectors */}
                <div className="col-span-2 flex flex-col space-y-1">
                  <label className="text-maroon-800 uppercase tracking-wide font-mono text-[10px]">{currentLang === 'hi' ? "सहयोग राशि * (₹ भारतीय रुपया)" : "Dharma Sahyog Amount * (INR)"}</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3.5 top-3.5 text-maroon-700 font-extrabold text-sm">₹</span>
                    <input
                      type="number"
                      required
                      min="10"
                      placeholder={currentLang === 'hi' ? "राशि दर्ज करें (जैसे 11000)" : "Enter amount (e.g. 11000)"}
                      className="w-full pl-8 pr-4 py-3 border-2 border-charcoal rounded-none bg-white text-sm outline-none font-bold"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                  </div>
                  
                  {/* Fast Select Buttons */}
                  <div className="grid grid-cols-5 gap-2 pt-1 font-mono">
                    {[2700, 5400, 11000, 27000, 54000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleQuickAmount(val)}
                        className={`border-2 border-charcoal hover:bg-maroon-700 hover:text-white transition-all p-2 rounded-none text-[10px] font-black cursor-pointer shadow-flat-sm active:translate-y-0.5 ${
                          amount === val ? 'bg-maroon-800 text-gold-300' : 'bg-cream-50'
                        }`}
                      >
                        ₹{val.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Donor fields */}
                <div className="flex flex-col space-y-1">
                  <label className="text-maroon-800">{currentLang === 'hi' ? "सहयोगी / लाभार्थी का नाम *" : "Sahyogi / Labharthi Full Name *"}</label>
                  <input
                    type="text"
                    required
                    placeholder={currentLang === 'hi' ? "उदा. शा. राजमलजी भंसाली" : "e.g. Sha Rajmalji Bhansali"}
                    className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-semibold"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-maroon-800">{currentLang === 'hi' ? "मोबाइल नंबर (WhatsApp विवरण हेतु) *" : "WhatsApp Mobile Number *"}</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder={currentLang === 'hi' ? "उदा. 9822538635" : "10-digit mobile"}
                    className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-semibold text-charcoal font-mono"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-maroon-800">{currentLang === 'hi' ? "ईमेल आईडी (वैकल्पिक)" : "Email Address (Optional)"}</label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-semibold text-charcoal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-maroon-800">{currentLang === 'hi' ? "मूल ग्राम / शहर एवं राज्य *" : "Native Town & State *"}</label>
                  <input
                    type="text"
                    required
                    placeholder={currentLang === 'hi' ? "उदा. मेली (पुणे)" : "e.g. Meli (Pune)"}
                    className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none font-semibold"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                {/* Submit CTA */}
                <div className="col-span-2 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-maroon-gradient hover:bg-gold-500 hover:text-maroon-950 text-gold-300 font-extrabold py-3.5 rounded-none border-2 border-charcoal shadow-flat transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
                  >
                    {currentLang === 'hi' ? "विवरण सहेजें और भुगतान निर्देश देखें ➔" : "Submit Details & View Payment Modes ➔"}
                  </button>
                </div>

              </form>
            </div>
          ) : (
            /* Part 2: Secure Payment Modes Instruction Screen */
            <div className="bg-white border-3 border-charcoal p-6 sm:p-8 rounded-none shadow-flat-lg space-y-6">
              
              {/* Submission Status Alert */}
              <div className="bg-green-50 border-2 border-green-600 p-4 rounded-none space-y-1 animate-fade-in">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
                  <h4 className="font-display font-black text-sm uppercase text-green-900 leading-none">
                    {currentLang === 'hi' ? "निवेदन विवरण सफलतापूर्वक प्राप्त हुआ!" : "Interest Registered Successfully!"}
                  </h4>
                </div>
                <p className="text-[11px] text-charcoal/90 leading-relaxed font-semibold pl-7">
                  {currentLang === 'hi'
                    ? `सहयोगी परिवार: ${generatedDonation?.donorName}, राशि: ₹${generatedDonation?.amount?.toLocaleString('en-IN')} (पंजीकरण कोड: ${generatedDonation?.receiptNumber})। आपका विवरण सुरक्षित रूप से दर्ज कर लिया गया है। कृपया नीचे दी गई प्रणाली द्वारा दान प्रेषित करें।`
                    : `Sahyogi: ${generatedDonation?.donorName}, Amount: ₹${generatedDonation?.amount?.toLocaleString('en-IN')} (Reg No: ${generatedDonation?.receiptNumber}). Your interest is recorded. Please proceed with payment below.`}
                </p>
              </div>

              <h3 className="font-display font-black text-lg sm:text-xl text-maroon-800 flex items-center border-b-2 border-charcoal pb-4 uppercase tracking-tight">
                <Award className="w-5.5 h-5.5 mr-2 text-gold-500" />
                <span>{currentLang === 'hi' ? "भुगतान माध्यम एवं सहयोग निर्देश" : "Payment Modes & Instructions"}</span>
              </h3>

              {/* Crucial Announcement Banner */}
              <div className="bg-[#FFFDF0] border-2 border-amber-500 p-4 rounded-none space-y-2 relative overflow-hidden">
                <div className="flex items-start space-x-2.5">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-maroon-900 uppercase">
                      {currentLang === 'hi' ? "गेटवे सूचना (Gateway Notice)" : "Online Gateway Notice"}
                    </h4>
                    <p className="text-[11px] text-charcoal/90 leading-relaxed font-semibold">
                      {currentLang === 'hi' 
                        ? "सुरक्षा एवं पारदर्शिता के कारण सीधे ऑनलाइन भुगतान गेटवे वेबसाइट पर कनेक्टेड नहीं है। साधारण बैंक ट्रांसफर अथवा अन्य सभी भुगतान माध्यमों के लिए नीचे दिए गए अधिकृत निर्देशों का पालन करें।"
                        : "The automated online payment gateway is currently not linked directly on the web application. Please follow the instructions below for secure manual bank transfers or other modes."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instruction Steps */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-maroon-800 text-gold-300 font-black text-xs font-mono rounded-none border-2 border-charcoal flex items-center justify-center shrink-0 mt-0.5 shadow-flat-sm">
                    1
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-display font-black text-xs uppercase text-maroon-850">
                      {currentLang === 'hi' ? "सीधे बैंक खाता स्थानांतरण (Direct Bank Transfer)" : "Direct Bank Transfer & RTGS / NEFT"}
                    </h5>
                    <p className="text-[11px] text-charcoal/80 leading-relaxed font-semibold">
                      {currentLang === 'hi'
                        ? "आप बाईं ओर दिए गए स्टेट बैंक ऑफ़ इंडिया के अधिकृत खाते (IFSC: SBIN0031178) में नेट बैंकिंग, आरटीजीएस (RTGS), एनईएफटी (NEFT) या अपने मोबाइल बैंक ऐप से धर्म सहयोग राशि भेज सकते हैं और प्रविष्टि हेतु व्हाट्सएप्प करें।"
                        : "Execute wire transfers, RTGS, IMPS, or NEFT directly into the State Bank of India account detailed on the left panel, and share confirmation."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-maroon-800 text-gold-300 font-black text-xs font-mono rounded-none border-2 border-charcoal flex items-center justify-center shrink-0 mt-0.5 shadow-flat-sm">
                    2
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-display font-black text-xs uppercase text-maroon-850">
                      {currentLang === 'hi' ? "अन्य सभी भुगतान माध्यमों के लिए (नकद, चैक, ड्राफ्ट)" : "For All Other Payment Modes (Cash, Cheques & Drafts)"}
                    </h5>
                    <p className="text-[11px] text-charcoal/80 leading-relaxed font-semibold">
                      {currentLang === 'hi'
                        ? "अन्य भुगतान विकल्पों (नकद सहयोग, चेक प्रेषण, या रसीद प्रविष्टि) अथवा किसी भी धर्म सहयोग के संबंध में जानकारी के लिए कृपया पुणे में सीधे अध्यक्ष राजमलजी भंसाली से संपर्क करें।"
                        : "For physical cash collection, local cheques, demand drafts, or physical receipt queries, please get in touch with Governing President Rajmalji Bhansali in Pune directly."}
                    </p>
                  </div>
                </div>
              </div>

              {/* President Contact Card */}
              <div className="bg-cream-55 border-2 border-charcoal p-5 rounded-none relative overflow-hidden space-y-4 shadow-flat-sm">
                <div className="absolute top-0 right-0 bg-maroon-800 text-gold-300 font-bold font-mono text-[9px] uppercase tracking-wider px-3 py-1 border-b border-l border-charcoal">
                  {currentLang === 'hi' ? "अध्यक्ष" : "President"}
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] text-gold-700 font-black uppercase tracking-widest font-mono block">
                    {currentLang === 'hi' ? "अधिकृत संपर्क विवरण" : "AUTHORIZED CONTACT RECORD"}
                  </span>
                  <h4 className="font-display font-black text-sm text-maroon-900 uppercase">
                    {currentLang === 'hi' ? "शा. संघवी राजमलजी मफतलालजी भंसाली (पुणे)" : "Sanghvi Rajmalji Mafatlalji Bhansali (Pune)"}
                  </h4>
                  <p className="text-[10px] text-charcoal/70 font-bold uppercase tracking-wider">
                    {currentLang === 'hi' ? "श्री सिवांची जैन सेवा समिति ट्रस्ट" : "Shri Siwanchi Jain Seva Samiti Trust"}
                  </p>
                </div>

                <div className="border-t border-charcoal/10 pt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono font-bold">
                  <a 
                    href="tel:+919822538635"
                    className="flex items-center space-x-2 bg-white hover:bg-cream-100 p-2 border-2 border-charcoal rounded-none text-charcoal transition-all shadow-flat-sm active:translate-y-0.5 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-maroon-700 shrink-0" />
                    <span>+91 98225 38635</span>
                  </a>
                  <a 
                    href="mailto:rajmal.bhansali@siwanchitrust.org"
                    className="flex items-center space-x-2 bg-white hover:bg-cream-100 p-2 border-2 border-charcoal rounded-none text-charcoal transition-all shadow-flat-sm active:translate-y-0.5 select-all truncate cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-maroon-700 shrink-0" />
                    <span className="truncate">rajmal.bhansali@siwanchitrust.org</span>
                  </a>
                </div>

                <div className="pt-2">
                  <a 
                    href={`https://wa.me/919822538635?text=Jai%20Jinendra!%20My%20Dharma%20Sahyog%20Interest%20is%20submitted%20on%20website%20with%20Reg%20No%20${generatedDonation?.receiptNumber}.%20Name:%20${encodeURIComponent(generatedDonation?.donorName || '')},%20Amount:%20INR%20${generatedDonation?.amount}.%20Please%20guide%20me%20for%20transfer.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-700 hover:bg-green-600 text-gold-100 font-extrabold py-3 px-4 rounded-none border-2 border-charcoal text-center flex items-center justify-center space-x-2 transition-all shadow-flat active:translate-y-0.5 uppercase tracking-wide text-xs cursor-pointer"
                  >
                    <span>💬 {currentLang === 'hi' ? "व्हाट्सएप द्वारा सत्यापन हेतु संपर्क करें (पुणे)" : "WhatsApp Verification Desk (Pune)"}</span>
                  </a>
                </div>
              </div>

              {/* Reset flow to allow filling another interest */}
              <div className="pt-2 border-t border-charcoal/10 flex justify-end">
                <button
                  onClick={handleReset}
                  className="bg-white hover:bg-cream-50 text-maroon-800 font-black border-2 border-charcoal px-5 py-2 text-xs uppercase tracking-wide cursor-pointer transition-all active:translate-y-0.5 shadow-flat-sm"
                >
                  {currentLang === 'hi' ? "➔ नया सहयोग विवरण भरें" : "➔ Fill Another Interest Form"}
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

    </div>
  );
}

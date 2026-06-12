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
  const [category, setCategory] = useState<'One Time' | 'Monthly' | 'Construction' | 'Temple' | 'Room' | 'Bhojanshala' | 'General'>('General');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Bank Transfer' | 'Online'>('UPI');
  const [is80GRequested, setIs80GRequested] = useState(true);

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
    setCheckingOut(true);
    setPaymentStep('process');
    
    // Simulate payment transaction network delays
    setTimeout(() => {
      const receiptNo = "LBH" + Math.floor(100000 + Math.random() * 900000);
      const txnId = "TXN" + Math.floor(100000000000 + Math.random() * 900000000000);
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
        paymentMethod,
        transactionId: txnId,
        is80GRequested,
        createdAt: new Date().toISOString(),
        city
      };

      onAddDonation(newDonation);
      setGeneratedDonation(newDonation);
      setPaymentStep('done');
    }, 2000);
  };

  const handleReset = () => {
    setCheckingOut(false);
    setPaymentStep('details');
    setAmount('');
    setDonorName('');
    setMobile('');
    setEmail('');
    setCity('');
    setPanNumber('');
    setCategory('General');
    setPaymentMethod('UPI');
    setIs80GRequested(true);
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
            ? "आपके द्वारा समर्पित धर्म सहयोग राशि का शत-प्रतिशत उपयोग डूंगरी पुरा श्री संघ विहारधाम, जिनालय रख-रखाव व साधु-साध्वी वैयावृत्य में किया जाता है।"
            : "Every rupee committed to the trust is utilized transparently for Vihardham holy stays, temple marble-masonry, and monastic support programs."}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2 text-xs font-mono font-black uppercase tracking-wider text-charcoal">
          <span className="bg-green-100 border-2 border-charcoal px-3.5 py-1.5 shadow-flat-sm flex items-center gap-1.5">
            🛡️ Govt 80G Exempted (धारा 80G छूट)
          </span>
          <span className="bg-gold-100 border-2 border-charcoal px-3.5 py-1.5 shadow-flat-sm flex items-center gap-1.5">
            🕊️ Reg No. E/1802/Barmer
          </span>
        </div>
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

            <div className="flex items-center space-x-3 text-xs bg-green-50 text-green-800 border-l-4 border-green-600 p-3.5">
              <Shield className="w-5 h-5 text-green-700 shrink-0" />
              <span className="font-bold">Income Tax 80G Rebate: Deductions available under standard Central Income Tax regulations for charitable religious trusts.</span>
            </div>
          </div>

          {/* Core Donation funds list */}
          <div className="bg-maroon-gradient border-3 border-charcoal text-white p-6 rounded-none relative overflow-hidden shadow-flat space-y-4">
            <h4 className="font-display font-black text-gold-400 text-base uppercase tracking-wider">
              {currentLang === 'hi' ? "धर्म सहयोग का सदुपयोग कहाँ?" : "Utilization of Your Dharma Sahyog"}
            </h4>
            <div className="grid grid-cols-1 gap-3.5 text-xs text-gold-200/90 font-bold font-sans">
              <p>🪔 <strong>जिनालय संवर्धन</strong> (Pure Macrana Marble architecture & idol prathisthas)</p>
              <p>🛏️ <strong>धर्मशाला रख-रखाव</strong> (AC rooms cleanings & solar electrical backings)</p>
              <p>🍲 <strong>भोजनशाला अनुदान</strong> (Sponsoring daily swasthya meals and barefoot pilgrims)</p>
              <p>🕊️ <strong>साधु निहार कुटीर</strong> (Maintenance of pure wood stay beds, medicine and parsad)</p>
            </div>
          </div>
        </div>

        {/* Right Side: Online Sponsoring Widget Form */}
        <div className="lg:col-span-7 bg-white border-3 border-charcoal p-6 sm:p-8 rounded-none shadow-flat-lg">
          <h3 className="font-display font-black text-xl text-maroon-800 flex items-center border-b-2 border-charcoal pb-4 mb-6 uppercase tracking-tight">
            <Award className="w-5.5 h-5.5 mr-2 text-gold-500" />
            <span>{currentLang === 'hi' ? "सुरक्षित धर्म सहयोग राशि प्रेषण" : "Direct Secure Dharma Sahyog Form"}</span>
          </h3>

          {!checkingOut ? (
            /* Sponsoring input form dashboard */
            <form onSubmit={handleInitiateDonation} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-charcoal">
              
              {/* Category selection */}
              <div className="col-span-2 flex flex-col space-y-1 bg-cream-50 p-3 rounded-none border-2 border-charcoal">
                <label className="text-maroon-800 uppercase tracking-wide font-mono text-[10px]">{currentLang === 'hi' ? "धर्म सहयोग / लाभ अवसर श्रेणी *" : "Select Dharma Sahyog Category *"}</label>
                <select
                  required
                  className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none mt-1 font-bold"
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                >
                  <option value="General">📍 {currentLang === 'hi' ? "सामान्य संघ वैयावृत्य एवं व्यवस्था कोष" : "General Trust Upkeep & Seva Fund"}</option>
                  <option value="Temple">🪔 {currentLang === 'hi' ? "नवनिर्माणाधीन मकराना पाषाण जिनालय निर्माण" : "Temple White Marble Carving & Prathistha"}</option>
                  <option value="Room">🛌 {currentLang === 'hi' ? "धर्मशाला व्यवस्था एवं कक्ष संवर्धन निधि" : "Dharamshala Room Renovation & Maintenance"}</option>
                  <option value="Bhojanshala">🍲 {currentLang === 'hi' ? "आदिनाथ भोजनशाला साधर्मिक स्वात्सल्य भोजन" : "Adinath Bhojanshala Free Meals Sponsorship"}</option>
                  <option value="Construction">🚧 {currentLang === 'hi' ? "विहारधाम परिसर आधारभूत ढांचा विकास" : "Vihardham Campus Civil Infrastructure Work"}</option>
                  <option value="Monthly">📅 {currentLang === 'hi' ? "मासिक सहयोगात्मक परिवार (Sahyogi Parivar)" : "Sahyogi Parivar Regular Monthly Enrollment"}</option>
                  <option value="One Time">❤️ {currentLang === 'hi' ? "एकदिवसीय विशिष्ट मांगलिक तिथि प्रभावना" : "One-Time Divine Tithi Manglik Prabhavna"}</option>
                </select>
              </div>

              {/* Amount input & Quick selectors */}
              <div className="col-span-2 flex flex-col space-y-1">
                <label className="text-maroon-800 uppercase tracking-wide font-mono text-[10px]">{currentLang === 'hi' ? "सहयोग राशि * (₹ भारतीय रुपया)" : "Dharma Sahyog Amount * (INR)"}</label>
                <div className="relative mt-1">
                  <span className="absolute left-3.5 top-3 text-maroon-700 font-extrabold text-sm">₹</span>
                  <input
                    type="number"
                    required
                    min="10"
                    placeholder={currentLang === 'hi' ? "राशि दर्ज करें (जैसे 51000)" : "Enter amount (e.g. 51000)"}
                    className="w-full pl-8 pr-4 py-3 border-2 border-charcoal rounded-none bg-white text-sm outline-none font-bold"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  />
                </div>
                
                {/* Fast Select Buttons with culturally auspicious values */}
                <div className="grid grid-cols-5 gap-2 pt-1 font-mono">
                  {[2700, 5400, 11000, 27000, 54000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleQuickAmount(val)}
                      className="border-2 border-charcoal hover:bg-maroon-700 hover:text-white transition-all bg-cream-50 p-2 rounded-none text-[10px] font-black cursor-pointer shadow-flat-sm active:translate-y-0.5"
                    >
                      ₹{val.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Donor fields */}
              <div className="flex flex-col space-y-1">
                <label className="text-maroon-800">{currentLang === 'hi' ? "सहयोगी / लाभार्थी का पूरा नाम *" : "Sahyogi Parivar Full Name *"}</label>
                <input
                  type="text"
                  required
                  placeholder={currentLang === 'hi' ? "उदा. अशोक कुमार गुलेच्छा" : "e.g. Ashok Kumar Gulechha"}
                  className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-maroon-800">{currentLang === 'hi' ? "मोबाइल नंबर (WhatsApp रसीद हेतु) *" : "WhatsApp Mobile Number *"}</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder={currentLang === 'hi' ? "उदा. 9845012345 (10 अंक)" : "10-digit mobile"}
                  className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-maroon-800">{currentLang === 'hi' ? "ईमेल आईडी (वैकल्पिक)" : "Email Address (Optional)"}</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-maroon-800">{currentLang === 'hi' ? "मूल ग्राम / शहर एवं राज्य *" : "Native Town & State *"}</label>
                <input
                  type="text"
                  required
                  placeholder={currentLang === 'hi' ? "उदा. मेली (बेंगलुरु)" : "e.g. Meli (Bengaluru)"}
                  className="p-2.5 border-2 border-charcoal rounded-none bg-white text-xs outline-none"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              {/* 80G PAN number logic */}
              <div className="col-span-2 border-t-2 border-charcoal pt-4 flex flex-col space-y-3">
                <div className="flex items-center space-x-2.5">
                  <input
                    type="checkbox"
                    id="chk80g"
                    className="w-4 h-4 accent-maroon-700"
                    checked={is80GRequested}
                    onChange={(e) => setIs80GRequested(e.target.checked)}
                  />
                  <label htmlFor="chk80g" className="text-xs text-maroon-800 font-bold block cursor-pointer select-none">
                    {currentLang === 'hi' ? "आयकर छूट धारा 80G रसीद जनरेट करें" : "Generate Official Income Tax 80G Certificate PDF"}
                  </label>
                </div>

                {is80GRequested && (
                  <div className="bg-cream-100 p-3 rounded-none border-2 border-charcoal flex flex-col space-y-1 animate-fade-in max-w-sm">
                    <label className="text-[10px] text-charcoal/70 uppercase tracking-wider font-mono">PAN CARD ID (स्थायी खाता संख्या) *</label>
                    <input
                      type="text"
                      required={is80GRequested}
                      pattern="[A-Z,a-z]{5}[0-9]{4}[A-Z,a-z]{1}"
                      maxLength={10}
                      placeholder="ABCDE1234F"
                      className="p-2 border-2 border-charcoal rounded-none bg-white text-xs text-charcoal outline-none tracking-widest font-mono font-bold uppercase"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Payment methods */}
              <div className="col-span-2 pt-2 space-y-2">
                <label className="text-xs text-maroon-800 block uppercase tracking-wider font-mono text-[10px]">{currentLang === 'hi' ? "सुरक्षित नेटवर्क गेटवे चुनें *" : "Select Secure Gateway Mode *"}</label>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { id: 'UPI', label: currentLang === 'hi' ? '📲 यूपीआई (जीपे/फ़ोनपे)' : '📲 UPI Apps (PhonePe, GPay)' },
                    { id: 'Online', label: currentLang === 'hi' ? '💳 कार्ड / नेटबैंकिंग' : '💳 Cards / NetBanking' },
                    { id: 'Bank Transfer', label: currentLang === 'hi' ? '🏛️ बैंक खाता ट्रान्सफर' : '🏛️ Manual Bank Transfer' }
                  ].map((pay) => (
                    <button
                      key={pay.id}
                      type="button"
                      onClick={() => setPaymentMethod(pay.id as any)}
                      className={`p-3 border-2 text-xs font-bold rounded-none transition-all cursor-pointer shadow-flat-sm active:translate-y-0.5 ${
                        paymentMethod === pay.id
                          ? 'bg-maroon-700 text-gold-300 border-charcoal scale-99 font-black'
                          : 'bg-white border-charcoal text-charcoal hover:bg-cream-100'
                      }`}
                    >
                      {pay.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full bg-maroon-gradient hover:bg-gold-500 hover:text-maroon-950 text-gold-300 font-black py-4 rounded-none border-2 border-charcoal shadow-flat transition-all cursor-pointer text-sm uppercase tracking-wider"
                >
                  {currentLang === 'hi' ? "पुष्टि करें और आगे बढ़ें (सुरक्षित भुगतान सिम्युलेटर)" : "Confirm Contribution (Simulate Secure Gateway)"}
                </button>
              </div>

            </form>
          ) : (
            /* Simulated Processing Wizard */
            <div className="text-center py-10 space-y-6">
              {paymentStep === 'process' && (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-none border-4 border-gold-450 border-t-maroon-700 animate-spin mx-auto"></div>
                  <div className="space-y-1">
                    <span className="text-xs text-charcoal/60 block font-bold">Connecting to state-approved safe bank routing...</span>
                    <strong className="text-maroon-850 text-lg block">Simulating Transaction of ₹{amount}</strong>
                  </div>
                  <p className="text-[10px] text-charcoal/50">Please wait. Processing secured cryptographic ledger entries.</p>
                </div>
              )}

              {paymentStep === 'done' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="w-16 h-16 bg-green-100 text-green-700 rounded-none border-2 border-charcoal flex items-center justify-center text-3xl mx-auto shadow-flat animate-bounce">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-2xl text-maroon-850">अनुमोदन सफल • Record Registered!</h4>
                    <span className="text-xs text-charcoal/60 block font-medium">Your righteous Dharma Sahyog has been logged in our secure archives. Shasan Prabhavna!</span>
                  </div>

                  {/* Certified legal 80G receipt rendering */}
                  {generatedDonation && (
                    <div id="receipt-print-80g" className="border-4 border-double border-charcoal bg-cream-55 p-6 sm:p-8 rounded-none text-left max-w-xl mx-auto text-charcoal relative overflow-hidden space-y-4 shadow-flat-lg">
                      
                      {/* Artistic background watermarks */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] font-bold text-gold-500/5 rotate-12 pointer-events-none select-none">
                        VANDANA
                      </div>

                      <div className="flex justify-between border-b-2 border-charcoal pb-4">
                        <div>
                          <span className="font-display font-black text-base text-maroon-800 block">{t.trustName}</span>
                          <span className="text-[9px] text-charcoal block uppercase font-black tracking-widest leading-none mt-1">Dungri Pura - Seva Mandir Trust</span>
                          <span className="text-[8px] text-charcoal/60 block mt-0.5">Reg. No: E/1802/Barmer (Income Tax Act 80G Approved)</span>
                        </div>
                        <div className="text-right">
                          <span className="bg-maroon-800 text-gold-300 font-extrabold text-[9px] px-2.5 py-1 rounded-none border border-charcoal block">DHARMIC RECEIPT</span>
                          <span className="text-[9px] text-charcoal/80 font-mono mt-1 block font-black">LNo: {generatedDonation.receiptNumber}</span>
                        </div>
                      </div>

                      <div className="space-y-3.5 text-xs font-bold">
                        <p className="leading-relaxed">
                          This is to appreciate and certify the spiritual generous contributions of <strong>{generatedDonation.donorName}</strong> resident of <strong>{generatedDonation.city}</strong> for sponsoring: 
                          <span className="text-maroon-800 font-black"> {generatedDonation.category} Dharma Seva Fund</span>.
                        </p>

                        <div className="grid grid-cols-2 gap-3 bg-white p-3.5 rounded-none border-2 border-charcoal font-sans">
                          <div>
                            <span className="text-[10px] text-charcoal/50 block">Sahyog Amount:</span>
                            <span className="text-green-700 text-base font-black">₹{generatedDonation.amount.toLocaleString('en-IN')}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-charcoal/50 block">Payment Mode:</span>
                            <span className="text-charcoal block">{generatedDonation.paymentMethod}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-charcoal/50 block font-medium">Transaction ID:</span>
                            <span className="text-charcoal text-[11px] font-mono select-all truncate block">{generatedDonation.transactionId}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-charcoal/50 block font-medium">Labharthi PAN ID:</span>
                            <span className="text-maroon-800 text-xs font-mono block uppercase">{generatedDonation.panNumber || 'NA'}</span>
                          </div>
                        </div>

                        <div className="border-t-2 border-charcoal/30 pt-4 flex justify-between items-end text-[10px] text-charcoal/50">
                          <div>
                            <span className="block font-medium">Date Issued: {new Date(generatedDonation.createdAt).toLocaleDateString()}</span>
                            <span className="block mt-0.5 font-mono">Seal: SIWANCHI-TRUST-MELE</span>
                          </div>
                          <div className="text-center font-bold">
                            <div className="w-24 h-8 bg-gold-400/10 border border-charcoal flex items-center justify-center font-display italic text-[10px] text-maroon-800 rounded mb-1">
                              R. M. Bhansali
                            </div>
                            <span className="block border-t border-charcoal pt-1 text-[8px] text-charcoal/80 uppercase font-black">Governing President</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => window.print()}
                      className="border-2 border-charcoal bg-white hover:bg-cream-100 text-maroon-800 font-black text-xs px-5 py-2.5 rounded-none flex items-center space-x-1.5 transition-all cursor-pointer shadow-flat-sm"
                    >
                      <Download className="w-4 h-4 text-gold-500" />
                      <span>{currentLang === 'hi' ? "रसीद डाउनलोड पीडीएफ" : "Print Authorized Receipt"}</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="bg-maroon-700 text-gold-300 hover:bg-gold-500 hover:text-maroon-900 font-black text-xs px-5 py-2.5 rounded-none shadow-flat border-2 border-charcoal cursor-pointer transition-all"
                    >
                      {currentLang === 'hi' ? "धन्यवाद (वापस जाएं)" : "Done / Exit"}
                    </button>
                  </div>

                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

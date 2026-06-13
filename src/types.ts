/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Basic types for multilingual system
export type Language = 'hi' | 'en';

export type TranslationMap = {
  hi: string;
  en: string;
};

// Trustee item
export interface Trustee {
  id: string;
  name: TranslationMap;
  designation: TranslationMap;
  city: TranslationMap;
  message: TranslationMap;
  phone: string;
  email: string;
  photoUrl: string;
}

// Room categories for Dharamshala
export interface RoomCategory {
  id: string;
  name: TranslationMap;
  description: TranslationMap;
  type: 'AC' | 'Non-AC' | 'Deluxe' | 'Suite' | 'Vihardham Stay';
  capacity: number;
  ratePerDay: number;
  availableRooms: number;
  amenities: TranslationMap[];
  imageUrl: string;
}

// Room Booking record
export interface RoomBooking {
  id: string;
  bookingCode: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  roomsCount: number;
  specialRequests: string;
  paymentOption: 'UPI' | 'Bank Transfer' | 'Online Gateway' | 'Pay at Counter';
  paymentStatus: 'Pending' | 'Approved' | 'Failed';
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  totalAmount: number;
  createdAt: string;
}

// Oswal Palace booking record
export interface PalaceBooking {
  id: string;
  bookingCode: string;
  eventType: TranslationMap;
  date: string;
  guestCount: number;
  organizerName: string;
  contact: string;
  email: string;
  requirements: string[]; // e.g. Catering, Decoration, Stage Light
  paymentStatus: 'Pending' | 'Paid' | 'Refunded';
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  estimatedCost: number;
  createdAt: string;
}

// Donation record
export interface Donation {
  id: string;
  receiptNumber: string;
  donorName: string;
  mobile: string;
  email: string;
  address: string;
  panNumber?: string;
  amount: number;
  category: 'One Time' | 'Monthly' | 'Construction' | 'Temple' | 'Room' | 'Bhojanshala' | 'General';
  paymentMethod: 'UPI' | 'Bank Transfer' | 'Online';
  transactionId?: string;
  is80GRequested: boolean;
  createdAt: string;
  city: string;
}

// Labh / Chadhava listing & sponsorships
export interface LabhOpportunity {
  id: string;
  title: TranslationMap;
  description: TranslationMap;
  amount?: number; // optional, could be "On Request" or specific minimum
  sponsorName?: string; // If already sponsored
  isAvailable: boolean;
  category: 'Temple' | 'Dharamshala' | 'Palace' | 'Festival' | 'Bhojanshala';
}

// Labh Inquiry record
export interface LabhInquiry {
  id: string;
  labhId: string;
  labhTitle: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  message: string;
  status: 'Pending' | 'Contacted' | 'Closed';
  createdAt: string;
}

// Contributor / Donor Wall items
export interface Contributor {
  id: string;
  name: TranslationMap;
  city: TranslationMap;
  family: TranslationMap;
  tier: 'Maha Daanveer' | 'Platinum' | 'Gold' | 'Silver' | 'Contributor';
  amount: number;
  contributionType: TranslationMap;
  year: number;
  message?: TranslationMap;
  photoUrl?: string;
}

// Trust News
export interface NewsItem {
  id: string;
  title: TranslationMap;
  summary: TranslationMap;
  content: TranslationMap;
  category: 'Construction' | 'Donation' | 'Religious' | 'Announcement';
  date: string;
  imageUrl: string;
}

// Event item
export interface EventItem {
  id: string;
  title: TranslationMap;
  description: TranslationMap;
  startDate: string;
  endDate: string;
  category: 'Chaturmas' | 'Updhan' | 'Paryushan' | 'Mahavir Jayanti' | 'Pratishtha' | 'Samaj Events' | 'Weddings';
  location: TranslationMap;
  coordinator: string;
  coordinatorContact: string;
  isRegistrationRequired: boolean;
  registeredCount: number;
}

// Gallery items
export interface GalleryItem {
  id: string;
  title: TranslationMap;
  category: 'Drone' | 'Temple' | 'Construction' | 'Oswal Palace' | 'Samaj Events';
  type: 'image' | 'video';
  url: string; // Image URL or YouTube Embed URL
}

// Live Darshan info
export interface LiveAarti {
  id: string;
  name: TranslationMap;
  time: string;
  description: TranslationMap;
}

// Volunteers
export interface Volunteer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  wing: 'Youth Wing' | 'Women\'s Wing' | 'General' | 'Senior Citizens';
  skills: string;
  registeredAt: string;
}

// Members
export interface TrustMember {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  memberType: 'Life Member' | 'Patron Member' | 'Yearly Subscriber';
  registeredAt: string;
}

// Technical system types
export type AdminRole = 'Super Admin' | 'Trust Admin' | 'Booking Manager' | 'Donation Manager' | 'Content Manager' | 'Event Manager';

export interface AuditLog {
  id: string;
  actor: string;
  role: AdminRole;
  action: string;
  details: string;
  timestamp: string;
}

export interface ContactQuery {
  id: string;
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
  status: 'Pending' | 'Resolved';
  createdAt: string;
}

export interface SlideshowImage {
  id: string;
  url: string;
  title: TranslationMap;
  caption?: TranslationMap;
}

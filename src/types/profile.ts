import type { Venue, ApiResponse } from "./venue";

export interface ProfileMedia {
  url: string;
  alt: string;
}

export interface User {
  name: string;
  email: string;
  bio: string;
  avatar: ProfileMedia;
  banner: ProfileMedia;
  venueManager: boolean;
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
  customer: User;
}

export interface UserFullProfile extends User {
  venues: Venue[];
  bookings: Booking[];
  _count: {
    venues: number;
    bookings: number;
  };
}

export type UserApiResponse = ApiResponse<UserFullProfile>;

export interface ApiResponse<T> {
  data: T;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: MediaItem[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: VenueLocation;
  owner: VenueOwner;
  bookings: Booking[];
  _count: {
    bookings: number;
  };
}

export interface MediaItem {
  url: string;
  alt: string;
}

export interface VenueMeta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface VenueLocation {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export interface VenueOwner {
  name: string;
  email: string;
  bio: string;
  avatar: MediaItem;
  banner: MediaItem;
}

export interface Booking {
  name: string;
  email: string;
  bio: string;
  avatar: MediaItem;
  banner: MediaItem;
}

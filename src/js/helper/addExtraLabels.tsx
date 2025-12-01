import randomBool from "../helper/randomBool.tsx";
import type { Venue } from "../../types/venue.ts";

export interface VenueWithExtras extends Venue {
  policies: {
    freeCancellation: boolean;
    includesTaxes: boolean;
  };
}

export function addExtraLabels(venues: Venue[]): VenueWithExtras[] {
  return venues.map((venue) => ({
    ...venue,
    policies: {
      freeCancellation: randomBool(0.75),
      includesTaxes: randomBool(0.65),
    },
  }));
}

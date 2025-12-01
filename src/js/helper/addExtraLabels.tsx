import randomBool from "../helper/randomBool.tsx";
import type { Venue } from "../../types/venue.ts";

export interface VenueWithExtras extends Venue {
  policies: {
    freeCancellation: boolean;
    includesTaxes: boolean;
  };
}

export function addExtraLabels(venues: Venue | Venue[]): VenueWithExtras[] {
  const list = Array.isArray(venues) ? venues : [venues];
  return list.map((venue) => ({
    ...venue,
    policies: {
      freeCancellation: randomBool(0.75),
      includesTaxes: randomBool(0.65),
    },
  }));
}

import { useAdventureContext } from "../../context/AdventureContext/useAdventureContext";
import {
  CarSimpleIcon,
  WifiHighIcon,
  AvocadoIcon,
  PawPrintIcon,
} from "@phosphor-icons/react";
import { useApi } from "../../hook/useApi";
import type { Venue } from "../../types/venue.ts";
import { useMemo } from "react";
import { addExtraLabels } from "../../js/helper/addExtraLabels.tsx";
import { StarIcon } from "@phosphor-icons/react";
import ErrorComp from "../ErrorComp/index.tsx";
import LoadingComp from "../LoadingComp/index.tsx";
import { Link } from "react-router-dom";
import { useSearchContext } from "../../context/SearchContext/useSearchContext";
import { useFilterContext } from "../../context/FilterContext/useFilterContext.ts";
import { useContext } from "react";
import { ToastContext } from "../../context/ToastContext/useToastContext";

const url = "https://v2.api.noroff.dev/holidaze/venues?_bookings=true";

function VenueLandscapeListing() {
  const { showToast } = useContext(ToastContext);

  const { adventureType } = useAdventureContext();
  const { data: posts, isLoading, isError } = useApi<Venue>(url);
  const { numberOfDays, startDate, endDate, numberOfGuests, location } =
    useSearchContext();
  const { filters } = useFilterContext();
  const venues = useMemo(() => {
    if (!posts) return null;
    return addExtraLabels(posts);
  }, [posts]);
  const token = localStorage.getItem("token");

  function rangesOverlap(start1: Date, end1: Date, start2: Date, end2: Date) {
    return start1 <= end2 && end1 >= start2;
  }

  const filteredVenues = useMemo(() => {
    if (!venues) return [];
    return venues.filter((venue) => {
      if (startDate && endDate) {
        const overlap = venue.bookings.some((booking) => {
          return rangesOverlap(
            startDate,
            endDate,
            new Date(booking.dateFrom),
            new Date(booking.dateTo)
          );
        });
        if (overlap) return false;
      }

      if (numberOfGuests && venue.maxGuests < numberOfGuests) return false;
      if (location && location.length > 0) {
        const venueLocation = location.toLowerCase();
        const city = venue.location.city?.toLowerCase() || "";
        const country = venue.location.country?.toLowerCase() || "";
        const address = venue.location.address?.toLowerCase() || "";
        const match =
          city.includes(venueLocation) ||
          country.includes(venueLocation) ||
          address.includes(venueLocation);
        if (!match) return false;
      }

      return true;
    });
  }, [venues, startDate, endDate, numberOfGuests, location]);

  const fullyFilteredVenues = useMemo(() => {
    if (!filteredVenues) return [];

    return filteredVenues.filter((venue) => {
      if (filters.prices.length > 0) {
        const venuePrice = venue.price;
        const matchPrice = filters.prices.some((priceRange) => {
          if (priceRange === "Under €50") return venuePrice < 50;
          if (priceRange === "€50-100")
            return venuePrice >= 51 && venuePrice <= 100;
          if (priceRange === "€100-200")
            return venuePrice >= 101 && venuePrice <= 200;
          if (priceRange === "€200+") return venuePrice > 201;
        });
        if (!matchPrice) return false;
      }

      if (filters.types.length > 0) {
        const matchesType = filters.types.some((type) =>
          venue.name.toLowerCase().includes(type.toLowerCase())
        );

        if (!matchesType) return false;
      }

      if (filters.amenities.length > 0) {
        const amenities = venue.meta;
        const matchAmenities = filters.amenities.every((amenity) => {
          if (amenity === "Free Wi-Fi") return amenities.wifi;
          if (amenity === "Breakfast") return amenities.breakfast;
          if (amenity === "Parking") return amenities.parking;
          if (amenity === "Pets allowed") return amenities.pets;
        });
        if (!matchAmenities) return false;
      }
      return true;
    });
  }, [filteredVenues, filters]);

  const topVenues = useMemo(() => {
    if (!venues) return null;
    return fullyFilteredVenues.filter((venue) => venue.rating >= 4);
  }, [venues, fullyFilteredVenues]);
  function buildBookingPayload(id: string) {
    return {
      dateFrom: startDate?.toISOString(),
      dateTo: endDate?.toISOString(),
      guests: Number(numberOfGuests),
      venueId: id,
    };
  }

  async function handleExpressBookingSubmit(
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/bookings`,
        {
          method: "post",
          body: JSON.stringify(buildBookingPayload(id)),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_TOKEN,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors?.[0]?.message || "Failed to book venue"
        );
      }
      if (response.ok) {
        showToast("success", "Booking successful!");
      }
    } catch (error) {
      console.error(error);
      showToast("error", (error as Error).message);
    }
  }

  if (isLoading) {
    return <LoadingComp />;
  }

  if (isError) {
    return <ErrorComp />;
  }

  return (
    <>
      {topVenues?.map((post) => (
        <li
          key={post.id}
          className={`w-[90%] max-w-90 shrink-0 h-52 rounded-sm flex ${adventureType === "affluent" ? "flex-col" : "flex-row"} relative z-0`}
        >
          <Link to={`/venue/${post.id}`} className="absolute inset-0 z-10" />
          <img
            src={post.media[0].url}
            alt={post.media[0].alt}
            className={`flex-1 object-cover ${adventureType === "affluent" ? "w-full min-h-0" : "h-full min-w-2"} `}
          />
          <div className="flex flex-row ">
            <div
              className={`font-sans flex-5 bg-hdYellow p-3 flex flex-col gap-2 ${adventureType === "affluent" ? "" : "justify-between"}`}
            >
              {adventureType === "affluent" ? (
                <>
                  <div>
                    <h3 className="font-sans font-bold leading-5">
                      {post.name}
                    </h3>
                    <p>
                      {post.location.city}, {post.location.country}
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-2 text-sm">
                    <p className="font-bold">
                      {post.rating}
                      <StarIcon
                        size={12}
                        weight="fill"
                        className="inline-block mb-0.5 ml-0.5 text-hdOrange"
                      />
                    </p>
                    <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
                    <p>
                      <span className="font-bold">£500</span> for {numberOfDays}{" "}
                      nights
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-sans font-bold leading-5 max-w-44">
                      {post.name.length > 40
                        ? `${post.name.slice(0, 40)}...`
                        : post.name}
                    </h3>
                    <p>
                      {post.location.city}, {post.location.country}
                    </p>
                    <div className="flex flex-row items-center gap-2 text-sm">
                      <p className="font-bold">
                        {post.rating}
                        <StarIcon
                          size={12}
                          weight="fill"
                          className="inline-block mb-0.5 ml-0.5 text-hdOrange"
                        />
                      </p>
                      <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
                      <p>{post._count.bookings} reviews</p>
                    </div>
                    <ul
                      className={`flex flex-col text-hdRed text-sm ${adventureType === "explorer" ? "block" : "hidden"} `}
                    >
                      {post.meta.wifi && (
                        <li className="flex flex-row items-center gap-1.5 relative h-5">
                          <WifiHighIcon size={16} className="mb-1" />
                          <p className="leading-3">Free Wi-Fi</p>
                        </li>
                      )}
                      {post.meta.parking && (
                        <li className="flex flex-row items-center gap-1.5 relative h-5">
                          <CarSimpleIcon size={16} className="mb-1" />
                          <p className="leading-3">Parking</p>
                        </li>
                      )}
                      {post.meta.breakfast && (
                        <li className="flex flex-row items-center gap-1.5 relative h-5">
                          <AvocadoIcon size={16} className="mb-1" />
                          <p className="leading-3">Breakfast</p>
                        </li>
                      )}
                      {post.meta.pets && (
                        <li className="flex flex-row items-center gap-1.5 relative h-5">
                          <PawPrintIcon size={16} className="mb-1" />
                          <p className="leading-3">Pets allowed</p>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <ul
                      className={`flex flex-col text-hdRed text-sm ${adventureType === "guardian" ? "block" : "hidden"} `}
                    >
                      {post.policies.freeCancellation && (
                        <li>Free cancellation</li>
                      )}
                      {post.policies.includesTaxes && (
                        <li>Total include taxes and fees</li>
                      )}
                    </ul>
                    <p className="text-lg">
                      <span className="font-bold">
                        £{post.price * numberOfDays}
                      </span>{" "}
                      for {numberOfDays} nights
                    </p>
                  </div>
                </>
              )}
            </div>
            <button
              className={`bg-hdRed font-light text-hdWhite leading-5 aspect-square flex-2 ${adventureType === "affluent" ? "block" : "hidden"} z-20`}
              onClick={(e) => handleExpressBookingSubmit(e, post.id)}
            >
              Express Booking
            </button>
          </div>
        </li>
      ))}
      {topVenues?.length === 0 && (
        <p>
          No results found. Please try again with different search criteria.
        </p>
      )}
    </>
  );
}

export default VenueLandscapeListing;

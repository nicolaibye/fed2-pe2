import { useMemo } from "react";
import { useAdventureContext } from "../../context/AdventureContext/useAdventureContext";
import { useApi } from "../../hook/useApi";
import type { Venue } from "../../types/venue.ts";
import { addExtraLabels } from "../../js/helper/addExtraLabels.tsx";
import { StarIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import ErrorComp from "../ErrorComp/index.tsx";
import LoadingComp from "../LoadingComp/index.tsx";
import { useSearchContext } from "../../context/SearchContext/useSearchContext";
import { useFilterContext } from "../../context/FilterContext/useFilterContext";

const url = "https://v2.api.noroff.dev/holidaze/venues?_bookings=true";

function VenueSquareListing() {
  const { adventureType } = useAdventureContext();
  const { data: posts, isLoading, isError } = useApi<Venue>(url);
  const { numberOfDays, numberOfGuests, startDate, endDate, location } =
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

      if (filters.ratings.length > 0) {
        const rating = venue.rating;
        const matchRating = filters.ratings.some((ratingRange) => {
          if (ratingRange === "Under 2") return rating < 2;
          if (ratingRange === "2-3") return rating >= 2 && rating < 3;
          if (ratingRange === "3-4") return rating >= 3 && rating < 4;
          if (ratingRange === "4-5") return rating >= 4;
        });
        if (!matchRating) return false;
      }

      if (filters.types.length > 0) {
        const matchesType = filters.types.some((type) =>
          venue.name.toLowerCase().includes(type.toLowerCase())
        );

        if (!matchesType) return false;
      }

      if (filters.search.length > 2) {
        const matchesSearch = venue.name
          .toLowerCase()
          .includes(filters.search.toLowerCase());
        if (!matchesSearch) return false;
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
        throw new Error();
      }
      if (response.ok) {
        alert("Booking successful!");
      }
    } catch (error) {
      console.error(error);
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
      {fullyFilteredVenues?.map((post) => (
        <li
          key={post.id}
          className={`w-full shrink-0 h-auto aspect-square flex flex-col relative`}
        >
          <Link to={`/venue/${post.id}`} className="absolute inset-0 z-10" />
          <div className="flex-1 relative h-full w-full overflow-hidden">
            <img
              src={post.media[0].url}
              alt={post.media[0].alt}
              className="object-cover w-full h-full rounded-t-xs"
            />
            {adventureType === "affluent" ? (
              <>
                <button
                  className="absolute bottom-2 left-2 square-venue-label z-20"
                  onClick={(e) => handleExpressBookingSubmit(e, post.id)}
                >
                  Express Checkout &#x2192;
                </button>
              </>
            ) : (
              <>
                <ul
                  className={`flex flex-row flex-wrap gap-1 absolute bottom-2 left-2 ${adventureType === "guardian" ? "block" : "hidden"} `}
                >
                  {post.policies.freeCancellation && (
                    <li className="square-venue-label w-fit">
                      Free cancellation
                    </li>
                  )}
                  {post.policies.includesTaxes && (
                    <li className="square-venue-label">
                      Total include taxes and fees
                    </li>
                  )}
                </ul>
                <ul
                  className={`flex flex-row flex-wrap gap-1 absolute bottom-2 left-2 ${adventureType === "explorer" ? "block" : "hidden"} `}
                >
                  {post.meta.wifi && (
                    <li className="square-venue-label w-fit">Free Wi-Fi</li>
                  )}
                  {post.meta.parking && (
                    <li className="square-venue-label w-fit">Parking</li>
                  )}
                  {post.meta.breakfast && (
                    <li className="square-venue-label w-fit">Breakfast</li>
                  )}
                  {post.meta.pets && (
                    <li className="square-venue-label w-fit">Pets allowed</li>
                  )}
                </ul>
              </>
            )}
          </div>
          <div className="font-sans bg-hdYellow p-2 flex flex-col gap-2 rounded-b-xs">
            <div>
              <h3 className="font-sans font-bold leading-5">
                {post.name.length > 20
                  ? `${post.name.slice(0, 20)}...`
                  : post.name}
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
                <span className="font-bold">£{post.price * numberOfDays}</span>{" "}
                for {numberOfDays} nights
              </p>
            </div>
          </div>
        </li>
      ))}
      {fullyFilteredVenues.length === 0 && (
        <p className="grid grid-cols-1 xl:grid-cols-3">
          No results found. Please try again with different search criteria.
        </p>
      )}
    </>
  );
}

export default VenueSquareListing;

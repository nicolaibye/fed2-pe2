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

const url = "https://v2.api.noroff.dev/holidaze/venues";

function VenueLandscapeListing() {
  const { adventureType } = useAdventureContext();
  const { data: posts, isLoading, isError } = useApi<Venue>(url);
  const { numberOfDays } = useSearchContext();
  const errorMessage = "Please try again later.";
  const venues = useMemo(() => {
    if (!posts) return null;
    return addExtraLabels(posts);
  }, [posts]);
  const topVenues = useMemo(() => {
    if (!venues) return null;
    return venues.filter((venue) => venue.rating >= 5);
  }, [venues]);

  if (isLoading) {
    return <LoadingComp />;
  }

  if (isError) {
    return <ErrorComp errorMessage={errorMessage} />;
  }

  return (
    <>
      {topVenues?.map((post) => (
        <li
          key={post.id}
          className={`w-[90%] max-w-90 shrink-0 h-52 rounded-sm flex ${adventureType === "affluent" ? "flex-col" : "flex-row"} relative`}
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
                          <p className="leading-3">Wifi</p>
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
              className={`bg-hdRed font-light text-hdWhite leading-5 aspect-square flex-2 ${adventureType === "affluent" ? "block" : "hidden"} `}
            >
              Express Booking
            </button>
          </div>
        </li>
      ))}
    </>
  );
}

export default VenueLandscapeListing;

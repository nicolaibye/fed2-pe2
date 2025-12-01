import { useMemo } from "react";
import { useAdventureContext } from "../../context/AdventureContext/useAdventureContext";
import { useApi } from "../../hook/useApi";
import type { Venue } from "../../types/venue.ts";
import { addExtraLabels } from "../../js/helper/addExtraLabels.tsx";
import { StarIcon } from "@phosphor-icons/react";

const url = "https://v2.api.noroff.dev/holidaze/venues";

function VenueSquareListing() {
  const { adventureType } = useAdventureContext();
  const { data: posts, isLoading, isError } = useApi<Venue>(url);
  const errorMessage = "Please try again later.";
  const venues = useMemo(() => {
    if (!posts) return null;
    return addExtraLabels(posts);
  }, [posts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data. {errorMessage}</div>;
  }

  return (
    <>
      {venues?.map((post) => (
        <li
          key={post.id}
          className={`w-full shrink-0 h-auto aspect-square flex flex-col`}
        >
          <div className="flex-1 relative h-full w-full overflow-hidden">
            <img
              src={post.media[0].url}
              alt={post.media[0].alt}
              className="object-cover w-full h-full rounded-t-xs"
            />
            {adventureType === "affluent" ? (
              <>
                <button className="absolute bottom-2 left-2 square-venue-label">
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
                    <li className="square-venue-label w-fit">Pool</li>
                  )}
                  {post.meta.breakfast && (
                    <li className="square-venue-label w-fit">
                      Breakfast included
                    </li>
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
                <span className="font-bold">£{post.price * 4}</span> for 4
                nights
              </p>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}

export default VenueSquareListing;

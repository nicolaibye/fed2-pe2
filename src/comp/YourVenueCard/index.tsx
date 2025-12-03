import { GearIcon, TrashIcon } from "@phosphor-icons/react";
import { useMemo } from "react";
import { useApi } from "../../hook/useApi";
import type { Venue } from "../../types/venue.ts";
import LoadingComp from "../../comp/LoadingComp";
import ErrorComp from "../../comp/ErrorComp";
import { Link, useParams } from "react-router-dom";

function YourVenueCard() {
  const loggedInUser = localStorage.getItem("user")?.replace(/"/g, "");
  const token = localStorage.getItem("token");
  const urlPath = window.location.pathname;
  const auth =
    token && (urlPath === "/account" || urlPath === `/account/${loggedInUser}`);
  const { username } = useParams();
  const userToFetch = username ? username : loggedInUser;
  const userFetchOptions = useMemo(
    () => ({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_TOKEN,
      },
    }),
    [token]
  );
  const { data, isLoading, isError } = useApi<Venue>(
    userToFetch
      ? `https://v2.api.noroff.dev/holidaze/profiles/${userToFetch}/venues`
      : "",
    userToFetch ? userFetchOptions : undefined
  );
  const venues = data || [];

  if (isLoading) {
    return <LoadingComp />;
  }

  if (isError) {
    return <ErrorComp />;
  }

  return (
    <>
      {venues.length === 0 ? (
        <p>No venues to display.</p>
      ) : (
        <>
          {venues.map((trip) => (
            <li key={trip.id} className={`w-full h-auto rounded-sm flex`}>
              <img
                src={trip.media[0]?.url}
                alt={trip.media[0]?.alt}
                className={`object-cover rounded-t-xs aspect-square h-20`}
              />
              <div
                className={`font-sans w-full bg-hdYellow p-2 flex flex-col justify-center rounded-b-xs relative cursor-pointer`}
              >
                <Link
                  to={`/venue/${trip.id}`}
                  className="absolute inset-0 z-10"
                />
                <h3 className="font-sans font-bold leading-5">{trip.name}</h3>
                <div className="flex flex-row flex-wrap items-center text-xs">
                  <p>
                    {trip?.location.city}, {trip?.location.country}
                  </p>
                </div>
              </div>
              <div className={`${auth ? "flex" : "hidden"} flex-col`}>
                <button className="aspect-square bg-hdOrange w-10 h-auto flex items-center justify-center text-hdWhite">
                  <GearIcon weight="regular" size={22} />
                </button>
                <button className="aspect-square bg-hdRed w-10 h-auto flex items-center justify-center text-hdWhite">
                  <TrashIcon weight="regular" size={22} />
                </button>
              </div>
            </li>
          ))}
        </>
      )}
    </>
  );
}

export default YourVenueCard;

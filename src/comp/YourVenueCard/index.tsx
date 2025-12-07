import { GearIcon, TrashIcon } from "@phosphor-icons/react";
import { useMemo } from "react";
import { useApi } from "../../hook/useApi";
import type { Venue } from "../../types/venue.ts";
import LoadingComp from "../../comp/LoadingComp";
import ErrorComp from "../../comp/ErrorComp";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { ToastContext } from "../../context/ToastContext/useToastContext";

function YourVenueCard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useContext(ToastContext);
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
      ? `https://v2.api.noroff.dev/holidaze/profiles/${userToFetch}/venues?_bookings=true`
      : "",
    userToFetch ? userFetchOptions : undefined
  );
  const venues = data || [];

  function handleDelete(venueId: string) {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_TOKEN,
      },
    })
      .then((response) => {
        if (response.ok) {
          showToast("success", "Venue successfully deleted!");
        } else {
          throw new Error("Failed to delete venue");
        }
      })
      .catch((error) => {
        console.error(error);
        showToast("error", (error as Error).message);
      });
  }

  function handleEdit(venueId: string) {
    const overlay = document.getElementById("edit-overlay");
    if (overlay) {
      overlay.classList.toggle("hidden");
      overlay.classList.toggle("flex");
      document.body.classList.toggle("overflow-hidden");
      searchParams.set("editVenue", "true");
      searchParams.set("id", venueId);
      setSearchParams(searchParams);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  }

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
            <li key={trip.id}>
              <div className={`w-full h-auto rounded-sm flex`}>
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
                  <button
                    className="aspect-square bg-hdOrange w-10 h-auto flex items-center justify-center text-hdWhite"
                    onClick={handleEdit.bind(null, trip.id)}
                  >
                    <GearIcon weight="regular" size={22} />
                  </button>
                  <button
                    className="aspect-square bg-hdRed w-10 h-auto flex items-center justify-center text-hdWhite"
                    onClick={handleDelete.bind(null, trip.id)}
                  >
                    <TrashIcon weight="regular" size={22} />
                  </button>
                </div>
              </div>
              <p className="text-base font-bold mt-2">Bookings</p>
              {trip.bookings.map((booking) => (
                <div
                  className="flex flex-row text-base justify-between font-light"
                  key={booking.id}
                >
                  <p>
                    <span className="font-bold"> Dates: </span>{" "}
                    {formatDate(booking.dateFrom)} to{" "}
                    {formatDate(booking.dateTo)}
                  </p>
                  <p>
                    <span className="font-bold">Guests: </span>
                    {booking.guests}
                  </p>
                </div>
              ))}
            </li>
          ))}
        </>
      )}
    </>
  );
}

export default YourVenueCard;

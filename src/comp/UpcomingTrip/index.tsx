import { useMemo } from "react";
import { useApi } from "../../hook/useApi";
import type { User } from "../../types/profile.ts";
import LoadingComp from "../../comp/LoadingComp";
import ErrorComp from "../../comp/ErrorComp";
import { format } from "date-fns";
import { CalendarXIcon } from "@phosphor-icons/react";
import { useContext } from "react";
import { ToastContext } from "../../context/ToastContext/useToastContext";

function UpcomingTrip() {
  const { showToast } = useContext(ToastContext);

  const loggedInUser = localStorage.getItem("user")?.replace(/"/g, "");
  const token = localStorage.getItem("token");
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
  const {
    data: user,
    isLoading,
    isError,
  } = useApi<User>(
    loggedInUser
      ? `https://v2.api.noroff.dev/holidaze/profiles/${loggedInUser}/bookings?_venue=true`
      : "",
    loggedInUser ? userFetchOptions : undefined
  );

  function handleCancelTrip(bookingId: string) {
    fetch(`https://v2.api.noroff.dev/holidaze/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_TOKEN,
      },
    })
      .then((response) => {
        if (response.ok) {
          showToast("success", "Trip cancelled!");
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error(error);
        showToast("error", (error as Error).message);
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
      {user ? (
        user.map((booking) => {
          const dates = [new Date(booking.dateFrom), new Date(booking.dateTo)];
          const formattedDates = `${format(dates[0], "d")} - ${format(
            dates[dates.length - 1],
            "d MMM yyyy"
          )}`;
          return (
            <li
              key={booking.id}
              className={`w-full h-auto flex flex-col base-shadow relative`}
            >
              <button
                className="absolute top-4 right-4 z-100 bg-hdRed rounded-full flex flex-row items-center gap-2"
                onClick={() => handleCancelTrip(booking.id)}
              >
                <div className="circle-button base-shadow">
                  <CalendarXIcon
                    weight="regular"
                    size={20}
                    className="text-hdWhite "
                  />
                </div>
                <p className="text-hdWhite pr-3">Cancel trip</p>
              </button>
              <img
                src={booking.venue.media[0].url}
                alt={booking.venue.media[0].alt}
                className={`object-cover rounded-t-xs aspect-5/2`}
              />
              <div
                className={`font-sans flex-5 bg-hdYellow p-2 flex flex-col rounded-b-xs`}
              >
                <h3 className="font-sans font-bold leading-5">
                  {booking.venue.name}
                </h3>
                <div className="flex flex-row items-center gap-2 text-sm">
                  <p>
                    {booking.venue.location.city},{" "}
                    {booking.venue.location.country}
                  </p>
                  <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
                  <p>{formattedDates}</p>
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <p className="font-sans">You have no upcoming trips.</p>
      )}
    </>
  );
}

export default UpcomingTrip;

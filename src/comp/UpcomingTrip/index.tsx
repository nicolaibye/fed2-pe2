import { useMemo } from "react";
import { useApi } from "../../hook/useApi";
import type { User } from "../../types/profile.ts";
import LoadingComp from "../../comp/LoadingComp";
import ErrorComp from "../../comp/ErrorComp";

function UpcomingTrip() {
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
      ? `https://v2.api.noroff.dev/holidaze/profiles/${loggedInUser}/bookings`
      : "",
    loggedInUser ? userFetchOptions : undefined
  );

  if (isLoading) {
    return <LoadingComp />;
  }

  if (isError) {
    return <ErrorComp />;
  }

  return (
    <>
      {user && user.length > 0 ? (
        user.map((booking) => (
          <li
            key={booking.id}
            className={`w-full h-auto flex flex-col base-shadow`}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3p565lkyXBLlkNemqfGmUAWtVxN5XT6cQg&s"
              alt=""
              className={`object-cover rounded-t-xs aspect-5/2`}
            />
            <div
              className={`font-sans flex-5 bg-hdYellow p-2 flex flex-col rounded-b-xs`}
            >
              <h3 className="font-sans font-bold leading-5">
                Clarion Hotel The Hub
              </h3>
              <div className="flex flex-row items-center gap-2 text-sm">
                <p>Milan, Italy</p>
                <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
                <p>21-27 December 2025</p>
              </div>
            </div>
          </li>
        ))
      ) : (
        <p className="font-sans">You have no upcoming trips.</p>
      )}
    </>
  );
}

export default UpcomingTrip;

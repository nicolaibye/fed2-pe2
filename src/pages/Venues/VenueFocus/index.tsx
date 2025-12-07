import {
  ArrowSquareOutIcon,
  BuildingIcon,
  CaretLeftIcon,
  HeartStraightIcon,
  MapPinSimpleIcon,
  ShoppingBagIcon,
} from "@phosphor-icons/react";
import GoogleMapsVenue from "../../../comp/GoogleMapsVenue";
import DatePicker from "../../../comp/DatePicker";
import { useMemo, useState } from "react";
import VenueReview from "../../../comp/VenueReview";
import VenueLandscapeListing from "../../../comp/VenueLandscapeListing";
import MobileReserveBar from "../../../comp/MobileReserveBar";
import { useApi } from "../../../hook/useApi/index.tsx";
import type { Venue } from "../../../types/venue.ts";
import type { User } from "../../../types/profile.ts";
import { useParams, useNavigate } from "react-router-dom";
import { copyUrlDesktop, copyUrlMobile } from "../../../js/helper/copyUrl.tsx";
import LoadingComp from "../../../comp/LoadingComp/index.tsx";
import ErrorComp from "../../../comp/ErrorComp/index.tsx";
import { Link } from "react-router-dom";
import { useSearchContext } from "../../../context/SearchContext/useSearchContext.ts";
import { useContext } from "react";
import { ToastContext } from "../../../context/ToastContext/useToastContext";

const url = "https://v2.api.noroff.dev/holidaze/venues";

function VenueFocus() {
  const { showToast } = useContext(ToastContext);

  const [hearted, setHearted] = useState(false);
  const {
    numberOfDays,
    numberOfGuests,
    setNumberOfGuests,
    startDate,
    endDate,
  } = useSearchContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: post,
    isLoading,
    isError,
  } = useApi<Venue>(url + `/${id}?_owner=true`);

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
  const { data: user } = useApi<User>(
    post
      ? `https://v2.api.noroff.dev/holidaze/profiles/${post.owner.name}`
      : "",
    post ? userFetchOptions : undefined
  );

  function buildBookingPayload() {
    return {
      dateFrom: startDate?.toISOString(),
      dateTo: endDate?.toISOString(),
      guests: Number(numberOfGuests),
      venueId: id,
    };
  }

  async function handleVenueSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/bookings`,
        {
          method: "post",
          body: JSON.stringify(buildBookingPayload()),
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
      <section className="relative h-auto aspect-square md:aspect-auto md:h-[50vh] -mx-5 -mt-5 md:-mx-10 md:-mt-10">
        <img
          src={post?.media[0].url}
          alt={post?.media[0].alt}
          className="h-full w-full object-cover"
        />
        <div className="absolute w-full h-full top-0 p-3 flex flex-row justify-between items-start left-1/2 -translate-x-1/2 lg:max-w-5xl">
          <button
            className="circle-button cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <CaretLeftIcon weight="bold" size={20} />
          </button>
          <div className="flex flex-col items-end justify-between h-full">
            <div className="flex flex-row gap-2 md:opacity-0">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-hdYellow text-hdBlack relative"
                onClick={copyUrlMobile}
              >
                <ArrowSquareOutIcon weight="bold" />
                <span className="absolute square-venue-label bg-hdWhite right-9 bottom-0.5 opacity-0 w-24 pointer-events-none transition-all duration-300 copy-message-mobile">
                  Copied link
                </span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-hdYellow text-hdBlack">
                <HeartStraightIcon
                  weight={hearted ? "fill" : "bold"}
                  onClick={() => setHearted(!hearted)}
                />
              </button>
            </div>
            <p className="bg-hdBlack/75 text-hdWhite text-sm px-2.5 py-1 rounded-full">
              1 / {post?.media.length}
            </p>
          </div>
        </div>
      </section>
      <div className="lg:grid lg:grid-cols-2 lg:gap-5 lg:max-w-5xl lg:mx-auto">
        <div>
          <div className="mt-5 flex flex-col gap-2">
            <div className="md:flex md:flex-row md:items-center md:gap-4 lg:justify-between">
              <h1 className="text-2xl font-serif font-bold leading-5.5">
                {post?.name}
              </h1>
              <div className="hidden md:flex flex-row gap-2">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-hdYellow text-hdBlack relative"
                  onClick={copyUrlDesktop}
                >
                  <ArrowSquareOutIcon weight="bold" />
                  <span className="absolute square-venue-label bg-hdWhite bottom-9 opacity-0 w-22 pointer-events-none transition-all duration-300 copy-message">
                    Copied link
                  </span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-hdYellow text-hdBlack">
                  <HeartStraightIcon
                    weight={hearted ? "fill" : "bold"}
                    onClick={() => setHearted(!hearted)}
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 text-base">
              <p>
                {post?.location.address}, {post?.location.city}
              </p>
              <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
              <p>Max guests: {post?.maxGuests}</p>
            </div>
            <ul className="flex flex-row flex-wrap gap-1">
              {post?.meta.breakfast && (
                <li className="square-venue-label">Breakfast included</li>
              )}
              {post?.meta.wifi && (
                <li className="square-venue-label">Fast Wi-Fi</li>
              )}
              {post?.meta.parking && (
                <li className="square-venue-label">Parking</li>
              )}
              {post?.meta.pets && (
                <li className="square-venue-label">Pets allowed</li>
              )}
            </ul>
          </div>
          <section className="mt-5 flex flex-col gap-2">
            <h2 className="second-heading">Rating</h2>
            <div className="flex flex-row items-center gap-2 text-base">
              <p className="font-bold">{post?.rating.toFixed(1)}</p>
              <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
              <p>{post?._count.bookings} reviews</p>
            </div>
          </section>
          <section className="mt-5 flex flex-col gap-2">
            <h2 className="second-heading">Location</h2>
            <GoogleMapsVenue />
            <div>
              <ul>
                {[
                  {
                    id: "attraction1",
                    location: "Imperial Hotel Tokyo",
                    distance: "4 min",
                    icon: <BuildingIcon weight="bold" />,
                  },
                  {
                    id: "attraction2",
                    location: "Shibuya shopping district",
                    distance: "8 min",
                    icon: <ShoppingBagIcon weight="bold" />,
                  },
                  {
                    id: "attraction3",
                    location: "Imperial Palace",
                    distance: "12 min",
                    icon: <MapPinSimpleIcon weight="bold" />,
                  },
                ].map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-2 select-none"
                    >
                      <div className="flex flex-row items-center gap-2">
                        {item.icon}
                        <h3 className="font-sans font-bold">{item.location}</h3>
                      </div>
                      <p>{item.distance}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
          <section className="mt-5 flex flex-col gap-2">
            <h2 className="second-heading">About</h2>
            <p className="leading-4">{post?.description}</p>
            <div className="flex flex-row items-center gap-2 mt-2">
              <img
                src={post?.owner.avatar.url}
                alt={post?.owner.avatar.alt}
                className="aspect-square w-10 object-cover object-top rounded-sm border-2 border-hdRed"
              />
              <div className="flex flex-col gap-1.5 relative">
                <Link
                  to={`/account/${post?.owner.name}`}
                  className="absolute inset-0 z-10"
                />
                <h3 className="font-bold leading-3">{post?.owner.name}</h3>
                {user && (
                  <div className="flex flex-row items-center gap-2 text-base leading-3">
                    <p>{user._count.venues} Venues</p>
                    <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
                    <p>{user._count.bookings} Bookings</p>
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className="my-12 flex flex-col mx-auto gap-2 max-w-80 lg:hidden z-0">
            <form className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-3 w-full relative base-shadow z-50">
                <DatePicker />
                <input
                  type="number"
                  placeholder="Guests"
                  className={`input-field cut-corner`}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                  value={numberOfGuests}
                />
              </div>
              <div className="base-shadow">
                <button
                  type="submit"
                  className={`text-xl font-extrabold font-serif w-full h-10 text-hdBlack bg-hdYellow cut-corner`}
                  onClick={handleVenueSubmit}
                >
                  Reserve
                </button>
              </div>
              <div className="flex flex-col text-center text-base font-light">
                <p>
                  <span className="font-bold">
                    £{post?.price * numberOfDays}
                  </span>{" "}
                  for {numberOfDays} nights
                </p>
              </div>
            </form>
          </section>
          <section className="mt-5 flex flex-col gap-2 -mr-5">
            <h2 className="second-heading">Reviews</h2>
            <ul className="flex flex-row lg:flex-col overflow-x-scroll lg:overflow-x-auto overflow-y-hidden gap-4">
              <VenueReview />
            </ul>
          </section>
          <section className="mt-5 flex flex-col gap-2">
            <h2 className="second-heading">Similar Venues</h2>
            <ul className="flex flex-row gap-2 overflow-x-scroll rounded-xs no-scrollbar">
              <VenueLandscapeListing />
            </ul>
          </section>
          <section className="mb-15 md:mb-5">
            <div className="mt-5 flex flex-col gap-2">
              <h2 className="second-heading">Information</h2>
              <p className="leading-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                ultrices ligula ac quam viverra porttitor. Phasellus libero
                magna, imperdiet a scelerisque in, mollis ac diam. Nulla at
                dolor tincidunt, pharetra mauris sit amet, malesuada orci. Morbi
                placerat metus neque, sit amet non sagittis turpis interdum at.
                Quisque suscipit id odio ac dictum.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <h3 className="second-heading">Policies</h3>
              <p className="leading-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                ultrices ligula ac quam viverra porttitor. Phasellus libero
                magna, imperdiet a scelerisque in, mollis ac diam. Nulla at
                dolor tincidunt, pharetra mauris sit amet, malesuada orci. Morbi
                placerat metus neque, sit amet non sagittis turpis interdum at.
                Quisque suscipit id odio ac dictum.
              </p>
            </div>
          </section>
          <MobileReserveBar />
        </div>
        <section className="my-12 hidden flex-col mx-auto gap-2 max-w-80 lg:flex z-0">
          <form className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-3 w-full relative base-shadow z-50">
              <DatePicker />
              <input
                type="number"
                placeholder="Guests"
                className={`input-field cut-corner`}
                onChange={(e) => setNumberOfGuests(e.target.value)}
                value={numberOfGuests}
              />
            </div>
            <div className="base-shadow">
              <button
                type="submit"
                className={`text-xl font-extrabold font-serif w-full h-10 text-hdBlack bg-hdYellow cut-corner`}
                onClick={handleVenueSubmit}
              >
                Reserve
              </button>
            </div>
            <div className="flex flex-col text-center text-base font-light">
              <p>
                <span className="font-bold">£{post?.price * numberOfDays}</span>{" "}
                for {numberOfDays} nights
              </p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default VenueFocus;

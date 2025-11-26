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
import { useState } from "react";
import VenueReview from "../../../comp/VenueReview";
import VenueLandscapeListing from "../../../comp/VenueLandscapeListing";
import MobileReserveBar from "../../../comp/MobileReserveBar";

function VenueFocus() {
  const [hearted, setHearted] = useState(false);
  return (
    <>
      <section className="relative h-auto aspect-square -mx-5 -mt-5">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3p565lkyXBLlkNemqfGmUAWtVxN5XT6cQg&s"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute w-full h-full top-0 p-3 flex flex-row justify-between items-start">
          <button className="circle-button">
            <CaretLeftIcon weight="bold" size={20} />
          </button>
          <div className="flex flex-col items-end justify-between h-full">
            <div className="flex flex-row gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-hdYellow text-hdBlack">
                <ArrowSquareOutIcon weight="bold" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-hdYellow text-hdBlack">
                <HeartStraightIcon
                  weight={hearted ? "fill" : "bold"}
                  onClick={() => setHearted(!hearted)}
                />
              </button>
            </div>
            <p className="bg-hdBlack/75 text-hdWhite text-sm px-2.5 py-1 rounded-full">
              1 / 24
            </p>
          </div>
        </div>
      </section>
      <div className="mt-5 flex flex-col gap-2">
        <h1 className="text-2xl font-serif font-bold leading-5.5">
          Clarion Hotel The Hub
        </h1>
        <div className="flex flex-row items-center gap-2 text-base">
          <p>Milan, Italy</p>
          <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
          <p>1 bedroom</p>
          <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
          <p>1 bed</p>
        </div>
        <ul className="flex flex-row flex-wrap gap-1">
          <li className="square-venue-label">Breakfast included</li>
          <li className="square-venue-label">Fast Wi-Fi</li>
          <li className="square-venue-label">Pool</li>
          <li className="square-venue-label">Reserve now, pay later</li>
        </ul>
      </div>
      <section className="mt-5 flex flex-col gap-2">
        <h2 className="text-xl font-serif font-bold leading-4.5">Rating</h2>
        <div className="flex flex-row items-center gap-2 text-base">
          <p className="font-bold">4.77</p>
          <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
          <p>200 reviews</p>
        </div>
      </section>
      <section className="mt-5 flex flex-col gap-2">
        <h2 className="text-xl font-serif font-bold leading-4.5">Location</h2>
        <GoogleMapsVenue />
        <div>
          <ul>
            {[
              {
                location: "Imperial Hotel Tokyo",
                distance: "4 min",
                icon: <BuildingIcon weight="bold" />,
              },
              {
                location: "Shibuya shopping district",
                distance: "8 min",
                icon: <ShoppingBagIcon weight="bold" />,
              },
              {
                location: "Imperial Palace",
                distance: "12 min",
                icon: <MapPinSimpleIcon weight="bold" />,
              },
            ].map((item) => {
              return (
                <li className="flex items-center justify-between gap-2 select-none">
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
        <h2 className="text-xl font-serif font-bold leading-4.5">About</h2>
        <p className="leading-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          ultrices ligula ac quam viverra porttitor. Phasellus libero magna,
          imperdiet a scelerisque in, mollis ac diam. Nulla at dolor tincidunt,
          pharetra mauris sit amet, malesuada orci. Morbi placerat metus neque,
          non sagittis turpis interdum at. Quisque suscipit id odio ac dictum.
        </p>
        <div className="flex flex-row items-center gap-2 mt-2">
          <img
            src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
            alt=""
            className="aspect-square w-10 object-cover object-top rounded-sm border-2 border-hdRed"
          />
          <div className="flex flex-col gap-1.5">
            <h3 className="font-bold leading-3">John Lennon</h3>
            <div className="flex flex-row items-center gap-2 text-base leading-3">
              <p>5 Venues</p>
              <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
              <p>4.34 rating</p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-12 flex flex-col gap-2">
        <form className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-3 w-full relative base-shadow">
            <DatePicker />
            <input
              type="text"
              placeholder="Guests"
              className={`input-field cut-corner`}
            />
          </div>
          <div className="base-shadow">
            <button
              type="submit"
              className={`text-xl font-extrabold font-serif w-full h-10 text-hdBlack bg-hdYellow cut-corner`}
            >
              Reserve
            </button>
          </div>
        </form>
      </section>
      <section className="mt-5 flex flex-col gap-2 -mr-5">
        <h2 className="text-xl font-serif font-bold leading-4.5">Reviews</h2>
        <ul className="flex flex-row overflow-x-scroll gap-4">
          <VenueReview />
          <VenueReview />
          <VenueReview />
          <VenueReview />
        </ul>
      </section>
      <section className="mt-5 flex flex-col gap-2">
        <h2 className="text-xl font-serif font-bold leading-4.5">
          Similar Venues
        </h2>
        <ul className="flex flex-row gap-2 overflow-x-scroll rounded-xs">
          <VenueLandscapeListing />
          <VenueLandscapeListing />
          <VenueLandscapeListing />
          <VenueLandscapeListing />
        </ul>
      </section>
      <section className="mb-15">
        <div className="mt-5 flex flex-col gap-2">
          <h2 className="text-xl font-serif font-bold leading-4.5">
            Information
          </h2>
          <p className="leading-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            ultrices ligula ac quam viverra porttitor. Phasellus libero magna,
            imperdiet a scelerisque in, mollis ac diam. Nulla at dolor
            tincidunt, pharetra mauris sit amet, malesuada orci. Morbi placerat
            metus neque, sit amet non sagittis turpis interdum at. Quisque
            suscipit id odio ac dictum.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <h3 className="text-xl font-serif font-bold leading-4.5">Policies</h3>
          <p className="leading-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            ultrices ligula ac quam viverra porttitor. Phasellus libero magna,
            imperdiet a scelerisque in, mollis ac diam. Nulla at dolor
            tincidunt, pharetra mauris sit amet, malesuada orci. Morbi placerat
            metus neque, sit amet non sagittis turpis interdum at. Quisque
            suscipit id odio ac dictum.
          </p>
        </div>
      </section>
      <MobileReserveBar />
    </>
  );
}

export default VenueFocus;

import { GavelIcon, GearIcon, InfoIcon, StarIcon } from "@phosphor-icons/react";
import PreviousTripsCard from "../../comp/PreviousTripsCard";
import UpcomingTrip from "../../comp/UpcomingTrip";
import YourVenueCard from "../../comp/YourVenueCard";

function Account() {
  return (
    <>
      <h1 className="sr-only">Username's account page</h1>
      <div className="relative h-38 -mx-5 -mt-5 md:-mx-10 md:-mt-10 bg-hdRed">
        <div className="absolute inset-1 bg-[url(/SwirlPattern.svg)] w-full h-full top-0 left-0 bg-repeat">
          <img
            src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
            alt=""
            className="object-cover w-full h-38"
          />
        </div>
        <div className="absolute flex flex-row gap-3 items-end justify-center lg:justify-start p-5 -bottom-20 lg:min-w-3xl lg:left-1/2 lg:-translate-x-1/2">
          <img
            src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
            alt=""
            className="aspect-square w-30 h-auto object-cover object-top rounded-sm border-2 border-hdRed base-shadow"
          />
          <div>
            <h2 className="text-lg font-serif font-bold leading-4">
              Good day, Username
            </h2>
            <div className="flex flex-row items-center gap-2 text-xs">
              <p>5 Venues</p>
              <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
              <p>4.37 rating</p>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-25 flex flex-col gap-2 max-w-3xl mx-auto">
        <h2 className="second-heading">Upcoming trip</h2>
        <ul className="flex flex-col gap-4">
          <UpcomingTrip />
        </ul>
      </section>
      <section className="mt-5 flex flex-col gap-2 max-w-3xl mx-auto">
        <h2 className="second-heading">Previous trips</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PreviousTripsCard />
        </ul>
      </section>
      <section className="mt-5 flex flex-col gap-2 max-w-3xl mx-auto">
        <h2 className="second-heading">Your venues</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <YourVenueCard />
        </ul>
      </section>
      <hr className="my-5 text-hdWhiteAccent" />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 outline-shadow-red max-w-3xl mx-auto">
        {[
          {
            heading: "Reviews",
            text: "Check your previous reviews",
            icon: <StarIcon size={22} />,
            function: false,
          },
          {
            heading: "Settings",
            text: "Update your profile",
            icon: <GearIcon size={22} />,
            function: true,
          },
          {
            heading: "Legal",
            text: "Our terms and privacy policies",
            icon: <GavelIcon size={22} />,
            function: false,
          },
          {
            heading: "Help and feedback",
            text: "We are here to help",
            icon: <InfoIcon size={22} />,
            function: false,
          },
        ].map((link) => {
          return link.function ? (
            <li>
              <button className="w-full flex flex-row items-center gap-2 cut-corner bg-hdWhite p-3">
                {link.icon}
                <div className="flex flex-col gap-1 text-start">
                  <h3 className="font-sans font-bold leading-3">
                    {link.heading}
                  </h3>
                  <p className="font-sans leading-3 text-sm">{link.text}</p>
                </div>
              </button>
            </li>
          ) : (
            <li className="w-full flex flex-row items-center gap-2 cut-corner bg-hdWhite p-3">
              {link.icon}
              <div className="flex flex-col gap-1">
                <h3 className="font-sans font-bold leading-3">
                  {link.heading}
                </h3>
                <p className="font-sans leading-3 text-sm">{link.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <button className="my-10 w-full text-center text-hdRed underline font-serif font-bold text-lg">
        Log out
      </button>
      <hr className="mb-5 text-hdWhiteAccent" />
      <p className="mt-5 text-center text-xs text-hdRed">
        &copy; Copyright 2025 Holidaze. <br /> All rights reserved.
      </p>
    </>
  );
}

export default Account;

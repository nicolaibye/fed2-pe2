// interface props {
//   data: {
//     id: string;
//     name: string;
//     description: string;
//     media: [
//       {
//         url: string;
//         alt: "";
//       },
//     ];
//     price: number;
//     maxGuests: number;
//     rating: number;
//     created: string;
//     updated: string;
//     meta: {
//       wifi: boolean;
//       parking: boolean;
//       breakfast: boolean;
//       pets: boolean;
//     };
//     location: {
//       address: string;
//       city: string;
//       zip: string;
//       country: string;
//       continent: string;
//       lat: number;
//       lng: number;
//     };
//     owner: {
//       name: string;
//       email: string;
//       bio: string;
//       avatar: {
//         url: string;
//         alt: "";
//       };
//     };
//     bookings: [
//       {
//         id: string;
//         dateFrom: string;
//         dateTo: string;
//         guests: number;
//         created: string;
//         updated: string;
//         customer: {
//           name: string;
//           email: string;
//           bio: string;
//           avatar: {
//             url: string;
//             alt: "";
//           };
//           banner: {
//             url: string;
//             alt: "";
//           };
//         };
//       },
//     ];
//     _count: {
//       bookings: number;
//     };
//   };
// }

import { useAdventureContext } from "../../context/AdventureContext/useAdventureContext";
import {
  CarSimpleIcon,
  WifiHighIcon,
  AvocadoIcon,
  PawPrintIcon,
} from "@phosphor-icons/react";

function VenueLandscapeListing() {
  // const { id, name, description, media, price, rating } = data;
  const { adventureType } = useAdventureContext();
  return (
    <li
      className={`w-[90%] shrink-0 h-52 rounded-sm flex ${adventureType === "affluent" ? "flex-col" : "flex-row"} `}
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3p565lkyXBLlkNemqfGmUAWtVxN5XT6cQg&s"
        alt=""
        className={`flex-1 object-cover ${adventureType === "affluent" ? "w-full min-h-0" : "h-full min-w-2"} `}
      />
      <div className="flex flex-row ">
        <div
          className={`font-sans flex-5 bg-hdYellow p-2 flex flex-col gap-2 ${adventureType === "affluent" ? "" : "justify-between"}`}
        >
          {adventureType === "affluent" ? (
            <>
              <div>
                <h3 className="font-sans font-bold leading-5">
                  Clarion Hotel The Hub
                </h3>
                <p>Milan, Italy</p>
              </div>
              <div className="flex flex-row items-center gap-2 text-sm">
                <p className="font-bold">4.77</p>
                <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
                <p>
                  <span className="font-bold">£500</span> for 4 nights
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-sans font-bold leading-5 max-w-44">
                  Clarion Hotel The Hub
                </h3>
                <p>Milan, Italy</p>
                <div className="flex flex-row items-center gap-2 text-sm">
                  <p className="font-bold">4.77</p>
                  <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
                  <p>200 reviews</p>
                </div>
                <ul
                  className={`flex flex-col text-hdRed text-sm ${adventureType === "explorer" ? "block" : "hidden"} `}
                >
                  <li className="flex flex-row items-center gap-1.5 relative h-5">
                    <WifiHighIcon size={16} className="mb-1" />
                    <p className="leading-3">Wifi</p>
                  </li>
                  <li className="flex flex-row items-center gap-1.5 relative h-5">
                    <CarSimpleIcon size={16} className="mb-1" />
                    <p className="leading-3">Parking</p>
                  </li>
                  <li className="flex flex-row items-center gap-1.5 relative h-5">
                    <AvocadoIcon size={16} className="mb-1" />
                    <p className="leading-3">Breakfast</p>
                  </li>
                  <li className="flex flex-row items-center gap-1.5 relative h-5">
                    <PawPrintIcon size={16} className="mb-1" />
                    <p className="leading-3">Pets allowed</p>
                  </li>
                </ul>
              </div>
              <div>
                <ul
                  className={`flex flex-col text-hdRed text-sm ${adventureType === "guardian" ? "block" : "hidden"} `}
                >
                  <li>Free cancellation</li>
                  <li>No prepayment needed</li>
                </ul>
                <p className="text-lg">
                  <span className="font-bold">£125</span> for 4 nights
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
  );
}

export default VenueLandscapeListing;

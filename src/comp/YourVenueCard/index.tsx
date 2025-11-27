import { GearIcon, TrashIcon } from "@phosphor-icons/react";

const venueMockups = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    name: "House in Boom",
    location: "Boom, Belgium",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    name: "Manga Art Hotel",
    location: "Tokyo, Japan",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    name: "Boutique Hotel Sena",
    location: "Berlin, Germany",
  },
];

function YourVenueCard() {
  return (
    <>
      {venueMockups.map((trip) => (
        <li key={trip.id} className={`w-full h-auto rounded-sm flex`}>
          <img
            src={trip.image}
            alt=""
            className={`object-cover rounded-t-xs aspect-square h-20`}
          />
          <div
            className={`font-sans w-full bg-hdYellow p-2 flex flex-col justify-center rounded-b-xs`}
          >
            <h3 className="font-sans font-bold leading-5">{trip.name}</h3>
            <div className="flex flex-row flex-wrap items-center text-xs">
              <p>{trip.location}</p>
            </div>
          </div>
          <div className="flex flex-col">
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
  );
}

export default YourVenueCard;

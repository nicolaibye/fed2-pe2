const previousTripsMockups = [
  {
    id: 1,
    name: "House in Boom",
    location: "Boom, Belgium",
    date: "21-25 July 2025",
    image:
      "https://images.pexels.com/photos/34923658/pexels-photo-34923658.jpeg",
    price: "£500",
  },
  {
    id: 2,
    name: "Manga Art Hotel",
    location: "Tokyo, Japan",
    date: "1-27 March 2025",
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
    price: "£500",
  },
  {
    id: 3,
    name: "Boutique Hotel Sena",
    location: "Berlin, Germany",
    date: "21-27 December 2022",
    image: "https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg",
    price: "£500",
  },
];

function PreviousTripsCard() {
  return (
    <>
      {previousTripsMockups.map((trip) => (
        <li className={`w-full h-auto rounded-sm flex`}>
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
              <div className="bg-hdBlack w-0.5 h-0.5 rounded-full mx-2"></div>
              <p>{trip.date}</p>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}

export default PreviousTripsCard;

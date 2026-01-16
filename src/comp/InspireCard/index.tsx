import { Link } from "react-router-dom";

const inspireMockups = [
  {
    country: "Italy",
    url: "https://images.pexels.com/photos/2031966/pexels-photo-2031966.jpeg",
    body: "A country where art, food, and history collide in every street. Let Italy's timeless creativity and effortless style nudge you toward a life lived with more passion and purpose.",
    link: "/",
  },
  {
    country: "Bali",
    url: "https://images.pexels.com/photos/2659475/pexels-photo-2659475.jpeg",
    body: "A sanctuary for anyone craving balance. Bali's blend of nature, ritual, and slow living encourages you to reset, reconnect, and rethink what matters.",
    link: "/",
  },
  {
    country: "Norway",
    url: "https://images.pexels.com/photos/5358788/pexels-photo-5358788.jpeg",
    body: "Where rugged landscapes and calm design sensibilities meet. Norway's quiet power inspires reflection, resilience, and a deeper appreciation for the world around you.",
    link: "/",
  },
  {
    country: "Philippines",
    url: "https://images.pexels.com/photos/322719/pexels-photo-322719.jpeg",
    body: "A vibrant mix of islands, traditions, and warmth. The Philippines inspires joy through its energy, humility, and knack for finding beauty in the everyday.",
    link: "/",
  },
  {
    country: "New Zealand",
    url: "https://images.pexels.com/photos/8230087/pexels-photo-8230087.jpeg",
    body: "A place shaped by adventure and respect for the land. New Zealand pushes you toward bold choices, bigger horizons, and a mindset grounded in exploration.",
    link: "/",
  },
];

function InspireCard() {
  return (
    <>
      {inspireMockups.map(({ country, url, body, link }) => (
        <li
          key={country}
          style={{ backgroundImage: `url(${url})` }}
          className={` md:grayscale md:hover:grayscale-0 transition-all duration-300 bg-center bg-cover relative aspect-4/5 min-w-[150px] md:w-full ${window.innerWidth >= 768 ? "" : "cut-corner"} group overflow-hidden`}
        >
          <Link
            to={link}
            className="absolute top-0 left-0 w-full h-full z-20"
          ></Link>
          <div className="absolute p-3 -bottom-2 md:top-[calc(100%-44px)] md:group-hover:top-[50%] text-lg font-serif font-bold text-hdWhite z-10 transition-all duration-300">
            <h3 className="mb-0.5">{country}</h3>
            <p className="hidden md:block font-sans font-normal text-sm leading-4">
              {body}
            </p>
          </div>
          <div
            className={`absolute inset-0 top-0 right-0 bg-linear-to-b from-hdRed/0 to-hdRed w-full h-full`}
          ></div>
        </li>
      ))}
    </>
  );
}

export default InspireCard;

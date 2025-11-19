import InspireCard from "../../comp/InspireCard";
import NewsCard from "../../comp/NewsCard";
import VenueLandscapeListing from "../../comp/VenueLandscapeListing";

function Home() {
  return (
    <div className="flex gap-5 flex-col">
      <h1 className="absolute w-0.5 h-0.5 overflow-hidden p-0 -m-0.5 whitespace-nowrap border-0 top-0 left-0">
        Holidaze Accommodation homepage
      </h1>
      <div className="flex flex-col md:flex-row gap-5">
        <NewsCard />
        <div className="hidden md:block">
          <NewsCard />
        </div>
        <div className="hidden md:block">
          <NewsCard />
        </div>
      </div>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-2">Let us inspire</h2>
        <ul className="flex flex-row gap-2.5 md:gap-0 overflow-x-scroll md:overflow-x-auto justify-start md:justify-center rounded-xs">
          <InspireCard
            color="hdRed"
            country="Italy"
            url="https://images.pexels.com/photos/2031966/pexels-photo-2031966.jpeg"
            body="A country where art, food, and history collide in every street. Let Italy's timeless creativity and effortless style nudge you toward a life lived with more passion and purpose."
            link="/"
          />
          <InspireCard
            color="hdOrange"
            country="Bali"
            url="https://images.pexels.com/photos/2659475/pexels-photo-2659475.jpeg"
            body="A sanctuary for anyone craving balance. Bali's blend of nature, ritual, and slow living encourages you to reset, reconnect, and rethink what matters."
            link="/"
          />
          <InspireCard
            color="hdRed"
            country="Norway"
            url="https://images.pexels.com/photos/5358788/pexels-photo-5358788.jpeg"
            body="Where rugged landscapes and calm design sensibilities meet. Norway's quiet power inspires reflection, resilience, and a deeper appreciation for the world around you."
            link="/"
          />
          <InspireCard
            color="hdOrange"
            country="Philippines"
            url="https://images.pexels.com/photos/322719/pexels-photo-322719.jpeg"
            body="A vibrant mix of islands, traditions, and warmth. The Philippines inspires joy through its energy, humility, and knack for finding beauty in the everyday."
            link="/"
          />
          <InspireCard
            color="hdRed"
            country="New Zealand"
            url="https://images.pexels.com/photos/8230087/pexels-photo-8230087.jpeg"
            body="A place shaped by adventure and respect for the land. New Zealand pushes you toward bold choices, bigger horizons, and a mindset grounded in exploration."
            link="/"
          />
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-2">We recommend</h2>
        <ul className="flex flex-row flex-nowrap gap-2.5 md:gap-0 overflow-x-scroll md:overflow-x-auto justify-start md:justify-center rounded-xs">
          <VenueLandscapeListing />
          <VenueLandscapeListing />
          <VenueLandscapeListing />
          <VenueLandscapeListing />
          <VenueLandscapeListing />
        </ul>
      </section>
    </div>
  );
}

export default Home;

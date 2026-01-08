import InspireCard from "../../comp/InspireCard";
import NewsCard from "../../comp/NewsCard";
import VenueLandscapeListing from "../../comp/VenueLandscapeListing";

function Home() {
  return (
    <div className="flex gap-5 flex-col">
      <h1 className="sr-only">Holidaze Venue homepage</h1>
      <NewsCard />
      <section>
        <h2 className="text-2xl font-serif font-bold mb-2">Let us inspire</h2>
        <ul className="flex flex-row gap-2.5 md:gap-0 overflow-x-scroll md:overflow-x-auto justify-start md:justify-center rounded-xs no-scrollbar">
          <InspireCard />
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-2">We recommend</h2>
        <ul className="flex flex-row flex-nowrap gap-4 overflow-x-scroll justify-start rounded-xs no-scrollbar">
          <VenueLandscapeListing />
        </ul>
      </section>
    </div>
  );
}

export default Home;

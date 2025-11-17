import NewsCard from "../../comp/NewsCard";

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
    </div>
  );
}

export default Home;

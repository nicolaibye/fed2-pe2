import { useEffect, useState } from "react";
import { useAdventureContext } from "../../context/AdventureContext/useAdventureContext";

const url = "https://v2.api.noroff.dev/holidaze/venues";

function VenueSquareListing() {
  const { adventureType } = useAdventureContext();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);

        setIsLoading(false);
      } catch (error) {
        setErrorMessage(error);
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data. {errorMessage}</div>;
  }

  return (
    <>
      {posts.map((post) => (
        <li
          key={post.id}
          className={`w-full shrink-0 h-auto aspect-square flex flex-col`}
        >
          <div className="flex-1 object-cover relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3p565lkyXBLlkNemqfGmUAWtVxN5XT6cQg&s"
              alt=""
              className="object-cover w-full h-full rounded-t-xs"
            />
            {adventureType === "affluent" ? (
              <>
                <button className="absolute bottom-2 left-2 square-venue-label">
                  Express Checkout &#x2192;
                </button>
              </>
            ) : (
              <>
                <ul
                  className={`flex flex-row flex-wrap gap-1 absolute bottom-2 left-2 ${adventureType === "guardian" ? "block" : "hidden"} `}
                >
                  <li className="square-venue-label w-fit">
                    Free cancellation
                  </li>
                  <li className="square-venue-label">
                    Total include taxes and fees
                  </li>
                </ul>
                <ul
                  className={`flex flex-row flex-wrap gap-1 absolute bottom-2 left-2 ${adventureType === "explorer" ? "block" : "hidden"} `}
                >
                  <li className="square-venue-label w-fit">Fast Wi-Fi</li>
                  <li className="square-venue-label w-fit">Pool</li>
                  <li className="square-venue-label w-fit">
                    Breakfast included
                  </li>
                </ul>
              </>
            )}
          </div>
          <div className="font-sans bg-hdYellow p-2 flex flex-col gap-2 rounded-b-xs">
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
          </div>
        </li>
      ))}
    </>
  );
}

export default VenueSquareListing;

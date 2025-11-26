import { useState } from "react";

function VenueReview() {
  const [expanded, setExpanded] = useState(false);
  const reviewMockup = [
    {
      id: 1,
      name: "John Lennon",
      date: "02/10/2022",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultrices ligula ac quam viverra porttitor. Phasellus libero magna, imperdiet a scelerisque in, mollis ac diam. Nulla at dolor tincidunt, pharetra mauris sit amet, malesuada orci. Morbi placerat metus neque, sit amet non sagittis turpis interdum at. Quisque suscipit id odio ac dictum.",
    },
  ];

  if (reviewMockup.length === 0) {
    return <p>No reviews yet</p>;
  }

  const review = reviewMockup[0];

  const shortText = review.description.substring(0, 180);
  const shouldShorten = review.description.length > 180;
  const smallScreen = window.innerWidth > 1024;

  const textToShow = expanded || smallScreen ? review.description : shortText;
  const buttonText = expanded ? "...Read less" : "...Read more";

  return (
    <li className="w-[90%] max-w-90 lg:max-w-none lg:w-full shrink-0 h-auto">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-3">
          <h3 className="font-bold leading-3">{reviewMockup[0].name}</h3>
          <ul className="flex flex-row gap-1.5">
            <li className="rating-star"></li>
            <li className="rating-star"></li>
            <li className="rating-star"></li>
            <li className="rating-star"></li>
            <li className="rating-star empty"></li>
          </ul>
        </div>

        <div className="flex flex-row items-center gap-2 text-base leading-3">
          <p>8 Stays with Holidaze</p>
          <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
          <p>5 reviews</p>
        </div>
        <p className="text-sm leading-3.5">
          {textToShow}{" "}
          {!expanded && shouldShorten ? (
            <>
              <button
                onClick={() => setExpanded(true)}
                className="font-bold lg:hidden"
              >
                {buttonText}
              </button>
            </>
          ) : (
            <>
              <br />
              <button
                onClick={() => setExpanded(false)}
                className="font-bold lg:hidden"
              >
                {buttonText}
              </button>
            </>
          )}
        </p>
      </div>
    </li>
  );
}

export default VenueReview;

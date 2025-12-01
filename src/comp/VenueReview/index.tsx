import { useState } from "react";

function VenueReview() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const reviewMockup = [
    {
      id: 1,
      name: "John Lennon",
      date: "02/10/2022",
      rating: 4,
      stays: 8,
      reviews: 5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultrices ligula ac quam viverra porttitor. Phasellus libero magna, imperdiet a scelerisque in, mollis ac diam. Nulla at dolor tincidunt, pharetra mauris sit amet, malesuada orci. Morbi placerat metus neque, sit amet non sagittis turpis interdum at. Quisque suscipit id odio ac dictum.",
    },
    {
      id: 2,
      name: "Paul McCartney",
      date: "15/08/2022",
      rating: 5,
      stays: 12,
      reviews: 8,
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    },
    {
      id: 3,
      name: "George Harrison",
      date: "30/11/2022",
      rating: 3,
      stays: 5,
      reviews: 2,
      description:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.",
    },
    {
      id: 4,
      name: "Ringo Starr",
      date: "12/12/2022",
      rating: 4,
      stays: 7,
      reviews: 3,
      description:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    },
  ];

  if (reviewMockup.length === 0) {
    return <p>No reviews yet</p>;
  }
  return (
    <>
      {reviewMockup.map((review) => {
        const shortText = review.description.substring(0, 180);
        const smallScreen = window.innerWidth > 1024;
        const isExpanded = expanded[review.id] ?? false;

        const textToShow =
          isExpanded || smallScreen ? review.description : shortText;
        const buttonText = isExpanded ? "...Read less" : "...Read more";

        return (
          <li
            key={review.id}
            className="w-[90%] max-w-90 lg:max-w-none lg:w-full shrink-0 h-auto"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-3">
                <h3 className="font-bold leading-3">{review.name}</h3>
                <ul className="flex flex-row gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    return (
                      <li
                        key={star}
                        className={
                          star <= review.rating
                            ? "rating-star"
                            : "rating-star empty"
                        }
                      ></li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex flex-row items-center gap-2 text-base leading-3">
                <p>{review.stays} Stays with Holidaze</p>
                <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
                <p>{review.reviews} reviews</p>
              </div>
              <p className="text-sm leading-3.5">
                {textToShow}
                <button
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [review.id]: !isExpanded,
                    }))
                  }
                  className="font-bold lg:hidden"
                >
                  {buttonText}
                </button>
              </p>
            </div>
          </li>
        );
      })}
    </>
  );
}

export default VenueReview;

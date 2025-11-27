import PreviousTripsCard from "../../comp/PreviousTripsCard";
import UpcomingTrip from "../../comp/UpcomingTrip";

function Account() {
  return (
    <>
      <h1 className="sr-only">Username's account page</h1>
      <div className="relative h-38 -mx-5 -mt-5 md:-mx-10 md:-mt-10 bg-hdRed">
        <div className="absolute inset-1 bg-[url(/SwirlPattern.svg)] w-full h-full top-0 left-0 bg-repeat">
          <img
            src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
            alt=""
            className="object-cover w-full h-38"
          />
        </div>
        <div className="absolute flex flex-row gap-3 items-end justify-center p-5 -bottom-20">
          <img
            src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
            alt=""
            className="aspect-square w-30 h-auto object-cover object-top rounded-sm border-2 border-hdRed base-shadow"
          />
          <div>
            <h2 className="text-lg font-serif font-bold leading-4">
              Good day, Username
            </h2>
            <div className="flex flex-row items-center gap-2 text-xs">
              <p>5 Venues</p>
              <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
              <p>4.37 rating</p>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-25 flex flex-col gap-2">
        <h2 className="second-heading">Upcoming trip</h2>
        <ul className="flex flex-col gap-4">
          <UpcomingTrip />
        </ul>
      </section>
      <section className="mt-5 flex flex-col gap-2">
        <h2 className="second-heading">Previous trips</h2>
        <ul className="flex flex-col gap-4">
          <PreviousTripsCard />
        </ul>
      </section>
      <section className="mt-5 flex flex-col gap-2">
        <h2 className="second-heading">Your accommodations</h2>
        <ul>
          <li></li>
        </ul>
      </section>
      <hr className="mt-5" />
      <ul>
        <li></li>
      </ul>
      <button>log out</button>
      <hr className="mt-5" />
      <p className="mt-5"></p>
    </>
  );
}

export default Account;

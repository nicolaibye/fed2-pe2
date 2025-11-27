import { CaretLeftIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div>
      <div className="relative flex flex-col items-center justify-center h-screen -mb-20 -mx-5 -mt-5 md:-mx-10 md:-mt-10 bg-hdYellow">
        <Link
          to="/"
          className="absolute md:hidden top-5 left-5 z-100 bg-hdRed rounded-full flex flex-row items-center gap-2"
        >
          <div className="circle-button base-shadow">
            <CaretLeftIcon weight="bold" size={20} className="text-hdWhite " />
          </div>
          <p className="text-hdWhite  font-bold pr-3">Home</p>
        </Link>
        <div className="absolute inset-1 bg-[url(/WavePattern.svg)] w-full h-full top-0 left-0 bg-repeat pointer-events-none"></div>
        <div className="p-5 z-100 flex flex-col items-center gap-4 max-w-80 lg:scale-150">
          <h1 className="z-1000 text-hdBlack font-serif text-6xl text-center font-bold leading-8">
            404
            <br />
            <span className="text-2xl">Something went wrong</span>
          </h1>
          <p className="text-hdBlack font-sans text-base text-center leading-4">
            Looks like the page you&#39;re looking for can&#39;t be found.
            <br />
            <br />
            Please try returning to our homepage. If the issue persists, feel
            free to contact our{" "}
            <span className="font-bold underline cursor-pointer">
              Customer Support.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error;

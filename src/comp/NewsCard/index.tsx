import { Link } from "react-router-dom";

function NewsCard() {
  return (
    <div className="flex flex-col gap-3 bg-hdYellow items-center p-4 cut-corner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 40 40"
        fill="none"
      >
        <circle cx="20" cy="20" r="19.5" stroke="#23191D" />
      </svg>
      <div className="font-sans flex flex-col gap-1 text-center">
        <h3 className="text-2xl font-serif font-bold">
          We believe in the people
        </h3>
        <p className="leading-4">
          For the betterment of now and the future. People will be a pivotal
          player in our success.
        </p>
        <Link to="/" className="underline font-bold">
          Our mission
        </Link>
      </div>
      <div className="flex flex-row gap-2 md:hidden">
        <div className="bg-hdBlack h-1 w-1 rotate-45"></div>
        <div className="bg-hdBlack/25 h-1 w-1 rotate-45"></div>
        <div className="bg-hdBlack/25 h-1 w-1 rotate-45"></div>
      </div>
    </div>
  );
}

export default NewsCard;

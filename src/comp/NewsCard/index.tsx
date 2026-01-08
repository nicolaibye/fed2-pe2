import {
  BinocularsIcon,
  LeafIcon,
  PersonSimpleHikeIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function NewsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="flex flex-col gap-3 bg-hdYellow items-center justify-center p-4 cut-corner">
        <PersonSimpleHikeIcon size={60} weight="duotone" />
        <div className="font-sans flex flex-col gap-1 text-center">
          <h3 className="text-2xl font-serif font-bold leading-6">
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
      <div className="flex-col gap-3 bg-hdYellow items-center justify-center p-4 cut-corner hidden md:flex">
        <LeafIcon size={60} weight="duotone" />
        <div className="font-sans flex flex-col gap-1 text-center">
          <h3 className="text-2xl font-serif font-bold leading-6">
            We believe in sustainability
          </h3>
          <p className="leading-4">
            Thoughtful choices today create lasting impact. Responsibility
            guides how we move forward.
          </p>
          <Link to="/" className="underline font-bold">
            Our cause
          </Link>
        </div>
      </div>
      <div className="flex-col gap-3 bg-hdYellow items-center justify-center p-4 cut-corner hidden md:flex">
        <BinocularsIcon size={60} weight="duotone" />
        <div className="font-sans flex flex-col gap-1 text-center">
          <h3 className="text-2xl font-serif font-bold leading-6">
            We believe in exploration
          </h3>
          <p className="leading-4">
            Progress comes from curiosity. Exploring new ideas keeps us evolving
            and relevant.
          </p>

          <Link to="/" className="underline font-bold">
            Our beliefs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;

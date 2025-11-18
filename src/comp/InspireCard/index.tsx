import { Link } from "react-router-dom";

type Props = {
  color?: string;
  country?: string;
  url?: string;
  body?: string;
  link: string;
};

function InspireCard({ color, country, url, body, link }: Props) {
  return (
    <li
      className={`bg-[url('${url}')] md:grayscale md:hover:grayscale-0 transition-all duration-300 bg-center bg-cover relative aspect-4/5 min-w-[150px] md:w-full ${window.innerWidth >= 768 ? "" : "cut-corner"} group overflow-hidden`}
    >
      <Link
        to={link}
        className="absolute top-0 left-0 w-full h-full z-20"
      ></Link>
      <div className="absolute p-3 -bottom-2 md:top-[calc(100%-44px)] md:group-hover:top-[50%] text-lg font-serif font-bold text-hdWhite z-10 transition-all duration-300">
        <h3 className="mb-0.5">{country}</h3>
        <p className="hidden md:block font-sans font-normal text-sm leading-4">
          {body}
        </p>
      </div>
      <div
        className={`absolute inset-0 top-0 right-0 bg-linear-to-b from-${color}/0 to-${color} w-full h-full`}
      ></div>
    </li>
  );
}

export default InspireCard;

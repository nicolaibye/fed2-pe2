import { ArrowsOutSimpleIcon, ArrowsInSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useSearchContext } from "../../context/SearchContext/useSearchContext";

function GoogleMapsSearch() {
  const [expanded, setExpanded] = useState(false);
  const { location } = useSearchContext();
  const locationQuery = location?.trim();
  const googleUrl = `https://maps.google.com/maps?q=${encodeURIComponent(locationQuery)}&z=15&output=embed`;

  const resizeMap = () => {
    const map = document.querySelector("#venueMapSearch");
    if (
      map?.classList.contains("md:w-[calc(40vw)]") &&
      map?.classList.contains("lg:w-[calc(25vw)]")
    ) {
      map.classList.replace("md:w-[calc(40vw)]", "md:w-[calc(25vw)]");
      map.classList.replace("lg:w-[calc(25vw)]", "lg:w-[calc(15vw)]");
      setExpanded(true);
    } else {
      map?.classList.replace("md:w-[calc(25vw)]", "md:w-[calc(40vw)]");
      map?.classList.replace("lg:w-[calc(15vw)]", "lg:w-[calc(25vw)]");
      setExpanded(false);
    }
  };
  return (
    <div
      id="venueMapSearch"
      className="w-full md:w-[calc(40vw)] lg:w-[calc(25vw)] h-48 md:h-auto rounded-xs relative md:aspect-square transition-all duration-300"
    >
      <iframe
        src={googleUrl}
        frameBorder="0"
        width="100%"
        height="100%"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <button
        onClick={resizeMap}
        className="absolute bottom-15 left-3 p-2 bg-hdYellow rounded-full hidden md:block"
      >
        {expanded ? (
          <ArrowsOutSimpleIcon size={24} weight="regular" />
        ) : (
          <ArrowsInSimpleIcon size={24} weight="regular" />
        )}
      </button>
    </div>
  );
}

export default GoogleMapsSearch;

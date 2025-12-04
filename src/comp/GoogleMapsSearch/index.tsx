import { ArrowsOutSimpleIcon, ArrowsInSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";

function GoogleMapsSearch() {
  const [expanded, setExpanded] = useState(false);

  const resizeMap = () => {
    const map = document.querySelector("#venueMapSearch");
    if (map?.classList.contains("md:w-[calc(25vw)]")) {
      map.classList.add("md:w-[calc(40vw)]");
      map.classList.remove("md:w-[calc(25vw)]");
      setExpanded(false);
    } else {
      map?.classList.add("md:w-[calc(25vw)]");
      map?.classList.remove("md:w-[calc(40vw)]");
      setExpanded(true);
    }
  };
  return (
    <div
      id="venueMapSearch"
      className="w-full md:w-[calc(40vw)] h-48 md:h-auto rounded-xs relative md:aspect-square transition-all duration-300"
    >
      <iframe
        src="https://maps.google.com/maps?q=59.9139,10.7522&z=15&output=embed"
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

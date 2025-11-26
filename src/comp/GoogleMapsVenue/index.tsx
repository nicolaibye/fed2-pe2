import { ArrowsOutSimpleIcon, ArrowsInSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";

function GoogleMapsVenue() {
  const [expanded, setExpanded] = useState(false);
  const resizeMap = () => {
    const map = document.querySelector("#venueMap");
    if (map?.classList.contains("aspect-video")) {
      map.classList.add("aspect-square");
      map.classList.remove("aspect-video");
      setExpanded(false);
    } else {
      map?.classList.add("aspect-video");
      map?.classList.remove("aspect-square");
      setExpanded(true);
    }
  };
  return (
    <div
      id="venueMap"
      className="w-full rounded-xs relative aspect-video transition-all duration-300"
    >
      <iframe
        src="https://maps.google.com/maps?q=59.9139,10.7522&z=15&output=embed"
        frameborder="0"
        width="100%"
        height="100%"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <button
        onClick={resizeMap}
        className="absolute top-3 right-3 p-2 bg-hdYellow rounded-full"
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

export default GoogleMapsVenue;

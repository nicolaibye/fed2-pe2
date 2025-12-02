import { ArrowsOutSimpleIcon, ArrowsInSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hook/useApi/index.tsx";
import type { Venue } from "../../types/venue.ts";
import LoadingComp from "../LoadingComp/index.tsx";
import ErrorComp from "../ErrorComp/index.tsx";

const url = "https://v2.api.noroff.dev/holidaze/venues";

function GoogleMapsVenue() {
  const [expanded, setExpanded] = useState(false);
  const resizeMap = () => {
    const map = document.querySelector("#venueMap");
    if (map?.classList.contains("aspect-video")) {
      map.classList.add("aspect-square");
      map.classList.remove("aspect-video");
      setExpanded(true);
    } else {
      map?.classList.add("aspect-video");
      map?.classList.remove("aspect-square");
      setExpanded(false);
    }
  };
  const { id } = useParams();
  const { data: post, isLoading, isError } = useApi<Venue>(url + `/${id}`);
  const locationData = post?.location;

  const { address, city, zip, country, lat, lng } = locationData || {};
  const hasCoords =
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat !== 0 &&
    lng !== 0;
  const addressString = [address, city, zip, country].filter(
    (p) => p && p.length > 0
  );
  const googleUrl = hasCoords
    ? `https://maps.google.com/maps?q=${locationData?.lat},${locationData?.lng}&z=15&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(addressString.join(", "))}&z=15&output=embed`;

  if (isLoading) {
    return <LoadingComp />;
  }

  if (isError) {
    return <ErrorComp />;
  }

  return (
    <div
      id="venueMap"
      className="w-full rounded-xs relative aspect-video transition-all duration-300"
    >
      <iframe
        src={googleUrl}
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
          <ArrowsInSimpleIcon size={24} weight="regular" />
        ) : (
          <ArrowsOutSimpleIcon size={24} weight="regular" />
        )}
      </button>
    </div>
  );
}

export default GoogleMapsVenue;

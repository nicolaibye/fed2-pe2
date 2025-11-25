import { ArrowsOutSimpleIcon } from "@phosphor-icons/react";

function GoogleMapsSearch() {
  const resizeMap = () => {
    const map = document.querySelector("#venueMapSearch");
    map?.classList.toggle("md:w-[calc(40vw)]");
    map?.classList.toggle("md:w-[calc(25vw)]");
  };
  return (
    <div
      id="venueMapSearch"
      className="w-full md:w-[calc(40vw)] h-48 md:h-auto rounded-xs relative md:aspect-square transition-all duration-300"
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
        className="absolute bottom-15 left-3 p-2 bg-hdYellow rounded-full hidden md:block"
      >
        <ArrowsOutSimpleIcon size={24} weight="regular" />
      </button>
    </div>
  );
}

export default GoogleMapsSearch;

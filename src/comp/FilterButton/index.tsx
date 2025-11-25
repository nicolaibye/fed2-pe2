import {
  BuildingOfficeIcon,
  CheckIcon,
  CurrencyEurIcon,
  FunnelSimpleIcon,
  InfoIcon,
  LeafIcon,
  MapPinAreaIcon,
  PuzzlePieceIcon,
  StarIcon,
} from "@phosphor-icons/react";

function FilterButton() {
  const openFilter = () => {
    const button = document.getElementById("filterButton");
    const filter = document.getElementById("filter");
    const badge = document.getElementById("filterOverallCount");
    filter?.classList.toggle("open");

    button?.classList.toggle("open");

    if (filter?.classList.contains("open")) {
      badge?.classList.remove("open");
    } else {
      updateFilterCounts();
    }
  };

  const updateFilterCounts = () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const badge = document.getElementById("filterOverallCount");
    const options = document.getElementById("filter");

    if (!badge || !checkboxes.length) return;

    const count = [...checkboxes].filter((checkbox) => checkbox.checked).length;
    badge.textContent = count;

    if (count > 0 && !options?.classList.contains("open")) {
      badge.classList.add("open");
    } else {
      badge.classList.remove("open");
    }
  };

  const openOptions = (e) => {
    e.preventDefault();
    const wrapper = e.currentTarget.closest("div.flex-col-reverse");
    if (!wrapper) return;

    const button = wrapper.querySelector(".circle-button");
    const options = wrapper.querySelector(".filter");
    const badge = wrapper.querySelector(".filter-badge");

    options?.classList.toggle("open");
    button?.classList.toggle("open");

    if (options?.classList.contains("open")) {
      badge?.classList.remove("open");
    } else {
      updateCounts();
    }
  };

  const updateCounts = () => {
    const groups = document.querySelectorAll("div.flex-col-reverse");

    groups.forEach((group) => {
      const checkboxes = group.querySelectorAll("input[type='checkbox']");
      const badge = group.querySelector(".filter-badge");
      const options = group.querySelector(".filter");

      if (!badge || !checkboxes.length) return;

      const count = [...checkboxes].filter(
        (checkbox) => checkbox.checked
      ).length;
      badge.textContent = count;

      if (count > 0 && !options?.classList.contains("open")) {
        badge.classList.add("open");
      } else {
        badge.classList.remove("open");
      }
    });
  };

  return (
    <>
      <form
        action=""
        className="hidden flex-row flex-wrap px-4 gap-6 min-w-0 md:flex"
      >
        <div className="flex flex-col items-start font-sans">
          <h3 className="font-bold text-base mb-1">Price per night</h3>
          {["Under €50", "€50-100", "€100-200", "€200+"].map((item) => {
            return (
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="peer sr-only" />
                <span className="custom-checkbox">
                  <CheckIcon size={16} weight="bold" />
                </span>
                {item}
              </label>
            );
          })}
        </div>
        <div className="flex flex-col items-start font-sans">
          <h3 className="font-bold text-base mb-1">Type</h3>
          {["Hotel", "Apartment", "Hostel", "Villa", "Guesthouse"].map(
            (item) => {
              return (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="peer sr-only" />
                  <span className="custom-checkbox">
                    <CheckIcon size={16} weight="bold" />
                  </span>
                  {item}
                </label>
              );
            }
          )}
        </div>
        <div className="flex flex-col items-start font-sans">
          <h3 className="font-bold text-base mb-1">Rating</h3>
          {["Under 2", "2-3", "3-4", "4-5"].map((item) => {
            return (
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="peer sr-only" />
                <span className="custom-checkbox">
                  <CheckIcon size={16} weight="bold" />
                </span>
                {item}
              </label>
            );
          })}
        </div>
        <div className="flex flex-col items-start font-sans">
          <h3 className="font-bold text-base mb-1">Amenities</h3>
          {["Free Wi-Fi", "Pool", "Parking", "Pet-friendly", "Spa", "Bar"].map(
            (item) => {
              return (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="peer sr-only" />
                  <span className="custom-checkbox">
                    <CheckIcon size={16} weight="bold" />
                  </span>
                  {item}
                </label>
              );
            }
          )}
        </div>
        <div className="flex flex-col items-start font-sans">
          <h3 className="font-bold text-base mb-1">Location</h3>
          {["City centre", "Near airport", "Beachfront", "Suburb"].map(
            (item) => {
              return (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="peer sr-only" />
                  <span className="custom-checkbox">
                    <CheckIcon size={16} weight="bold" />
                  </span>
                  {item}
                </label>
              );
            }
          )}
        </div>
        <div className="flex flex-col items-start font-sans">
          <h3 className="font-bold text-base mb-1">Sustainability</h3>
          {[
            "“Eco-property”",
            "EV charging",
            "Water-saving",
            "Renewable energy",
          ].map((item) => {
            return (
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="peer sr-only" />
                <span className="custom-checkbox">
                  <CheckIcon size={16} weight="bold" />
                </span>
                {item}
              </label>
            );
          })}
        </div>
        <div className="flex flex-col items-start font-sans">
          <h3 className="font-bold text-base mb-1">Long stay</h3>
          {["Free cancellation", "Pay at property", "Non-refundable"].map(
            (item) => {
              return (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="peer sr-only" />
                  <span className="custom-checkbox">
                    <CheckIcon size={16} weight="bold" />
                  </span>
                  {item}
                </label>
              );
            }
          )}
        </div>
      </form>
      <div className="fixed bottom-18 right-3 flex md:hidden flex-col items-end gap-2 z-1000">
        <form action="" id="filter" className="filter flex-col gap-2">
          <div className="flex flex-col-reverse items-end gap-2">
            <div className="relative">
              <div className="filter-badge">0</div>
              <button onClick={openOptions} className="circle-button">
                <CurrencyEurIcon size={16} weight="bold" />
              </button>
            </div>
            <div className="hidden flex-col items-end font-sans gap-1 filter">
              {["Under €50", "€50-100", "€100-200", "€200+"].map((item) => {
                return (
                  <label className="flex items-center gap-2 select-none">
                    <input type="checkbox" className="peer sr-only" />
                    <span className="filter-label">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col-reverse items-end gap-2">
            <div className="relative">
              <div className="filter-badge">0</div>
              <button onClick={openOptions} className="circle-button">
                <BuildingOfficeIcon size={16} weight="bold" />
              </button>
            </div>
            <div className="hidden flex-col items-end font-sans gap-1 filter">
              {["Hotel", "Apartment", "Hostel", "Villa", "Guesthouse"].map(
                (item) => {
                  return (
                    <label className="flex items-center gap-2 select-none">
                      <input type="checkbox" className="peer sr-only" />
                      <span className="filter-label">{item}</span>
                    </label>
                  );
                }
              )}
            </div>
          </div>
          <div className="flex flex-col-reverse items-end gap-2">
            <div className="relative">
              <div className="filter-badge">0</div>
              <button onClick={openOptions} className="circle-button">
                <StarIcon size={16} weight="bold" />
              </button>
            </div>
            <div className="hidden flex-col items-end font-sans gap-1 filter ">
              {["Under 2", "2-3", "3-4", "4-5"].map((item) => {
                return (
                  <label className="flex items-center gap-2 select-none">
                    <input type="checkbox" className="peer sr-only" />
                    <span className="filter-label">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col-reverse items-end gap-2">
            <div className="relative">
              <div className="filter-badge">0</div>
              <button onClick={openOptions} className="circle-button">
                <PuzzlePieceIcon size={16} weight="bold" />
              </button>
            </div>
            <div className="hidden flex-col items-end font-sans gap-1 filter">
              {[
                "Free Wi-Fi",
                "Pool",
                "Parking",
                "Pet-friendly",
                "Spa",
                "Bar",
              ].map((item) => {
                return (
                  <label className="flex items-center gap-2 select-none">
                    <input type="checkbox" className="peer sr-only" />
                    <span className="filter-label">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col-reverse items-end gap-2">
            <div className="relative">
              <div className="filter-badge">0</div>
              <button onClick={openOptions} className="circle-button">
                <MapPinAreaIcon size={16} weight="bold" />
              </button>
            </div>
            <div className="hidden flex-col items-end font-sans gap-1 filter">
              {["City centre", "Near airport", "Beachfront", "Suburb"].map(
                (item) => {
                  return (
                    <label className="flex items-center gap-2 select-none">
                      <input type="checkbox" className="peer sr-only" />
                      <span className="filter-label">{item}</span>
                    </label>
                  );
                }
              )}
            </div>
          </div>
          <div className="flex flex-col-reverse items-end gap-2">
            <div className="relative">
              <div className="filter-badge">0</div>
              <button onClick={openOptions} className="circle-button">
                <LeafIcon size={16} weight="bold" />
              </button>
            </div>
            <div className="hidden flex-col items-end font-sans gap-1 filter">
              {[
                "“Eco-property”",
                "EV charging",
                "Water-saving",
                "Renewable energy",
              ].map((item) => {
                return (
                  <label className="flex items-center gap-2 select-none">
                    <input type="checkbox" className="peer sr-only" />
                    <span className="filter-label">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col-reverse items-end gap-2">
            <div className="relative">
              <div className="filter-badge">0</div>
              <button onClick={openOptions} className="circle-button">
                <InfoIcon size={18} weight="bold" />
              </button>
            </div>
            <div className="hidden flex-col items-end font-sans gap-1 filter">
              {["Free cancellation", "Pay at property", "Non-refundable"].map(
                (item) => {
                  return (
                    <label className="flex items-center gap-2 select-none">
                      <input type="checkbox" className="peer sr-only" />
                      <span className="filter-label">{item}</span>
                    </label>
                  );
                }
              )}
            </div>
          </div>
        </form>
        <div className="relative">
          <div id="filterOverallCount" className="filter-badge">
            0
          </div>
          <button
            id="filterButton"
            onClick={openFilter}
            className="circle-button"
          >
            <FunnelSimpleIcon size={16} weight="bold" />
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterButton;

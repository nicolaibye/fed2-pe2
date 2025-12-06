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
import { useFilterContext } from "../../context/FilterContext/useFilterContext";

function FilterButton() {
  const { filters, toggleFilter } = useFilterContext();

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
    const badge = document.getElementById("filterOverallCount");
    const options = document.getElementById("filter");

    if (!badge) return;

    const contextCount =
      filters.prices.length +
      filters.types.length +
      filters.ratings.length +
      filters.amenities.length;

    const domCount = [
      ...document.querySelectorAll("input[type='checkbox'].legacy-filter"),
    ].filter((checkbox) => checkbox.checked).length;

    const total = contextCount + domCount;

    badge.textContent = String(total);

    if (total > 0 && !options?.classList.contains("open")) {
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
      // updateCounts(filters);
    }
  };

  // const updateCounts = (filters) => {
  //   const groups = document.querySelectorAll("div.flex-col-reverse");

  //   groups.forEach((group) => {
  //     const element = group as HTMLElement;
  //     const badge = element.querySelector(
  //       ".filter-badge"
  //     ) as HTMLElement | null;
  //     const options = element.querySelector(".filter") as HTMLElement | null;

  //     if (!badge) return;

  //     const groupKey = element.dataset.filterKey;
  //     const contextCount = groupKey ? filters[groupKey].length : 0;

  //     const domCount = [
  //       ...element.querySelectorAll("input[type='checkbox'].legacy-filter"),
  //     ].filter((checkbox) => (checkbox as HTMLInputElement).checked).length;

  //     const total = contextCount + domCount;

  //     badge.textContent = String(total);

  //     if (total > 0 && !options?.classList.contains("open")) {
  //       badge.classList.add("open");
  //     } else {
  //       badge.classList.remove("open");
  //     }
  //   });
  // };

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
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={filters.prices.includes(item)}
                  onChange={() => toggleFilter("prices", item)}
                />
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
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={filters.types.includes(item)}
                    onChange={() => toggleFilter("types", item)}
                  />
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
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={filters.ratings.includes(item)}
                  onChange={() => toggleFilter("ratings", item)}
                />
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
          {["Free Wi-Fi", "Breakfast", "Parking", "Pets allowed"].map(
            (item) => {
              return (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={filters.amenities.includes(item)}
                    onChange={() => toggleFilter("amenities", item)}
                  />
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
            <div
              className="hidden flex-col items-end font-sans gap-1 filter"
              data-filter-key="prices"
            >
              {["Under €50", "€50-100", "€100-200", "€200+"].map((item) => {
                return (
                  <label className="flex items-center gap-2 select-none">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={filters.prices.includes(item)}
                      onChange={() => toggleFilter("prices", item)}
                    />
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
            <div
              className="hidden flex-col items-end font-sans gap-1 filter"
              data-filter-key="types"
            >
              {["Hotel", "Apartment", "Hostel", "Villa", "Guesthouse"].map(
                (item) => {
                  return (
                    <label className="flex items-center gap-2 select-none">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={filters.types.includes(item)}
                        onChange={() => toggleFilter("types", item)}
                      />
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
            <div
              className="hidden flex-col items-end font-sans gap-1 filter "
              data-filter-key="ratings"
            >
              {["Under 2", "2-3", "3-4", "4-5"].map((item) => {
                return (
                  <label className="flex items-center gap-2 select-none">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={filters.ratings.includes(item)}
                      onChange={() => toggleFilter("ratings", item)}
                    />
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
            <div
              className="hidden flex-col items-end font-sans gap-1 filter"
              data-filter-key="amenities"
            >
              {["Free Wi-Fi", "Breakfast", "Parking", "Pets allowed"].map(
                (item) => {
                  return (
                    <label className="flex items-center gap-2 select-none">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={filters.amenities.includes(item)}
                        onChange={() => toggleFilter("amenities", item)}
                      />
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
                <MapPinAreaIcon size={16} weight="bold" />
              </button>
            </div>
            <div className="hidden flex-col items-end font-sans gap-1 filter">
              {["City centre", "Near airport", "Beachfront", "Suburb"].map(
                (item) => {
                  return (
                    <label className="flex items-center gap-2 select-none">
                      <input
                        type="checkbox"
                        className="peer sr-only legacy-filter"
                      />
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
                    <input
                      type="checkbox"
                      className="peer sr-only legacy-filter"
                    />
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
                      <input
                        type="checkbox"
                        className="peer sr-only legacy-filter"
                      />
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

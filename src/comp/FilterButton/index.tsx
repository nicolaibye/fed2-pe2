import { CheckIcon } from "@phosphor-icons/react";

function FilterButton() {
  return (
    <>
      <form action="" className="flex flex-row flex-wrap px-4 gap-6 min-w-0">
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
          {["Discount", "Kitchen", "Laundry access"].map((item) => {
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
          {["Discount", "Kitchen", "Laundry access"].map((item) => {
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
      </form>
      <button></button>
    </>
  );
}

export default FilterButton;

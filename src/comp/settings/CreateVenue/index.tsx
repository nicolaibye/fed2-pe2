import { useState, useEffect } from "react";
import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
} from "@phosphor-icons/react";
import { useSearchParams } from "react-router-dom";

function CreateVenue() {
  const token = localStorage.getItem("token");
  const [searchParams, setSearchParams] = useSearchParams();

  const [bodyReg, setBodyReg] = useState({
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      country: "",
    },
  });

  function handleVenueChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, checked, dataset } = event.target;
    if (dataset.group === "meta") {
      setBodyReg((prevBody) => ({
        ...prevBody,
        meta: {
          ...prevBody.meta,
          [name]: checked,
        },
      }));
      return;
    }
    if (dataset.group === "location") {
      setBodyReg((prevBody) => ({
        ...prevBody,
        location: {
          ...prevBody.location,
          [name]: value,
        },
      }));
      return;
    }

    if (name === "rating") {
      setBodyReg((prevBody) => ({
        ...prevBody,
        rating: Number(value),
      }));
      return;
    }

    if (dataset.index !== undefined) {
      const index = Number(dataset.index);
      setBodyReg((prevBody) => {
        const newMedia = [...prevBody.media];
        newMedia[index] = {
          url: value,
          alt: `${bodyReg.name}'s picture ${index + 1}`,
        };

        return {
          ...prevBody,
          media: newMedia,
        };
      });
      return;
    }

    setBodyReg((prevBody) => ({
      ...prevBody,
      [name]: value,
    }));
  }

  useEffect(() => {
    console.log("Updated bodyReg:", bodyReg);
  }, [bodyReg]);

  async function handleVenueSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues`,
        {
          method: "post",
          body: JSON.stringify(buildVenuePayload()),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_TOKEN,
          },
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      if (response.ok) {
        const overlay = document.getElementById("edit-overlay");
        if (overlay) {
          overlay.classList.toggle("hidden");
          overlay.classList.toggle("flex");
          document.body.classList.toggle("overflow-hidden");
          searchParams.delete("newVenue");
          setSearchParams(searchParams);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function cancelAccountUpdate(event: React.FormEvent<HTMLButtonElement>) {
    event?.preventDefault();
    const overlay = document.getElementById("edit-overlay");
    if (overlay) {
      overlay.classList.toggle("hidden");
      overlay.classList.toggle("flex");
      document.body.classList.toggle("overflow-hidden");
      searchParams.delete("newVenue");
      setSearchParams(searchParams);
    }
  }

  function addExtraMedia() {
    setBodyReg((prevBody) => ({
      ...prevBody,
      media: [...prevBody.media, ""],
    }));
  }

  function removeExtraMedia(index: number) {
    const newMedia = [...bodyReg.media];
    newMedia.splice(index, 1);
    setBodyReg((prevBody) => ({
      ...prevBody,
      media: newMedia,
    }));
  }

  function buildVenuePayload() {
    return {
      name: bodyReg.name,
      description: bodyReg.description,
      media: bodyReg.media,
      price: Number(bodyReg.price),
      maxGuests: Number(bodyReg.maxGuests),
      rating: bodyReg.rating,
      meta: bodyReg.meta,
      location: bodyReg.location,
    };
  }

  //   if (isLoading) {
  //     return <LoadingComp />;
  //   }

  //   if (isError) {
  //     return <ErrorComp />;
  //   }

  return (
    <form action="" className="flex flex-col w-full p-5 pb-10 gap-2">
      <h1 className="text-hdWhite font-serif text-3xl text-center mb-3 z-0">
        Create Venue
      </h1>
      <div className="base-shadow flex flex-col gap-1">
        <input
          name="name"
          type="text"
          placeholder="Venue name"
          className="input-field w-full cut-corner"
          onChange={handleVenueChange}
          required
        />
      </div>
      <div className="base-shadow flex flex-col gap-1">
        <textarea
          name="description"
          placeholder="Description"
          className="input-field w-full h-full cut-corner"
          onChange={handleVenueChange}
          required
        />
      </div>
      <div className="z-0 w-full flex flex-row gap-2">
        <ul id="media-list" className="flex flex-col gap-1 w-full">
          {bodyReg.media.map((media, index) => (
            <li key={index} className="flex flex-row gap-2">
              <input
                name="media"
                type="text"
                placeholder="Venue picture URL"
                className="input-field w-full cut-corner"
                onChange={handleVenueChange}
                required
                data-index={index}
              />
              <button
                onClick={() => removeExtraMedia(index)}
                className="circle-button create aspect-square"
              >
                <MinusIcon />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-row gap-1">
          <button
            onClick={addExtraMedia}
            className="circle-button create aspect-square"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="base-shadow flex flex-col gap-1">
          <input
            name="price"
            type="number"
            placeholder="Price per night"
            className="input-field w-full cut-corner"
            onChange={handleVenueChange}
            required
          />
        </div>
        <div className="base-shadow flex flex-col gap-1">
          <input
            name="maxGuests"
            type="number"
            placeholder="Max guests"
            className="input-field w-full cut-corner"
            onChange={handleVenueChange}
            required
          />
        </div>
      </div>
      <div className="base-shadow my-3 flex justify-between gap-1">
        <h2 className="text-hdWhite">Rating</h2>
        <div className="flex flex-row gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <label
              key={`star${star}`}
              htmlFor={`star-${star}`}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                id={`star-${star}`}
                type="radio"
                value={star}
                name="rating"
                checked={bodyReg.rating === star}
                onChange={handleVenueChange}
                className="peer sr-only"
              />
              <span>
                {bodyReg.rating >= star ? (
                  <StarIcon size={22} className="text-hdWhite" weight="fill" />
                ) : (
                  <StarIcon size={22} className="text-hdWhite" />
                )}
              </span>
            </label>
          ))}
        </div>
      </div>
      <fieldset className="z-0 mb-3 text-hdWhite">
        <legend>Amenities</legend>
        <div className="grid grid-cols-2 justify-between">
          {["wifi", "parking", "breakfast", "pets"].map((amenity) => (
            <div
              key={amenity}
              className="flex flex-row-reverse gap-2 items-center justify-end"
            >
              <input
                id={amenity}
                type="checkbox"
                name={amenity}
                data-group="meta"
                checked={bodyReg.meta[amenity]}
                className="peer sr-only"
                onChange={handleVenueChange}
              />
              <label htmlFor={amenity} className="capitalize">
                {amenity}
              </label>
              <span className="custom-checkbox register">
                <CheckIcon size={16} weight="bold" />
              </span>
            </div>
          ))}
        </div>
      </fieldset>
      <div className="flex gap-2">
        <div className="base-shadow flex flex-col gap-1">
          <input
            name="address"
            data-group="location"
            type="text"
            placeholder="Address"
            className="input-field w-full cut-corner"
            onChange={handleVenueChange}
          />
        </div>
        <div className="base-shadow flex flex-col gap-1">
          <input
            name="city"
            data-group="location"
            type="text"
            placeholder="City"
            className="input-field w-full cut-corner"
            onChange={handleVenueChange}
          />
        </div>
      </div>
      <div className="base-shadow flex flex-col gap-1">
        <input
          name="country"
          data-group="location"
          type="text"
          placeholder="Country"
          className="input-field w-full cut-corner"
          onChange={handleVenueChange}
        />
      </div>
      <div className="base-shadow flex flex-row gap-3 z-0">
        <button
          type="submit"
          className="text-xl font-extrabold font-serif w-full h-10 text-hdBlack bg-hdYellow cut-corner"
          onClick={handleVenueSubmit}
        >
          Create
        </button>
        <button
          className="text-xl font-extrabold font-serif w-full h-10 text-hdBlack bg-hdWhite cut-corner"
          onClick={cancelAccountUpdate}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CreateVenue;

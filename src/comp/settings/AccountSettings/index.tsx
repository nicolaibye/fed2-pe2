import { useEffect, useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { useMemo } from "react";
import { useApi } from "../../../hook/useApi";
import type { User } from "../../../types/profile.ts";
import LoadingComp from "../../../comp/LoadingComp";
import ErrorComp from "../../../comp/ErrorComp";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { ToastContext } from "../../../context/ToastContext/useToastContext";

function AccountSettings() {
  const { showToast } = useContext(ToastContext);

  const token = localStorage.getItem("token");
  const loggedInUser = localStorage.getItem("user")?.replace(/"/g, "");
  const [searchParams, setSearchParams] = useSearchParams();

  const userFetchOptions = useMemo(
    () => ({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_TOKEN,
      },
    }),
    [token]
  );
  const {
    data: user,
    isLoading,
    isError,
  } = useApi<User>(
    loggedInUser
      ? `https://v2.api.noroff.dev/holidaze/profiles/${loggedInUser}`
      : "",
    loggedInUser ? userFetchOptions : undefined
  );

  const [bodyReg, setBodyReg] = useState({
    bio: "",
    avatarUrl: "",
    bannerUrl: "",
    venueManager: false,
  });

  useEffect(() => {
    if (user) {
      setBodyReg({
        bio: user.bio || "",
        avatarUrl: user.avatar?.url || "",
        bannerUrl: user.banner?.url || "",
        venueManager: user.venueManager || false,
      });
    }
  }, [user]);

  function handleAccountChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, type } = event.target;
    const value =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : event.target.value;
    setBodyReg((prevBody) => ({
      ...prevBody,
      [name]: value,
    }));
  }

  function buildAccountPayload() {
    return {
      bio: bodyReg.bio,
      avatar: { url: bodyReg.avatarUrl, alt: `${loggedInUser}'s avatar` },
      banner: { url: bodyReg.bannerUrl, alt: `${loggedInUser}'s banner` },
      venueManager: bodyReg.venueManager,
    };
  }

  async function handleAccountSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${loggedInUser}`,
        {
          method: "put",
          body: JSON.stringify(buildAccountPayload()),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_TOKEN,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors?.[0]?.message || "Failed to update profile"
        );
      }
      if (response.ok) {
        const overlay = document.getElementById("edit-overlay");
        const profilePic = document.getElementById(
          "profile-pic"
        ) as HTMLImageElement;
        const bannerPic = document.getElementById(
          "banner-pic"
        ) as HTMLImageElement;
        if (overlay) {
          overlay.classList.toggle("hidden");
          overlay.classList.toggle("flex");
          document.body.classList.toggle("overflow-hidden");
          searchParams.delete("settings");
          setSearchParams(searchParams);
        }
        if (profilePic) {
          profilePic.src = bodyReg.avatarUrl;
        }
        if (bannerPic) {
          bannerPic.src = bodyReg.bannerUrl;
        }
        showToast("success", "Update successful!");
      }
    } catch (error) {
      console.error(error);
      showToast("error", (error as Error).message);
    }
  }

  function cancelAccountUpdate(event: React.FormEvent<HTMLButtonElement>) {
    event?.preventDefault();
    const overlay = document.getElementById("edit-overlay");
    if (overlay) {
      overlay.classList.toggle("hidden");
      overlay.classList.toggle("flex");
      document.body.classList.toggle("overflow-hidden");
      searchParams.delete("settings");
      setSearchParams(searchParams);
    }
  }

  if (isLoading) {
    return <LoadingComp />;
  }

  if (isError) {
    return <ErrorComp />;
  }

  return (
    <form action="" className="flex flex-col w-full p-5 gap-2">
      <h1 className="text-hdWhite font-serif text-3xl text-center mb-3 z-0">
        Update your account
      </h1>
      <div className="grid grid-cols-[1fr_2fr] gap-4 mb-3 z-0 rounded-xs overflow-hidden">
        <img
          src={bodyReg.avatarUrl}
          alt=""
          className="aspect-square object-cover object-top"
        />
        <img
          src={bodyReg.bannerUrl}
          alt=""
          className="aspect-2/1 object-cover object-top"
        />
      </div>
      <div className="base-shadow flex flex-col gap-1">
        <label htmlFor="avatarUrl" className="text-hdWhite">
          Profile picture
        </label>
        <input
          name="avatarUrl"
          type="text"
          placeholder="Profile picture (URL)"
          className="input-field w-full cut-corner"
          onChange={handleAccountChange}
          value={bodyReg.avatarUrl}
        />
      </div>
      <div className="base-shadow flex flex-col gap-1">
        <label htmlFor="bannerUrl" className="text-hdWhite">
          Banner picture
        </label>
        <input
          name="bannerUrl"
          type="text"
          placeholder="Banner picture (URL)"
          className="input-field w-full cut-corner"
          onChange={handleAccountChange}
          value={bodyReg.bannerUrl}
        />
      </div>
      <div className="base-shadow flex flex-col gap-1">
        <label htmlFor="bio" className="text-hdWhite">
          Bio
        </label>
        <textarea
          name="bio"
          placeholder="Bio"
          className="input-field w-full h-full cut-corner"
          onChange={handleAccountChange}
          value={bodyReg.bio}
        />
      </div>
      <label className="flex flex-row-reverse justify-between text-hdWhite items-center gap-2 my-3 cursor-pointer select-none z-100">
        <input
          type="checkbox"
          name="venueManager"
          className="peer sr-only"
          onChange={handleAccountChange}
          checked={bodyReg.venueManager}
        />
        <span className="custom-checkbox register">
          <CheckIcon size={16} weight="bold" />
        </span>
        Are you a venue manager?
      </label>
      <div className="base-shadow flex flex-row gap-3 z-0">
        <button
          type="submit"
          className="text-xl font-extrabold font-serif w-full h-10 text-hdBlack bg-hdYellow cut-corner"
          onClick={handleAccountSubmit}
        >
          Update
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

export default AccountSettings;

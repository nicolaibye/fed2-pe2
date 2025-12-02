import { useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";

function LoginRegisterForm() {
  const [register, setRegister] = useState(true);
  const [bodyReg, setBodyReg] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatarUrl: "",
    bannerUrl: "",
    venueManager: false,
  });
  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  function handleRegisterChange(
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
    console.log(bodyReg);
  }

  function buildRegisterPayload() {
    return {
      name: bodyReg.name,
      email: bodyReg.email,
      password: bodyReg.password,
      bio: bodyReg.bio,
      avatar: { url: bodyReg.avatarUrl, alt: `${bodyReg.name}'s avatar` },
      banner: { url: bodyReg.bannerUrl, alt: `${bodyReg.name}'s banner` },
      venueManager: bodyReg.venueManager,
    };
  }

  async function handleRegisterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(`https://v2.api.noroff.dev/auth/register`, {
        method: "post",
        body: JSON.stringify(buildRegisterPayload()),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      setRegister(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleLoginChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setBody((prevBody) => ({
      ...prevBody,
      [name]: value,
    }));
  }

  async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(`https://v2.api.noroff.dev/auth/login`, {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data.name));
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {register ? (
        <form action="" className="flex flex-col w-full p-5 gap-2">
          <div className="base-shadow">
            <input
              name="name"
              type="text"
              placeholder="Username"
              className="input-field w-full cut-corner"
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className="base-shadow">
            <input
              name="email"
              type="text"
              placeholder="E-mail"
              className="input-field w-full cut-corner"
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className="base-shadow">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input-field w-full cut-corner"
              onChange={handleRegisterChange}
              required
            />
          </div>
          <div className="base-shadow">
            <textarea
              name="bio"
              placeholder="Bio"
              className="input-field w-full h-full cut-corner"
              onChange={handleRegisterChange}
            />
          </div>
          <div className="base-shadow">
            <input
              name="avatarUrl"
              type="text"
              placeholder="Profile picture (URL)"
              className="input-field w-full cut-corner"
              onChange={handleRegisterChange}
            />
          </div>
          <div className="base-shadow">
            <input
              name="bannerUrl"
              type="text"
              placeholder="Banner picture (URL)"
              className="input-field w-full cut-corner"
              onChange={handleRegisterChange}
            />
          </div>
          <label className="flex flex-row-reverse justify-between text-hdWhite items-center gap-2 my-3 cursor-pointer select-none z-100">
            <input
              type="checkbox"
              name="venueManager"
              className="peer sr-only"
              onChange={handleRegisterChange}
            />
            <span className="custom-checkbox register">
              <CheckIcon size={16} weight="bold" />
            </span>
            Are you a venue manager?
          </label>
          <div className="base-shadow">
            <button
              type="submit"
              className="text-xl font-extrabold font-serif w-full h-10 text-hdBlack bg-hdYellow cut-corner"
              onClick={handleRegisterSubmit}
            >
              Get started!
            </button>
          </div>
        </form>
      ) : (
        <form action="" className="flex flex-col w-full p-5 gap-2">
          <div className="base-shadow">
            <input
              name="email"
              type="text"
              placeholder="E-mail"
              className="input-field w-full cut-corner"
              onChange={handleLoginChange}
            />
          </div>
          <div className="base-shadow">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input-field w-full cut-corner"
              onChange={handleLoginChange}
            />
          </div>
          <div className="base-shadow">
            <button
              type="submit"
              className="text-xl font-extrabold font-serif w-full h-10 text-hdBlack bg-hdYellow cut-corner"
              onClick={handleLoginSubmit}
            >
              Login
            </button>
          </div>
        </form>
      )}
      <button
        onClick={() => setRegister(!register)}
        className="text-hdWhite z-100 text-sm underline font-light"
      >
        {register
          ? "Already have an account? Log in here."
          : "Don't have an account? Register here."}
      </button>
    </>
  );
}

export default LoginRegisterForm;

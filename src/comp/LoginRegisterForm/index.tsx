import { useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";

function LoginRegisterForm() {
  const [register, setRegister] = useState(true);
  return (
    <>
      {register ? (
        <form action="" className="flex flex-col w-full p-5 gap-2">
          <div className="base-shadow">
            <input
              type="text"
              placeholder="Username"
              className="input-field w-full cut-corner"
            />
          </div>
          <div className="base-shadow">
            <input
              type="text"
              placeholder="E-mail"
              className="input-field w-full cut-corner"
            />
          </div>
          <div className="base-shadow">
            <textarea
              placeholder="Bio"
              className="input-field w-full h-full cut-corner"
            />
          </div>
          <div className="base-shadow">
            <input
              type="text"
              placeholder="Profile picture (URL)"
              className="input-field w-full cut-corner"
            />
          </div>
          <div className="base-shadow">
            <input
              type="text"
              placeholder="Banner picture (URL)"
              className="input-field w-full cut-corner"
            />
          </div>
          <label className="flex flex-row-reverse justify-between text-hdWhite items-center gap-2 my-3 cursor-pointer select-none z-100">
            <input type="checkbox" className="peer sr-only" />
            <span className="custom-checkbox register">
              <CheckIcon size={16} weight="bold" />
            </span>
            Are you a venue manager?
          </label>
          <div className="base-shadow">
            <button
              type="submit"
              className="text-xl font-extrabold font-serif w-full h-10 text-hdBlack bg-hdYellow cut-corner"
            >
              Get started!
            </button>
          </div>
        </form>
      ) : (
        <form action="" className="flex flex-col w-full p-5 gap-2">
          <div className="base-shadow">
            <input
              type="text"
              placeholder="E-mail"
              className="input-field w-full cut-corner"
            />
          </div>
          <div className="base-shadow">
            <input
              type="text"
              placeholder="Password"
              className="input-field w-full cut-corner"
            />
          </div>
          <div className="base-shadow">
            <button
              type="submit"
              className="text-xl font-extrabold font-serif w-full h-10 text-hdBlack bg-hdYellow cut-corner"
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

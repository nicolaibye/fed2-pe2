import { CaretLeftIcon } from "@phosphor-icons/react";
import LoginRegisterForm from "../../comp/LoginRegisterForm";
import { Link } from "react-router-dom";

function LoginReg() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen -mb-20 -mx-5 -mt-5 md:-mx-10 md:-mt-10 bg-hdRed">
      <Link
        to="/"
        className="absolute top-5 left-5 z-100 bg-hdYellow rounded-full flex flex-row items-center gap-2"
      >
        <div className="circle-button home base-shadow">
          <CaretLeftIcon weight="bold" size={20} className="text-hdBlack" />
        </div>
        <p className="text-hdBlack font-bold pr-3">Home</p>
      </Link>
      <div className="absolute inset-1 bg-[url(/SwirlPattern.svg)] w-full h-full top-0 left-0 bg-repeat pointer-events-none"></div>
      <img
        src="/shadows/9_1440p.png"
        alt=""
        className="z-500 h-full object-cover object-right absolute opacity-75 pointer-events-none"
      />
      <h1 className="z-1000 text-hdWhite font-serif text-3xl text-center">
        Welcome to{" "}
        <img src="/holidaze_name_white.svg" alt="Holidaze" className="w-52" />
      </h1>
      <LoginRegisterForm />
    </div>
  );
}

export default LoginReg;

import React, { useCallback, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { AuthorizeFetch } from "./authorize/authorizeFetch";
import rocket from "../assets/svgs/rocket.svg";
import logo from "../assets/svgs/logo.svg";

export default function Login() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("login");
    // Do whatever you want with the token
  }, [executeRecaptcha]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return (
    <div className="flex items-center justify-around h-screen bg-[#f1f3f6]">
      <img
        className="object-cover w-[50vw] transform rotate-[-30deg] hidden md:block"
        src={rocket}
        alt="rocket"
        width="320"
        height="320"
      />

      <div className="flex flex-col items-center justify-around sm:w-1/2 h-1/3  bg-bg-container rounded-lg shadow-xl drop-shadow-md transform translate-x-0 md:translate-x-[-30%] ">
        <h1 className="flex flex-col md:flex-row items-center justify-center text-2xl md:gap-2 font-bold text-center mt-10">
          Dashboard
          <img src={logo} alt="logo" width="100" height="100" />
        </h1>
        <div className="flex flex-col items-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-full px-8">
            <input
              type="email"
              className="w-full md:w-1/2 p-2 m-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-ring-primary focus:border-transparent"
              placeholder="Email"
              focus="true"
            />
          </div>

          <button
            className="text-sm font-bold text-text-primary rounded-lg p-2 border border-border-primary hover:bg-bg-primary hover:text-white"
            onClick={() => {
              handleReCaptchaVerify();
              AuthorizeFetch(document.querySelector("input").value);
            }}
          >
            Autorizeaza
          </button>

          <p className="text-sm font-bold text-text-primary hidden">
            Email trimis
          </p>
        </div>
      </div>
    </div>
  );
}

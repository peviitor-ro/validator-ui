import React from "react";
import { AuthorizeFetch } from "./authorize/authorizeFetch";

export default function Login() {
  function Authorize() {
    const email = document.querySelector("input[type=email]").value;

    AuthorizeFetch(email).then((response) => {
      console.log(response);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-1/2 h-1/2 bg-bg-primary rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl font-bold text-center text-text-primary">
            Login
          </h1>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <label className="text-sm font-bold text-text-primary">Email</label>
            <input
              type="email"
              className="w-1/2 p-2 m-2 border border-border-primary rounded-lg"
            />
            <button
              className="text-sm font-bold text-text-primary"
              onClick={Authorize}
            >
              Authorize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

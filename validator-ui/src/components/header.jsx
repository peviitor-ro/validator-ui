import React from "react";
import logo from "../assets/svgs/logo.svg";

export default function Header(props) {
  return (
    <div
      className="
    flex
    justify-center
    items-center
    h-16
    bg-bg-header
    "
    >
      <a href="/">
        <img src={logo} alt="logo" className="logo" />
      </a>
    </div>
  );
}

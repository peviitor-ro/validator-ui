import React from "react";
import Header from "../components/header/header";

export default function Homepage() {
  return (
    <>
      <Header
        links={[
          {
            name: "Joburi",
            url: "#",
          },
          {
            name: "Companii",
            url: "#",
          },
          {
            name: "Cautare",
            url: "#",
          },
          {
            name: "Despre",
            url: "#",
          },
          {
            name: "Contact",
            url: "#",
          },
          {
            name: "Documentatie",
            url: "#",
          },
        ]}
      />
      <div className="flex flex-col items-center justify-center h-screen"></div>
    </>
  );
}

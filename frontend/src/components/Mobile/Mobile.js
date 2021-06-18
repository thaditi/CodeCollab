import React from "react";
import localclasses from "./Mobile.module.css";
import bgimg from "../../assets/Mobile.svg";

const Mobile = () => {
  return (
    <div style={{ backgroundColor: "#000a29", height: "100vh" }}>
      <img
        src={bgimg}
        className={localclasses.mobilehome__svg}
        alt="CodeCollab"
      />
    </div>
  );
};

export default Mobile;

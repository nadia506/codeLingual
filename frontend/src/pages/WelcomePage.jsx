import React from "react";
import { Link } from "react-router-dom";
import "../styles/WelcomePage.css";
//import backgroundImg from "../assets/background.jpg"; // Import your background image

const WelcomePage = () => {
  return (
    <div className="home">
      <div
        className="container"
        // style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="content">
          <h1 className="title">
            Welcome to <span className="highlight">Code Converter </span>{" "}
            CodeLingual
          </h1>
          <p className="description">
            Convert your code from one language to another easily with{" "}
            <span className="highlight">Code Lingual</span>.
          </p>
          <Link to="/converter" className="link">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

import React from "react";
import { Link } from "react-router-dom";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <Link to="/" className="navbar-brand page-scroll">
            Pune University
          </Link>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/features" className="page-scroll">
                Features
              </Link>
            </li>
            <li>
              <Link to="/about" className="page-scroll">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="page-scroll">
                Services
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="page-scroll">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" className="page-scroll">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/adminLogin" className="page-scroll">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

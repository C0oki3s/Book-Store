import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const navStyle = {
    color: "white",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="navbar-brand" to="/">
          <li style={navStyle} className="Navlink">
            Home
          </li>
        </Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="navbar-brand" to="/admin/getbooks">
              <li style={navStyle}>GetBooks</li>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="navbar-brand" to="/admin/getusers">
              <li style={navStyle}>GetUsers</li>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="navbar-brand" to="/admin/upload">
              <li style={navStyle}>UploadBook</li>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

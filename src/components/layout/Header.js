import React from "react";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <nav className="navbar bg-primary">
      <Link to="/">
        <h1>{title}</h1>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

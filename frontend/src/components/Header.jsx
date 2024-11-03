import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav">
      <div className="container flex justify-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add">Add</NavLink>
        <NavLink to="/sold">Sold</NavLink>
      </div>
    </div>
  );
};

export default Header;

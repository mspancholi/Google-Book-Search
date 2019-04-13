import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="navbar-brand" >
        Google Book Search
      </div>

      <a className="nav-link" href="/search">
        Search
      </a>
      <a className="nav-link" href="/">
        Saved
      </a>
    </nav>
  );
}

export default Nav;

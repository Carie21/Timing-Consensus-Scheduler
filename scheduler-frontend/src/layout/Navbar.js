import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
        <div className="navbar-brand">
            Timing Consensus Scheduler
          </div>
          

          <Link className="btn btn-outline-light" to="/users/new">
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
}
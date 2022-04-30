import React, { useState } from "react";
import NavbarSearch from "./NavbarSearch";

const Navbar = ({
  clientPublicAddress,
  clientPrivilege,
  chosenCurrency,
  setChosenCurrency,
}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">Expenses-Splitter</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 w-100 justify-content-between">
            <li className="nav-item nav-item1">
              <div
                className="nav-link active client_public_address1 client_public_address"
                aria-label="account"
                aria-current="page"
              >
                {clientPublicAddress}
              </div>
              <div
                className="nav-link active client_public_address2 client_public_address"
                aria-label="account"
                aria-current="page"
              >
                {clientPublicAddress}
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link active user_privilege"
                aria-label="account"
              >
                {clientPrivilege.stringify}
              </div>
            </li>
            <li className="nav-item dropstart me-5">
              <div
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {chosenCurrency}
              </div>
              <NavbarSearch setChosenCurrency={setChosenCurrency} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";

// function filterFunction() {
//     var input, filter, a, i;
//     input = document.getElementById("search");
//     filter = input.value.toUpperCase();
//     div = document.getElementById("scrollable");
//     a = div.getElementsByTagName("a");
//     for (i = 0; i < a.length; i++) {
//       txtValue = a[i].textContent || a[i].innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         a[i].style.display = "";
//       } else {
//         a[i].style.display = "none";
//       }
//     }
//   }

const Navbar = ({ client_public_address, curr_data, clientPrivilege }) => {
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
                {client_public_address}
              </div>
              <div
                className="nav-link active client_public_address2 client_public_address"
                aria-label="account"
                aria-current="page"
              >
                {client_public_address}
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
            <li className="nav-item dropdown me-5 pe-2">
              <div
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Currency
              </div>
              <ul
                className="dropdown-menu me-5"
                id="scrollable"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <input
                  // type="text"
                  // placeholder="Search..."
                  // id="search"
                  // onkeyup="filterFunction()"
                  />
                </li>
                {/* {  (Object.keys(curr_data.data.rates)).map(curr => (
                    <li><div className="dropdown-item">{curr}</div></li>
                ))} */}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

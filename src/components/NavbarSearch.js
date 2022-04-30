import React, {useState, useEffect} from "react";

const NavbarSearch = ({setChosenCurrency}) => {

  const [currencyUrl, setCurrencyUrl] = useState(
    "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
  );
  const [currencyNames, setCurrencyNames] = useState();
  const [filteredResults, setFilteredResults] = useState();

  useEffect(() => {
    fetch(currencyUrl)
      .then((response) => response.json())
      .then((d) => {
        setCurrencyNames(Object.keys(d.data.rates));
        setFilteredResults(Object.keys(d.data.rates));
      });
  }, []);

    //Search function for currencies
    function filterFunction(keyword) {
    if (keyword !== "") {
      const results = currencyNames.filter((curr) => {
        return curr.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFilteredResults(results);
    }
    else{

    }
  }

  return (
    <>
      <ul
        className="dropdown-menu"
        id="scrollable"
        aria-labelledby="navbarDropdown"
      >
        <li>
          <input
            type="text"
            placeholder="Search..."
            id="search"
            onChange={(e) => filterFunction(e.target.value)}
          />
        </li>
        {
        (filteredResults !== undefined) &&
        filteredResults.map((curr) => (
          <li key={curr}>
            <div className="dropdown-item" onClick={() => setChosenCurrency(curr) }>{curr}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavbarSearch;

import React from "react";
import Navbar from './components/Navbar'

// import Web3 from "web3";

function App() {

  const ce_url = "https://api.coinbase.com/v2/exchange-rates?currency=ETH";
  let curr_data;

  fetch(ce_url)
  .then((response) => response.json())
  .then((d) => {
    // console.log(Object.keys(d.data.rates));
    curr_data = d;
  });

  return (
    <div className="App">
      <Navbar client_public_address="0x000000abcd" curr_data={curr_data} />
    </div>
  );
}

export default App;

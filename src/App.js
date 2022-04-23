import React, { useState } from "react";
import Web3 from "web3";

// components
import Navbar from "./components/Navbar";
import Setup from "./components/Setup";

// custom Classes
import Privilege from "./Privilege";

function App() {
  // Constants/Vars to be used in the App
  const ce_url = "https://api.coinbase.com/v2/exchange-rates?currency=ETH";
  let curr_data;

  // Create web3 instance to pass to all child components
  const [web3] = useState(
    new Web3(Web3.givenProvider || "http://127.0.0.1:7545")
  );

  const [clientAddress, setClientAddress] = useState("");

  const [clientPrivilege, setClientPrivilege] = useState(Privilege.NEW_CLIENT);
  const [activeContract, setActiveContract] = useState();

  // FIXME: Can this api be eliminated? fetch json data once and hard code it?
  fetch(ce_url)
    .then((response) => response.json())
    .then((d) => {
      // console.log(Object.keys(d.data.rates));
      curr_data = d;
    });

  return (
    <div className="App">
      <Navbar
        client_public_address={clientAddress}
        curr_data={curr_data}
        clientPrivilege={clientPrivilege}
      />
      <Setup
        web3={web3}
        clientAddress={clientAddress}
        activeContract={activeContract}
        setClientAddress={setClientAddress}
        setActiveContract={setActiveContract}
      />
    </div>
  );
}

export default App;

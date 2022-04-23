import React, { useState, useEffect } from "react";
import Web3 from "web3";

// components
import Navbar from "./components/Navbar";
import Setup from "./components/Setup";

// custom Classes
import Privilege from "./class/Privilege";
import Client from "./class/Client";
import Expense from "./class/Expense";

function App() {
  // Constants/Vars to be used in the App
  // const [currencyUrl, setCurrencyUrl] = useState("https://api.coinbase.com/v2/exchange-rates?currency=ETH");
  // const [currencyData, setCurrencyData] = useState({});

  // Create web3 instance to pass to all child components
  const [web3] = useState(
    new Web3(Web3.givenProvider || "http://127.0.0.1:7545")
  );

  // example
  // let john = Client(0x1234, "John", Privilege.MANAGER);
  // let beers = Expense(100, john.ethAddress, "Beers");

  const [clients, setClients] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [clientAddress, setClientAddress] = useState("");

  const [clientPrivilege, setClientPrivilege] = useState(Privilege.NEW_CLIENT);
  const [activeContract, setActiveContract] = useState();

  // TODO: Can this api be eliminated? fetch json data once and hard code it? (We need current exchange rate)
  // useEffect(() => {
  //   fetch(currencyUrl)
  //   .then((response) => response.json())
  //   .then((d) => {
  //     setCurrencyData(d);
  //   });
  // }, []);

  return (
    <div className="App">
      <Navbar
        clientPublicAddress={clientAddress}
        //currencyData={currencyData}
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

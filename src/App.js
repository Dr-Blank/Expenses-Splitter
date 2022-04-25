import React, { useState, useEffect } from "react";
import Web3 from "web3";

// components
import Navbar from "./components/Navbar";
import Setup from "./components/Setup";
import AddAccount from "./components/AddAccount";
import AddExpense from "./components/AddExpense";
import ExpensesTable from "./components/ExpensesTable";

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

  const [clients, setClients] = useState([]); // {name: name, ethAddress: ethAddress}
  const [expenses, setExpenses] = useState([]);

  const [activeClient, setActiveClient] = useState(
    new Client("", "", Privilege.NEW_CLIENT)
  );

  const [activeContract, setActiveContract] = useState();

  const deleteClient = (id) => {
    setClients(clients.filter((c) => c.ethAddress !== id));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.ethAddress !== id));
  };

  // TODO: Can this api be eliminated? fetch json data once and hard code it? (We need current exchange rate)
  // useEffect(() => {
  //   fetch(currencyUrl)
  //   .then((response) => response.json())
  //   .then((d) => {
  //     setCurrencyData(d);
  //   });
  // }, []);

  // TODO: Error Handling/do not let user to enter any empty values (popups,etc)
  return (
    <div className="App">
      <Navbar
        clientPublicAddress={activeClient.ethAddress}
        //currencyData={currencyData}
        clientPrivilege={activeClient.privilege}
      />
      <Setup
        web3={web3}
        activeClient={activeClient}
        setActiveClient={setActiveClient}
        activeContract={activeContract}
        setActiveContract={setActiveContract}
        Privilege={Privilege}
      />
      <AddAccount
        setClients={setClients}
        clients={clients}
        activeContract={activeContract}
        activeClient={activeClient}
        Privilege={Privilege}
        web3={web3}
      />
      <AddExpense
        clients={clients}
        setClients={setClients}
        expenses={expenses}
        setExpenses={setExpenses}
        deleteClient={deleteClient}
      />
      <ExpensesTable expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
}

export default App;

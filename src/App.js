import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useTransition, animated } from "react-spring";

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
  // Create web3 instance to pass to all child components
  const [web3] = useState(
    new Web3(Web3.givenProvider || "http://127.0.0.1:7545")
  );

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

  // ReactTransitions
  const [showSection, setShowSection] = useState(false);
 
  // TODO: Error Handling/do not let user to enter any empty values (popups,etc)
  return (
    <div className="App">
      <Navbar
        clientPublicAddress={activeClient.ethAddress}
        clientPrivilege={activeClient.privilege}
      />
      <Setup
        web3={web3}
        activeClient={activeClient}
        setActiveClient={setActiveClient}
        activeContract={activeContract}
        setActiveContract={setActiveContract}
        Privilege={Privilege}
        setShowSection={setShowSection}
      />
     <AddAccount
        setClients={setClients}
        clients={clients}
        activeContract={activeContract}
        activeClient={activeClient}
        Privilege={Privilege}
        web3={web3}
        showSection={showSection}
        />
      <AddExpense
        clients={clients}
        setClients={setClients}
        activeClient={activeClient}
        activeContract={activeContract}
        expenses={expenses}
        setExpenses={setExpenses}
        deleteClient={deleteClient}
        web3={web3}
        showSection={showSection}
      />
      <ExpensesTable
        expenses={expenses}
        deleteExpense={deleteExpense}
        activeClient={activeClient}
        activeContract={activeContract}
        showSection={showSection}
      />
    </div>
  );
}

export default App;

import { disconnect } from 'process';
import React, { useState } from 'react';
import NamesButton from './NamesButton';
import { useTransition, animated } from "react-spring";
import xpng from './images/x.png';

const AddExpense = ( {clients, setClients, activeClient, activeContract, expenses, setExpenses, deleteClient, web3, showSection}) => {

  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");

  const [selectedClient,setSelectedClient] = useState({});

  const addExpense = async () => {

    try {
      await activeContract.methods
      .addExpense(web3.utils.toWei(expense,'ether'),selectedClient.ethAddress,description)
      .send({ from: activeClient.ethAddress, gas: 4700000 });
    }
    catch (err) {
      console.error(err);
      return;
    }

    setExpenses([
      ...expenses,
      {
        amount: expense,
        paidBy: selectedClient.ethAddress,
        description: description,
      },
    ]);

    setExpense("");
    setDescription("");
  };
  
  const [isSelected,setIsSelected] = useState(false);

  const toggle = () => {
    if (isSelected){
      setIsSelected(false);
    }
    else{
      setIsSelected(true);
    }
    setSelectedClient({name:"owner",ethAddress:activeClient.ethAddress});
};

  const transition = useTransition(showSection, {
    from: { y:300, opacity: 0 },
    enter: { y:0,opacity: 1 },
    leave: { y:300,opacity: 0 },
    delay: 100
  });

  return (
    <div className="container">
      {transition((style, item) =>
        item ? (
      <animated.div style={style}>
        <div className="expenses row justify-content-between">
          <div className="col">
            <input
              type="number"
              id="total_expense"
              className="form-control"
              placeholder="Total Expense"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
            />
            <textarea
              id="expense_details"
              className="form-control"
              placeholder="Details(optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="col-6 names">
          <div className="names_btn_container">
        <button 
            type="button" 
            onClick={toggle} 
            className={`names_btn ${isSelected ? "selected_user" : ""}`}>
                Owner
        </button>
        <span onClick={() =>deleteClient()}>
            <img className="delete_user" src={xpng} />
        </span>
    </div>
              {clients.map((client) => (
                <NamesButton
                  key={client.ethAddress}
                  client={client}
                  setSelectedClient={setSelectedClient}
                  deleteClient={deleteClient}
                  activeContract={activeContract}
                />
              ))}
          </div>
          <button
            id="add_exp_btn"
            className="col-2 btn btn-info"
            onClick={addExpense}
          >
            <span id="plus">+</span> Add an Expense
          </button>
        </div>
      </animated.div>
      ) : 
      ""
  )}
    </div>
  );
}

export default AddExpense
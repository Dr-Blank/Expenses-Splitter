import { disconnect } from 'process';
import React, { useState } from 'react';
import NamesButton from './NamesButton';

const AddExpense = ( {clients, setClients, expenses, setExpenses, deleteClient}) => {

  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");

  const [selectedClient,setSelectedClient] = useState({});

  const addExpense = () => {
    setExpenses([
      ...expenses,
      {
        name: selectedClient.name,
        ethAddress: selectedClient.ethAddress,
        expense: expense,
        description: description,
      },
    ]);
    setExpense("");
    setDescription("");
  };
  
  return (
    <div className="container">
      <div className="expenses row justify-content-between">
        <div className="col">
          <input
            type="number"
            id="total_expense"
            className="form-control"
            placeholder="Total Expense"
            value={expense}
            onChange={(e) => setExpense(e.target.valueAsNumber)}
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
            {clients.map((client) => (
              <NamesButton
                key={client.ethAddress}
                client={client}
                setSelectedClient={setSelectedClient}
                deleteClient={deleteClient}
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
    </div>
  );
}

export default AddExpense
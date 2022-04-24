import { disconnect } from 'process';
import React, { useState } from 'react';
import NamesButton from './NamesButton';

const AddExpense = ( {clients, setClients, expenses, setExpenses}) => {

  const [expense, setExpense] = useState();
  const [description, setDescription] = useState("");

  const [selectedClient,setSelectedClient] = useState("");

  const addExpense = () => {
      setExpenses([...expenses,{client:selectedClient,expense:expense,description:description}])
  }

  return (
    <div className='container'>
        <div className="expenses row justify-content-between">
        <div className="col">
          <input 
            type="number" 
            id="total_expense" 
            className='form-control' 
            placeholder="Total Expense"
            defaultValue = {expense}
            onChange = {(e) => setExpense(e.target.valueAsNumber)}
          />
          <textarea
            id="expense_details"
            className='form-control'
            placeholder="Details(optional)"
            value = {description}
            onChange = {(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="col-6 names">
            <div className="names_btn_container">
                 {clients.map((client, index) =>
                    <NamesButton key={index} client={client} setSelectedClient={setSelectedClient} />
                )}
            </div>
        </div>
        <button id="add_exp_btn" className="col-2 btn btn-info" onClick={addExpense}>
          <span id="plus">+</span> Add an Expense
        </button>
      </div>
    </div>
  )
}

export default AddExpense
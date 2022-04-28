import React from "react";
import { useTransition, animated } from "react-spring";

// TODO: Add ability to delete the row and error handling (empty values)
const ExpensesTable = ({ expenses, deleteExpense, activeClient, activeContract, showSection }) => {

  const settleExpense = async () => {
    activeContract.methods
    .settleBalance()
    .send({ from: activeClient.ethAddress, gas: 4700000 })
  }

  const transition = useTransition(showSection, {
    from: { y:300, opacity: 0 },
    enter: { y:0,opacity: 1 },
    leave: { y:300,opacity: 0 },
    delay: 200
  });

  return (
    <div className="container">
      {transition((style, item) =>
        item ? (
      <animated.div style={style}>
      <div className="table_container">
        <table className="table table-expenses">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Paid by</th>
              <th scope="col">Amount</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.description}</td>
                <td>{expense.paidBy}</td>
                <td>{expense.amount}</td>
                <td>
                  <button
                    className="btn btn-danger expense_delete"
                    onClick={() => deleteExpense(expense.ethAddress)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <div className="d-flex settle_button_container justify-content-end">
        <button 
        className="btn btn-info settle_button"
        onClick={() => settleExpense()}
        >Settle Expenses</button>
      </div>
      </animated.div>
      )
      :
      ""
      )}
    </div>
  );
};

export default ExpensesTable;

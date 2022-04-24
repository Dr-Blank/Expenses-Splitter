import React from 'react'

// TODO: Add ability to delete the row and error handling (empty values)
const ExpensesTable = ({expenses, deleteExpense}) => {
  
  return (
    <div className="container">
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
            {expenses.map((expense,index) => (
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
    </div>
  );
}

export default ExpensesTable
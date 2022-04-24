import React from 'react'

// TODO: Add ability to delete the row and error handling (empty values)
const ExpensesTable = ({expenses, deleteExpense}) => {
  
  return (
    <div className="container">
      <div className="table_container">
        <table className="table table-expenses">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Expense</th>
              <th scope="col">Paid by</th>
              <th scope="col">Individual Due</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.ethAddress}>
                <td>{expense.expense}</td>
                <td>{expense.client}</td>
                <td>Placeholder</td>
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
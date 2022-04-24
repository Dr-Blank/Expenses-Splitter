import React from 'react'

// TODO: Add ability to delete the row and error handling (empty values)
const ExpensesTable = ({expenses}) => {
  return (
    <div className='container'>
      <div className="table_container">
        <table className="table table-expenses">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Expense</th>
              <th scope="col">Users</th>
              <th scope="col">Individual Due</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {console.log(expenses)}
            {expenses.map((expense)=>
              <tr>
              <td>{expense.expense}</td>
              <td>{expense.client}</td>
              <td>Placeholder</td>
              <td><button className='btn btn-danger expense_delete'>Delete</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExpensesTable
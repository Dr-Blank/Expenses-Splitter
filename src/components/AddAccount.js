import React from 'react'

const AddAccount = () => {
  return (
    <div className='container'>
        <div className="add_account d-flex flex-row justify-content-between">
        <div className="add_account_heading me-3">Add Account</div>
        <div className="me-3">
          <input type="text" id="username" placeholder="Account Name" />
        </div>
        <div className="me-3">
          <input
            type="text"
            id="eth_address"
            placeholder="ETH Public address"
          />
        </div>
        <button type="button" id="add_user_btn" className="btn btn-primary">
          Add
        </button>
      </div>
    </div>
  )
}

export default AddAccount
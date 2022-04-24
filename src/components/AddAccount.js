import React, {useState} from "react";

const AddAccount = ({ setClients, clients}) => {

    const [name, setName] = useState("");
    const [ethAddress,setEthAddress] = useState("");

    const addClient = () => {
        setClients([...clients,{name: name, ethAddress: ethAddress}]);
        setName("");
        setEthAddress("");
    };

  // TODO: Error handling (empty values in forms shouldn't get submitted)
  return (
    <div className="container">
      <hr></hr>
      <h2 className="add_account_heading me-3">Add User</h2>
      <div className="add_account d-flex flex-row flex-wrap justify-content-between">
        <input
          type="text"
          id="username"
          className="form-control"
          placeholder="User Name"
          value = {name}
          onChange = {(e) => setName(e.target.value)}
        />
        <input
          type="text"
          id="eth_address"
          className="form-control"
          placeholder="ETH Public address"
          value = {ethAddress}
          onChange = {(e) => setEthAddress(e.target.value)}
        />
        <button onClick={addClient} type="button" id="add_user_btn" className="btn btn-primary">
          Add User
        </button>
      </div>
    </div>
  );
};

export default AddAccount;

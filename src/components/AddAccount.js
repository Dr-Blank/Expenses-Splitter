import React, { useState } from "react";

const AddAccount = ({
  setClients,
  clients,
  activeContract,
  activeClient,
  Privilege,
}) => {
  const [name, setName] = useState("");
  const [ethAddress, setEthAddress] = useState("");

  const addClient = async () => {
    // check if user is already added to
    try {
      let response = await activeContract.methods
        .isAllowedToParticipate(ethAddress)
        .call({ from: activeClient.ethAddress, gas: 4700000 });
      console.log("response :>> ", response);
      if (response) {
        window.alert("You already added to this user");
        return;
      }
    } catch (error) {
      console.error(error);
    }

    // call contract here
    try {
      await activeContract.methods
        .setUserAsParticipant(ethAddress, true)
        .call({ from: activeClient.ethAddress, gas: 4700000 });
    } catch (error) {
      console.error(error);
    }

    // add to clients
    setClients([
      ...clients,
      { name: name, ethAddress: ethAddress, privilege: Privilege.PARTICIPANT },
    ]);

    // clear the form
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          id="eth_address"
          className="form-control"
          placeholder="ETH Public address"
          value={ethAddress}
          onChange={(e) => setEthAddress(e.target.value)}
        />
        <button
          onClick={addClient}
          type="button"
          id="add_user_btn"
          className="btn btn-primary"
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default AddAccount;

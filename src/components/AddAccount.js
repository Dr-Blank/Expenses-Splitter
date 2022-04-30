import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

const AddAccount = ({
  setClients,
  clients,
  activeContract,
  activeClient,
  Privilege,
  web3,
  showSection
}) => {
  const [name, setName] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [alsoManager, setAlsoManager] = useState(false);

  const addClient = async () => {
    console.log("Setting as participant", ethAddress);
    if (!web3.utils.isAddress(ethAddress)) {
      window.alert(`Invalid address: ${ethAddress}`);
      return;
    }
    // check if user is already added to
    try {
      let response = await activeContract.methods
        .isAllowedToParticipate(ethAddress)
        .call({ from: activeClient.ethAddress, gas: 4700000 });
      console.log("already participant? :>> ", response);
      if (response) {
        window.alert("Already a Participant ", ethAddress);
      } else {
        // call contract here
        if (alsoManager) {
          await activeContract.methods
            .setUserAsManager(ethAddress, true)
            .send({ from: activeClient.ethAddress, gas: 4700000 });
        } else {
          await activeContract.methods
            .setUserAsParticipant(ethAddress, true)
            .send({ from: activeClient.ethAddress, gas: 4700000 });
          
        }
      }
    } catch (error) {
      console.error(error);
      return;
    }

    // add to clients
    setClients([
      ...clients,
      { name: name, ethAddress: ethAddress, privilege: Privilege.PARTICIPANT },
    ]);

    localStorage.setItem(ethAddress, name);

    // clear the form
    setName("");
    setEthAddress("");
  };

  const transition = useTransition(showSection, {
    from: { y:300, opacity: 0 },
    enter: { y:0,opacity: 1 },
    leave: { y:300,opacity: 0 },
  });

  // TODO: Error handling (empty values in forms shouldn't get submitted)
  return (
    <div className="container">
      {transition((style, item) =>
        item ? (
          <animated.div style={style}>
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
              {
              /* <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={alsoManager}
                  onChange={(e) => {
                  setAlsoManager(!alsoManager);
                  }}
                />
                <label className="form-check-label">Is Manager</label>
              </div> */
              }
              <button
                onClick={addClient}
                type="button"
                id="add_user_btn"
                className="btn btn-primary"
              >
                Add User
              </button>
            </div>
          </animated.div>
        ) : 
          ""
      )}
    </div>
  );
};

export default AddAccount;

import PropTypes from "prop-types";
import { React, useState } from "react";

const Setup = ({
  web3,
  clientAddress,
  setClientAddress,
  setActiveContract,
  activeContract,
}) => {
  // connection state
  const [isMetaMaskConnected, setMetaMaskConnected] = useState(false);

  // function to connect MetaMask
  async function connectMetamask() {
    console.log("Connecting to MetaMask");
    const accounts = await web3.eth.requestAccounts();
    let account = accounts[0];
    setMetaMaskConnected(true);
    setClientAddress(account);
  }
  async function deployContract(bytecode, ABI) {
    let contract = new web3.eth.Contract(ABI);

    await contract
      .deploy({ data: bytecode })
      .send({ from: clientAddress, gas: 4700000 })
      .on("receipt", (receipt) => {
        console.log("Contract Address:", receipt.contractAddress);
        // TODO: Find out how to set the newly created contract
        setActiveContract(contract);
      })
      .then((demoContract) => {
        demoContract.methods.OWNER().call((err, data) => {
          console.log("Owner:", data);
        });
      });
  }

  async function deployNewContract() {
    console.log("fetching contract from server");
    fetch("http://localhost:3001/api/compile")
      .then((response) => response.json())
      .then((data) => {
        deployContract(data.bytecode, data.ABI);
      });
  }

  return (
    <section className="container">
      <h1 className="display-2">Setup</h1>
      <button
        type="button"
        className={`btn btn-${isMetaMaskConnected ? "success" : "info"}`}
        onClick={connectMetamask}
      >
        {isMetaMaskConnected ? "MetaMask Connected" : "Connect to MetaMask"}
      </button>
      <h1 className="display-3">Contracts</h1>
      <div className="">
        <h2>
          {activeContract
            ? "your active contract"
            : "No active contract found. Please create a new one or join an existing one"}
        </h2>
        <hr />
        <button
          id="deploy-contract"
          type="button"
          className="btn btn-dark"
          onClick={deployNewContract}
        >
          Create New Contract
        </button>
      </div>
      <div className="">
        <h3>Join existing contract</h3>
        {/* TODO implent existing contract */}
        <input
          type="text"
          name="existing contract"
          id=""
          placeholder="Address of existing contract"
        />
      </div>
    </section>
  );
};

Setup.propTypes = {
  web3: PropTypes.object.isRequired,
};

export default Setup;

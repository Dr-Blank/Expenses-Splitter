import PropTypes from "prop-types";
import { React, useState } from "react";
import CreateNewContract from "./Setup/CreateNewContract";
import CurrentContract from "./Setup/CurrentContract";
import JoinExistingContract from "./Setup/JoinExistingContract";

const Setup = ({
  web3,
  activeClient,
  setActiveClient,
  activeContract,
  setActiveContract,
  Privilege,
  setShowSection
}) => {
  // connection state
  const [isMetaMaskConnected, setMetaMaskConnected] = useState(false);
  const [amountToParticipate, setAmountToParticipate] = useState("");
  const BACKEND_SERVER_PORT = 3001;

  // function to connect MetaMask
  async function connectMetamask() {
    try {
      console.log("Connecting to MetaMask");
      const accounts = await web3.eth.requestAccounts();
      let account = accounts[0];
      setMetaMaskConnected(true);
      setActiveClient({ ...activeClient, ethAddress: account });
    } catch (error) {
      window.alert("MetaMask refused to connect");
    }
  }

  async function deployContract(bytecode, ABI, baseAmount = 1) {
    // check for empty address
    if (!activeClient.ethAddress) {
      window.alert("Please connect to MetaMask first");
      return;
    }
    let contract = new web3.eth.Contract(ABI);
    try {
      let deployedContract = await contract.deploy({ data: bytecode }).send({
        from: activeClient.ethAddress,
        gas: 4700000,
        value: web3.utils.toWei(String(baseAmount), "ether"),
        gasPrice: "2000000000",
      });

      await setActiveContract(deployedContract);
      let membersCount = await deployedContract.methods
        .getMembersCount()
        .call({ from: activeClient.ethAddress });
      console.log(`Members count on contract deployed: ${membersCount}`);

      window.alert(
        `Deployed new contract instance at address: ${deployedContract.options.address}`
      );
      setActiveClient({ ...activeClient, privilege: Privilege.OWNER });
    } catch (error) {
      console.error("Deploy failed", error);
      window.alert(error.message);
    }
  }

  function deployNewContract(baseAmount) {
    console.log("fetching contract from server");
    fetch(`http://localhost:${BACKEND_SERVER_PORT}/api/compile`)
      .then((response) => response.json())
      .then((data) => {
        deployContract(data.bytecode, data.ABI, baseAmount);
      });
  }

  async function joinContract(contractAddress) {
    // console.log("address", contactAddress);
    if (activeContract) {
      window.alert(
        `You already have joined a contract at adresses: ${activeContract.options.address}`
      );
      return;
    }
    console.log("fetching contract ABI server");

    let response = await fetch(
      `http://localhost:${BACKEND_SERVER_PORT}/api/compile`
    );
    let data = await response.json();

    const existingContract = new web3.eth.Contract(data.ABI, contractAddress, {
      from: activeClient.ethAddress,
      gasPrice: "20000000000",
    });

    setActiveContract(existingContract);
    console.log("active Contract set to an existing Contract", activeContract);
  }

  // TODO: get the amountToParticipate
  async function getAmountToParticipate() {
    if (!activeContract) {
      window.alert("You have not joined a contract");
      return;
    }
    let amountToParticipate = await activeContract.methods
      .baseAmount()
      .call({ from: activeClient.ethAddress });
    setAmountToParticipate(amountToParticipate);
  }
  // joinContract(contractAddress)

  return (
    <section className="container">
      <h1 className="display-2 mb-4">Setup</h1>
      <hr />
      <div className="row">
        <div className="col-lg-6 mb-3">
          <h2>MetaMask</h2>
          <p>Make sure you have MetaMask Installed</p>
          <button
            type="button"
            className={`btn btn-${isMetaMaskConnected ? "success" : "info"}`}
            onClick={connectMetamask}
          >
            {isMetaMaskConnected ? "MetaMask Connected" : "Connect to MetaMask"}
          </button>
        </div>
        <div className="col-lg-6 mb-3">
          {" "}
          <CurrentContract
            activeContract={activeContract}
            setActiveContract={setActiveContract}
            setActiveClient={setActiveClient}
            activeClient={activeClient}
            Privilege={Privilege}
          />
        </div>
      </div>

      <hr />
      <div className="row g-3">
        <div className="col-lg-6">
          <CreateNewContract deployNewContract={deployNewContract} />
        </div>
        <div className="col-lg-6">
          <JoinExistingContract
            web3={web3}
            activeContract={activeContract}
            joinContract={joinContract}
            amountToParticipate={amountToParticipate}
            getAmountToParticipate={getAmountToParticipate}
            activeClient={activeClient}
            setActiveClient={setActiveClient}
            Privilege={Privilege}
            setShowSection={setShowSection}
          />
        </div>
      </div>
    </section>
  );
};

Setup.propTypes = {
  web3: PropTypes.object.isRequired,
};

export default Setup;

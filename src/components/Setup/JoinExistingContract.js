import PropTypes from "prop-types";
import { React, useState } from "react";

const JoinExistingContract = ({
  web3,
  joinContract,
  amountToParticipate,
  getAmountToParticipate,
  activeClient,
  setActiveClient,
  activeContract,
  Privilege,
  setShowSection,
  clients,
  setClients
}) => {
  const handleSubmit = async (event) => {
    if (!existingContractAddress) {
      window.alert("Enter a valid address");
      return;
    }
    event.preventDefault();
    await joinContract(existingContractAddress);
    await setPrivilege();
  };

  async function participate() {
    console.log("trying to participate");
    if (!amountToParticipate) {
      getAmountToParticipate();
      return;
    }

    await setPrivilege();

    switch (activeClient.privilege) {
      case Privilege.OWNER:
        window.alert("You are already the owner of this contract");
        return;
      case Privilege.MANAGER:
      case Privilege.PARTICIPANT:
        window.alert("You have participated");
        return;

      default:
        break;
    }

    try {
      let response = await activeContract.methods.participate().send({
        from: activeClient.ethAddress,
        gas: "4700000",
        value: amountToParticipate,
      });
      console.log("response", response);
      window.alert("Participated Successfully");
      await setPrivilege();
    } catch (error) {
      console.error(error);
      return;
    }
  }

  // return clients from contract
  const membersFromContract = async () =>{
    let totalMembers = await activeContract.methods.getMembersCount().call();
    let tempClients = [];
      for (let i = 1; i <= totalMembers-1; i++) {
        let member = await activeContract.methods
        .listOfMembers(i)
        .call();
        let name = localStorage.getItem(member);
        if(name !== null){
          tempClients.push({name: name, ethAddress: member, privilege: Privilege.PARTICIPANT});
        }
        else{
          tempClients.push({name: member, ethAddress: member, privilege: Privilege.PARTICIPANT});
        }
      }
      setClients([...clients,...tempClients]);

    }

  async function setPrivilege() {
    if (!activeClient.privileges === Privilege.NEW_CLIENT) {
      // window.alert(`Privilege is set ${activeClient.privilege}`);
      return;
    }
    try {
      let response = await activeContract.methods
        .OWNER()
        .call({ from: activeClient.ethAddress });
      if (response === activeClient.ethAddress) {
        console.log("Setting as OWNER");
        setActiveClient({
          ...activeClient,
          privilege: Privilege.OWNER,
        });
        setShowSection(true);
        membersFromContract();
        return;
      }

      let isMember = await activeContract.methods
        .isMember(activeClient.ethAddress)
        .call({ from: activeClient.ethAddress });
      if (!isMember) {
        console.log("Setting as NEW_CLIENT");
        setActiveClient({
          ...activeClient,
          privilege: Privilege.NEW_CLIENT,
        });
        setShowSection(false);
        return;
      }

      let isManager = await activeContract.methods
        .isAllowedToManage(activeClient.ethAddress)
        .call({ from: activeClient.ethAddress });
      if (isManager) {
        console.log("Setting as MANAGER");
        setActiveClient({
          ...activeClient,
          privilege: Privilege.MANAGER,
        });
        setShowSection(false);
        return;
      }

      let isParticipant = await activeContract.methods
        .isAllowedToParticipate(activeClient.ethAddress)
        .call({ from: activeClient.ethAddress });
      if (isParticipant) {
        console.log("Setting as PARTICIPANT");
        setActiveClient({
          ...activeClient,
          privilege: Privilege.PARTICIPANT,
        });
        setShowSection(false);
        return;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  const [existingContractAddress, setExistingContractAddress] = useState("");
  return (
    <>
      <div className="mb-2">
        <h3>Join existing contract</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="" className="form-label">
              Existing contract Address:
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="paste address here"
              value={existingContractAddress}
              onChange={(e) => {
                setExistingContractAddress(e.target.value);
              }}
            />
            <small className="form-text text-muted">
              Paste the address of an already existing contract to join your
              Group
            </small>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-dark me-2"
              onClick={handleSubmit}
            >
              Add above contract
            </button>
            <button
              type="button"
              className={`btn btn-${
                amountToParticipate ? "primary" : "dark"
              } me-2`}
              onClick={participate}
              // isDisabled={activeClient.privilege !== Privilege.NEW_CLIENT}
              // disabled={activeClient.privilege !== Privilege.NEW_CLIENT}
            >
              {amountToParticipate
                ? `Pay ${web3.utils.fromWei(
                    String(amountToParticipate),
                    "ether"
                  )} ETH to Join`
                : "Check Price to Join"}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={setPrivilege}
            >
              Check my Status
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

JoinExistingContract.propTypes = {
  joinContract: PropTypes.func,
  amountToParticipate: PropTypes.string,
  getAmountToParticipate: PropTypes.func,
};

export default JoinExistingContract;

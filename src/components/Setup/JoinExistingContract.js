import { React, useState } from "react";
import PropTypes from "prop-types";

const JoinExistingContract = ({
  web3,
  joinContract,
  amountToParticipate,
  getAmountToParticipate,
  activeClient,
  setActiveClient,
  activeContract,
  Privilege,
}) => {
  const handleSubmit = async (event) => {
    if (!existingContractAddress) {
      window.alert("Enter a valid address");
      return;
    }
    event.preventDefault();
    await joinContract(existingContractAddress);
  };

  async function participate() {
    console.log("trying to participate");
    if (!amountToParticipate) {
      getAmountToParticipate();
      return;
    }

    switch (activeClient.privilege) {
      case Privilege.OWNER:
        window.alert("You are already the owner of this contract");
        return;
      case Privilege.MANAGER:
      case Privilege.PARTICIPANT:
        window.alert("You have participated");
        break;

      default:
        break;
    }

    try {
      let response = await activeContract.methods
        .OWNER()
        .call({ from: activeClient.ethAddress, gas: 4700000 });

      if (response === activeClient.ethAddress) {
        setActiveClient({ ...activeClient, privilege: Privilege.OWNER });
        return;
      }
    } catch (err) {
      console.error(err);
    }
    try {
      let response = await activeContract.methods.participate().call({
        from: activeClient.ethAddress,
        value: amountToParticipate,
        gas: "4700000",
      });
      console.log("response", response);
    } catch (error) {
      // console.error(error);
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
              className={`btn btn-${amountToParticipate ? "primary" : "dark"}`}
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

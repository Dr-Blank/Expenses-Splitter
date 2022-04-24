import { React, useState } from "react";
import PropTypes from "prop-types";

const JoinExistingContract = ({
  joinContract,
  amountToParticipate,
  getAmountToParticipate,
}) => {
  const handleSubmit = async (event) => {
    if (!existingContractAddress) {
      window.alert("Enter a valid address");
      return;
    }
    event.preventDefault();
    await joinContract(existingContractAddress);
    // setTimeout(getAmountToParticipate, 500);
    // console.log("AmountToParticipate", amountToParticipate);
  };

  function participate() {
    console.log("participate");
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
              className="btn btn-dark"
              onClick={handleSubmit}
            >
              Check above contract
            </button>
          </div>
        </form>
        {/* <button type="button" className="btn btn-dark" onClick={participate}>
          Participate
        </button> */}
      </div>
    </>
  );
};

JoinExistingContract.propTypes = {
  joinContract: PropTypes.func,
  amountToParticipate: PropTypes.number,
  getAmountToParticipate: PropTypes.func,
};

export default JoinExistingContract;

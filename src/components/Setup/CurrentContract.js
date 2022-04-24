import React from "react";
import PropTypes from "prop-types";

const CurrentContract = ({ activeContract, setActiveContract }) => {
  return (
    <>
      <h2 className="">Current Contract</h2>
      <div className="">
        <p>
          {activeContract
            ? `Active Contract: ${activeContract.options.address}`
            : "No active contract found. Please create a new one or join an existing one"}
        </p>
        {activeContract && (
          <>
            <button
              className="btn btn-warning me-2"
              onClick={() => {navigator.clipboard.writeText(activeContract.options.address)
              }}
            >
              Copy Contract Address
            </button>

            <button
              className="btn btn-outline-danger me-2"
              onClick={() => {
                setActiveContract(undefined);
              }}
            >
              Remove this contract
            </button>
          </>
        )}
      </div>
    </>
  );
};

CurrentContract.propTypes = {
  activeContract: PropTypes.object,
  setActiveContract: PropTypes.func,
};

export default CurrentContract;

import React, { useState } from "react";
import PropTypes from "prop-types";

const CurrentContract = ({
  activeContract,
  setActiveContract,
  activeClient,
  setActiveClient,
  Privilege,
}) => {

  const [copyAddress, setCopyAddress] = useState("Copy Contract Address");
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
              className={`btn ${(copyAddress!=="Copied to clipboard!")? "btn-warning" : "btn-danger"} me-2`}
              onClick={() => {
                navigator.clipboard.writeText(activeContract.options.address);
                setCopyAddress("Copied to clipboard!");
              }}
            >
              {copyAddress}
            </button>

            <button
              className="btn btn-outline-danger me-2"
              onClick={() => {
                setActiveContract(undefined);
                setActiveClient({
                  ...activeClient,
                  privilege: Privilege.NEW_CLIENT,
                });
                setCopyAddress("Copy Contract Address")
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

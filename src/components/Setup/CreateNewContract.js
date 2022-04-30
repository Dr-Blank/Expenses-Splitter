import { React, useState } from "react";
import PropTypes from "prop-types";

const CreateNewContract = ({ deployNewContract }) => {
  const [baseAmount, setBaseAmount] = useState(3);
  const handleSubmit = (event) => {
    event.preventDefault(); // prevents reloading of page
    if (baseAmount <= 0) {
      window.alert("Please enter a base amount greater than 0.");
      return;
    }
    deployNewContract(baseAmount);
  };
  return (
    <>
      <div className="mb-2">
        <h3>Create New Contract</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label className="form-label">Base Value:</label>
            <input
              className="form-control"
              type="number"
              value={baseAmount}
              onChange={(e) => {
                setBaseAmount(e.target.value);
              }}
            />
            <small className="form-text text-muted">
              This will be the base amount that every new user will have to pay
              to join your Group
            </small>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleSubmit}
            >
              Create New Contract
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

CreateNewContract.propTypes = {
  deployNewContract: PropTypes.func,
};

export default CreateNewContract;

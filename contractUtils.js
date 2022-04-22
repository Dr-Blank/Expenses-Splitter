const fs = require("fs");
const path = require("path");
const solc = require("solc");


function getByteCodeAndABI(contractFileName = "FriendsExpenseSplitter.sol") {
  // const contractFileName = "FriendsExpenseSplitter.sol";
  const contractPath = path.resolve(__dirname, "contracts", contractFileName);
  // console.log("contractPath :>> ", contractPath);

  const source = fs.readFileSync(contractPath, "utf8");
  let input = {
    language: "Solidity",
    sources: {},
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
  input.sources[contractFileName] = {};
  input.sources[contractFileName].content = source;
  const compiledOutput = JSON.parse(solc.compile(JSON.stringify(input)));
  // console.log("compiledOutput :>> ", compiledOutput);
  const compiledContract =
    compiledOutput.contracts[contractFileName][
      path.parse(contractFileName).name
    ];
  let ABI = compiledContract.abi;
  // console.log("ABI :>> ", ABI);
  let bytecode = compiledContract.evm.bytecode.object;
  // console.log("byteCode :>> ", bytecode);

  return [bytecode, ABI];
}

// [bytecode, ABI] = getByteCodeAndABI();

function deployContract(web3, bytecode, ABI) {
  // console.log('trying to create new contract');
  contract = new web3.eth.Contract(ABI);
  let defaultAccount;
  web3.eth.getAccounts().then((accounts) => {
    // console.log("Accounts:", accounts); //it will show all the ganache accounts

    defaultAccount = accounts[0];

    contract
      .deploy({ data: bytecode })
      .send({ from: defaultAccount, gas: 4700000 })
      .on("receipt", (receipt) => {
        //event,transactions,contract address will be returned by blockchain
        console.log("Contract Address:", receipt.contractAddress);
      })
      .then((demoContract) => {
        demoContract.methods.OWNER().call((err, data) => {
          console.log("Owner:", data);
        });
      });
  });
  return contract;
}

// deployContract(web3, bytecode, ABI);

module.exports = {
  getByteCodeAndABI: getByteCodeAndABI,
  deployContract: deployContract,
};

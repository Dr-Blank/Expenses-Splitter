const CU = require("./contractUtils");
const express = require("express");
var cors = require('cors');

const Web3 = require("web3");

const PORT = 3000;

const app = express();
app.use(cors())
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('./client/index');
})



app.get("/api/compile", (req, res, next) => {
  let bytecode, ABI;
  [bytecode, ABI] = CU.getByteCodeAndABI();
  res.json({ bytecode: bytecode, ABI: ABI });
});

app.listen(PORT);

// let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// let bytecode, ABI;
// [bytecode, ABI] = CU.getByteCodeAndABI();

// console.log("part2");
// contract = CU.deployContract(web3, bytecode, ABI);

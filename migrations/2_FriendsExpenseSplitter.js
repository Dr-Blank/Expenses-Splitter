const FriendsExpenseSplitter = artifacts.require("FriendsExpenseSplitter");

module.exports = function (deployer) {
  deployer.deploy(FriendsExpenseSplitter);
};

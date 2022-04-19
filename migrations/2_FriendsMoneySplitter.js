const FriendsMoneySplitter = artifacts.require("FriendsMoneySplitter");

module.exports = function (deployer) {
  deployer.deploy(FriendsMoneySplitter);
};

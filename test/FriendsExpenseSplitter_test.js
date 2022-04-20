const assert = require("assert");
const FriendsExpenseSplitter = artifacts.require("FriendsExpenseSplitter");

contract("FriendsExpenseSplitter", (accounts) => {
  const OWNER = accounts[0];
  const FRIEND = accounts[1];
  const SHOPKEEPER = accounts[2];

  it("should set owner correctly", async () => {
    const INSTANCE = await FriendsExpenseSplitter.deployed();
    let owner = await INSTANCE.owner();
    assert.equal(OWNER, owner);
  });

  it("should set contributor correctly", async () => {
    const INSTANCE = await FriendsExpenseSplitter.deployed();
    await INSTANCE.addUserToGroup(FRIEND);
    isParticipant = await INSTANCE.Participants(FRIEND);
    isNotParticipant = await INSTANCE.Participants(SHOPKEEPER);
    assert.ok(isParticipant, "Did not find participant");
    assert.ok(!isNotParticipant, "Found unknown user in participants");
  });

  it("should record Transactions correctly", async () => {
    const INSTANCE = await FriendsExpenseSplitter.deployed();
    await INSTANCE.addTransaction(50, OWNER, SHOPKEEPER);
    await INSTANCE.addTransaction(5000, FRIEND, SHOPKEEPER);
    let balance_friend = await INSTANCE.getUserContribution(FRIEND);
    let balance_owner = await INSTANCE.getUserContribution(OWNER);
    assert.equal(balance_friend, 5000);
    assert.equal(balance_owner, 50);
    transaction = await INSTANCE.LogBook(0);
    assert.equal(transaction.from, OWNER);
  });
});
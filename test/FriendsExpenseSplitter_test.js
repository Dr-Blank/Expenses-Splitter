const assert = require("assert");
const FriendsExpenseSplitter = artifacts.require("FriendsExpenseSplitter");

contract("FriendsExpenseSplitter", (accounts) => {
  const OWNER = accounts[0];
  const FRIEND = accounts[1];
  const SHOPKEEPER = accounts[2];
  const BEST_FRIEND = accounts[3];

  it("should set owner correctly", async () => {
    const INSTANCE = await FriendsExpenseSplitter.deployed();
    let owner = await INSTANCE.OWNER();
    assert.equal(OWNER, owner);
  });

  it("should set participants correctly", async () => {
    const INSTANCE = await FriendsExpenseSplitter.deployed();
    await INSTANCE.setUserAsParticipant(FRIEND, true);
    isParticipant = await INSTANCE.isAllowedToParticipate(FRIEND);
    isManager = await INSTANCE.isAllowedToManage(FRIEND);
    assert.ok(isParticipant, "Participation not set correctly");
    assert.ok(!isManager, "Set as Manger for regular participant");
  });

  it("should not set random participants", async () => {
    const INSTANCE = await FriendsExpenseSplitter.deployed();
    isNotParticipant = await INSTANCE.isAllowedToParticipate(SHOPKEEPER);
    assert.ok(!isNotParticipant, "Found unknown user in participants");
  });

  // it("should record Expenses correctly", async () => {
  //   const INSTANCE = await FriendsExpenseSplitter.deployed();
  //   await INSTANCE.addExpense(50, OWNER, "travel");
  //   await INSTANCE.addExpense(5000, FRIEND, "food");
  //   let balance_friend = await INSTANCE.getUserContribution(FRIEND);
  //   let balance_owner = await INSTANCE.getUserContribution(OWNER);
  //   assert.equal(balance_friend, 5000);
  //   assert.equal(balance_owner, 50);
  //   expense = await INSTANCE.expensesBook(0);
  //   assert.equal(expense.from, OWNER);
  // });

  it("should set and remove managers correctly", async () => {
    const INSTANCE = await FriendsExpenseSplitter.deployed();
    await INSTANCE.setUserAsManager(BEST_FRIEND, true);
    assert.ok(
      await INSTANCE.isAllowedToManage(BEST_FRIEND),
      "Should be allowed to manage"
    );
    assert.ok(
      await INSTANCE.isAllowedToParticipate(BEST_FRIEND),
      "Should be allowed to Participate"
    );

    await INSTANCE.setUserAsParticipant(BEST_FRIEND, false);
    assert.ok(
      !(await INSTANCE.isAllowedToParticipate(BEST_FRIEND)),
      "Should not be allowed to participate"
    );
    assert.ok(
      !(await INSTANCE.isAllowedToManage(BEST_FRIEND)),
      "Should not be allowed to Manage"
    );
  });
});

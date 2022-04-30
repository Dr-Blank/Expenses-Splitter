/* eslint-disable no-undef */
const assert = require("assert");
const FriendsExpenseSplitter = artifacts.require("FriendsExpenseSplitter");

contract("FriendsExpenseSplitter", (accounts) => {
  let INSTANCE;
  let baseAmount = 1000;
  const OWNER = accounts[0];
  const FRIEND = accounts[1];
  const SHOPKEEPER = accounts[2];
  const BEST_FRIEND = accounts[3];

  before("Setup the instance", async () => {
    INSTANCE = await FriendsExpenseSplitter.new({
      from: OWNER,
      value: baseAmount,
    });
    await Promise.all([
      INSTANCE.setUserAsParticipant(FRIEND, true),
      INSTANCE.setUserAsManager(BEST_FRIEND, true),
    ]);
  });

  describe("Intended Actions", () => {
    it("should set owner correctly", async () => {
      let owner = await INSTANCE.OWNER();
      assert.equal(OWNER, owner);
      assert.equal(baseAmount, await INSTANCE.potValue());
    });

    it("should set participants correctly", async () => {
      [isParticipant, isManager, isMember] = await Promise.all([
        INSTANCE.isAllowedToParticipate(FRIEND),
        INSTANCE.isAllowedToManage(FRIEND),
        INSTANCE.isMember(FRIEND),
      ]);
      assert.ok(isParticipant, "Participation not set correctly");
      assert.ok(!isManager, "Set as Manger for regular participant");
      assert.ok(!isMember, "User member without participating");
    });

    it("should set managers correctly", async () => {
      let managerBool = await Promise.all([
        INSTANCE.isAllowedToManage(BEST_FRIEND),
        INSTANCE.isAllowedToParticipate(BEST_FRIEND),
      ]);
      assert.ok(
        managerBool.every((e) => e),
        "Should be allowed to manage and participate"
      );

      await INSTANCE.setUserAsParticipant(BEST_FRIEND, false, { from: OWNER });
      managerBool = await Promise.all([
        INSTANCE.isAllowedToManage(BEST_FRIEND),
        INSTANCE.isAllowedToParticipate(BEST_FRIEND),
      ]);
      assert.ok(
        managerBool.every((e) => !e),
        "Should be not be allowed to manage or participate"
      );
      await INSTANCE.setUserAsManager(BEST_FRIEND, true, { from: OWNER });
    });

    it("should allow valid users to participate", async () => {
      membersBool = await Promise.all([
        INSTANCE.isMember(FRIEND, { from: OWNER }),
        INSTANCE.isMember(BEST_FRIEND, { from: OWNER }),
      ]);

      assert.ok(
        membersBool.every((e) => !e),
        "Should not be member for all"
      );

      await Promise.all([
        INSTANCE.participate({ from: FRIEND, value: baseAmount }),
        INSTANCE.participate({ from: BEST_FRIEND, value: baseAmount }),
      ]);

      membersBool = await Promise.all([
        INSTANCE.isMember(FRIEND, { from: OWNER }),
        INSTANCE.isMember(BEST_FRIEND, { from: OWNER }),
      ]);

      assert.ok(
        membersBool.every((e) => e),
        "Should be member for all"
      );
      contractBalance = await web3.eth.getBalance(INSTANCE.address);
      assert.equal(contractBalance, baseAmount * 3);
    });
  });

  describe("Malicious Actions", () => {
    it("should not set random participants", async () => {
      assert.ok(
        (
          await Promise.all([
            INSTANCE.isAllowedToParticipate(SHOPKEEPER),
            INSTANCE.isAllowedToManage(SHOPKEEPER),
            INSTANCE.isMember(SHOPKEEPER),
          ])
        ).every((e) => !e),
        "Found unknown user in participant/manager/member"
      );
    });

    it("should not allow invalid users to participate", async () => {
      assert.rejects(async () => {
        return INSTANCE.participate({
          from: SHOPKEEPER,
          value: baseAmount + 500,
        });
      });
    });

    it("should not allow valid users to participate without paying", async () => {
      assert.rejects(() => {
        return INSTANCE.participate({
          from: BEST_FRIEND,
          value: baseAmount - 100,
        });
      });
    });

    it("should not set participant except Manger+", async () => {
      assert.ok(await INSTANCE.isAllowedToParticipate(FRIEND));
      assert.rejects(async () => {
        return INSTANCE.setUserAsParticipant(SHOPKEEPER, true, {
          from: FRIEND,
        });
      });
    });

    it("should not set Manger except by Owner", async () => {
      assert.ok(await INSTANCE.isAllowedToManage(BEST_FRIEND));
      assert.rejects(async () => {
        return INSTANCE.setUserAsManager(SHOPKEEPER, true, {
          from: BEST_FRIEND,
        });
      });
    });
  });

  describe("Adding Expenses", () => {
    it("should record the expenses from owner and manager", async () => {
      await Promise.all([
        INSTANCE.addExpense(100, OWNER, "food", { from: OWNER }),
        INSTANCE.addExpense(200, FRIEND, "food", { from: BEST_FRIEND }),
      ]);
      assert.equal(await INSTANCE.potValue(), baseAmount * 3 - 300);
      assert.equal(await INSTANCE.contributions(FRIEND), 200);
      assert.equal(await INSTANCE.contributions(OWNER), 100);
    });
  });

  describe("Settling balance", () => {
    it("should settle the balance", async () => {
      let oldBalance = await Promise.all([
        web3.eth.getBalance(FRIEND),
        web3.eth.getBalance(BEST_FRIEND),
      ]);
      await INSTANCE.settleBalance({ from: OWNER });
      let newBalance = await Promise.all([
        web3.eth.getBalance(FRIEND),
        web3.eth.getBalance(BEST_FRIEND),
      ]);

      for (let i = 0; i < 2; i++) {
        assert.equal(newBalance[i], oldBalance[i] - 100);
      }
    });
  });
});

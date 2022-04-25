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
    INSTANCE = await FriendsExpenseSplitter.deployed({
      from: OWNER,
      value: baseAmount,
    });
    await Promise.all([
      INSTANCE.setUserAsParticipant(FRIEND, true),
      INSTANCE.setUserAsManager(BEST_FRIEND, true),
    ]);
  });
  beforeEach("Setup the instance", async () => {});

  // describe("Intended Actions", () => {
  //   it("should set owner correctly", async () => {
  //     let owner = await INSTANCE.OWNER();
  //     assert.equal(OWNER, owner);
  //   });

  //   it("should set participants correctly", async () => {
  //     [isParticipant, isManager, isMember] = await Promise.all([
  //       INSTANCE.isAllowedToParticipate(FRIEND),
  //       INSTANCE.isAllowedToManage(FRIEND),
  //       INSTANCE.isMember(FRIEND),
  //     ]);
  //     assert.ok(isParticipant, "Participation not set correctly");
  //     assert.ok(!isManager, "Set as Manger for regular participant");
  //     assert.ok(!isMember, "User member without participating");
  //   });

  //   it("should set managers correctly", async () => {
  //     let managerBool = await Promise.all([
  //       INSTANCE.isAllowedToManage(BEST_FRIEND),
  //       INSTANCE.isAllowedToParticipate(BEST_FRIEND),
  //     ]);
  //     assert.ok(
  //       managerBool.every((e) => e),
  //       "Should be allowed to manage and participate"
  //     );

  //     await INSTANCE.setUserAsParticipant(BEST_FRIEND, false, { from: OWNER });
  //     managerBool = await Promise.all([
  //       INSTANCE.isAllowedToManage(BEST_FRIEND),
  //       INSTANCE.isAllowedToParticipate(BEST_FRIEND),
  //     ]);
  //     assert.ok(
  //       managerBool.every((e) => !e),
  //       "Should be not be allowed to manage or participate"
  //     );
  //     await INSTANCE.setUserAsManager(BEST_FRIEND, true, { from: OWNER });
  //   });

  //   it("should allow valid users to participate", async () => {
  //     await INSTANCE.participate({ from: FRIEND, value: baseAmount });
  //     let isMember = await INSTANCE.isMember(FRIEND);
  //     assert.ok(isMember);
  //   });
  // });

  // describe("Malicious Actions", () => {
  //   it("should not set random participants", async () => {
  //     assert.ok(
  //       (
  //         await Promise.all([
  //           INSTANCE.isAllowedToParticipate(SHOPKEEPER),
  //           INSTANCE.isAllowedToManage(SHOPKEEPER),
  //           INSTANCE.isMember(SHOPKEEPER),
  //         ])
  //       ).every((e) => !e),
  //       "Found unknown user in participant/manager/member"
  //     );
  //   });

  //   it("should not allow invalid users to participate", async () => {
  //     assert.rejects(async () => {
  //       return INSTANCE.participate({
  //         from: SHOPKEEPER,
  //         value: baseAmount + 500,
  //       });
  //     });
  //   });

  //   it("should not allow valid users to participate without paying", async () => {
  //     assert.rejects(() => {
  //       return INSTANCE.participate({
  //         from: BEST_FRIEND,
  //         value: baseAmount - 100,
  //       });
  //     });
  //   });

  //   it("should not set participant except Manger+", async () => {
  //     assert.ok(await INSTANCE.isAllowedToParticipate(FRIEND));
  //     assert.rejects(async () => {
  //       return INSTANCE.setUserAsParticipant(SHOPKEEPER, { from: FRIEND });
  //     });
  //   });

  //   it("should not set Manger except by Owner", async () => {
  //     assert.ok(await INSTANCE.isAllowedToManage(BEST_FRIEND));
  //     assert.rejects(async () => {
  //       return INSTANCE.setUserAsManager(SHOPKEEPER, { from: BEST_FRIEND });
  //     });
  //   });
  // });

  describe("Benign Actions", () => {
    it("should not allow users to participate twice", async () => {
      assert.rejects(() => {
        return Promise.all([INSTANCE.participate({ from: FRIEND })]);
      });
    });
  });
});

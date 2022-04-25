Should be a Readme but is TODO for now

# features of this DApp

 1. [x] Creation of a Contract with OWNER, a group pot, and a base amount required to join.
 2. [ ] Ability to approve/remove user to join group
 3. [ ] Ability of an user to join group by paying the base amount
 <!-- 4. [ ] Ability to promote/demote user to add transactions -->
 5. [ ] Ability to add multiple transactions
 <!-- 6. [ ] ~~Add partial transactions❓~~ -->
 <!-- 7. [ ] Ability to obtain current users and their contributions -->
 8. [ ] Ability to settle the transactions and return remaining amount to the pot

# Submission

 - [ ] Design Tests to show all 5 features are working
 - [ ] Documentation on how to setup our DApp with truffle and ganache
 - [ ] record video showing a demo
 - [ ] 1/5th page of documentation of what we did and features we added

## Frontend

---

 - [ ] Integration with MetaMask
 - [ ] Refresh?
 - [ ] Add Owner to the group automatically
 - [ ] Testing creation of the contract
 - [ ] Confirming adding of transactions before sending them to blockchain.

## Contract

---

 - [ ] ❗❗make everything private when deploying

 - [ ] Test all modifiers! Can only be done from frontend.
 - [ ] Implement settle function that returns all the remaining amount in the pot to all the participants.
 - [x] Initial function to setup the base value and set owner
 - [x] function to allow user to join and be a manager 
 - [x] function for user to join by paying the base value
 - [ ]Add option to track if the contract is closed.

## Script of Video
Owners Screen
- he deploys the new contract
- he will add 2 users to the contract
  
User 1 Screen
- paste the contract into join, pay the base amount

Same for User 2 Screen

Owners Screen
- Start adding Expenses
- Settle

All metamask accounts receiving the remaining amount

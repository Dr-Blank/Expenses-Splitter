# About Expenses Splitter

Just like splitwise, this contract/webapp helps you track all the expenses among your group and split them when a trip is over, or when you choose to do so. 
Making it a smart contract allows you to take benefits like the binding nature of a contract. 
All the members pay upfront a base amount to join this contract. Then all the expenses are added that split equally among the people. Once it is time to settle the balance, the contract calculates how much each participant should get and returns the amount to the respective addresses. 

---

# Setup instructions:

1.	Clone this repository to local directory.
2.	Install [NodeJS](https://nodejs.org/en/blog/release/v16.14.2/) with all the default options. (v16.14.2 or greater)
3.	Change the current working directory to the main folder in console/bash/cmd.
4.	to install all dependencies, run “npm install” and ignore warning if any.
5.	Install [ganache](https://trufflesuite.com/ganache/) and start a local blockchain on port 8545 (default).
6.	Add the local blockchain network running in ganache to the metamask.
7.	Import a few accounts of local blockchain to MetaMask.
8.	In console still opened in the previous step, type “npm run dev” to start the project (2 shells/cmd windows will open. One serves the frontend, other the backend), this will open project directly in browser (or got to http://localhost:3000/).
Setup is complete. Please see the video on how to interact with the contract .

---

# Features

-	Creating and deploying your own contract from the WebApp by setting the base amount as per need. (“constructor”) 
-	Adding/removing participants to this contract. (“[setUserAsParticipant](https://github.com/Dr-Blank/Expenses-Splitter/blob/616c76966bbe73dc2a0c6e429829c87690f05da0/contracts/FriendsExpenseSplitter.sol#L69)”) 
-	A way for joining this contract by the participants after paying the required base amount. (“participate”) 
-	Adding expenses to this group of the amount paid, the user who paid and the description (optional) of the expense. (“addExpense”) 
-	A way to settle the balance and transfer Ethereum back to users according to their contributions in bearing the expenses of the group. (“settleBalance”) 
-	Miscellaneous features and quality of life improvements 
-	Expenses can not be made if all available balance has been used up in previous expenses. 
-	A method to get members count and their contributions 
-	A method to set a member as manager to allow the user to add expenses (could not implement in front end due to time restrictions but working in truffle test) 
-	Privileges can be set and access to various features can be given/restricted for users based on their role in the group. 

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier OnlyOwner() {
        require(msg.sender == owner, "Only owner is allowed");
        _;
    }
}

contract FriendsExpenseSplitter is Ownable {
    struct Transaction {
        int256 amount;
        address from;
        address to;
    } // to store transaction

    Transaction[] public LogBook; // record of the transactions

    address[] public ListOfPartipants;
    mapping(address => bool) public Participants; // if user is a member of the group?
    mapping(address => int256) public Contributions; // dictionary of how much a participant has spent in the group

    error NotAParticipant(address user);

    constructor() {
        Participants[msg.sender] = true;
        super;
    }

    function addUserToGroup(address _newUser) public OnlyOwner {
        Participants[_newUser] = true;
    }

    function getUserContribution(address _user)
        public
        view
        OnlyOwner
        returns (int256)
    {
        if (!Participants[_user]) revert NotAParticipant(_user);

        return Contributions[_user];
    }

    function addTransaction(
        int256 _amount,
        address _from,
        address _to
    ) public OnlyOwner {
        LogBook.push(Transaction(_amount, _from, _to));
        Contributions[_from] += (Participants[_from] ? _amount : int256(0));
        Contributions[_to] -= (Participants[_to] ? _amount : int256(0));
    }
}

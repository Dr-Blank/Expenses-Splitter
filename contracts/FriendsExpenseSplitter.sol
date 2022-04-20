// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Ownable {
    address public immutable OWNER;
    error NotAuthorized();

    constructor() {
        OWNER = msg.sender;
    }

    modifier OnlyOwner() {
        if (msg.sender != OWNER) revert NotAuthorized();
        _;
    }
}

contract FriendsExpenseSplitter is Ownable {
    struct Expense {
        uint256 amount;
        address paidBy;
        string description;
    }

    Expense[] public expensesBook; // record of the expenses

    uint256 public immutable baseAmount;
    uint256 public potValue; // the current value available to spend in any expenses
    // FIXME remove public in potValue

    mapping(address => bool) public isAllowedToParticipate; // if user is allowed to join
    mapping(address => bool) public isAllowedToManage; // if a member can add expenses
    mapping(address => bool) public isMember; // user is a member of the group, when PAID
    address[] public listOfMembers;

    mapping(address => uint256) public contributions; // dictionary of how much a participant has spent in the group

    error NotAParticipant(address user);
    error NotEnoughFunds(uint256 amountRequired, uint256 amountSent);
    error AlreadyParticipated();
    error PotEmpty(uint256 expense, uint256 potValue);

    modifier OnlyParticipant() {
        if (!isAllowedToParticipate[msg.sender]) {
            revert NotAuthorized();
        }
        _;
    }

    modifier OnlyManager() {
        if (!isAllowedToManage[msg.sender]) {
            revert NotAuthorized();
        }
        _;
    }

    constructor() payable {
        super;
        // base amount is set here
        baseAmount = msg.value;
        potValue = baseAmount;

        // add owner to the participants
        isAllowedToParticipate[OWNER] = true;
        isAllowedToManage[OWNER] = true;
        isMember[OWNER] = true;
        listOfMembers.push(OWNER);
    }

    function setUserAsParticipant(address _user, bool _status)
        external
        OnlyOwner
    {
        isAllowedToParticipate[_user] = _status;
        isAllowedToManage[_user] = _status ? isAllowedToManage[_user] : false;
    }

    function setUserAsManager(address _user, bool _status) external OnlyOwner {
        isAllowedToManage[_user] = _status;
        isAllowedToParticipate[_user] = _status
            ? true
            : isAllowedToParticipate[_user];
    }

    function participate() external payable {
        // TODO: don't allow user to participate more than once
        address user = msg.sender;
        uint256 funds = msg.value;

        if (!(isAllowedToParticipate[user])) {
            revert NotAParticipant(user);
        }
        if (funds < baseAmount) {
            revert NotEnoughFunds(baseAmount, funds);
        }

        if (isMember[user]) revert AlreadyParticipated();

        potValue += funds;
        isMember[user] = true;
        listOfMembers.push(user);
    }

    function addExpense(
        uint256 _amount,
        address _paidBy,
        string memory _description
    ) public OnlyManager {
        if (_amount > potValue) revert PotEmpty(_amount, potValue);

        expensesBook.push(Expense(_amount, _paidBy, _description));
        potValue -= _amount;
        contributions[_paidBy] += _amount;
    }

    function getMembersCount() external view OnlyParticipant returns (uint256) {
        return listOfMembers.length;
    }

    function getMember(uint256 _index)
        external
        view
        OnlyParticipant
        returns (address)
    {
        return listOfMembers[_index];
    }

    function getUserContribution(address _user)
        external
        view
        OnlyParticipant
        returns (uint256)
    {
        if (!isMember[_user]) revert NotAParticipant(_user);

        return contributions[_user];
    }
}

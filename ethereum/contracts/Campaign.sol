pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint min) public {
        address newCampaign = new Campaign(min, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    address public manager;
    uint public minimumAmount;
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount;
    }
    mapping(address => bool) public approvers;
    uint public approversCount;

    Request[] public requests;

    modifier restricted () {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint min, address creator) public {
        manager = creator;
        minimumAmount = min;
    }

    function contribute() public payable {
        require(msg.value > minimumAmount);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string description,
        uint value,
        address recipient
    ) public restricted {

        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        require(!request.complete);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
      uint,
      uint,
      uint,
      uint,
      address
    ) {
      return (
        minimumAmount,
        this.balance,
        requests.length,
        approversCount,
        manager
      );
    }

    function getRequestsCount() public view returns (uint) {
      return requests.length;
    }

}

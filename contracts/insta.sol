pragma solidity ^0.5.16;

 contract insta{
   uint256 public postCount;
    struct post{
     uint id;
     string description;
     string ipfsHash;
     address creator;
   }
   event PostCreated(
     uint id,
     string content,
     string ipfsHash,
     address author
     );
   mapping (uint => post) public posts;
   mapping (address => uint[]) public postIds;
   function create(string memory _descreption,string memory _ipfsHash) public{
     postCount=postCount+1;
      posts[postCount] = post(postCount,_descreption,_ipfsHash,msg.sender);
      postIds[msg.sender].push(postCount);
       emit PostCreated(postCount,_descreption,_ipfsHash,msg.sender);
   }
   function  get(uint _id)  public view returns(string memory,string memory){
     return (posts[_id].ipfsHash,posts[_id].description);
   }
 }

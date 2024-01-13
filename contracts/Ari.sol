// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract Ari is ERC20Permit, Ownable {

    mapping(address => uint256) private lastCallTimestamp;
    uint256 public coolDownPeriod = 10 seconds;

    constructor() ERC20("Ari Token", "$ARI") ERC20Permit("Ari Token") Ownable(0x8E8d69D416b5d0525975D379D63E0978C7dB1b2c) {}
    
    function mintTo(address _account, uint256 _value) public onlyOwner {
        _mint(_account, _value);
    }

    function faucetGetAri() public {
        require(block.timestamp >= lastCallTimestamp[_msgSender()] + coolDownPeriod, "Cooldown period hasn't passed yet");
        _mint(_msgSender(), 10*10**decimals());
        lastCallTimestamp[_msgSender()] = block.timestamp;
    }
}
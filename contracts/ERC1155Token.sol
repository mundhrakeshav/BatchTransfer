// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC1155} from "solmate/src/tokens/ERC1155.sol";
import "hardhat/console.sol";
contract ERC1155Token is ERC1155 {
    function mint(address to, uint256 id, uint256 amount) external {
        _mint(to, id, amount, "0x00");
    }

    function uri(uint256) public pure override returns (string memory){
        return "";
    }

}

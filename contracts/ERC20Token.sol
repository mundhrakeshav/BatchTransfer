// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC20} from "solmate/src/tokens/ERC20.sol";

contract ERC20Token is ERC20("Test", "TEST", 18) {
    function mint(address _to, uint256 _amt) external {
        _mint(_to, _amt);
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC20} from "solmate/src/tokens/ERC20.sol";
import {SafeTransferLib} from "solmate/src/utils/SafeTransferLib.sol";
import {ERC1155, ERC1155TokenReceiver} from "solmate/src/tokens/ERC1155.sol";

contract BatchTransfer is ERC1155TokenReceiver {
    
    function makeERC20BatchTransfer(
        ERC20 _token,
        address[] calldata _receivers,
        uint256[] calldata _amts
    ) external {
        require(_receivers.length == _amts.length, "!length");
        uint256 _len = _receivers.length;

        for (uint256 _index = 0; _index < _len; _index++) {
            SafeTransferLib.safeTransferFrom(_token, msg.sender, _receivers[_index], _amts[_index]);
        }
    }

    function makeERC1155BatchTransfer(
        address _token,
        address[] calldata _receivers,
        uint256[] calldata _ids,
        uint256[] memory _amts
    ) external {
        require(_receivers.length == _amts.length, "!length");
        require(_receivers.length == _ids.length, "!length");
        uint256 _len = _receivers.length;
        for (uint256 _index = 0; _index < _len; _index++) {
            ERC1155(_token).safeTransferFrom(
                msg.sender,
                _receivers[_index],
                _ids[_index],
                _amts[_index],
                "0x"
            );
        }
    }
}

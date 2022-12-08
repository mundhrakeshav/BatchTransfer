import { ethers } from "hardhat";
import { string } from "hardhat/internal/core/params/argumentTypes";
import { BatchTransfer } from "../typechain-types/contracts";
import drop from "./drop.json";
async function main() {
    const [owner] = await ethers.getSigners()
    const _address = "0xfe1c4a31516544a729e787fbcbb644e8999d61ee";
    const _token = "0x1A444fF4C81982eD4632B8238491D8F3eB44d4C0"; //ERC20 Token

    const _receivers: string[] = []
    const _amts: number[] = []
    const _ids: number[] = []

    drop.forEach(element => {
        if (!element.claimed) {
            if (element.amt==5) {
                _receivers.push(ethers.utils.getAddress(element.address.toLowerCase()));
                _amts.push(1);
                _ids.push(5)
            }
        }
    });

    
    const _batchTransfer: BatchTransfer = await ethers.getContractAt("BatchTransfer", _address, owner);
    const tx = await _batchTransfer.makeERC1155BatchTransfer(_token, _receivers, _ids, _amts)
    console.log(tx);
    console.log(await tx.wait());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

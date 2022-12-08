import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners()
  const BatchTransfer = await ethers.getContractFactory("BatchTransfer");
  const batchTransfer = await BatchTransfer.deploy(owner.address);
  await batchTransfer.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BatchTransfer", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBatchTransfer() {
    const [owner, user1, user2, user3, otherAccount] = await ethers.getSigners();

    const BatchTransfer = await ethers.getContractFactory("BatchTransfer");
    const ERC1155Token = await ethers.getContractFactory("ERC1155Token");
    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    const erc1155Token = await ERC1155Token.deploy();
    const erc20Token = await ERC20Token.deploy();
    const batchTransfer = await BatchTransfer.deploy();
    await (await erc1155Token.mint(owner.address, 0, "10000000000000000")).wait()
    await (await erc20Token.mint(owner.address, ethers.BigNumber.from("10000000000000000"))).wait()
    
    return { owner, otherAccount, user1, user2, user3, batchTransfer, erc1155Token, erc20Token };
  }
  
  describe("Deployment", function () {
    
    it("Should batchTransfer ERC20", async function () {
      const { otherAccount, owner, user1, user2, user3, batchTransfer, erc1155Token, erc20Token } = await loadFixture(deployBatchTransfer);
      const _receivers = [otherAccount.address, user1.address, user2.address, user3.address,]
      const _amts = [10, 30, 15, 11]
      await (await erc20Token.approve(batchTransfer.address, ethers.BigNumber.from("10000000000000000"))).wait()
      
      await (await batchTransfer.makeERC20BatchTransfer(erc20Token.address, _receivers, _amts)).wait()
      expect(await erc20Token.balanceOf(otherAccount.address)).to.equal(10)
      expect(await erc20Token.balanceOf(user1.address)).to.equal(30)
      expect(await erc20Token.balanceOf(user2.address)).to.equal(15)
      expect(await erc20Token.balanceOf(user3.address)).to.equal(11)
    });
    
    it("Should batchTransfer ERC1155", async function () {
      const { otherAccount, user1, user2, user3, batchTransfer, erc1155Token, erc20Token } = await loadFixture(deployBatchTransfer);
      const _receivers = [otherAccount.address, user1.address, user2.address, user3.address]
      const _amts = [10, 30, 15, 11]
      const _ids = [0, 0, 0, 0]
      await (await erc1155Token.setApprovalForAll(batchTransfer.address, true)).wait()
      await (await batchTransfer.makeERC1155BatchTransfer(erc1155Token.address, _receivers, _ids, _amts)).wait()
      expect(await erc1155Token.balanceOf(otherAccount.address, 0)).to.equal(10)
      expect(await erc1155Token.balanceOf(user1.address, 0)).to.equal(30)
      expect(await erc1155Token.balanceOf(user2.address, 0)).to.equal(15)
      expect(await erc1155Token.balanceOf(user3.address, 0)).to.equal(11)

    });

  });
});

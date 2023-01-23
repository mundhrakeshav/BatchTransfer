import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      }
    }
  }, networks: {

    // matic: {
    //   url: "",
    //   accounts: [""],
    // }
  },

  etherscan: {
    apiKey: {
    }
  }
};

export default config;

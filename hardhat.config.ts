import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: { 
    matic: {
      url: "",
      accounts: [""]
    }
  },
  etherscan: {
    apiKey: {
    }
  }
};

export default config;

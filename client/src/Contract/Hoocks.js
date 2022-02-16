import React from "react";
import { Contract } from "@ethersproject/contracts";
// import { useWeb3React } from "@web3-react/core";
import Environment from "./Env";

import TokenSaleABI from "./TokenSaleABI.json";
import TokenABI from "./TokenABI.json";
import TokenDeployerABI from "./TokenDeployerABI.json";

import Web3 from "web3";
import { web3Seeder, web3SeederMain } from "./Seeder";

const web3 = new Web3(Web3.givenProvider ? Web3.givenProvider : web3SeederMain);
function useContract(address, ABI, signer) {
  return React.useMemo(() => {
    if (signer) {
      return new Contract(address, ABI, signer);
    } else {
      return "error";
    }
  }, [address, ABI, signer]);
}

export function UsePreSaleDeployer(signer) {
  return useContract(Environment.PreSaleDeployer, TokenSaleABI, signer);
}

export function UseTokenDeployerContract(signer) {
  return useContract(
    Environment.TokenDeployerContract,
    TokenDeployerABI,
    signer
  );
}

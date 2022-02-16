import React from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { MaxUint256 } from "@ethersproject/constants";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { parseUnits } from "@ethersproject/units";
import { createContext } from "react";
import { useState } from "react";
import WalletLink from "walletlink";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { TokenDeployerContractAddress } from "./utils/environment";
import { abi } from "./utils/environment";
const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      networkUrl: "https://data-seed-prebsc-1-s1.binance.org",
      rpc: {
        97: "https://data-seed-prebsc-1-s1.binance.org",
      },
      chainId: 97,
    },
  },
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)",
    },
    options: {
      appName: "Coinbase", // Your app name
      networkUrl: `https://data-seed-prebsc-1-s1.binance.org`,
      chainId: 97,
    },
    package: WalletLink,

    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
};
const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  // cacheProvider: true,
  providerOptions, // required
  theme: {
    background: "black",
    main: "rgb(136, 136, 136)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(195, 195, 195, 0.14)",
    hover: "rgba(195, 195, 195, 0.14)",
  },
});
export function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
export function calculateGasMargin(value) {
  return +(
    (value * BigNumber.from(10000).add(BigNumber.from(1000))) /
    BigNumber.from(10000)
  ).toFixed(0);
}
//CalculatePayableGas
export const gasEstimationPayable = async (account, fn, data, amount) => {
  console.log(data, "data");
  if (account) {
    const estimateGas = await fn(...data, MaxUint256).catch(() => {
      return fn(...data, { value: amount.toString() });
    });
    return calculateGasMargin(estimateGas);
  }
};
export const gasEstimationForAll = async (account, fn, data) => {
  console.log(data, "data");
  if (account) {
    const estimateGas = await fn(...data, MaxUint256).catch(() => {
      return fn(...data);
    });
    return calculateGasMargin(estimateGas);
  }
};
let initialState = {
  provider: null,
  web3Provider: null,
  account: null,
  chainId: null,
  signer: null,
};
export const AppContext = createContext(initialState);

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const connect = async () => {
    try {
      // This is the initial `provider` that is returned when
      // using web3Modal to connect. Can be MetaMask or WalletConnect.

      const provider = await web3Modal.connect();
      // We plug the initial `provider` into ethers.js and get back
      // a Web3Provider. This will add on methods from ethers.js and
      // event listeners such as `.on()` will be different.
      const web3Provider = new providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      console.log(signer, "signersigner");
      // console.log(signer, "signersigner")
      const account = await signer.getAddress();

      const network = await web3Provider.getNetwork();

      // console.log(abi);

      // const contractAddress = "0xb1a382e771F90d1990D1d9E43227EBb52De2e649";

      setState({
        ...state,
        provider: provider,
        web3Provider: web3Provider,
        account: account,
        signer: signer,
        chainId: network.chainId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const disconnect = async () => {
    try {
      await web3Modal.clearCachedProvider();
      if (
        state.provider?.disconnect &&
        typeof state.provider.disconnect === "function"
      ) {
        await state.provider.disconnect();
      }
      setState({
        ...state,

        provider: null,
        web3Provider: null,
        account: null,
        chainId: null,
        signer: null,
      });
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  // [state.provider]

  React.useEffect(() => {
    if (state.provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);

        setState({
          ...state,
          account: accounts[0],
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };
      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      state.provider.on("accountsChanged", handleAccountsChanged);
      state.provider.on("chainChanged", handleChainChanged);
      state.provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (state.provider.removeListener) {
          state.provider.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          state.provider.removeListener("chainChanged", handleChainChanged);
          state.provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [state.provider, disconnect]);
  console.log(state);
  return (
    <AppContext.Provider
      value={{
        account: state.account,
        signer: state.signer,
        connect,
        disconnect,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

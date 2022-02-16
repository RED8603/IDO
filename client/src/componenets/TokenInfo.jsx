import { Container, TextField } from "@mui/material";
import { Box, spacing } from "@mui/system";
import React, { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import BackDrop from "../BackDrop";
import { AppContext } from "../utils";
import { Contract } from "@ethersproject/contracts";
import TokenABI from "../Contract/TokenABI.json";

function TokenInfo({ data }) {
  const [tokenContractAddress, setTokenContractAddress] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const { signer, account } = useContext(AppContext);

  // contract

  const makeContract = (signer, abi, tokenAddress) => {
    if (signer) {
      return new Contract(tokenAddress, abi, signer);
    } else {
      return console.log("connect wallet");
    }
  };

  const {
    tokenAddress,
    setTokenAddress,
    tokenSymbol,
    settokenSymbol,
    tokenDecimal,
    settokenDecimal,
    progress,
    setProgress,
  } = data;

  const addressHandler = async (e) => {
    setTokenAddress(e.target.value);
  };

  const validToken = async () => {
    if (tokenAddress.length === 42) {
      try {
        setProgress(true);

        const contract = makeContract(signer, TokenABI, tokenAddress);

        console.log(contract);

        const decimel = await contract.decimals();
        settokenDecimal(decimel);

        const symbol = await contract.symbol();
        settokenSymbol(symbol);

        setProgress(false);
      } catch (err) {
        setProgress(false);
        console.log(err);
      }
    } else {
      enqueueSnackbar("Invaled Address", {
        variant: "error",
      });
    }
  };

  return (
    <>
      {progress ? <BackDrop progress={progress} /> : <></>}
      <Container maxWidth="sm">
        <Box
          padding="25.6px 32px"
          borderRadius="10px"
          backgroundColor="rgb(12, 12, 12)"
        >
          <Box
            mt="10px"
            mb="10px"
            component="h3"
            my={spacing(0.4)}
            fontWeight={500}
            fontSize={spacing(2)}
          >
            Token Address <span style={{ color: "red" }}>*</span>
          </Box>

          <Box mt="10px">
            <TextField
              required
              id="outlined-basic"
              placeholder="Enter here"
              variant="outlined"
              fullWidth
              value={tokenAddress}
              onChange={(e) => addressHandler(e)}
            />
          </Box>

          <Box
            position="relative"
            mx="auto"
            display="flex"
            justifyContent="space-around"
            my={4}
          >
            <button className="btn" onClick={validToken}>
              Valid Token
            </button>
          </Box>

          <Box
            mt="10px"
            mb="10px"
            component="h3"
            my={spacing(0.4)}
            fontWeight={500}
            fontSize={spacing(2)}
          >
            Token Symbol <span style={{ color: "red" }}>*</span>
          </Box>
          <Box mt="10px">
            <TextField
              required
              id="outlined-basic"
              placeholder="Enter here"
              variant="outlined"
              fullWidth
              value={tokenSymbol}
              onChange={(e) => settokenSymbol(e.target.value)}
            />
          </Box>

          <Box
            mt="10px"
            mb="10px"
            component="h3"
            fontWeight={500}
            fontSize={spacing(2)}
          >
            Token Decimal <span style={{ color: "red" }}>*</span>
          </Box>
          <Box mt="10px">
            <TextField
              required
              id="outlined-basic"
              placeholder="Enter here"
              variant="outlined"
              fullWidth
              value={tokenDecimal}
              onChange={(e) => settokenDecimal(e.target.value)}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default TokenInfo;

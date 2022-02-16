import React, { useContext, useState } from "react";
import axios from "axios";
import { Container, TextField } from "@mui/material";
import { parseUnits } from "@ethersproject/units";
import { Box, spacing } from "@mui/system";
import BackDrop from "../BackDrop";
import { useSnackbar } from "notistack";
import { Contract } from "@ethersproject/contracts";
import { AppContext } from "../utils";
import { UsePreSaleDeployer } from "../Contract/Hoocks";
import TokenABI from "../Contract/TokenABI.json";
import Environment from "../Contract/Env";

function ProjectDetails({ data }) {
  const [progress, setProgress] = useState(false);
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const [approve, setApprove] = useState(false);
  const [saleStatus, setSaleStatus] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const getUnixTime = (data) => {
    return Math.floor(new Date(data).getTime() / 1000);
  };

  // token Contract

  const useTokenContract = (signer, abi, tokenAddress) => {
    if (signer) {
      return new Contract(tokenAddress, abi, signer);
    } else {
      return console.log("connect wallet");
    }
  };

  const {
    projectName,
    setProjectName,
    projectDetails,
    setProjectDetails,
    minLimit,
    maxLimit,
    liguidity,
    listingPrice,
    softCap,
    hardCap,
    endDate,
    startDate,
    tokenDecimal,
    pricePerToken,
    tokenAddress,
    tokenSymbol,
    setActiveStep,
  } = data;

  const { account, signer } = useContext(AppContext);
  const PreSalesContract = UsePreSaleDeployer(signer);
  const TokenContarct = useTokenContract(signer, TokenABI, tokenAddress);
  const postData = async () => {
    const tdata = {
      projectName: projectName,
      projectDiscription: projectDetails,
      tokenSymbol: tokenSymbol,
      tokenDecimel: tokenDecimal,
      startDate: getUnixTime(startDate).toString(),
      endDate: getUnixTime(endDate).toString(),
      transationHash: "jsjcsuwuf477f4fnfferf e r",
    };
    try {
      const { data } = await axios.post("/newTransation", tdata);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNumberOfTokens = async () => {
    // console.log(PreSalesContract);
    try {
      setProgress(true);
      const numOfToken = await PreSalesContract.getTotalNumberOfTokens(
        pricePerToken,
        listingPrice,
        parseUnits(hardCap).toString(),
        liguidity.toString()
      );

      const hexToDeci = parseInt(numOfToken._hex, 16).toString();

      setNumberOfTokens(hexToDeci);

      console.log("token Count ", numberOfTokens);
      setProgress(false);
    } catch (err) {
      console.log(err);
      setProgress(false);
    }
  };

  const approveToken = async () => {
    if (numberOfTokens) {
      try {
        setProgress(true);
        const res = await TokenContarct.approve(
          Environment.PreSaleDeployer,

          parseUnits(numberOfTokens).toString()
        );

        console.log("Approve res", res);
        setApprove(true);
        setProgress(false);
      } catch (error) {
        setProgress(false);
        console.log(error);
      }
    } else {
      setProgress(false);
      // setApprove(true);

      console.log("err", "Number of token not fetched");
    }
  };

  const BnBSaleCreator = async () => {
    console.log(PreSalesContract);
    if (approve) {
      try {
        setProgress(true);
        const res = await PreSalesContract.createPreSaleBNB(tokenAddress, [
          pricePerToken,
          getUnixTime(startDate).toString(),
          getUnixTime(endDate).toString(),
          minLimit.toString(),
          maxLimit.toString(),
          hardCap.toString(),
          softCap.toString(),
          listingPrice.toString(),
          liguidity.toString(),
        ]);
        console.log(res.hash);
        setSaleStatus(true);
        setProgress(false);
      } catch (error) {
        console.log(error);
        if (account) {
          enqueueSnackbar("Sales Alreaddy exist", {
            variant: "error",
          });

          setProgress(false);
        } else {
          setProgress(false);

          enqueueSnackbar("Connect wallet", {
            variant: "error",
          });
        }
      }
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
            Projec Name <span style={{ color: "red" }}>*</span>
          </Box>

          <Box mt="10px">
            <TextField
              required
              id="outlined-basic"
              placeholder="Enter here"
              variant="outlined"
              fullWidth
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </Box>

          <Box
            mt="10px"
            mb="10px"
            component="h3"
            my={spacing(0.4)}
            fontWeight={500}
            fontSize={spacing(2)}
          >
            Project Discription <span style={{ color: "red" }}>*</span>
          </Box>
          <Box mt="10px">
            <TextField
              required
              id="outlined-basic"
              placeholder="Enter here"
              variant="outlined"
              fullWidth
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
            />
          </Box>
          {approve ? (
            <>
              <Box
                position="relative"
                mx="auto"
                display="flex"
                justifyContent="space-around"
                my={4}
              >
                <button className="btn" onClick={BnBSaleCreator}>
                  Create Sale
                </button>
              </Box>
            </>
          ) : numberOfTokens ? (
            <>
              <Box
                position="relative"
                mx="auto"
                display="flex"
                justifyContent="space-around"
                my={4}
              >
                <button className="btn" onClick={approveToken}>
                  Approve
                </button>
              </Box>
            </>
          ) : (
            <>
              <Box
                position="relative"
                mx="auto"
                display="flex"
                justifyContent="space-around"
                my={4}
              >
                <button className="btn" onClick={getNumberOfTokens}>
                  Process
                </button>
              </Box>
            </>
          )}

          {saleStatus ? (
            <>
              <Box
                position="relative"
                mx="auto"
                display="flex"
                justifyContent="space-around"
                my={4}
              >
                <button className="btn" onClick={postData}>
                  Save Transation
                </button>
              </Box>
              <Box
                position="relative"
                mx="auto"
                display="flex"
                justifyContent="space-around"
                my={4}
              >
                <button
                  className="btn"
                  onClick={() => {
                    setActiveStep(5);
                  }}
                >
                  See Projects
                </button>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Container>
    </>
  );
}

export default ProjectDetails;

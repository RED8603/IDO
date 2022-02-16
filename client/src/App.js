import "./App.css";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import bg from "./imgs/bg.png";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import CustomStepper from "./componenets/CustomStepper";
import TokenInfo from "./componenets/TokenInfo";
import SalesInfo from "./componenets/SalesInfo";
import Limit from "./componenets/Limit";
import Listing from "./componenets/Listing";
import ProjectDetails from "./componenets/ProjectDetails";
import UpcomingProjects from "./componenets/UpcomingProjects";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [progress, setProgress] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, settokenSymbol] = useState("");
  const [tokenDecimal, settokenDecimal] = useState("");
  const [pricePerToken, setPricePerToken] = useState("");
  const [softCap, setSoftCap] = useState("");
  const [hardCap, setSHardCap] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxLimit, setMaxLimit] = useState("");
  const [minLimit, setMinLimit] = useState("");
  const [listingPrice, setListingPrice] = useState("");
  const [liguidity, setLiguidity] = useState(70);
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${bg})`,

        minHeight: "1000px",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="lg">
          <Nav
            data={{
              progress,
              setProgress,
            }}
          />

          {activeStep < 5 ? (
            <>
              <Box
                font-size=" 32px"
                padding="25.6px 32px"
                borderRadius="10px"
                backgroundColor="rgb(12, 12, 12)"
                height="120px"
                component="h1"
                textAlign="center"
                m="50px 0px"
              >
                Create Sales
              </Box>
            </>
          ) : (
            <>
              <Box
                font-size=" 32px"
                padding="25.6px 32px"
                borderRadius="10px"
                backgroundColor="rgb(12, 12, 12)"
                height="120px"
                component="h1"
                textAlign="center"
                m="50px 0px"
              >
                Projects
              </Box>
            </>
          )}

          {activeStep < 5 ? (
            <>
              <CustomStepper data={{ activeStep, setActiveStep }} />
            </>
          ) : (
            <></>
          )}

          {activeStep === 0 ? (
            <TokenInfo
              data={{
                tokenAddress,
                setTokenAddress,
                tokenSymbol,
                settokenSymbol,
                tokenDecimal,
                settokenDecimal,
                progress,
                setProgress,
              }}
            />
          ) : (
            <></>
          )}
          {activeStep === 1 ? (
            <SalesInfo
              data={{
                pricePerToken,
                setPricePerToken,
                softCap,
                setSoftCap,
                hardCap,
                setSHardCap,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                tokenAddress,
                setActiveStep,
              }}
            />
          ) : (
            <></>
          )}

          {activeStep === 2 ? (
            <Limit
              data={{
                maxLimit,
                setMaxLimit,
                minLimit,
                setMinLimit,
              }}
            />
          ) : (
            <></>
          )}
          {activeStep === 3 ? (
            <Listing
              data={{
                listingPrice,
                setListingPrice,
                liguidity,
                setLiguidity,
              }}
            />
          ) : (
            <></>
          )}
          {activeStep === 4 ? (
            <ProjectDetails
              data={{
                projectName,
                setProjectName,
                projectDetails,
                setProjectDetails,
                minLimit,
                maxLimit,
                progress,
                setProgress,
                activeStep,
                setActiveStep,
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
              }}
            />
          ) : (
            <></>
          )}

          {activeStep === 5 ? (
            <UpcomingProjects
            // data={{
            //   listingPrice,
            //   setListingPrice,
            //   liguidity,
            //   setLiguidity,
            // }}
            />
          ) : (
            <></>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

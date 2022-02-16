import React from "react";
import { Container, TextField } from "@mui/material";
import { Box, spacing } from "@mui/system";
import { useSnackbar } from "notistack";

function SalesInfo({ data }) {
  const { enqueueSnackbar } = useSnackbar();

  const {
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
  } = data;
  return (
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
          Price per Token <span style={{ color: "red" }}>*</span>
        </Box>

        <Box mt="10px">
          <TextField
            required
            id="outlined-basic"
            placeholder="Enter here"
            variant="outlined"
            fullWidth
            value={pricePerToken}
            onChange={(e) => setPricePerToken(e.target.value)}
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
          Soft cap <span style={{ color: "red" }}>*</span>
        </Box>
        <Box mt="10px">
          <TextField
            required
            id="outlined-basic"
            placeholder="Enter here"
            variant="outlined"
            fullWidth
            value={softCap}
            onChange={(e) => setSoftCap(e.target.value)}
          />
        </Box>

        <Box
          mt="10px"
          mb="10px"
          component="h3"
          fontWeight={500}
          fontSize={spacing(2)}
        >
          Hard cap <span style={{ color: "red" }}>*</span>
        </Box>
        <Box mt="10px">
          <TextField
            required
            id="outlined-basic"
            placeholder="Enter here"
            variant="outlined"
            fullWidth
            value={hardCap}
            onChange={(e) => setSHardCap(e.target.value)}
          />
        </Box>

        <Box
          mt="10px"
          mb="10px"
          component="h3"
          fontWeight={500}
          fontSize={spacing(2)}
        >
          Sale Start Date <span style={{ color: "red" }}>*</span>
        </Box>
        <Box mt="10px">
          <TextField
            type="datetime-local"
            required
            id="outlined-basic"
            placeholder="Enter here"
            variant="outlined"
            fullWidth
            value={startDate}
            onChange={(e) => {
              if (tokenAddress) {
                const time = Math.floor(
                  new Date(e.target.value).getTime() / 1000
                );
                setStartDate(e.target.value);
              } else {
                enqueueSnackbar("Inter Token Address", {
                  variant: "error",
                });
                setActiveStep(0);
              }
            }}
          />
        </Box>

        <Box
          mt="10px"
          mb="10px"
          component="h3"
          fontWeight={500}
          fontSize={spacing(2)}
        >
          Sale end Date <span style={{ color: "red" }}>*</span>
        </Box>
        <Box mt="10px">
          <TextField
            required
            type="datetime-local"
            id="outlined-basic"
            placeholder="Enter here"
            variant="outlined"
            fullWidth
            value={endDate}
            onChange={(e) => {
              const time = Math.floor(
                new Date(e.target.value).getTime() / 1000
              );

              setEndDate(e.target.value);
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default SalesInfo;

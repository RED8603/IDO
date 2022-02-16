import React from "react";
import { Container, Slider, TextField } from "@mui/material";
import { Box, spacing } from "@mui/system";

function Listing({ data }) {
  const { listingPrice, setListingPrice, liguidity, setLiguidity } = data;

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
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="column"
          my={spacing(0.4)}
          fontWeight="bold"
          fontSize={spacing(2)}
        >
          <Box fontWeight="bold" fontSize="40px">
            Liquidity %
          </Box>
          <Slider
            defaultValue={liguidity}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={(e) => setLiguidity(e.target.value.toString())}
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
          Listing price <span style={{ color: "red" }}>*</span>
        </Box>
        <Box mt="10px">
          <TextField
            required
            id="outlined-basic"
            placeholder="Enter here"
            variant="outlined"
            fullWidth
            value={listingPrice}
            onChange={(e) => setListingPrice(e.target.value)}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Listing;

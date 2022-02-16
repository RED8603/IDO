import React from "react";
import { Container, Switch, TextField } from "@mui/material";
import { Box, spacing } from "@mui/system";

function Limit({ data }) {
  const { maxLimit, setMaxLimit, minLimit, setMinLimit } = data;
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
          my={spacing(0.4)}
          fontWeight="bold"
          fontSize={spacing(2)}
        >
          <Box fontWeight="bold" fontSize="40px">
            Limit
          </Box>
          <Switch color="default" />
        </Box>

        <Box
          mt="10px"
          mb="10px"
          component="h3"
          my={spacing(0.4)}
          fontWeight={500}
          fontSize={spacing(2)}
        >
          Minimum <span style={{ color: "red" }}>*</span>
        </Box>
        <Box mt="10px">
          <TextField
            required
            id="outlined-basic"
            placeholder="Enter here"
            variant="outlined"
            fullWidth
            value={minLimit}
            onChange={(e) => setMinLimit(e.target.value)}
          />
        </Box>

        <Box
          mt="10px"
          mb="10px"
          component="h3"
          fontWeight={500}
          fontSize={spacing(2)}
        >
          Maximum <span style={{ color: "red" }}>*</span>
        </Box>
        <Box mt="10px">
          <TextField
            required
            id="outlined-basic"
            placeholder="Enter here"
            variant="outlined"
            fullWidth
            value={maxLimit}
            onChange={(e) => setMaxLimit(e.target.value)}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Limit;

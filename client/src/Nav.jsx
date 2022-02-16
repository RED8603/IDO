import { useState, useContext, useEffect } from "react";
import "./App.css";
import { Box, Button, Container, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { AppContext } from "./utils";

function Nav({ data }) {
  const { account, connect, disconnect, signer } = useContext(AppContext);
  const [mAccount, setmAccount] = useState(account);
  const [uiupdae, setUiupdate] = useState(true);

  useEffect(() => {
    setmAccount(account);
    console.log("account", account);
    console.log(signer);
  }, [account, signer, uiupdae]);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Stack
        mt={-3}
        direction="row"
        justifyContent="space-around"
        my={4}
        sx={{ backgroundColor: "#121212" }}
        height="120px"
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              fontSize: { lg: "40px", md: "30px", xs: "18px" },
            }}
            color="grey"
            fontWeight="700"
          >
            Connect to your Wallet
          </Box>
          {!mAccount ? (
            <Button
              onClick={async (e) => {
                e.preventDefault();
                try {
                  if (uiupdae) {
                    await connect();
                    setUiupdate(false);
                    setmAccount(account);
                  } else {
                    await connect();
                    setUiupdate(true);
                    setmAccount(account);
                  }

                  enqueueSnackbar("Wallet Connected", {
                    variant: "success",
                  });
                } catch (err) {
                  enqueueSnackbar(err.data.message, {
                    variant: "error",
                  });
                }
              }}
              style={{ color: "grey", border: "1px solid indigo" }}
            >
              Connect
            </Button>
          ) : (
            <></>
          )}
          {mAccount ? (
            <>
              <Button
                onClick={() => {
                  if (uiupdae) {
                    setUiupdate(false);

                    disconnect();
                  } else {
                    setUiupdate(true);
                    disconnect();
                  }
                  enqueueSnackbar("Wallet Disconnecte", {
                    variant: "info",
                  });
                }}
              >
                {mAccount.slice(0, 6) + "..." + mAccount.slice(-4)}t
              </Button>
              <Button
                onClick={async () => {
                  const message = `Logging in at ${new Date().toISOString()}`;
                  const signature = await signer
                    .signMessage(message)
                    .catch((error) => console.log(error));

                  console.log({ message, account, signature });
                }}
              >
                log in
              </Button>
            </>
          ) : (
            <></>
          )}
        </Container>
      </Stack>
    </>
  );
}

export default Nav;

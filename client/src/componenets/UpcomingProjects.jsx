import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

function UpcomingProjects() {
  const [serverData, setServerData] = useState([]);
  const [projects, setProjects] = useState([]);

  const getUnixTime = () => {
    return Math.floor(new Date().getTime() / 1000);
  };
  const currentTime = getUnixTime();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("/projects");
        setServerData(data);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const ALLPROJECTS = () => {
    setProjects(serverData);
  };

  const SETACTIVEPROJECTS = () => {
    setProjects(serverData);
    if (projects) {
      const active = projects.filter(
        (item) => +item.startDate < currentTime && +item.endDate > currentTime
      );

      console.log(active);
      setProjects(active);
    } else {
      console.log("err", "No data");
    }
  };

  const SETUPCOMMINGPROJECTS = () => {
    setProjects(serverData);

    if (projects) {
      const upcomin = projects.filter((item) => +item.startDate > currentTime);
      console.log(upcomin);

      setProjects(upcomin);
    } else {
      console.log("err", "No data");
    }
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Box
          padding="25.6px 32px"
          borderRadius="10px"
          backgroundColor="rgb(12, 12, 12)"
        >
          <Button onClick={ALLPROJECTS}>All Projects</Button>
          <Button onClick={SETACTIVEPROJECTS}>Active</Button>
          <Button onClick={SETUPCOMMINGPROJECTS}>Upcoming</Button>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            flexWrap="wrap"
          >
            {projects && serverData ? (
              <>
                {projects.map((item) => (
                  <>
                    <Card
                      key={item._id}
                      sx={{
                        minWidth: "300px",
                        padding: "10px",
                        margin: "10px",
                      }}
                    >
                      <CardHeader>
                        <Box color="white">{item.projectName}</Box>
                      </CardHeader>

                      <CardMedia image="https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615">
                        <img
                          src="https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615"
                          alt=""
                          style={{
                            objectFit: "cover",
                            height: "200px",
                            width: "200px",
                          }}
                        />
                      </CardMedia>
                      <CardContent>
                        <Box>{item.tokenSymbol}</Box>
                        <Box>{item.tokenDecimel}</Box>
                        <Box>{item.projectDiscription}</Box>
                      </CardContent>
                    </Card>
                  </>
                ))}
              </>
            ) : (
              <>
                {" "}
                <CircularProgress />{" "}
              </>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default UpcomingProjects;

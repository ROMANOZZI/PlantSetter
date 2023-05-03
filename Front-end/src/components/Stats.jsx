import React from "react";
import Card from "./Card";
import { Doughnut } from "react-chartjs-2";
import {
  FormControl,
  Box,
  color,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import Moisture from "../assets/Moisture.png";
import fertilizer from "../assets/fertilizer.png";
const Stats = ({ cards, weather, state }) => {
  const fieldStyle = {
    bgColor: "white",
    borderRadius: "0.25em",
    border: "none",
    fontSize: "1.5em",
    p: "1em",
    width: "25rem",
    mt: "1rem",
    mb: "2rem",
    height: "2rem",
    display: "block",
  };
  const states = {
    i: "the site unit is not yet connected",
    n: "the site unit is injecting nitrogen to the soil",
    p: "the site unit is injecting phosphorus to the soil",
    k: "the site unit is injecting potassium to the soil",
    w: "the site unit is irrigating to the field",
    d: "the site unit is idle right now",
  };
  console.log(state);
  return (
    <div className="user-container">
      <div className="App">
        <div className="title-container">
          <h1 className="title"> Dashboard</h1>
          <p className="small"> your field information and statistics</p>
        </div>
        <Box height="fit-content" width="45vw" bgColor="#F2F2F2">
          <FormControl
            as="fieldset"
            width="70vw"
            display="grid"
            bgColor="#f8f8fb"
            ml="10vw"
            mt="0.5em"
            top="0"
            padding="2vw"
            borderRadius="1em"
            border="none"
            filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
            autoComplete="off"
          >
            <h2>Weather forecast </h2>
            <Box
              filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
              display="flex"
              width="100%"
              mb="2em"
              bgColor="white"
              borderRadius="1em"
              border="none"
            >
              <Box
                fontSize="25px"
                display="flex"
                margin="1em"
                justifyContent="center"
              >
                <Box display="flex" margin="1em">
                  <Stat>
                    <StatLabel>Temprature</StatLabel>
                    <StatNumber
                      m="0.5em"
                      fontSize={"3rem"}
                    >{`${weather?.main.temp}°C`}</StatNumber>
                    <StatHelpText fontSize={"1rem"}>
                      feels Like {`${weather?.main.feels_like}°C`}
                    </StatHelpText>
                  </Stat>
                </Box>

                <Box display="inline-block" margin="1em">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                  ></img>
                </Box>
                <Box
                  display="flex"
                  margin="1em"
                  textAlign="center"
                  alignItems={"center"}
                  fontSize={"1.5rem"}
                >
                  {weather?.weather[0].description}
                </Box>
              </Box>
            </Box>
            <h2>Site unit </h2>

            <div className="stat-cards">
              <Box fontSize="1.5rem" m="1em 1em  0 1em ">
                {states[state]}
              </Box>
              <Box display="block" padding="0 0 0 6rem" w="55vw" margin="auto">
                <div className="card">
                  <h2>Temprature</h2>
                  <div className="stat-i-container">
                    <img src={cards[0].icon} alt="" width="70px"></img>
                  </div>
                  <div className="statsContainer">
                    <p className="data">{`${cards[0].data}°C`} </p>
                    <p className="small">{cards[0].unit}</p>
                  </div>
                </div>
                <div className="card">
                  <h2>Humidity</h2>
                  <div className="stat-i-container">
                    <img src={cards[1].icon} alt="" width="70px"></img>
                  </div>
                  <div className="statsContainer">
                    <CircularProgress
                      value={cards[1].data}
                      size="7rem"
                      color="#2cb67d"
                      top="-0.5em"
                    >
                      <CircularProgressLabel>{`${cards[1].data}%`}</CircularProgressLabel>
                    </CircularProgress>
                  </div>
                </div>
                <div className="card">
                  <h2>Moisture </h2>
                  <div className="stat-i-container">
                    <img src={Moisture} alt="" width="70px"></img>
                  </div>
                  <div className="statsContainer">
                    <CircularProgress
                      value={((1022 - cards[2].data) / 1022) * 100}
                      size="7rem"
                      color="#2cb67d"
                      top="-0.5em"
                    >
                      <CircularProgressLabel>{`${parseInt(
                        ((1022 - cards[2].data) / 1022) * 100
                      )}%`}</CircularProgressLabel>
                    </CircularProgress>
                  </div>
                </div>
                <div className="card">
                  <h2>N-P-K</h2>
                  <div className="stat-i-container">
                    <img src={fertilizer} alt="" width="70px"></img>
                  </div>
                  <div className="statsContainer">
                    <p className="data">
                      {`${cards[3].data}-${cards[4].data}-${cards[5].data}`}{" "}
                    </p>
                  </div>
                </div>
              </Box>
            </div>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

export default Stats;
/**
 */

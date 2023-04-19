import React from "react";
import Card from "./Card";
import { Doughnut } from "react-chartjs-2";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  color,
  Button,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
const Stats = ({ cards, data, pump, count, weather }) => {
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
  console.log(weather);
  return (
    <div className="user-container">
      <div className="App">
        <div className="title-container">
          <h1 className="title"> Dashboard Room</h1>
          <p className="small"> your plant statistics</p>
        </div>
        <Box
          height="fit-content"
          width="100%"
          bgColor="#f8f8fb"
          position="absolute"
          left="0"
          mt="3em"
          padding="5em 3em 3em 6em"
        >
          <FormControl
            as="fieldset"
            width="100%"
            display="grid"
            mx="auto"
            bgColor="white"
            borderRadius="1em"
            border="none"
            filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
            p="3.5em"
            autoComplete="off"
          >
            <Box>
              <h2>Weather forecast </h2>

              <Box fontSize="25px" display="inline-block" margin="1em">
                {" "}
                {weather.weather[0].main}
              </Box>
            </Box>

            <div className="stat-cards">
              {cards.map((card) => (
                <Card
                  key={cards.indexOf(card)}
                  icon={card.icon}
                  data={card.data}
                  unit={card.unit}
                ></Card>
              ))}
              <div className="card">
                <div className="stat-i-container chart-container">
                  <p className="secs">{parseInt(50 - count)} secs</p>
                  <Doughnut data={data}> </Doughnut>
                </div>
                <div>
                  <div className="text-data">
                    water pump is currently
                    <p className="strong"> {pump ? "On" : "OFF"}</p>
                  </div>
                </div>
              </div>
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

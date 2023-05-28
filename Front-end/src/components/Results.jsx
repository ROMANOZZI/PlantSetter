import React from "react";
import { Box, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const Results = ({ res, img }) => {
  const resCont = {
    width: "200px",
  };

  return (
    <>
      <img
        src={img}
        alt="img"
        style={{
          width: "400px",

          display: "inline-block",
          height: "fit-content",
          marginTop: "4em",
          borderRadius: "1em",
          marginBottom: "2em",
        }}
        id="img"
      />
      <Box
        marginLeft="6em"
        display="flex"
        flexDirection="column"
        alignItems={"center"}
      >
        <Box sx={resCont}>
          <h2>early Blight </h2>

          <CircularProgress
            size="120px"
            value={res[0]}
            color={"#2cb67d"}
            marginLeft="0.5em"
          >
            <CircularProgressLabel>
              {Math.round(res[0]) + " % "}
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Box sx={resCont}>
          <h2>Healthy </h2>
          <CircularProgress
            size="120px"
            value={res[1]}
            color={"#2cb67d"}
            marginLeft="0.5em"
          >
            <CircularProgressLabel>
              {Math.round(res[1]) + " % "}
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Box sx={resCont}>
          <h2>Late blight </h2>
          <CircularProgress
            size="120px"
            value={res[2]}
            color={"#2cb67d"}
            marginLeft="0.5em"
          >
            <CircularProgressLabel>
              {Math.round(res[2]) + " % "}
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Box>
    </>
  );
};

export default Results;

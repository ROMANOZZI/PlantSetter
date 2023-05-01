import React from "react";
import Webcam from "react-webcam";
import { Button, Box } from "@chakra-ui/react";
import Results from "./Results";

const WebCam = ({ setImage, image, upload, res }) => {
  const webcamRef = React.useRef(null);
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64String = imageSrc; // example base64-encoded image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image1 = new Image();

    image1.onload = () => {
      canvas.width = image1.width;
      canvas.height = image1.height;
      ctx.drawImage(image1, 0, 0);
      canvas.toBlob(
        (blob) => {
          const file = new File([blob], "image.jpg", { type: "image/jpeg" });
          // do something with the converted file, e.g. upload to Firebase Storage
          setImage(file);
          upload(file);
        },
        "image/jpeg",
        0.7
      );
    };

    image1.src = base64String;
  };
  const LoginButton = {
    display: "inline-block",

    my: "auto",
    mx: "1em",
    alignText: "center",
    bgColor: "#2cb67d",
    fontSize: "2.25rem",
    fontFamily: ' font-family: "Montserrat", sans-serif',
    color: "white",
    paddingY: "0.35em",
  };
  const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: "user",
  };
  return (
    <Box display="flex">
      {image ? (
        <>
          <Results res={res} img={image} />
        </>
      ) : (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            ref={webcamRef}
            height={500}
            width={500}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />

          <Button
            sx={LoginButton}
            my="auto"
            ml={"auto"}
            onClick={() => {
              capture();
            }}
          >
            Capture photo
          </Button>
        </>
      )}
    </Box>
  );
};

export default WebCam;

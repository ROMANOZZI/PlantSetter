import React from "react";
import {
  Box,
  FormControl,
  Button,
  Input,
  CircularProgressLabel,
} from "@chakra-ui/react";
import * as tf from "@tensorflow/tfjs";

import axios from "axios";
import { CircularProgress } from "@chakra-ui/react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { startFireBase, app } from "./fb-config";
import CropperC from "./CropperC";
import Results from "./Results";
import WebCam from "./WebCam";

const LeafDiagnoses = ({ user }) => {
  const [sel, setSel] = React.useState(null);
  const [img, setImage] = React.useState(null);
  const [res, setRes] = React.useState([0, 0, 0]);

  const Storage = getStorage(app);
  const auth = getAuth();

  const [crop, setCrop] = React.useState({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = React.useState(1);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [croppedImage, setCroppedImage] = React.useState(null);
  const storageRef = ref(Storage, `users/${user.id}/leaf.jpeg`);

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
  const LoginButton = {
    display: "inline-block",
    m: "auto",
    mt: "1em",
    mx: "1em",
    alignText: "center",
    bgColor: "#2cb67d",
    fontSize: "2.25rem",
    fontFamily: ' font-family: "Montserrat", sans-serif',
    color: "white",
    paddingY: "0.35em",
    paddingX: "0.75em",
  };
  const upload = (file) => {
    uploadBytes(storageRef, file)
      .then((result) => {
        getDownloadURL(result.ref).then((url) => {
          URL.revokeObjectURL(file);
          setImage(url);
          axios
            .get("/api/diagnose", {
              params: {
                url: url,
              },
            })
            .then((res) => {
              setRes((prev) => [res.data["early-blight"], prev[1], prev[2]]);
              setRes((prev) => [prev[0], res.data["healthy"], prev[2]]);
              setRes((prev) => [prev[0], prev[1], res.data["late-blight"]]);
              //deleteObject(storageRef);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return sel ? (
    sel === "upload" ? (
      <div className="App">
        <div className="title-container">
          <h1 className="title"> Leaf Diagnosis</h1>
          <p className="small"> check your plant health</p>
        </div>

        <Box
          height="fit-content"
          width="100%"
          bgColor="#f8f8fb"
          position="absolute"
          left="0"
          padding="0 3em 3em 6em"
        >
          <FormControl
            as="fieldset"
            width="40vw"
            mx="auto"
            bgColor="white"
            borderRadius="1em"
            border="none"
            filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
            p="3.5em"
            autoComplete="off"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            {!croppedImage && (
              <CropperC
                image={img}
                crop={crop}
                zoom={zoom}
                setCrop={setCrop}
                setCroppedArea={setCroppedArea}
                setZoom={setZoom}
                setCroppedImage={setCroppedImage}
                upload={upload}
              ></CropperC>
            )}

            {croppedImage && <Results res={res} img={croppedImage}></Results>}
          </FormControl>
        </Box>
      </div>
    ) : (
      <div className="App">
        <div className="title-container">
          <h1 className="title"> Leaf Diagnosis</h1>
          <p className="small"> check your plant health</p>
        </div>

        <Box
          height="fit-content"
          width="100%"
          bgColor="#f8f8fb"
          position="absolute"
          left="0"
          padding="0 3em 3em 6em"
        >
          <FormControl
            as="fieldset"
            width="40vw"
            mx="auto"
            bgColor="white"
            borderRadius="1em"
            border="none"
            filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
            p="3.5em"
            autoComplete="off"
            display="flex"
            justifyContent="space-between"
          >
            <WebCam setImage={setImage} image={img} upload={upload} res={res} />
          </FormControl>
        </Box>
      </div>
    )
  ) : (
    <div className="App">
      <div className="title-container">
        <h1 className="title"> Leaf Diagnosis</h1>
        <p className="small"> check your plant health</p>
      </div>
      <Box
        height="fit-content"
        width="100%"
        bgColor="#f8f8fb"
        position="absolute"
        left="0"
        mt="3em"
        padding="5em 3em 3em 6em"
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Button
          sx={LoginButton}
          onClick={() => {
            setSel("camera");
          }}
        >
          {" "}
          Take a photo
        </Button>
        <Button sx={LoginButton}>
          upload
          <Input
            placeholder="upload"
            type="file"
            display="unset"
            top={"0"}
            left={"0"}
            position={"absolute"}
            width={"100%"}
            height={"100%"}
            opacity={"0"}
            onChange={(e) => {
              setSel("upload");
              setImage(URL.createObjectURL(e.target.files[0]));
            }}
          ></Input>
        </Button>
      </Box>
    </div>
  );
};

export default LeafDiagnoses;

import React from "react";
import Cropper from "react-easy-crop";
import { Button } from "@chakra-ui/react";
import getCroppedImg from "./getCroppedImg";
const CropperC = ({
  image,
  crop,
  zoom,
  setCrop,
  setCroppedArea,
  setZoom,
  setCroppedImage,
  upload,
}) => {
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

  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

  const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const showCroppedImage = React.useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      upload(croppedImage);
      const url = URL.createObjectURL(croppedImage);
      setCroppedImage(url);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <>
      <div className="cropper-container">
        <Cropper
          image={image}
          id="cropper"
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          cropShape="rect"
          showGrid={false}
          style={{
            containerStyle: {
              display: "block",
              width: "25rem",
              height: "25rem",
              margin: "auto",
              marginRight: "5em",
              position: "relative",
              borderRadius: "1em",
            },
          }}
        >
          <img
            src={image}
            alt="img"
            style={{
              width: "50%",

              display: "inline-block",
              height: "fit-content",
              marginTop: "4em",
              borderRadius: "1em",
              marginBottom: "2em",
            }}
            id="img"
          />
        </Cropper>
      </div>
      <Button
        sx={LoginButton}
        my="auto"
        ml={"auto"}
        onClick={() => {
          showCroppedImage();
        }}
      >
        Crop
      </Button>
    </>
  );
};

export default CropperC;

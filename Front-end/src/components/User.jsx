import React from "react";
import TopBar from "./TopBar";
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
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import backG from "../assets/backG.png";

function User() {
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
    fontSize: "1.25rem",
    fontFamily: ' font-family: "Montserrat", sans-serif',
    color: "white",
    paddingY: "0.35em",
    paddingX: "0.75em",
  };
  const [siteUnit, setSiteUnit] = React.useState(null);
  const [user, setUser] = React.useState({});
  const db = getDatabase();
  const auth = getAuth();
  React.useEffect(() => {
    const starCountRef = ref(db, user.uid + "/siteUnit");
    setUser({ ...auth.currentUser });
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setSiteUnit(data);
    });
  }, [getAuth(), getDatabase(), auth.currentUser]);

  return (
    <div className="user-container">
      <div className="title-container"></div>
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
          width="60%"
          mx="auto"
          bgColor="white"
          borderRadius="1em"
          border="none"
          filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
          p="3.5em"
          autoComplete="off"
        >
          <Box
            position="absolute"
            width="100%"
            mt={"-3.5em"}
            marginLeft={"-56"}
            borderRadius="1em"
            overflow={"hidden"}
          >
            <img src={backG} width="100%" height="280px"></img>
          </Box>
          <div>
            <Avatar
              as="span"
              bgColor="white"
              mx="1em"
              mb={"5em"}
              width="200px"
              height="200px"
              border={"8px  solid #2cb67d"}
              src={user.photoURL}
              borderRadius="50%"
            ></Avatar>
          </div>
          <div className="info-cont">
            <FormLabel htmlFor="fname" fontSize={"2rem"}>
              Name
            </FormLabel>
            <Input
              id="fname"
              sx={fieldStyle}
              disabled={true}
              defaultValue={user.displayName}
            ></Input>
          </div>
          <div className="info-cont">
            <FormLabel htmlFor="email" fontSize={"2rem"}>
              Email
            </FormLabel>
            <Input
              id="email"
              sx={fieldStyle}
              disabled={true}
              defaultValue={user.email}
            ></Input>
          </div>
          <div className="info-cont">
            <FormLabel htmlFor="password" fontSize={"2rem"}>
              Password
            </FormLabel>
            <Input
              id="password"
              sx={fieldStyle}
              disabled={true}
              defaultValue="********"
            ></Input>
          </div>
          <div className="info-cont">
            <FormLabel htmlFor="State" fontSize={"2rem"}>
              Site unit
            </FormLabel>
            <Input
              id="state"
              sx={fieldStyle}
              disabled={true}
              defaultValue={siteUnit == null ? "NA" : siteUnit}
            ></Input>
          </div>
          <div className="buttonGroup">
            <Button sx={LoginButton}> Update information</Button>
            <Button sx={LoginButton}> Discard</Button>
          </div>
        </FormControl>
      </Box>
    </div>
  );
}

export default User;

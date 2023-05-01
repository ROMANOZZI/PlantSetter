import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  color,
  Button,
} from "@chakra-ui/react";
import { startFireBase } from "./fb-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { check_email, check_password } from "../../check_creditnials";
import HashLoader from "react-spinners/HashLoader";
import { ref as sRef, set } from "firebase/database";
const small = {
  fontSize: "0.5rem",
  color: "grey",
};
const small_err = {
  fontSize: "0.5rem",
  color: "red",
};
/**
 *
 * TODO: reduce API calls by checking the email and password for conditions before
 **Done
 * TODO: handle the error messages
 * *Done
 * TODO: loading animation
 **Done
 *
 *
 */

const Login = (user, setUser) => {
  const Email = React.useRef();
  const Password = React.useRef();
  const [Email_err, setEmail_err] = React.useState(false);
  const [pass_err, setPass_err] = React.useState(false);
  const [DB_err, setDB_err] = React.useState(false);
  const Navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const longtitude = React.useRef();
  const latitude = React.useRef();

  const fieldStyle = {
    bgColor: "white",
    borderRadius: "0.25em",
    border: "0.1em solid #a6acbe",
    width: "18rem",
    height: "2rem",
    mt: "0.5em",
    mb: "0.1em",
  };

  const CSSProperties = {
    display: "block",
    margin: "65 65",

    borderColor: "green",
    size: "",
  };

  const LoginButton = {
    display: "block",
    m: "auto",
    mt: "1em",
    alignText: "center",
    bgColor: "#2cb67d",
    fontSize: "1.25rem",
    fontFamily: ' font-family: "Montserrat", sans-serif',
    color: "white",
    paddingY: "0.35em",
    paddingX: "0.75em",
  };
  return loading ? (
    <HashLoader
      color={"#36d7b7"}
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  ) : (
    <Box
      height="100%"
      width="100%"
      bgColor="#f8f8fb"
      position="absolute"
      top="0"
      left="0"
    >
      <FormControl
        as="fieldset"
        width="20rem"
        mx="auto"
        mt="15%"
        bgColor="white"
        borderRadius="1em"
        border="none"
        filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        p="2em"
      >
        <FormLabel color="black" fontSize="1.25rem">
          Email address
        </FormLabel>
        {DB_err && (
          <FormHelperText sx={small_err}>
            invalid Email or password
          </FormHelperText>
        )}

        <Input
          sx={fieldStyle}
          type="email"
          bgColor="white"
          color="black"
          onChange={(e) => {
            Email.current = e.target.value;
            if (check_email(Email.current) == false) setEmail_err(true);
            else setEmail_err(false);
          }}
        ></Input>
        {Email_err ? (
          <FormHelperText sx={small_err} color={"red.900"}>
            {" "}
            Email is invalid{" "}
          </FormHelperText>
        ) : (
          <FormHelperText sx={small}>
            to get informations your plants state
          </FormHelperText>
        )}
        <FormLabel color="black" fontSize="1.25rem">
          Password
        </FormLabel>
        <Input
          sx={fieldStyle}
          type="password"
          bgColor="white"
          onChange={(e) => {
            Password.current = e.target.value;
            if (check_password(Password.current) == false) setPass_err(true);
            else setPass_err(false);
          }}
          color="black"
        ></Input>
        {pass_err && (
          <FormHelperText sx={small_err} color={"red.900"}>
            the password is invalid
          </FormHelperText>
        )}
        <Button
          sx={LoginButton}
          onClick={() => {
            setLoading(true);
            if (Email_err || pass_err) return;
            const auth = getAuth();
            signInWithEmailAndPassword(auth, Email.current, Password.current)
              .then((userCredential) => {
                setLoading(false);
                const longref = sRef(
                  startFireBase(),
                  `users/${userCredential.user.uid}/longtitude`
                );
                const latref = sRef(
                  startFireBase(),
                  `users/${userCredential.user.uid}/latitude`
                );
                const siteUnitref = sRef(
                  startFireBase(),
                  `users/${userCredential.user.uid}/siteUnit`
                );
                navigator.geolocation.getCurrentPosition((position) => {
                  set(longref, position.coords.longitude);
                  set(latref, position.coords.latitude);
                  set(
                    siteUnitref,
                    "a06e71b81f68d1258833b943b564257b1579bafe88322c107af7b9a70d7c3ad4"
                  );
                });

                Navigate("/Dashboard", { replace: true });
              })
              .catch((error) => {
                setLoading(false);
                setDB_err(true);
              });
          }}
        >
          Login
        </Button>
        <p className="tiny">
          You don't have an account? <Link to="SignUp">create account</Link>
        </p>
      </FormControl>
    </Box>
  );
};

export default Login;

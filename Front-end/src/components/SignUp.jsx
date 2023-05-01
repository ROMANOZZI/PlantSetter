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
import Facebook from "../assets/facebook.png";
import google from "../assets/google.png";
import { startFireBase, app } from "./fb-config";
import { ref as sRef, set, onValue, update } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import userI from "../assets/user.png";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import {
  check_email,
  check_name,
  check_password,
} from "../../check_creditnials";
import HashLoader from "react-spinners/HashLoader";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
const small = {
  fontSize: "0.5rem",
  color: "grey",
};
const CSSProperties = {
  display: "block",
  margin: "65 65",

  borderColor: "green",
  size: "",
};
const fieldStyle = {
  bgColor: "white",
  borderRadius: "0.25em",
  border: "0.1em solid #a6acbe",
  width: "18rem",
  height: "2rem",
  mt: "0.5em",
  mb: "0.5em",
};
const NAmefield = {
  bgColor: "white",
  borderRadius: "0.25em",
  border: "0.1em solid #a6acbe",
  width: "12rem",
  height: "2rem",
  mt: "0.5em",
  mb: "0.1em",
  display: "inline-block",
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
const SignUp = ({ user, setUser }) => {
  const [img, setImg] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const auth = getAuth();
  const FirstName = React.useRef();
  const LastName = React.useRef();
  const Email = React.useRef();
  const Password = React.useRef();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const [email_err, setEmail_err] = React.useState(false);
  const [password_err, setPass_err] = React.useState(false);
  const [DB_err, setDB_err] = React.useState(false);
  const [fname_err, setFname_err] = React.useState(false);
  const [lname_err, setLname_err] = React.useState(false);
  const storage = getStorage(app);
  const tempref = ref(storage, "temp");
  const image = React.useRef();
  const small_err = {
    fontSize: "0.8rem",
    color: "red",
  };

  let ImgUrl = "";
  const handleFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };
  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  /**
   * TODO: Loading animation
   * *Done
   * ToDO: check if the user is already exist
   * *Done
   * TODO: congrats message
   * *Done
   * TODO: logout
   ** Done
   *
   * TODO: get Location
   * *Done
   * TODO:Avatar
   * *Done
   * TODO:design personal information page
   * *Done
   *
   *
   */
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
        mt="10%"
        bgColor="white"
        borderRadius="1em"
        border="none"
        filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        p="2em"
        autoComplete="off"
      >
        <Avatar
          as="span"
          bgColor="white"
          mx="30%"
          src={img == null ? userI : img}
          borderRadius="50%"
        >
          <AvatarBadge
            bgColor="#2cb67d"
            boxSize="2rem"
            borderRadius="50%"
            cursor="pointer"
          >
            <p className="add">+</p>

            <Input
              type="file"
              opacity="0"
              position="absolute"
              width="100%"
              height="32px"
              z-index="10"
              id="file"
              top="5"
              cursor="pointer"
              onChange={(e) => {
                uploadBytes(tempref, e.target.files[0]).then((snapshot) => {
                  getDownloadURL(ref(storage, "temp")).then((url) => {
                    setImg(url);
                    image.current = e.target.files[0];
                  });
                });
              }}
            ></Input>
          </AvatarBadge>
        </Avatar>
        {DB_err && (
          <FormHelperText sx={small_err}>
            {" "}
            this email already exists
          </FormHelperText>
        )}

        <FormLabel color="black" fontSize="1.25rem" display="block">
          First name
        </FormLabel>

        <Input
          sx={fieldStyle}
          id="fname"
          type="text"
          bgColor="white"
          color="black"
          onChange={(e) => {
            FirstName.current = e.target.value;
            if (check_name(e.target.value) == false || e.target.value == "")
              setFname_err(true);
            else setFname_err(false);
          }}
        ></Input>
        {fname_err && (
          <FormHelperText sx={small_err}>invalid name</FormHelperText>
        )}

        <FormLabel color="black" fontSize="1.25rem" display="block">
          Second Name
        </FormLabel>

        <Input
          id="lname"
          sx={fieldStyle}
          type="text"
          bgColor="white"
          color="black"
          onChange={(e) => {
            LastName.current = e.target.value;
            if (check_name(e.target.value) == false || e.target.value == "")
              setLname_err(true);
            else setLname_err(false);
          }}
        ></Input>
        {lname_err && (
          <FormHelperText sx={small_err}>invalid name</FormHelperText>
        )}

        <FormLabel color="black" fontSize="1.25rem">
          Email address
        </FormLabel>
        <Input
          id="email"
          sx={fieldStyle}
          type="email"
          bgColor="white"
          color="black"
          onChange={(e) => {
            Email.current = e.target.value;
            if (check_email(e.target.value) == false || e.target.value == "") {
              setEmail_err(true);
            } else {
              setEmail_err(false);
            }
          }}
        ></Input>
        {email_err ? (
          <FormHelperText sx={small_err}>invalid email</FormHelperText>
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
          id="password"
          type="password"
          bgColor="white"
          onChange={(e) => {
            Password.current = e.target.value;
            if (check_password(e.target.value) == false || e.target.value == "")
              setPass_err(true);
            else setPass_err(false);
          }}
          color="black"
          autoComplete="new-password"
        ></Input>
        {password_err && (
          <FormHelperText sx={small_err}>invalid password</FormHelperText>
        )}
        <Button
          sx={LoginButton}
          onClick={() => {
            if (fname_err || lname_err || email_err || password_err) return;
            else {
              setLoading(true);
              createUserWithEmailAndPassword(
                auth,
                Email.current,
                Password.current
              )
                .then((userCredential) => {
                  const userRef = ref(
                    storage,
                    "users/" + userCredential.user.uid + "/PP"
                  );
                  uploadBytes(userRef, image.current).then((snapshot) => {
                    deleteObject(ref(storage, "temp"));
                    getDownloadURL(userRef).then((url) => {
                      updateProfile(auth.currentUser, {
                        displayName: FirstName.current + " " + LastName.current,
                        photoURL: url,
                      });
                    });
                  });

                  setLoading(false);
                  navigate("/congrats", { replace: true });
                })
                .catch((error) => {
                  setDB_err(true);
                  setLoading(false);
                });
            }
          }}
        >
          SignUp
        </Button>
        <p className="tiny">or Login with</p>
        <div className="buttons">
          <Button bgColor="white">
            <img src={Facebook} width="35px" onClick={handleFacebook}></img>
          </Button>
          <Button bgColor="white" onClick={handleGoogle}>
            <img src={google} width="35px"></img>
          </Button>
        </div>
      </FormControl>
    </Box>
  );
};

export default SignUp;

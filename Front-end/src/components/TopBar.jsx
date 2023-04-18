import React from "react";

import notifications from "../assets/notifications.png";
import log from "../assets/logout.png";
import { signOut, getAuth } from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import userI from "../assets/user.png";
import HashLoader from "react-spinners/HashLoader";
const TopBar = () => {
  const [loading, setLoading] = React.useState(false);
  const [pp, setPP] = React.useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const location = useLocation();
  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) != null) {
      setPP(JSON.parse(localStorage.getItem("user")).photoURL);
    }

    localStorage.setItem("user", JSON.stringify(auth.currentUser));
  }, [auth.currentUser]);
  return loading ? (
    <HashLoader
      color={"#36d7b7"}
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  ) : (
    <div className="TopBar">
      <div className="logo-text">PlantSitter</div>
      <div className="side-icons">
        <div
          className="ppContainer"
          onClick={() => {
            if (location.pathname != "/user") {
              navigate("/user", { replace: true });
            }
          }}
        >
          <img src={pp} id="pp" alt=""></img>
        </div>
        <div className="topContainer">
          <img src={notifications} alt=""></img>
        </div>
        <div
          className="topContainer"
          onClick={() => {
            setLoading(true);

            signOut(auth)
              .then(() => {
                setLoading(false);
                navigate("/", { replace: true });
                localStorage.removeItem("user");
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <img alt="" src={log}></img>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

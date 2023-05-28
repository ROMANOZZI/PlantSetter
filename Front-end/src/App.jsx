import reactLogo from "./assets/react.svg";
import React from "react";
import "./App.css";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import { ref as sRef, set, onValue, update } from "firebase/database";
import { startFireBase, app, storage } from "./components/fb-config";
import hotIcon from "./assets/hot.png";
import humIcon from "./assets/humidity.png";
import Stats from "./components/Stats";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SignedSucc from "./components/SignedSucc";
import User from "./components/User";
import Postfeed from "./components/Postfeed";
import LeafDiagnoses from "./components/LeafDiagnoses";
import {
  onAuthStateChanged,
  getAuth,
  signOut,
  updateCurrentUser,
} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

import Dashboard from "./Dashboard";
import { json } from "body-parser";
import { m } from "framer-motion";
import predictNPK from "./components/NPK";

Chart.register(ArcElement, Tooltip, Legend);

function App() {
  startFireBase();
  const auth = getAuth();

  const key = "d89a2d085a9de66a7168db8d4c52c58f";

  const [cards, setCards] = React.useState([
    {
      data: 0,
      unit: "celisius",
      icon: hotIcon,
    },
    {
      data: 0,
      unit: "Percent",
      icon: humIcon,
    },
    {
      data: 0,
      unit: "IDK",
      icon: null,
    },
    {
      data: 0,
      unit: "n",
      icon: null,
    },
    {
      data: 0,
      unit: "p",
      icon: null,
    },
    {
      data: 0,
      unit: "k",
      icon: null,
    },
  ]);

  const [state, setState] = React.useState("");

  const [logged, setLogged] = React.useState(false);
  const [user, setUser] = React.useState({
    id: null,
  });
  const [lat, setLat] = React.useState();
  const [long, setLong] = React.useState();
  const [weather, setWeather] = React.useState();
  let HumidityRef;
  let TempratureRef;
  let moistureRef;
  let stateRef;
  let nRef;
  let pRef;
  let kRef;
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  React.useEffect(() => {
    if (user.id != null) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [1]);
  React.useEffect(() => {
    if (user?.uid) {
      const siteUnitRef = sRef(
        startFireBase(),
        "users/" + user.uid + "/siteUnit"
      );

      let siteUnit;
      onValue(siteUnitRef, (snapshot) => {
        siteUnit = snapshot.val();
      });

      HumidityRef = sRef(
        startFireBase(),
        "site-units/" + siteUnit + "/HUMIDITY"
      );

      TempratureRef = sRef(
        startFireBase(),
        "site-units/" + siteUnit + "/TEMPERATURE"
      );
      moistureRef = sRef(
        startFireBase(),
        "site-units/" + siteUnit + "/moisture"
      );
      nRef = sRef(startFireBase(), "site-units/" + siteUnit + "/N");
      pRef = sRef(startFireBase(), "site-units/" + siteUnit + "/P");
      kRef = sRef(startFireBase(), "site-units/" + siteUnit + "/K");
      stateRef = sRef(startFireBase(), "site-units/" + siteUnit + "/state");
      const latref = sRef(startFireBase(), `users/${user.uid}/longtitude`);
      const longref = sRef(startFireBase(), `users/${user.uid}/latitude`);
      let fetilizer;
      onValue(latref, (snapshot) => {
        setLat(snapshot.val());
      });
      onValue(longref, (snapshot) => {
        setLong(snapshot.val());
      });

      if (lat && long) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeather(data);
          });
      }
      onValue(TempratureRef, (SnapShot) => {
        setCards((prev) =>
          prev.map((x) => {
            if (x.unit == "celisius") return { ...x, data: SnapShot.val() };
            else return x;
          })
        );
      });
      onValue(HumidityRef, (SnapShot) => {
        setCards((prev) =>
          prev.map((x) => {
            if (x.unit == "Percent") return { ...x, data: SnapShot.val() };
            else return x;
          })
        );
      });
      /* This code is listening for changes in the "moisture" value in the Firebase database and updating the
"cards" state with the new value. It is also calling the "predictNPK" function with the new value
and updating the "fertilizer" variable if the predicted values are different from the current
values. Finally, it is logging the new "fertilizer" value to the console. */

      onValue(moistureRef, (SnapShot) => {
        setCards((prev) =>
          prev.map((x) => {
            if (x.unit == "IDK") return { ...x, data: SnapShot.val() };
            else return x;
          })
        );
        //! This is throwing an error
        temp = predictNPK(SnapShot.val());
        for (let i = 0; i < fetilizer.length(); i++) {
          if (fetilizer[i] != temp[i]) {
            fetilizer = temp;

            console.log(fetilizer);
            break;
          }
        }
      });

      onValue(stateRef, (SnapShot) => {
        setState(SnapShot.val());
      });
      onValue(nRef, (SnapShot) => {
        setCards((prev) =>
          prev.map((x) => {
            if (x.unit == "n") return { ...x, data: SnapShot.val() };
            else return x;
          })
        );
      });
      onValue(pRef, (SnapShot) => {
        setCards((prev) =>
          prev.map((x) => {
            if (x.unit == "p") return { ...x, data: SnapShot.val() };
            else return x;
          })
        );
      });
      onValue(kRef, (SnapShot) => {
        setCards((prev) =>
          prev.map((x) => {
            if (x.unit == "k") return { ...x, data: SnapShot.val() };
            else return x;
          })
        );
      });
    }
  }, [startFireBase, user, lat, long]);
  console.log(cards);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login user={user} setUSer={setUser}></Login>}
        ></Route>

        <Route
          path="/SignUp"
          element={<SignUp user={user} setUSer={setUser}></SignUp>}
        ></Route>
        <Route
          path="/Postfeed"
          element={
            <React.Fragment>
              <TopBar></TopBar>
              <SideBar></SideBar>
              <Postfeed weather={weather}></Postfeed>
            </React.Fragment>
          }
        ></Route>
        <Route path="/congrats" element={<SignedSucc></SignedSucc>}></Route>
        <Route
          exact
          path="/Dashboard"
          element={
            <Dashboard
              cards={cards}
              weather={weather}
              state={state}
            ></Dashboard>
          }
        ></Route>
        <Route
          path="/user"
          element={
            <React.Fragment>
              <TopBar></TopBar>
              <User></User>
              <SideBar></SideBar>
            </React.Fragment>
          }
        ></Route>
        <Route
          path="/leaf"
          element={
            <React.Fragment>
              <TopBar></TopBar>
              <LeafDiagnoses user={user}></LeafDiagnoses>
              <SideBar></SideBar>
            </React.Fragment>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

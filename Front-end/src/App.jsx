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

Chart.register(ArcElement, Tooltip, Legend);

function App() {
  startFireBase();
  const auth = getAuth();

  const HumidityRef = sRef(startFireBase(), "/HUMIDITY");
  const TempratureRef = sRef(startFireBase(), "/TEMPERATURE");
  const pumpRef = sRef(startFireBase(), "/state");
  const countRef = sRef(startFireBase(), "/count");
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
  ]);

  const [pump, setPump] = React.useState(false);
  const [count, setCount] = React.useState();
  const [logged, setLogged] = React.useState(false);
  const [user, setUser] = React.useState({
    id: null,
  });
  const [lat, setLat] = React.useState();
  const [long, setLong] = React.useState();
  const [weather, setWeather] = React.useState();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser({ id: user.uid });
      // ...
    } else {
      setUser({ id: null });
    }
  });

  React.useEffect(() => {
    if (user.id != null) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [1]);
  React.useEffect(() => {
    const latref = sRef(startFireBase(), `/${user.id}/lat`);
    const longref = sRef(startFireBase(), `/${user.id}/long`);
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
  }, [lat, long]);

  React.useEffect(() => {
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
    onValue(pumpRef, (SnapShot) => {
      setPump(SnapShot.val());
    });
    onValue(countRef, (SnapShot) => {
      setCount(SnapShot.val());
    });
  }, [startFireBase()]);
  const data = {
    datasets: [
      {
        label: "My First Dataset",
        data: [count, 50 - count],
        backgroundColor: ["#2cb67d", "#f8f8fb"],
        hoverOffset: 2,
        borderWidth: 2,
        borderRadius: 9,
        borderSkipped: false,
      },
      {
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

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
              data={data}
              count={count}
              pump={pump}
              weather={weather}
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

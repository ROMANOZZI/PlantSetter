import React from "react";
import { Box } from "@chakra-ui/react";
import "@chakra-ui/react";

import { useNavigate } from "react-router";
import { ref as sRef, set, onValue, update } from "firebase/database";
import { startFireBase, app, storage } from "./fb-config";
import { json } from "body-parser";
import Recommender from "./KNN";
import axios from "axios";
const Postfeed = ({ uid }) => {
  const key = "d89a2d085a9de66a7168db8d4c52c58f";
  const [posts, setPosts] = React.useState([]);
  const [select, setSelect] = React.useState(-1);
  const [lat, setLat] = React.useState();
  const [long, setLong] = React.useState();
  const [weather, setWeather] = React.useState();
  React.useEffect(() => {
    const latref = sRef(startFireBase(), `/${uid}/lat`);
    const longref = sRef(startFireBase(), `/${uid}/long`);
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
    if (weather) {
      const currentMonth = new Date().getMonth() + 1;

      // Define the seasons and their corresponding months
      const seasons = {
        Winter: [12, 1, 2],
        spring: [3, 4, 5],
        Summer: [6, 7, 8],
        Autumn: [9, 10, 11],
      };

      // Determine the season based on the current month
      let season = "";
      for (let x in seasons) {
        if (seasons[x].includes(currentMonth)) {
          season = x;
          break;
        }
      }

      if (posts.length === 0) {
        axios
          .get("/api/getPosts", {
            params: {
              main_planting_season: season,
            },
          })
          .then((res) => {
            const final = Recommender(res.data, weather);
            console.log(final);

            setPosts(final);
          });
      }
    }
  }, [weather]);
  const fieldStyle = {
    width: "100%",
    mt: "6em",
    ml: [0, 20, 10],
    bgColor: "#f8f8fb",
    position: "absolute",
    top: 0,
  };

  return (
    <React.Fragment>
      <div className="App">
        <div className="title-container">
          <h1 className="title"> Post feed</h1>
          <p className="small">
            {" "}
            your custom posts according to your enviromental conditions
          </p>
        </div>

        {posts.map((post, id) => {
          return (
            <div
              className={`post-container ${select == id ? "selectedPost" : ""}`}
              key={id}
            >
              <div>
                <div className="post-img-container">
                  <img src={post.Image} alt="plant" />
                </div>
              </div>
              <Box w="60%" ml={"1.5em"}>
                <h3 className="postNAme">{post.name}</h3>

                <Box
                  maxHeight={select == id ? "fit-content" : "8rem"}
                  overflow="hidden"
                >
                  {post.info}
                </Box>
                {select != id ? (
                  <p
                    className=" small indi "
                    onClick={() => {
                      setSelect(id);
                    }}
                  >
                    Read more ↓
                  </p>
                ) : (
                  <React.Fragment>
                    <p>{"how to plant : " + post.How_to_plant}</p>
                    <p>{"water needs : " + post.water_needs}</p>
                    <p>{"sunlight needs : " + post.sun_needs}</p>
                    <p>
                      {"optimal Temprature : between " +
                        post.optimal_temperature.min +
                        "  and  " +
                        post.optimal_temperature.max +
                        " degree celcius"}
                    </p>
                    <p>{"water needs: " + post.water_needs}</p>
                    <p
                      className=" small indi "
                      onClick={() => {
                        setSelect(-1);
                      }}
                    >
                      Read less ↑
                    </p>
                  </React.Fragment>
                )}
              </Box>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Postfeed;

import React from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Stats from "./components/Stats";

const Dashboard = ({ cards, data, count, pump, uid }) => {
  const [current, setCurrent] = React.useState("stats");

  const [posts, setPosts] = React.useState([]);

  return (
    <React.Fragment>
      <TopBar></TopBar>
      <SideBar current={current} setCurrent={setCurrent}></SideBar>
      <Stats cards={cards} data={data} count={count} pump={pump}></Stats>
    </React.Fragment>
  );
};

export default Dashboard;

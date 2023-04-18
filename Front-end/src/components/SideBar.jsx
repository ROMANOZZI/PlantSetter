import React from "react";
import Logo from "../assets/corps.png";
import stats from "../assets/stats.png";
import feed from "../assets/post.png";
import leaf from "../assets/leaves.png";
import Roles from "../assets/roles-2.png";
import NavIcon from "./NavIcon";
import corps from "../assets/chip--2.png";
import settings from "../assets/settings.png";
const SideBar = ({ current, setCurrent }) => {
  const [pages, setPages] = React.useState([
    { name: "Dashboard", icon: stats },
    { name: "Postfeed", icon: feed },
    { name: "leaf", icon: leaf },
    { name: "corps", icon: corps },
  ]);

  return (
    <div className="sideBar">
      <div className="LogoContainer">
        <img className="Logo" src={Logo}></img>
      </div>
      <div className="pagesContainer">
        {pages.map((x) => (
          <NavIcon
            current={current}
            setCurrent={setCurrent}
            key={pages.indexOf(x)}
            picture={x.icon}
            link={"/" + x.name}
            name={x.name}
            id={pages.indexOf(x)}
          ></NavIcon>
        ))}
      </div>
      <div className="pageContainer settings">
        <img src={settings} className={`icon`}></img>
      </div>
    </div>
  );
};

export default SideBar;

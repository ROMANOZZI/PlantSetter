import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
const NavIcon = ({ picture, id, link, name, setCurrent, current }) => {
  const [chosen, setChosen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  /*
   { name: "stats", icon: stats },
    { name: "email", icon: email },
    { name: "roles", icon: Roles },
    { name: "corps", icon: corps }, */
  React.useEffect(() => {
    if (location.pathname == link) {
    }
  }, [location.pathname]);

  return (
    <div
      className={`pageContainer ${
        location.pathname == link && "chosenContainer"
      }`}
      onClick={(e) => {
        if (location.pathname != link) {
          navigate(link, { replace: true });
        }
      }}
      id={id}
    >
      <img
        src={picture}
        alt={""}
        className={`icon ${location.pathname == link && "chosen"}`}
      ></img>
    </div>
  );
};

export default NavIcon;

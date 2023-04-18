import React from "react";

const Card = ({ icon, data, unit }) => {
  return (
    <div className="card">
      <div className="stat-i-container">
        <img src={icon} alt="" width="70px"></img>
      </div>
      <div className="statsContainer">
        <p className="data">{data}</p>
        <p className="small">{unit}</p>
      </div>
    </div>
  );
};

export default Card;

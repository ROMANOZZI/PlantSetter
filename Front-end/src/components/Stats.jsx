import React from "react";
import Card from "./Card";
import { Doughnut } from "react-chartjs-2";
const Stats = ({ cards, data, pump, count }) => {
  return (
    <div className="App">
      <div className="title-container">
        <h1 className="title"> Dashboard Room</h1>
        <p className="small"> your plant statistics</p>
      </div>
      <div className="stat-cards">
        {cards.map((card) => (
          <Card
            key={cards.indexOf(card)}
            icon={card.icon}
            data={card.data}
            unit={card.unit}
          ></Card>
        ))}
        <div className="card">
          <div className="stat-i-container chart-container">
            <p className="secs">{parseInt(50 - count)} secs</p>
            <Doughnut data={data}> </Doughnut>
          </div>
          <div>
            <div className="text-data">
              water pump is currently
              <p className="strong"> {pump ? "On" : "OFF"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
/**
 */

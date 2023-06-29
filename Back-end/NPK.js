const fetch = require("node-fetch");

const Encoder = (data) => {
  let res = [];

  if (
    data.weather == "clear sky" ||
    data.weather == "few clouds" ||
    data.weather == "broken clouds"
  ) {
    res = [1.0, 0.0, 0.0];
  } else if (data.weather == "scattered clouds" || data.weather == "mist") {
    res = [0.0, 0.0, 1.0];
  } else {
    res = [0.0, 1.0, 0.0];
  }
  res.push(data.temp);
  res.push(data.humidity);
  data.corp == "Potato" ? res.push(0) : res.push(1);

  return res;
};
const decoder = (prediction) => {
  const classes = [
    [6, 8, 12],
    [12, 12, 18],
    [18, 16, 24],
    [24, 20, 30],
    [30, 24, 36],
  ];
  return classes[prediction];
};
const predictnpk = async (data) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:9000/predictNPK?matrix=${JSON.stringify(Encoder(data))}`
    );

    if (!response.ok) {
      throw new Error("Prediction request failed");
    }

    const res = await response.json();

    const decodedResponse = decoder(res["prediction"]);

    return decodedResponse;
  } catch (error) {
    console.error(error);
    // Handle the error here or propagate it further
  }
};

module.exports = { predictnpk };

import fetch from "node-fetch";

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
const predictNPK = (data) => {
  return fetch("http://localhost:9000/predictNPK", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Array.from(Encoder(data))),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      const decodedResponse = decoder(responseData);
      return decodedResponse;
    });
};

console.log(
  await predictNPK({
    weather: "few clouds",
    temp: 50,
    humidity: 20,
    corp: "Tomato",
  })
);
export default predictNPK;

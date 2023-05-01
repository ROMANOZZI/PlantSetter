import { predictNPK } from "./NPK.js";

predictNPK({
  weather: "few clouds",
  temp: 50,
  humidity: 20,
  corp: "Tomato",
}).then((res) => console.log(res));

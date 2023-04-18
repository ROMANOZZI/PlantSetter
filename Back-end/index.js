const mongoose = require("mongoose");
const express = require("express");

const tf = require("@tensorflow/tfjs-node");
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
global.fetch = require("node-fetch");
const axios = require("axios");

const app = express();
const path = require("path");
const fs = require("fs");

const { url } = require("inspector");
const { table } = require("console");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.urlencoded());
app.use(express.json());
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
mongoose
  .connect(
    "mongodb+srv://Salah216:011145146Mo@cluster0.gmu3le7.mongodb.net/Plants?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("ERROR:", err.message);
  });
const plantSchema = new mongoose.Schema({
  name: String,
  planting_season: [String],
  OptimalTemperature: {
    min: Number,
    max: Number,
  },
  water_needs: String,
  sun_needs: String,
  info: String,
  "How To Plant": [String],
});
const Plant = mongoose.model("v2", plantSchema);
app.get("/api/getPosts", (req, res) => {
  Plant.find({ ...req.query })
    .then((plants) => {
      res.send(plants);
      console.log(req.query);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.get("/api/diagnose", (req, res) => {
  async function loadImageFromUrl(url) {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");
    const image = tf.node.decodeImage(buffer);
    return image;
  }
  async function loadModel() {
    // Load the model.
    let model = await tf.loadLayersModel("file://./models/leafdiagnosis.json");

    const input = await loadImageFromUrl(req.query.url);
    const resized = tf.image
      .resizeBilinear(input, [224, 224])
      .div(255)
      .expandDims();
    const label = ["early-blight", "healthy", "late-blight"];
    arr = model.predict(resized).arraySync()[0];
    let table = {};
    for (let i = 0; i < 3; i++) {
      table[label[i]] = arr[i] * 100;
    }
    res.send(table);
  }
  loadModel();
});
app.get("/api/load-model", (req, res) => {
  async function loadModel() {
    // Load the model.
    let model = fs.readFileSync("model/model.json");
    res.send(model);
  }
  loadModel();
});

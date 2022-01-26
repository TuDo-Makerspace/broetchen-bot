var express = require("express");
var app = express();
const { insertTime, calcMedian } = require("./db.js");
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/warda", (req, res) => {
  const currentTime = new Date();

  try {
    insertTime(currentTime);
    return res.status(201).send("Der Brötchenmann war da!");
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Ein Fehler ist aufgetreten...");
  }
});

app.get("/hunger", (req, res) => {
  calcMedian((err, response) => {
    if (err) {
      return res
        .status(500)
        .send("Es ist ein Fehler aufgetreten: " + err.message);
    }
    res
      .status(200)
      .send(`Der Brötchenmann kommt durchschnittlich um ${response} Uhr.`);
  });
});

app.listen(process.env.PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log(`Example app listening on Port ${process.env.PORT}`);
});

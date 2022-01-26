var express = require("express");
var app = express();
const { insertTime } = require("./db.js");
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

app.listen(process.env.PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log(`Example app listening on Port ${process.env.PORT}`);
});

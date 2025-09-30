const { MongoClient } = require("mongodb");
const express = require("express");

const { port, mongoConnectionStr } = require("./Data/constants");

const app = express();
const client = new MongoClient(mongoConnectionStr);

app.use(express.json());
app.use(express.text());

app.get("/ping", (request, response) => {
  response.status(200).send("Server is up!");
});

app.post("/CreateUser", (request, response) => {
  response.send(request.body);
});

app.use("/", (request, response) => {
  response.status(400).send();
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error while starting server!");
  } else {
    console.log("Server is listening on " + port);
  }
});

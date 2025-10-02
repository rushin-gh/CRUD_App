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
  try {
    AddUser(request.body);
    response.status(201).send("User created");
  } catch (ex) {
    response.status(500).send("Internal server error");
  }
});

app.use("/", (request, response) => {
  console.log("All good -> " + request.originalUrl);
  response.status(200).send();
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error while starting server!");
  } else {
    console.log("Server is listening on " + port);
  }
});

async function AddUser(user) {
  try {
    client.connect();
    const db = client.db("nodecrud");
    const users = db.collection("users");
    await users.insertOne(user);
    console.log("User inserted!");
  } catch (ex) {
    console.log(ex);
    throw ex;
  } finally {
    await client.close();
  }
}

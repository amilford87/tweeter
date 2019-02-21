"use strict";

// Basic express setup:
//Requiring MongoDB to connect and store the tweets
const express       = require("express");
const bodyParser    = require("body-parser");
const MongoClient   = require("mongodb").MongoClient;

const MONGODB_URI   = "mongodb://localhost:27017/tweeter";
const app           = express();
const PORT          = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


//Connecting to MongoDB
MongoClient.connect(MONGODB_URI, (err, mongoInstance) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  let db = mongoInstance;
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);
});
  
  
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

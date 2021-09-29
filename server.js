//This is the main file, this is where we create the server and tell it how to handle requests
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()
require('dotenv').config();

//importing all of the controllers
const cardRoutes = require("./controllers/cardController");

//error with database connection
mongoose.connection.on("error", err =>
  console.log(err.message + " is Mongod not running?")
);

//disconnected from database
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));
mongoose.set("useFindAndModify", false);

// Fix depreciation warnings
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);

var PORT = process.env.PORT || 3000;
const mongodbURI = process.env.mongodbURI;

// Database connection
mongoose.connect(mongodbURI, { useNewUrlParser: true }).then(() => {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true}));
  
  //tell the app to use all of the routes and specify the paths
  app.use("/api/card", cardRoutes)
  
  mongoose.connection.once("open", () => {
    console.log("connected to mongoose...");
  });
  
  // listening to port
  app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
  });
}).catch((error) => console.log(error.message));
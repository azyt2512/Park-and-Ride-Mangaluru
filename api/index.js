const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const parkRoute = require("./routes/parkinglot");


let MONGO_URL="mongodb://localhost:27017/PNR"
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/parkinglot", parkRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

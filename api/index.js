const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const parkRoute = require("./routes/parkinglot");
const ticketRoute = require("./routes/tickets");


let MONGO_URL="mongodb+srv://Jyoti:jyoti123@cluster0.ixkz6hg.mongodb.net/Park-and-Ride-Mangaluru?retryWrites=true&w=majority"
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/parkinglot", parkRoute);
app.use("/api/ticket", ticketRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

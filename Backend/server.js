//entry file
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express(); //instance create

const PORT = process.env.PORT;

//creating middleware
app.use((req, res, next) => {
  console.log("Police alert");
  next();
  // res.status(400).send("Smuggler!!")
});
//for logging information
app.use(morgan("dev"));

//create route
app.get("/dharan", (req, res) => {
  res.status(200).json({ message: "Welcome to Dharan" });
}); //takes request and parameter as arguments
//database connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log("server is running at port:", PORT);
    }); //takes port and function as argument
  })
  .catch((err) => {
    console.log("❌ Database connection failed", err);
  });

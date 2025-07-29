//entry file
import express from "express";//framework for node
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors"; //to allow cross-origin requests
import { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } from "./controller/employee.controller.js"; //importing controller
import { loginEmployee } from "./controller/auth,controller.js";

dotenv.config();

const app = express(); //instance create

const PORT = process.env.PORT;

//creating middleware
app.use((req, res, next) => {
  console.log("Police alert");
  next();
  // res.status(400).send("Smuggler!!")
});
app.use(cors()); //to allow cross-origin requests
//for logging information
app.use(morgan("dev"));
app.use(express.json()); //to parse json data from frontend

//create route
app.get("/dharan", (req, res) => {
  res.status(200).json({ message: "Welcome to Dharan" });
}); //takes request and parameter as arguments
 
app.post("/employee", createEmployee); //create employee route
app.get("/employee", getEmployees); //get all employees route
app.get("/employee/:id", getEmployeeById); //get employee by id route here id is the parameter
app.put("/employee/:id", updateEmployee); //update employee route
app.delete("/employee/:id", deleteEmployee); //delete employee routes
app.post("/login", loginEmployee); //login employee route


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

//require mongoose to make models

import mongoose, { model, Schema } from "mongoose";

const employeeSchema = new Schema ({
    name: String,
    email: 
    { type: String,
      unique: true,
     }, //to make email unique
    //json=java script object notation
    designation: String,
    department: String,
    userType: String,
    salary: String,
    password: String,
},
{timestamps:true}
);
//creating model
const employeeModel = model("Employee",employeeSchema)//employeeschema lae database ma table banaera rakxa ra table ko name teii employee as a model
export default employeeModel;
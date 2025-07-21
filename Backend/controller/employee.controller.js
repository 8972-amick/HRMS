import employeeModel from "../models/employee.model.js";

export async function createEmployee (req, res) {
    try {
        //1. extract the data from frontend 
        const {name,email,designation,department,userType,salary,password} = req.body; // post bata data send huda req ma aauxa
        //2.validate the data either it is correct or not such as email,password name an so on
        if (!name ||
             !email ||
             !designation ||
             !department ||
             !userType ||
             !salary ||
             !password) {
            res.status(400).json({ message: "All fields are required" });// obect in curly braces as message
            return;
        }
        //3.check if email already exists in database
        const isEmailExists = await employeeModel.findOne(email);
        if(isEmailExists){
           res.status(400).json({ message: "Email already exists" }); //if email exists then return error message
              return;
        }
        //4.if not exists then create a new employee
        const employeeData = await employeeModel.create ({
            name,
            email,
            designation,
            department,
            userType,
            salary,
            password
        })
        //5.send successful message 
        res.status(201).json({ message: "Employee created successfully", employeeData });
        //201 is for created successfully


    } catch (error) {
        // if any error occurs ,send response of error
        console.error("Error:", error);
        res.status(500).json({message:"Internal server error"}); //500 is for internal server error
    }

}
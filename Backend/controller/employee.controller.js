import employeeModel from "../models/employee.model.js";

export async function createEmployee(req, res) {
  try {
    //1. extract the data from frontend
    const { name, email, designation, department, userType, salary, password } =
      req.body; // post bata data send huda req ma aauxa
    //2.validate the data either it is correct or not such as email,password name an so on
    if (
      !name ||
      !email ||
      !designation ||
      !department ||
      !userType ||
      !salary ||
      !password
    ) {
      res.status(400).json({ message: "All fields are required" }); // obect in curly braces as message
      return;
    }
    //3.check if email already exists in database
    const isEmailExists = await employeeModel.findOne({ email }); //findOne is used to find a single document in the database
    if (isEmailExists) {
      res.status(400).json({ message: "Email already exists" }); //if email exists then return error message
      return;
    }
    //4.if not exists then create a new employee
    const employeeData = await employeeModel.create({
      name,
      email,
      designation,
      department,
      userType,
      salary,
      password,
    });
    //5.send successful message
    res
      .status(201)
      .json({ message: "Employee created successfully", employeeData });
    //201 is for created successfully
  } catch (error) {
    // if any error occurs ,send response of error
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" }); //500 is for internal server error
  }
}

// This function can be used to get all employees
export async function getEmployees(req, res) {
  try {
    const allEmployees = await employeeModel.find(); //find all employees

    if (allEmployees.length === 0) {
      res.status(404).json({ message: "No employees records  found" });
      return;
    }
    res.status(200).json({ message: " ✅ EMployee Data found", allEmployees });
  } catch (error) {
    console.error(
      " ❌ Error while getting the data of respective employee:",
      error
    );
    res.status(500).json({ message: "Internal server error" });
  }
}
//function to get employee by id
export async function getEmployeeById(req, res) {
  try {
    const id = req.params.id; // assuming the ID is passed as a URL parameter
    const employee = await employeeModel.findById(id); //use employeeModel.findbyID to find employee by ID
    if (!employee) {
      //if employee not found send 404 status code with message

      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee found", data: employee }); //if employee found, send 200 status code with employee data
  } catch (error) {
    console.log("Error while fetching employee by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//function to update employee data
export async function updateEmployee(req, res) {
  try {
    //1.kun data update garna parcha?
    const id = req.params.id;

    //2.kun kun data update garne
    const { name, email, designation, department, userType, salary, password } =
      req.body;

    //3. aba update garne
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      { name, email, designation, department, userType, salary, password },
      { new: true }
    ); //new:true to return the updated document
    //4.response send garne
    res
      .status(200)
      .json({
        message: " ✅ Employee updated successfully",
        data: updatedEmployee,
      });
  } catch (error) {
    console.error(" ❌ Error while updating employee:", error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern?.email) {
      // Duplicate key error
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteEmployee(req, res){
  try {
    //1.kun id ko employee delete garne
    const id = req.params.id;

    //2. employee delete garne
    const deletedEmployee = await employeeModel.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404)
      .json({ message: "❌ Respected Employee not found" });
    }
    res.status(200)
    .json({message: " ✅ Employee deleted successfully", data: deletedEmployee});
    
  } catch (error) {
    console.error(" ❌ Error while deleting employee:", error);
    res.status(500).json({ message: "Internal server error" });
    
  }

} 

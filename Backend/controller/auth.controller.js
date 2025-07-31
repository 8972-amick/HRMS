import bcrypt from 'bcrypt';
import employeeModel from '../models/employee.model.js';
import jwt from 'jsonwebtoken';

export async function loginEmployee(req,res){
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }

        const employee = await employeeModel.findOne({ email });
        if (!employee) { 
            return res.status(404).json({ message: "Employee not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {  
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: employee._id, email: employee.email }, process.env.JWT_SECRET,
            { expiresIn: '1d' });

        res.status(200).json({
            message: "Login successful",token: token, user:{
                id: employee._id,
                name: employee.name,
                email: employee.email,
            }});

    } catch (error) {
        console.log("Error while logging in employee:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }


}
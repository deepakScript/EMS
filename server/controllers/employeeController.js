import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add Employee controller
const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeID,
            dob,
            profileImage,
            gender,
            maritalstatus,
            designation,
            department,
            salary,
            password,
            role
        } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save User
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: req.file ? req.file.filename : "", // ✅ Fix: req.file.filename not req.filename
        });

        const savedUser = await newUser.save();

        // Save Employee
        const newEmployee = new Employee({
            userID: savedUser._id,
            employeeID,
            dob,
            gender,
            maritalstatus,
            designation,
            department,
            salary,
        });

        await newEmployee.save();

        return res.status(201).json({ success: true, message: "Employee added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server error in adding employee" });
    }
};

const getEmployee = async (req, res) => {
    try {
        const employees = await Employee.find().populate("userID", {password: 0}).populate("department");
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server error in fetching employees" });
    }
};

export { addEmployee, upload, getEmployee };

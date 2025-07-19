import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
        return res.status(404).json({
            success: false,
            error: "User not found",
        });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            error: "Password is incorrect",
        });
    }
    
    // Generate token
    const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
    );
    
    console.log("success");
    // Respond with token and user info
    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

const verify = async (req, res) => {
  return res.status(200).json({
    success: true,
    // message: "User verified",
    user: req.user
  });
}

export { login, verify };

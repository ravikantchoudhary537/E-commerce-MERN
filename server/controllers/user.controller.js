const User = require("../models/User.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password) {
      return res.status(409).json({
        success: false,
        message: "All fields require",
      });
    }

    const user = await User.findOne({ email, userName });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exist",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashpassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName,
      email,
      password: hashpassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating user",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(409).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User doesn't exists ! Please register first",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(409).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: user.email,
        role: user.role,
        id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("token").json({
      success: true,
      message: "logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Something went wrong"
  })
  }
};
module.exports = { registerUser, loginUser,logoutUser };

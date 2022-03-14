const asyncHandler = require("express-async-handler")
const bcyrpt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please include all fields")
  }
  // Find if user already exists
  const userExists = await User.findOne({ email })
  // Check to see if user is in the database
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }
  // Hash password
  const salt = await bcyrpt.genSalt(10)
  const hashedPassword = await bcyrpt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // Searched database for user
  const user = await User.findOne({ email })
  // Check to see if user was found and passwords match
  if (user && (await bcyrpt.compare(password, user.password))) {
    res.status(200)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid credentials")
  }
})

// @desc    Get current user details
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }
  res.status(200).json({ user })
})

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}

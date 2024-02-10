const users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_PASSWORD = process.env.JWT_PASSWORD;

// register new user POST.
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Inside register Router");

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res
        .status(406)
        .json("User is Already Exist. Please Login or  Try another Email.");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        profile: "",
        github: "",
        linkedin: "",
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// login user POST
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      const token = jwt.sign({ userId: existingUser._id }, JWT_PASSWORD);
      res.status(200).json({ existingUser, token });
    } else {
      res.status(406).json("Invalid email or password");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// update profile.
exports.editUser = async (req, res) => {
  const userId = req.payload;
  const { username, password, email, github, linkedin, profileImage } =
    req.body;
  const profile = req.file ? req.file.filename : profileImage;

  try {
    const updateUser = await users.findByIdAndUpdate(
      { _id: userId },
      {
        username,
        email,
        password,
        profile,
        github,
        linkedin,
      },
      { new: true },
    );
    await updateUser.save();
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(401).json(error);
  }
};

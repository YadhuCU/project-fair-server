const projects = require("../models/projectModel");

exports.addProject = (req, res) => {
  console.log("Inside add project.");
  res.status(200).json("add project request received.");
};

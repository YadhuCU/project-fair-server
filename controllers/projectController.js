const projects = require("../models/projectModel");

exports.addProject = async (req, res) => {
  console.log("Inside add project.");
  const { title, github, website, languages, overview } = req.body;
  const userId = req.payload;
  const projectImage = req.file.filename;
  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(406).json("Project already exist");
    } else {
      const newProject = new projects({
        title: title,
        languages: languages,
        overview: overview,
        github: github,
        website: website,
        projectImage: projectImage,
        userId: userId,
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// get home project
exports.getHomeProjects = async (req, res) => {
  try {
    const allProjects = await projects.find().limit(3);
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(404).json(err);
  }
};

// get all project
exports.getAllProjects = async (req, res) => {
  try {
    const allProjects = await projects.find();
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(404).json(err);
  }
};

// get user project
exports.getUserProjects = async (req, res) => {
  const userId = req.payload;

  try {
    const userProjects = await projects.find({ userId });
    res.status(200).json(userProjects);
  } catch (err) {
    res.status(404).json(err);
  }
};

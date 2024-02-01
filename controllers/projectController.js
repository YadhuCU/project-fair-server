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

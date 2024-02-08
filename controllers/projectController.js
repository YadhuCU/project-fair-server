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

// edit project.
exports.editProject = async (req, res) => {
  const { title, github, website, languages, overview, projectImage } =
    req.body;
  const uploadImage = req.file ? req.file.filename : projectImage;
  const userId = req.payload;
  const { pid } = req.params;

  try {
    const updateProject = await projects.findByIdAndUpdate(
      { _id: pid },
      {
        title,
        languages,
        overview,
        github,
        website,
        projectImage: uploadImage,
        userId,
      },
      { new: true },
    );

    await updateProject.save();

    res.status(200).json(updateProject);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

exports.deleteProject = async (req, res) => {
  const { pid } = req.params;
  console.log("pid", pid);

  try {
    const deleteData = await projects.findByIdAndDelete({ _id: pid });

    console.log("deleteData", deleteData);

    res.status(200).json(deleteData);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

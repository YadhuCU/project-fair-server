const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const projectController = require("../controllers/projectController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const multerMiddleware = require("../middlewares/multerMiddleware");

// register new user
router.post("/register", userController.register);
// login user
router.post("/login", userController.login);
// adding project
router.post(
  "/add-project",
  jwtMiddleware,
  multerMiddleware.single("projectImage"),
  projectController.addProject,
);
// get home projects
router.get("/home-projects", projectController.getHomeProjects);
// get all projects
router.get("/all-projects", jwtMiddleware, projectController.getAllProjects);
// get user projects
router.get("/user-projects", jwtMiddleware, projectController.getUserProjects);
// edit project.
router.put(
  "/project/edit/:pid",
  jwtMiddleware,
  multerMiddleware.single("projectImage"),
  projectController.editProject,
);
// delete project
router.delete(
  "/project/delete/:pid",
  jwtMiddleware,
  projectController.deleteProject,
);
module.exports = router;

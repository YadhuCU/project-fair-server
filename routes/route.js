const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const projectController = require("../controllers/projectController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/add-project", jwtMiddleware, projectController.addProject);

module.exports = router;

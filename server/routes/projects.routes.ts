import express from "express";
import * as projectController from "../controllers/projects.controller.js";
import { authenticateJWT } from "../middleware/auth.js";
import multerMiddleware from "../middleware/upload.js";
// import { upload } from "../middleware/upload.js";
const upload = multerMiddleware()
const projectRoutes = express.Router();

projectRoutes
  .get("/", projectController.getAllProjects)
  .get("/:id", projectController.getProjectById)
  .post("/", authenticateJWT, upload.single("image"), projectController.createProject)
  .put("/:id", authenticateJWT, upload.single("image"), projectController.updateProject)
  .delete("/:id", authenticateJWT, projectController.deleteProject);

export default projectRoutes;
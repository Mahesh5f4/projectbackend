// src/routes/savedProject.route.ts
import { Router } from "express";
import {
  saveProject,
  getSavedProjects,
  deleteSavedProject,
} from "../controller/savedProject.controller";

const router = Router();

router.post("/", saveProject);
router.get("/", getSavedProjects);
router.delete("/:id", deleteSavedProject); // ✅ DELETE endpoint

export { router as savedRoutes };

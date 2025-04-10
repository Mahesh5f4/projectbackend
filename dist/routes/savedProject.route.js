"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savedRoutes = void 0;
// src/routes/savedProject.route.ts
const express_1 = require("express");
const savedProject_controller_1 = require("../controller/savedProject.controller");
const router = (0, express_1.Router)();
exports.savedRoutes = router;
router.post("/", savedProject_controller_1.saveProject);
router.get("/", savedProject_controller_1.getSavedProjects);
router.delete("/:id", savedProject_controller_1.deleteSavedProject); // ✅ DELETE endpoint

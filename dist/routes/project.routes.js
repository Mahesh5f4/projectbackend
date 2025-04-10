"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("../controller/project.controller");
const router = (0, express_1.Router)();
router.post('/', project_controller_1.createProject);
router.get('/', project_controller_1.getAllProjects);
router.get('/:id', project_controller_1.getProjectById);
router.put('/:id', project_controller_1.updateProject);
router.delete('/:id', project_controller_1.deleteProject);
exports.default = router;

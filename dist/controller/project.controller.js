"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const data_source_1 = require("../config/data-source");
const Project_1 = require("../entity/Project");
const projectRepo = data_source_1.AppDataSource.getRepository(Project_1.Project);
const createProject = async (req, res) => {
    try {
        const project = await projectRepo.save(req.body);
        res.status(201).json(project);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'Unknown server error' });
        }
    }
};
exports.createProject = createProject;
const getAllProjects = async (_req, res) => {
    const projects = await projectRepo.find();
    res.json(projects);
};
exports.getAllProjects = getAllProjects;
const getProjectById = async (req, res) => {
    const project = await projectRepo.findOneBy({ id: Number(req.params.id) });
    if (project)
        res.json(project);
    else
        res.status(404).json({ message: 'Project not found' });
};
exports.getProjectById = getProjectById;
const updateProject = async (req, res) => {
    const id = Number(req.params.id);
    const result = await projectRepo.update({ id }, req.body);
    res.json(result);
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    const id = Number(req.params.id);
    const result = await projectRepo.delete({ id });
    res.json(result);
};
exports.deleteProject = deleteProject;
// Save project

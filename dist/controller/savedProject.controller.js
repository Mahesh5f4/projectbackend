"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSavedProject = exports.getSavedProjects = exports.saveProject = void 0;
const data_source_1 = require("../config/data-source");
const SavedProject_1 = require("../entity/SavedProject");
// Save a new project
const saveProject = async (req, res) => {
    try {
        const { title, description, category, author, image_url } = req.body;
        const savedProjectRepo = data_source_1.AppDataSource.getRepository(SavedProject_1.SavedProject);
        const newProject = savedProjectRepo.create({
            title,
            description,
            category,
            author,
            image_url,
        });
        await savedProjectRepo.save(newProject);
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(500).json({ message: "Error saving project", error });
    }
};
exports.saveProject = saveProject;
// Get all saved projects
const getSavedProjects = async (_req, res) => {
    try {
        const savedProjectRepo = data_source_1.AppDataSource.getRepository(SavedProject_1.SavedProject);
        const projects = await savedProjectRepo.find();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching saved projects", error });
    }
};
exports.getSavedProjects = getSavedProjects;
const deleteSavedProject = async (req, res) => {
    const { id } = req.params;
    try {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            return res.status(400).json({ message: "Invalid project ID" });
        }
        const savedProjectRepo = data_source_1.AppDataSource.getRepository(SavedProject_1.SavedProject);
        const project = await savedProjectRepo.findOneBy({ id: parsedId });
        if (!project) {
            return res.status(404).json({ message: "Saved project not found" });
        }
        await savedProjectRepo.remove(project);
        res.status(200).json({ message: "Project deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting project", error });
    }
};
exports.deleteSavedProject = deleteSavedProject;

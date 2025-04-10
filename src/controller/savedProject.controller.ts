import { Request, Response } from "express";
import { AppDataSource } from '../config/data-source';
import { SavedProject } from "../entity/SavedProject";

// Save a new project
export const saveProject = async (req: Request, res: Response) => {
  try {
    const { title, description, category, author, image_url } = req.body;

    const savedProjectRepo = AppDataSource.getRepository(SavedProject);
    const newProject = savedProjectRepo.create({
      title,
      description,
      category,
      author,
      image_url,
    });

    await savedProjectRepo.save(newProject);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Error saving project", error });
  }
};

// Get all saved projects
export const getSavedProjects = async (_req: Request, res: Response) => {
  try {
    const savedProjectRepo = AppDataSource.getRepository(SavedProject);
    const projects = await savedProjectRepo.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved projects", error });
  }
};

export const deleteSavedProject = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const parsedId = parseInt(id, 10);
      if (isNaN(parsedId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
  
      const savedProjectRepo = AppDataSource.getRepository(SavedProject);
      const project = await savedProjectRepo.findOneBy({ id: parsedId });
  
      if (!project) {
        return res.status(404).json({ message: "Saved project not found" });
      }
  
      await savedProjectRepo.remove(project);
      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting project", error });
    }
  };
  
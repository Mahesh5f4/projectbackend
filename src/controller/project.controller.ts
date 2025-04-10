import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Project } from '../entity/Project';



const projectRepo = AppDataSource.getRepository(Project);


export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await projectRepo.save(req.body);
    res.status(201).json(project);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown server error' });
    }
  }
};


export const getAllProjects = async (_req: Request, res: Response) => {
  const projects = await projectRepo.find();
  res.json(projects);
};

export const getProjectById = async (req: Request, res: Response) => {
  const project = await projectRepo.findOneBy({ id: Number(req.params.id) });
  if (project) res.json(project);
  else res.status(404).json({ message: 'Project not found' });
};

export const updateProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await projectRepo.update({ id }, req.body);
  res.json(result);
};

export const deleteProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await projectRepo.delete({ id });
  res.json(result);
};

// Save project

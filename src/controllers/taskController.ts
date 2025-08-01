import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

export async function createTaskHandler(req: Request, res: Response) {
  const task = await taskService.createTask(req.body);
  res.status(201).json(task);
}

export async function getTasksHandler(_req: Request, res: Response) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}
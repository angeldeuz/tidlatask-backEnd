import { Task } from '../models/Task';

export async function createTask(data: { title: string, description?: string, tags?: string[] }) {
  const task = new Task(data);
  return task.save();
}

export async function getAllTasks() {
  return Task.find().sort('-createdAt');
}
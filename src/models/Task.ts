import { Schema, model, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description?: string;
  completed: boolean;
  tags: string[];
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  tags: { type: [String], default: [] },
}, { timestamps: true });

export const Task = model<ITask>('Task', taskSchema);

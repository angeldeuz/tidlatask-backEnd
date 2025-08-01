import { Router } from 'express';
import { createTaskHandler, getTasksHandler } from '../controllers/taskController';

const router = Router();

router.post('/', createTaskHandler);
router.get('/', getTasksHandler);

export default router;
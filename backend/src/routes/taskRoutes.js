import express from 'express';
import { createTask, getUserTasks, getTaskByID, deleteTask, completeTask,  getTodaysTasks , getTasksByDate} from '../controllers/TaskController/taskController.js';
import  protectRoute  from '../middlewares/protectRoute.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protectRoute);


router.post('/', createTask);
router.get('/get-tasks', getUserTasks);
router.get('/:taskId', getTaskByID);
router.delete('/delete-task/:taskId', deleteTask);
router.patch('/complete-task/:taskId', completeTask);
router.post('/today', getTodaysTasks);
router.post('/by-date', getTasksByDate);


export default router;
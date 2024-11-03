import { Task } from '../../models/task.model.js';
import { Student } from "../../models/student.model.js";


  // Create new task
export const createTask = async (req, res) => {
    try {
        //console.log('Request Headers:', req.headers);
        //console.log('Request Body:', req.body);

        const {
            type,
            title,
            description,
            dueDate,
            dueTime = "23:59",
            assignmentMode = "SELF_ASSIGNED",
            assignmentId = null,
            aura  
        } = req.body; 

        // Create task instance
        const task = new Task({
            userId: '67253d9938df50d059d7cf74', // TODO: Replace with req.user._id
            type,
            title,
            description,
            dueDate: new Date(dueDate),
            dueTime,
            assignmentMode,
            assignmentId,
            aura,
            status: 'PENDING'
        });

        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Detailed error:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation Error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({
            message: 'Error creating task',
            error: error.message
        });
    }
};

  // Get all tasks for a user
  export const getUserTasks = async (req, res) => {
    console.log(req.body);
    try {
      const tasks = await Task.find({userId: req.body._id} )   // userId: req.user._id to be added
        // .sort({ dueDate: 1 })   
        // .populate('description', 'title');
        // console.log("tasks:", tasks);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get task by ID
  export const  getTaskByID= async (req, res) => {
    try {
       
      const task = await Task.findOne({
         taskId: req.params.taskId,
        userId: req.user._id
      });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update task
  export const updateTask = async (req, res) => {
    try {
      const task = await Task.findOneAndUpdate(
        { taskId: req.params.taskId, userId: '67253d9938df50d059d7cf74' },
        { $set: req.body },
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Delete task
  export const  deleteTask= async (req, res) => {
    try {
        //req.user._id
      const task = await Task.findOneAndDelete({
        taskId: req.params.taskId,
        userId: '67253d9938df50d059d7cf74'
      });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };






export const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = '67253d9938df50d059d7cf74';                       //req.user._id;

    // Find the task
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Find the student by user ID
    const student = await Student.findOne({ userId });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Check if the task is already completed
    if (task.completed) {
      return res.status(400).json({ message: 'Task is already completed' });
    }

    // Mark the task as complete
    task.completed = true;
    await task.save();

    // Update the student's aura points
    student.aura += task.aura;
    await student.save();

    res.json({ message: 'Task marked as complete', auraPoints: task.aura, totalAura: student.aura });
  } catch (error) {
    res.status(500).json({ message: 'Error completing task', error: error.message });
  }
};


 
  export const getTodaysTasks = async (req, res) => {
    try {
        const userId =  '67253d9938df50d059d7cf74'; // Make sure userId is sent in the request body

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        // Get start and end of today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Query tasks for today
        const tasks = await Task.find({
            userId: userId,
            dueDate: {
                $gte: today,
                $lt: tomorrow
            }
        }).sort({ dueTime: 1 });

        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching today's tasks",
            error: error.message
        });
    }
};

// Get tasks for a specific date
export const getTasksByDate = async (req, res) => {
  try {
    const userId =  '67253d9938df50d059d7cf74';
    const { date } = req.query;
    

    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }

    const targetDate = new Date(date);
    targetDate.setUTCHours(0, 0, 0, 0); // Normalize to start of the day

    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1); // End of the target day

    // Find tasks with dueDate within the selected day
    const tasks = await Task.find({
      dueDate: {
        $gte: targetDate,
        $lt: nextDate
      },
      userId: userId
    });
    //console.log('tasks', tasks);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
};



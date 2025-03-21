import { Task } from '../../models/task.model.js';
import { Student } from "../../models/student.model.js";
import { Stats } from '../../models/stats.model.js';
import { updateAura } from '../../utils/updateAura.js';


  // Create new task
export const createTask = async (req, res) => {
    try {
     

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

        
        const task = new Task({
            userId: req.user._id,
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
    try {
      const tasks = await Task.find({userId: req.user._id} ) 
        .sort({ dueDate: 1 })   
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


  // Delete task
  export const  deleteTask= async (req, res) => {
    try {
        //req.user._id
      const task = await Task.findOneAndDelete({
        taskId: req.params.taskId,
        userId: req.user._id
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
    const userId = req.user._id;                    

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });


    const student = await Student.findOne({ userId });
    if (!student) return res.status(404).json({ message: 'Student not found' });


    if (task.completed) {
      return res.status(400).json({ message: 'Task is already completed' });
    }

    task.completed = true;
    await task.save();

    // const student_stat = await Stats.findOneAndUpdate(
    //   { studentId: student._id },
    //   { $inc: { aura: task.aura } },
    //   { new: true, upsert: true } // `upsert: true` ensures the stat document is created if it doesn't exist
    // );

 
    // student.aura += task.aura;
    // await student.save();

    await updateAura(userId,task.aura);

    res.json({ message: 'Task marked as complete', auraPoints: task.aura, totalAura: student.aura });
  } catch (error) {
    res.status(500).json({ message: 'Error completing task', error: error.message });
  }
};


 
  export const getTodaysTasks = async (req, res) => {
    try {
        const userId =  req.user._id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }


        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

     
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
    const userId =  req.user._id;
    const { date } = req.query;
    

    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }

    const targetDate = new Date(date);
    targetDate.setUTCHours(0, 0, 0, 0); //start of the day

    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1); // end of the target day

    // Find tasks with dueDate within the selected day
    const tasks = await Task.find({
      dueDate: {
        $gte: targetDate,
        $lt: nextDate
      },
      userId: userId
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
};



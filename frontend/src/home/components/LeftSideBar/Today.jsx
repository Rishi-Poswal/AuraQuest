import React, { useEffect, useState } from 'react';
import { FaCalendar, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import axios from 'axios';

const Today = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showCompletionAlert, setShowCompletionAlert] = useState(false);
  const [auraPointsEarned, setAuraPointsEarned] = useState(0);


 
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const userId = "USER_ID"; // Replace with actual user ID
      const response = await axios.post("http://localhost:3000/api/task/today", { userId });
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching today's tasks:", error);
    }
  };

  // Complete a task
  const handleTaskComplete = async (taskId, aura) => {
    try {
      await axios.patch(`http://localhost:3000/api/task/complete-task/${taskId}`);
      setCompletedTasks([...completedTasks, taskId]);
      setAuraPointsEarned(aura);
      setShowCompletionAlert(true);
      setTimeout(() => setShowCompletionAlert(false), 3000);
      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };



  // Delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/task/delete-task/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const formatDueDateTime = (date, time) => {
    if (!date || !time) return null;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <div className="p-4">
      {/* Completion Alert */}
      {showCompletionAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative shadow-lg">
            <span className="block sm:inline">
              Congratulations! You have earned {auraPointsEarned} aura points for completing a task.
            </span>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-4">Today's Tasks</h2>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-3 border-b flex justify-between items-center">
          <h3 className="text-sm font-semibold">Today</h3>
          <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div>
          {tasks.map((task) => (
            <div key={task._id} className="px-4 py-3 border-b last:border-b-0">
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`font-medium ${
                        completedTasks.includes(task._id) ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {task.type}
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      {task.aura} pts
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 break-words">{task.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <span>Due:</span>
                    <div className="flex items-center gap-1">
                      <FaCalendar className="text-gray-400" size={12} />
                      <span>{formatDueDateTime(task.dueDate, task.dueTime)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 sm:flex-shrink-0">
                  <button
                    onClick={() => handleTaskComplete(task._id, task.aura)}
                    disabled={completedTasks.includes(task._id)}
                    className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaCheck />
                  </button>
                  <button onClick={() => handleDeleteTask(task.taskId)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {tasks.length === 0 && (
        <div className="bg-blue-50 text-blue-700 p-4 rounded-lg">
          No tasks scheduled for today. Click the "Add Task" button to create a new task.
        </div>
      )}

  
      
    </div>
  );
};

export default Today;

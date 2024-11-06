import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendar, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

const UpcomingView = () => {
  const getCurrentAndNext7Days = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push({
        full: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
      });
    }
    return dates;
  };

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [dates] = useState(getCurrentAndNext7Days());
  const [selectedDate, setSelectedDate] = useState(dates[0].full); // Default to today
  const [showCompletionAlert, setShowCompletionAlert] = useState(false);
  const [auraPointsEarned, setAuraPointsEarned] = useState(0);

  const handleDateClick = (date) => {
    setSelectedDate(date.full);
  };
  useEffect(() => {
    fetchTasks();
  }, [selectedDate]);
  // Fetch tasks when selectedDate changes

    const fetchTasks = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/api/task/by-date?date=${selectedDate}`);
        if (Array.isArray(response.data)) {
          setTasks(response.data);
          //console.log(tasks);
          
        } else {
          console.error("Unexpected response data:", response.data);
          setTasks([]); // Set to empty array if response is not an array
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
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
        <h2 className="text-xl font-bold mb-4">Upcoming Tasks</h2>

        {/* Date Navigation */}
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 scrollbar-hide">
          {dates.map((date, index) => (
            <div 
              key={index}
              onClick={() => handleDateClick(date)}
              className={`flex-shrink-0 w-20 rounded-lg cursor-pointer ${
                date.full === selectedDate ? 'bg-blue-500 text-white' : 'bg-white'
              } border shadow-sm`}
            >
              <div className="p-2 text-center">
                <div className="text-sm">{date.day}</div>
                <div className="text-lg font-semibold">{date.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks List for Selected Date */}
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow px-4 py-3 border-b">
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {task.type }
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    {task.aura} pts
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 break-words">
                  {task.description}
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <span>Due:</span>
                  <div className="flex items-center gap-1">
                    <FaCalendar className="text-gray-400" size={12} />
                    <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {task.dueTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 sm:flex-shrink-0">
                <button 
                 onClick={() => handleTaskComplete(task._id, task.aura)}
                 disabled={completedTasks.includes(task._id)}
                className="p-1 text-green-600 hover:bg-green-50 rounded">
                  <FaCheck />
                </button>
                <button onClick={() => handleDeleteTask(task.taskId)}  className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="bg-blue-50 text-blue-700 p-4 rounded-lg">
            No tasks scheduled for this date.
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingView;

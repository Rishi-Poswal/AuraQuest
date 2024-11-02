import React, { useState } from 'react';
import { FaCalendar, FaEdit, FaTrash, FaCheck, FaClock } from 'react-icons/fa';

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

  const initialTasks = [
    {
      id: 1,
      title: "Team Planning Session",
      description: "Quarterly planning meeting with department heads",
      category: "Meetings",
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: "10:00",
      auraPoints: 50,
      completed: false
    },
    {
      id: 2,
      title: "Project Documentation",
      description: "Update technical documentation for the new feature release",
      category: "Development",
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      dueTime: "14:30",
      auraPoints: 30,
      completed: false
    },
    {
      id: 3,
      title: "Client Presentation",
      description: "Present quarterly results to key stakeholders",
      category: "Meetings",
      dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      dueTime: "15:45",
      auraPoints: 75,
      completed: false
    }
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [dates] = useState(getCurrentAndNext7Days());
  const [editingTask, setEditingTask] = useState(null);

  const handleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const getTasksForDate = (date) => {
    return tasks.filter(task => task.dueDate === date);
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
      hour12: true
    });
    
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-4">Upcoming Tasks</h2>
        
        {/* Date Navigation - Horizontal scrollable on small screens */}
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 scrollbar-hide">
          {dates.map((date, index) => (
            <div 
              key={index}
              className={`flex-shrink-0 w-20 rounded-lg ${
                index === 0 ? 'bg-blue-500 text-white' : 'bg-white'
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

      {/* Tasks List */}
      <div className="space-y-4">
        {dates.map((date, index) => {
          const dayTasks = getTasksForDate(date.full);
          if (dayTasks.length === 0) return null;

          return (
            <div key={date.full} className="bg-white rounded-lg shadow">
              <div className="px-4 py-3 border-b flex justify-between items-center">
                <h3 className="text-sm font-semibold">
                  {index === 0 ? 'Today' : `${date.day} ${date.date}`}
                </h3>
                <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
                  {dayTasks.length} task{dayTasks.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div>
                {dayTasks.map(task => (
                  <div
                    key={task.id}
                    className="px-4 py-3 border-b last:border-b-0"
                  >
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                            {task.title}
                          </span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {task.category}
                          </span>
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            {task.auraPoints} pts
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 break-words">
                          {task.description}
                        </p>
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
                          variant = "outline-success"
                          onClick={() => handleComplete(task.id)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <FaCheck />
                        </button>
                        <button
                         variant="outline-primary"
                          onClick={() => handleEdit(task)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <FaEdit />
                        </button>
                        <button
                        variant="outline-danger"
                          onClick={() => handleDelete(task.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {tasks.length === 0 && (
          <div className="bg-blue-50 text-blue-700 p-4 rounded-lg">
            No tasks scheduled. Click the "Add Task" button to create a new task.
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingView;
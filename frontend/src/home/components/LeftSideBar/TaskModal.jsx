import React, { useState } from 'react';

const TaskModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    category: '',
    reminder: false,
    auraPoints: ''
  });

  const categories = ['Course', 'Project', 'Assignment'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="fixed pt-16 bg-opacity-50 inset-0  border-black  flex items-center justify-center backdrop-blur-sm m-3 ">
      <div className="bg-white border border-blue-500 rounded-lg w-full max-w-md">
        <div className="p-2">
          <h3 className="text-xl font-semibold mb-4 text-black text-center">Add New Task</h3>
          
          <form onSubmit={handleSubmit} className="mx-2">
            <div className="mb-4">
              <input
                type="text"
                name="title"
                placeholder="Task name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <textarea
                name="description"
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1 text-black">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-black">Due Time</label>
                <input
                  type="time"
                  name="dueTime"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.dueTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1 text-black">Category</label>
              <select
                name="category"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="reminder"
                id="reminder"
                className="mr-2 focus:ring-blue-500"
                checked={formData.reminder}
                onChange={handleChange}
              />
              <label htmlFor="reminder" className="text-sm text-black">Set Reminder</label>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1 text-black">Aura Points</label>
              <input
                type="number"
                name="auraPoints"
                placeholder="Enter points"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.auraPoints}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded border border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-gray-600 hover:bg-blue-400 rounded border border-gray-300"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
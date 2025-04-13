import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const TaskModal = ({ show, handleClose, onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    type: '',
    reminder: false,
    auraPoints: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const categories = ['Course', 'Assignment'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const taskData = {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        dueTime: formData.dueTime || "23:59",
        type: formData.type,
        assignmentMode: 'SELF_ASSIGNED',
        aura: formData.aura,
      };

      console.log('taskdata', taskData);
     

      const response = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/task`, taskData
        , { withCredentials:true}
      
    );
        toast.success('Task created successfully!');
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      dueTime: '',
      type: '',
      reminder: false,
      aura: ''
    });
    onTaskAdded(response.data);
    handleClose();
    console.log('added task successfully');
        } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed pt-16 bg-opacity-50 inset-0 flex items-center justify-center backdrop-blur-sm m-3">
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
                required
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
                  required
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
                name="type"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1 text-black">Aura Points</label>
              <input
                type="number"
                name="aura"
                placeholder="Enter aura points"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.aura}
                onChange={handleChange}
              />
            </div>


            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded border border-gray-300"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded disabled:bg-blue-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
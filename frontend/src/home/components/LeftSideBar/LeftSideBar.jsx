import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Search, Calendar, CalendarDays, Inbox, ChevronLeft, ChevronRightCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import TaskModal from './TaskModal';

const LeftSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [categories, setCategories] = useState({
    courses: false,
    assignments: false,
    projects: false
  });
  const [showModal, setShowModal] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCategory = (category) => {
    setCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Function to check if a route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen fixed mt-3">
      
      <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r shadow-sm flex flex-col relative transition-all duration-300`}>
      
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 bg-white rounded-full p-1 border shadow-sm z-10"
        >
          {isCollapsed ? <ChevronRightCircle size={20} /> : <ChevronLeft size={20} />}
        </button>
  {/*Add task button */}
  <div className={`p-4 ${isCollapsed ? 'px-2' : ''}`}>
          <button 
            onClick={() => setShowModal(true)} 
            className={`
              flex items-center justify-center
              transition-all duration-300
              ${isCollapsed 
                ? 'w-10 h-10 rounded-lg bg-blue-200 hover:bg-blue-300' 
                : 'w-full bg-blue-200 hover:bg-blue-300 rounded-md py-2 px-4 space-x-2'
              }
            `}
          >
            <Plus size={isCollapsed ? 16 : 20} />
            {!isCollapsed && <span>Add task</span>}
          </button>

          <TaskModal 
            show={showModal} 
            handleClose={() => setShowModal(false)} 
          />
        </div>
        {/* Quick access buttons */}
        <div className="px-2 py-2 space-y-2">
        <div 
          className={`flex items-center p-2 rounded cursor-pointer transition-colors duration-200 
            ${isActiveRoute('/inbox') ? 'bg-gray-200 text-blue-700' : 'text-gray-600 hover:bg-gray-700 hover:text-white'}`}
          onClick={() => handleNavigation('/inbox')}
        >
          <Inbox size={20} />
          {!isCollapsed && <span className="px-3">Inbox</span>}
          {!isCollapsed && <span className="ml-auto text-gray-400">3</span>}
        </div>
     

          <div 
            className={`flex items-center p-2 rounded cursor-pointer transition-colors duration-200 
              ${isActiveRoute('/today') ? 'bg-gray-200 text-blue-700' : 'text-gray-600 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => handleNavigation('/today')}
          >
            <Calendar size={20} />
            {!isCollapsed && <span className="px-3">Today</span>}
            {!isCollapsed && <span className="ml-auto text-gray-400">7</span>}
          </div>
          <div 
             className={`flex items-center p-2 rounded cursor-pointer transition-colors duration-200 
              ${isActiveRoute('/upcoming') ? 'bg-gray-200 text-blue-700' : 'text-gray-600 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => handleNavigation('/upcoming')}
          >
            <CalendarDays size={20} />
            {!isCollapsed && <span className="px-3">Upcoming</span>}
          </div>
        </div>

        {/* Categories - Only show when not collapsed */}
        {!isCollapsed && (
          <div className="px-2 py-2 space-y-2">
         
            <div className="space-y-1">
              <div 
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => toggleCategory('courses')}
              >
                <div className="flex items-center space-x-2">
                  {categories.courses ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  <span className="text-uppercase fw-bold">Courses</span>
                </div>
              </div>
              {categories.courses && (
                <div className="ml-6 px-2 space-y-1">
                  <div className="p-2 hover:bg-gray-100 rounded">Course 1</div>
                  <div className="p-2 hover:bg-gray-100 rounded">Course 2</div>
                </div>
              )}
            </div>

            {/* Assignments Category */}
            <div className="space-y-1">
              <div 
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => toggleCategory('assignments')}
              >
                <div className="flex items-center space-x-2">
                  {categories.assignments ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  <span className="text-uppercase fw-bold">Assignments</span>
                </div>
              </div>
              {categories.assignments && (
                <div className="ml-6 px-2 space-y-1">
                  <div className="p-2 hover:bg-gray-100 rounded">Assignment 1</div>
                  <div className="p-2 hover:bg-gray-100 rounded">Assignment 2</div>
                </div>
              )}
            </div>

            {/* Projects Category */}
            <div className="space-y-1">
              <div 
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => toggleCategory('projects')}
              >
                <div className="flex items-center space-x-2">
                  {categories.projects ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  <span className="text-uppercase fw-bold">Projects</span>
                </div>
              </div>
              {categories.projects && (
                <div className="ml-6 px-2 space-y-1">
                  <div className="p-2 hover:bg-gray-100 rounded">Project 1</div>
                  <div className="p-2 hover:bg-gray-100 rounded">Project 2</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
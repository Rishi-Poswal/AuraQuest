import React, { useState } from 'react';
import { Card, Button, Badge, Alert, Container, Row, Col } from 'react-bootstrap';
import { FaCalendar, FaEdit, FaTrash, FaCheck, FaPlus } from 'react-icons/fa';

const UpcomingView = () => {
  // Get current date and next 7 days
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

  // Sample tasks data
  const initialTasks = [
    {
      id: 1,
      title: "Team Planning Session",
      description: "Quarterly planning meeting with department heads",
      category: "Meetings",
      dueDate: new Date().toISOString().split('T')[0],
      auraPoints: 50,
      completed: false
    },
    {
      id: 2,
      title: "Project Documentation",
      description: "Update technical documentation for the new feature release",
      category: "Development",
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      auraPoints: 30,
      completed: false
    },
    {
      id: 3,
      title: "Client Presentation",
      description: "Present quarterly results to key stakeholders",
      category: "Meetings",
      dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
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

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Upcoming Tasks</h2>
        <Button variant="primary" size="sm">
          <FaPlus className="me-2" />
          Add Task
        </Button>
      </div>

      {/* Date Navigation */}
      <div className="d-flex gap-2 mb-4 overflow-auto">
        {dates.map((date, index) => (
          <Card 
            key={index}
            className={`flex-shrink-0 ${index === 0 ? 'bg-primary text-white' : ''}`}
            style={{ minWidth: '80px' }}
          >
            <Card.Body className="p-2 text-center">
              <div className="small">{date.day}</div>
              <div className="h5 mb-0">{date.date}</div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Tasks for each date */}
      {dates.map((date, index) => {
        const dayTasks = getTasksForDate(date.full);
        if (dayTasks.length === 0) return null;

        return (
          <Card key={date.full} className="mb-3">
            <Card.Header className="bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="h6 mb-0">
                  {index === 0 ? 'Today' : date.day + ' ' + date.date}
                </h3>
                <Badge bg="secondary" pill>
                  {dayTasks.length} task{dayTasks.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {dayTasks.map(task => (
                <div
                  key={task.id}
                  className="p-3 border-bottom"
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <span className={task.completed ? 'text-decoration-line-through text-muted' : ''}>
                          {task.title}
                        </span>
                        <Badge bg="info" className="ms-2">{task.category}</Badge>
                        <Badge bg="warning" text="dark">
                          {task.auraPoints} pts
                        </Badge>
                      </div>
                      <p className="text-muted small mb-0">
                        {task.description}
                      </p>
                    </div>
                    <div className="d-flex gap-1">
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleComplete(task.id)}
                      >
                        <FaCheck />
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(task)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        );
      })}

      {tasks.length === 0 && (
        <Alert variant="info">
          No tasks scheduled. Click the "Add Task" button to create a new task.
        </Alert>
      )}
    </div>
  );
};

export default UpcomingView;
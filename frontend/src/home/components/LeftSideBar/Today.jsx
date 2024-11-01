import React, { useState } from 'react';
import { Card, Button, Badge, Alert } from 'react-bootstrap';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

const Today = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showCompletionAlert, setShowCompletionAlert] = useState(false);
  const [auraPointsEarned, setAuraPointsEarned] = useState(0);

  const handleTaskComplete = (taskId) => {
    const task = sampleTasks.find(t => t.id === taskId);
    setCompletedTasks([...completedTasks, taskId]);
    setAuraPointsEarned(task.auraPoints);
    setShowCompletionAlert(true);
    setTimeout(() => setShowCompletionAlert(false), 3000);
  };

  // Sample tasks array remains the same
const sampleTasks = [
  {
    id: 'task-1',
    title: 'Complete daily meditation',
    description: 'Spend 20 minutes in mindful meditation to start the day',
    dueDate: '2023-05-30',
    auraPoints: 25,
    category: 'Wellness'
  },
  {
    id: 'task-2',
    title: 'Submit quarterly sales report',
    description: 'Gather data and prepare the report for the leadership team',
    dueDate: '2023-06-15',
    auraPoints: 50,
    category: 'Work'
  },
  {
    id: 'task-3',
    title: 'Read 20 pages of the new book',
    description: 'Continue making progress on the personal development book',
    dueDate: '2023-05-31',
    auraPoints: 15,
    category: 'Personal'
  },
  {
    id: 'task-4',
    title: 'Attend yoga class',
    description: 'Join the 6 PM yoga class at the gym',
    dueDate: '2023-06-01',
    auraPoints: 20,
    category: 'Wellness'
  },
  {
    id: 'task-5',
    title: 'Finish wireframing the new website design',
    description: 'Collaborate with the design team to finalize the wireframes',
    dueDate: '2023-06-05',
    auraPoints: 40,
    category: 'Work'
  },
  {
    id: 'task-6',
    title: 'Write a draft for the blog post',
    description: 'Brainstorm ideas and write the first draft of the blog post',
    dueDate: '2023-06-10',
    auraPoints: 30,
    category: 'Personal'
  },
  {
    id: 'task-7',
    title: 'Prepare for the client presentation',
    description: 'Review the materials and practice the presentation',
    dueDate: '2023-06-12',
    auraPoints: 45,
    category: 'Work'
  },
  {
    id: 'task-8',
    title: 'Plan the family vacation',
    description: 'Research destinations and book accommodations',
    dueDate: '2023-07-01',
    auraPoints: 35,
    category: 'Personal'
  },
  {
    id: 'task-9',
    title: 'Attend the professional development workshop',
    description: 'Sign up and participate in the 2-hour workshop',
    dueDate: '2023-06-20',
    auraPoints: 40,
    category: 'Work'
  },
  {
    id: 'task-10',
    title: 'Organize the home office space',
    description: 'Declutter and reorganize the home office',
    dueDate: '2023-06-25',
    auraPoints: 25,
    category: 'Personal'
  },
  {
    id: 'task-11',
    title: 'Review and approve the marketing campaign',
    description: 'Provide feedback and sign off on the marketing campaign',
    dueDate: '2023-06-18',
    auraPoints: 50,
    category: 'Work'
  },
  {
    id: 'task-12',
    title: 'Practice the piano for 30 minutes',
    description: 'Continue improving piano skills with daily practice',
    dueDate: '2023-06-30',
    auraPoints: 20,
    category: 'Personal'
  },
  {
    id: 'task-13',
    title: 'Attend the team-building event',
    description: 'Participate in the team-building activities',
    dueDate: '2023-07-05',
    auraPoints: 35,
    category: 'Work'
  },
  {
    id: 'task-14',
    title: 'Meal prep for the week',
    description: 'Cook and prepare healthy meals for the upcoming week',
    dueDate: '2023-06-26',
    auraPoints: 30,
    category: 'Wellness'
  },
  {
    id: 'task-15',
    title: 'Write a thank-you note to a colleague',
    description: 'Appreciate a coworker for their recent contribution',
    dueDate: '2023-06-22',
    auraPoints: 15,
    category: 'Work'
  },
  {
    id: 'task-16',
    title: 'Update resume and LinkedIn profile',
    description: 'Revise and polish the resume and LinkedIn profile',
    dueDate: '2023-07-01',
    auraPoints: 35,
    category: 'Personal'
  },
  {
    id: 'task-17',
    title: 'Attend the company social event',
    description: 'Network and socialize with colleagues at the event',
    dueDate: '2023-06-24',
    auraPoints: 25,
    category: 'Work'
  },
  {
    id: 'task-18',
    title: 'Go for a 30-minute jog',
    description: 'Improve physical fitness with a daily jog',
    dueDate: '2023-06-30',
    auraPoints: 20,
    category: 'Wellness'
  }
];

  return (
    <div className="p-4">
      {showCompletionAlert && (
        <Alert 
          variant="success" 
          className="position-fixed top-0 start-50 translate-middle-x mt-3"
        >
          Congratulations! You have earned {auraPointsEarned} aura points for completing a task.
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <h2 className="mb-0">Today</h2>
        <Button variant="primary" size="sm">
          + Add Task
        </Button>
      </div>

      <Card>
        <Card.Header className="bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="h6 mb-0">Today's Tasks</h3>
            <Badge bg="secondary" pill>
              {sampleTasks.length} tasks
            </Badge>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          {sampleTasks.map((task) => (
            <div
              key={task.id}
              className="p-3 border-bottom"
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <span className={completedTasks.includes(task.id) ? 'text-decoration-line-through text-muted' : ''}>
                      {task.title}
                    </span>
                    <Badge bg="info" className="ms-2">{task.category}</Badge>
                    <Badge bg="warning" text="dark">
                      {task.auraPoints} pts
                    </Badge>
                  </div>
                  <p className="text-muted small mb-1">
                    {task.description}
                  </p>
                  <div className="d-flex gap-2">
                    <small className="text-muted">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </small>
                  </div>
                </div>
                <div className="d-flex gap-1">
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleTaskComplete(task.id)}
                    disabled={completedTasks.includes(task.id)}
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>

      {sampleTasks.length === 0 && (
        <Alert variant="info">
          No tasks scheduled for today. Click the "Add Task" button to create a new task.
        </Alert>
      )}
    </div>
  );
};



export default Today;
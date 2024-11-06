import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const EventModal = ({ isOpen, onClose, onSubmit, instructors }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Class',
    startDate: '',
    endDate: '',
    wholeDay: false,
    location: '',
    instructor: '67253d9938df50d059d7cf74', // This will store the MongoDB ObjectId of instructor
    courseColor: '#2196F3',
    rrule: {
      freq: 'weekly',
      byweekday: [],
      interval: 1
    },
    endRecurrence: ''
  });

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [instructorDropdownOpen, setInstructorDropdownOpen] = useState(false);

  const weekdays = [
    { value: 'MO', label: 'Monday' },
    { value: 'TU', label: 'Tuesday' },
    { value: 'WE', label: 'Wednesday' },
    { value: 'TH', label: 'Thursday' },
    { value: 'FR', label: 'Friday' },
    { value: 'SA', label: 'Saturday' },
    { value: 'SU', label: 'Sunday' }
  ];

  //colors for courses
  const colors = [
    '#2196F3', // Blue
    '#76A787', // Green
    '#FD8A8A', // Red
    '#FFC107', // Amber
    '#9EA1D4', // Brownish
    '#DC6D18', // Orange
    '#795548'  // Brown
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleWeekdayChange = (day) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      rrule: {
        ...prevFormData.rrule,
        byweekday: prevFormData.rrule.byweekday.includes(day)
          ? prevFormData.rrule.byweekday.filter((d) => d !== day)
          : [...prevFormData.rrule.byweekday, day]
      }
    }));
  };

  const handleSubmit = async (e) => {
    console.log('formData', formData);
    e.preventDefault();
    
    // Format dates to ISO string
    const formattedData = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      endRecurrence: formData.endRecurrence 
        ? new Date(formData.endRecurrence).toISOString()
        : null
    };

    await onSubmit(formattedData);
    onClose();
  };

  const toggleCategoryDropdown = () => setCategoryDropdownOpen(prev => !prev);
  const toggleInstructorDropdown = () => setInstructorDropdownOpen(prev => !prev);
 
  //modal to input event details
  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Add New Event</ModalHeader>
      <ModalBody>
        <form id="event-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <Label for="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <Label>Category</Label>
            <Dropdown isOpen={categoryDropdownOpen} toggle={toggleCategoryDropdown}>
              <DropdownToggle caret>{formData.category}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handleInputChange({ target: { name: 'category', value: 'Class' } })}>
                  Class
                </DropdownItem>
                <DropdownItem onClick={() => handleInputChange({ target: { name: 'category', value: 'Assignment' } })}>
                  Assignment
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="row mb-3">
            <div className="col">
              <Label for="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col">
              <Label for="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <Label for="endRecurrence">End Recurrence</Label>
            <Input
              id="endRecurrence"
              name="endRecurrence"
              type="datetime-local"
              value={formData.endRecurrence}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <Label>Repeat on</Label>
            <div className="d-flex gap-2">
              {weekdays.map((day) => (
                <Button
                  key={day.value}
                  color={formData.rrule.byweekday.includes(day.value) ? 'primary' : 'secondary'}
                  onClick={() => handleWeekdayChange(day.value)}
                  type="button"
                >
                  {day.value}
                </Button>
              ))}
            </div>
          </div>

          <div className="form-check mb-3">
            <Input
              id="wholeDay"
              name="wholeDay"
              type="checkbox"
              checked={formData.wholeDay}
              onChange={(e) => handleInputChange({ 
                target: { name: 'wholeDay', value: e.target.checked } 
              })}
            />
            <Label for="wholeDay" className="form-check-label">
              Whole Day
            </Label>
          </div>

          <div className="mb-3">
            <Label for="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <Label>Course Color</Label>
            <div className="d-flex gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => handleInputChange({ 
                    target: { name: 'courseColor', value: color } 
                  })}
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: color,
                    border: formData.courseColor === color ? '2px solid black' : 'none',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                />
              ))}
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" form="event-form">
          Add Event
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EventModal;
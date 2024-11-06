import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import rrulePlugin from '@fullcalendar/rrule';
import { Plus } from 'lucide-react';
import { Button } from 'react-bootstrap';
import EventModal from './EventModal';
import axios from 'axios';

const ScheduleCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const secId='672a80ac9e9d132a1adfc831'
      const response = await axios.get(`http://localhost:3000/api/events/${secId}`);  // include section id here
      const formattedEvents = response.data.map((event) => {
        const rruleStr = `FREQ=${event.rrule.freq};UNTIL=${event.endRecurrence.split('T')[0].replace(/-/g, '')};BYDAY=${event.rrule.byweekday.join(',')}`;
 
        return {
          title: event.title,
          start: event.startDate,
          end: event.endDate,
          startRecur: event.startDate.split('T')[0],
          endRecur: event.endRecurrence ? event.endRecurrence.split('T')[0] : null,
          
          daysOfWeek: event.rrule.byweekday.map((day) => {
            const daysMap = {
              MO: 1,
              TU: 2,
              WE: 3,
              TH: 4,
              FR: 5,
              SA: 6,
              SU: 0,
            };
            return daysMap[day];
          }),
          allDay: event.wholeDay,
          backgroundColor: event.courseColor,
          extendedProps: {
            location: event.location,
            instructor: event.instructor.name,
            category: event.category,
          },
        };
      });
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSaveEvent = async (eventData) => {

    console.log('eventDtaa', eventData);
    try {
      await axios.post('http://localhost:3000/api/events', {
        title: eventData.title,
        category: eventData.category,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        wholeDay: eventData.wholeDay,
        location: eventData.location,
        instructor: eventData.instructor, //an object with a 'name' property
        sectionId: '672a80ac9e9d132a1adfc831', // to be replaced with section id of user
        courseColor: eventData.courseColor,
        rrule: eventData.rrule,
        endRecurrence: eventData.endRecurrence,
      });
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  //it contains key words which are actually understood by fullcalendar
  const renderEventContent = (eventInfo) => (
    <div
      style={{
        backgroundColor: eventInfo.event.backgroundColor,
        width: '100%',
        padding: '4px 8px',
        boxSizing: 'border-box',
        color: '#ffffff',
      }}
    >
      <b>{eventInfo.timeText} </b>
      <i>{eventInfo.event.title}</i> <br />
      <small>{eventInfo.event.extendedProps.instructor} </small>
      <br />
      <small>{eventInfo.event.extendedProps.location}</small>
      <br />
    </div>
  );

  return (
    <div>
       <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold">Your Schedule</h1>
        <Button onClick={() => setIsModalOpen(true)} className="d-flex my-2">
          <Plus className="mr-2  w-4" /> Add Event
        </Button>
      </div>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
          multiMonthPlugin,
          rrulePlugin,
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,multiMonthYear,listMonth',   //timeGridWeek,timeGridDay to be added
        }}
        events={events}
        eventContent={renderEventContent}
        editable={true}
        selectable={true}
        height="auto"
      />
      { /* {input event details using this modal} */ }
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveEvent}
      />
    </div>
  );
};

export default ScheduleCalendar;
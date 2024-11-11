import Timetable from '../../models/timetable.model.js';
import  Section  from '../../models/section.model.js' ;

//create a new event and link it to a section
export const addEvent = async (req, res) => {

  try {
    const {
      title,
      category,
      startDate,
      endDate,
      wholeDay,
      location,
      instructor,
      sectionId = '672a80ac9e9d132a1adfc831',
      courseColor,
    } = req.body;

  // Creating the event in the Timetable collection
    const newEvent = new Timetable({
      title,
      category,
      startDate,
      endDate,
      wholeDay,
      location,
      instructor,
      courseColor,
    });
   
    const savedEvent = await newEvent.save();


    //  Add reference of the event to the specified section
    await Section.findByIdAndUpdate(
      sectionId,
      { $push: { eventSchedule: savedEvent._id } },
      { new: true }
    );
   

    res.status(201).json({
      message: 'Event created and linked to section successfully',
      event: savedEvent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create event', error });
  }
};


// Fetch events for a specific section
export const getEventsBySection = async (req, res) => {
    try {
      const sectionId = req.params.sectionId;
  
      // Find the section and populate the `eventSchedule` field with event details
      const section = await Section.findById(sectionId).populate({
        path: 'eventSchedule',
        // populate: {
        //   path: 'instructor',    // to be added once faculty schema is populated
        //   select: 'name'      
        // }
      });
  
      if (!section) {
        return res.status(404).json({ error: 'Section not found' });
      }
  
      res.status(200).json(section.eventSchedule);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching events for the section' });
    }
  };


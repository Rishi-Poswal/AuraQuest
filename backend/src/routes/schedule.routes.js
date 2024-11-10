import express from 'express';
import { addEvent, getEventsBySection } from '../controllers/ScheduleController/schedule.controller.js';

const router = express.Router();

// POST route to add event to a section
router.post('/', addEvent);

// GET route to retrieve events for a section
router.get('/:sectionId', getEventsBySection);

export default router;

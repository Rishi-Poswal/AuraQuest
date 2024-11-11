import mongoose from 'mongoose';

const timeTableSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Assignment', 'Class'],
    default: 'Class'
  },
  startDate: {
    type: Date,
    
  },
  endDate: {
    type: Date,
    //required: true
  },
  wholeDay: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    default: ''
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    default: null
  },
  courseColor: {
    type: String,
    default: '#2196F3'
  },
  //rrule stores the freq of recurrence of an event
  // rrule: {
  //   freq: {
  //     type: String,
  //     enum: ['yearly', 'monthly', 'weekly', 'daily'],
  //   },
  //   byweekday: [{
  //     type: String,
  //     enum: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
  //   }],
  //   interval: {
  //     type: Number,
  //     default: 1
  //   }
  // },
  // endRecurrence:{
  //   type: Date,
  //   default: null
  // },
}, { timestamps: true });


const Timetable = mongoose.model('Timetable', timeTableSchema);
export default Timetable;
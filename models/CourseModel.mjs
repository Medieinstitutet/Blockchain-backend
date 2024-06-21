import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseNumber: {
    type: Number,
    unique: true,
    required: [true, 'A course number must be given'],
  },
  title: {
    type: String,
    required: [true, 'Add a course name'],
    unique: true,
    trim: true,
    maxlength: [100, 'The maximal characters for a course is 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Give a description for the course'],
  },
  days: {
    type: Number,
    required: [true, 'The days to complete the course must be given'],
  },
  tuition: {
    type: Number,
    required: [true, 'A price for the course must be given'],
  },
  level: {
    type: String,
    enum: ['Beginer', 'Medium', 'Advanced'],
    default: 'Beginer',
  },
  category: {
    type: [String],
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Agile & Scrum',
      'Blockchain',
      'Cloud Development',
    ],
  },
  inClass: {
    type: Boolean,
    default: true,
  },
  remote: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Course', courseSchema);

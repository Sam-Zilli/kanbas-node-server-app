import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  _id: { type: String, required: true }, 
  name: { type: String, required: true },
  number: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  department: { type: String, required: true },
  credits: { type: Number, required: true },
  description: { type: String }
}, { collection: 'courses' });

export default courseSchema;
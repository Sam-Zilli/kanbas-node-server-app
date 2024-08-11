// import mongoose from "mongoose";
// import schema from "./schema.js";
// const model = mongoose.model("CourseModel", schema);
// export default model;

import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  number: String,
  name: String,
  startDate: String, 
  endDate: String,   
  department: String,
  credits: Number,
  description: String,
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
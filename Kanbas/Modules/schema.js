import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false},
  module: { type: String, required: true }
}, { _id: false }); 

const moduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  course: { type: String, required: true }, 
  lessons: [lessonSchema] 
});

export default moduleSchema;
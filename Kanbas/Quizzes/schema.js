import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false},
  module: { type: String, required: true }
}, { _id: false }); 

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  course: { type: String, required: true }, 
  questions: [questionSchema] 
});

export default quizSchema;
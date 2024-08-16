import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ["multiple_choice", "true_false", "short_answer", "fill_in_the_blank"], 
    default: "multiple_choice" 
  },
  name: { type: String, required: true },
  description: { type: String, required: false },
  options: { type: [String], required: function() { return this.type === "multiple_choice"; } }, 
  correctAnswer: { 
    type: mongoose.Schema.Types.Mixed, 
    required: true 
  }
}, { _id: false }); 

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  course: { type: String, required: true },
  questions: [questionSchema],
  isPublished: { type: Boolean, default: false } 
});

export default quizSchema;

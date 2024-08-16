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
  points: { type: Number, required: true }, 
  dueDate: { type: Date, required: false },
  availableDate: { type: Date, required: false },
  numberOfQuestions: { type: Number, default: 0 }, 
  studentScore: { type: Number, required: false }, 
  isPublished: { type: Boolean, default: false }, 
  questions: [questionSchema]
});

// Pre-save hook to update numberOfQuestions before saving
quizSchema.pre('save', function(next) {
  this.numberOfQuestions = this.questions.length;
  next();
});

export default quizSchema;
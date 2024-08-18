import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ["multiple_choice", "true_false", "short_answer", "fill_in_the_blank"], 
    default: "multiple_choice" 
  },
  description: { type: String, required: false },
  options: { type: [String], required: function() { return this.type === "multiple_choice"; } }, 
  correctAnswer: { 
    type: mongoose.Schema.Types.Mixed, 
    required: true 
  },
  points: { type: Number, required: true } 
}, { _id: false }); 

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  course: { type: String, required: true },
  points: { type: Number, default: 0 }, // Will be calculated
  dueDate: { type: Date, required: false },
  availableDate: { type: Date, required: false },
  numberOfQuestions: { type: Number, default: 0 }, 
  studentScore: { type: Number, required: false }, 
  published: { type: Boolean, default: false }, 
  type: {
    type: String,
    enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
    default: "Graded Quiz" // Default value
  },
  questions: [questionSchema]
});

// Pre-save hook to update points and numberOfQuestions before saving
quizSchema.pre('save', function(next) {
  if (this.questions) {
    this.numberOfQuestions = this.questions.length;
    // Calculate the total points by summing up points of each question
    this.points = this.questions.reduce((total, question) => total + (question.points || 0), 0);
  }
  next();
});

export default quizSchema;
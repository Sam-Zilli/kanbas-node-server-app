import mongoose from 'mongoose';

// Define the question schema
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

// Define the quiz schema
const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  course: { type: String, required: true },
  points: { type: Number, default: 0 }, // Will be calculated
  dueDate: { type: Date, required: false },
  availableDate: { type: Date, required: false },
  untilDate: { type: Date, required: false },
  numberOfQuestions: { type: Number, default: 0 }, 
  published: { type: Boolean, default: false }, 
  type: {
    type: String,
    enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
    default: "Graded Quiz"
  },
  assignmentGroup: {
    type: String,
    enum: ["Quizzes", "Exams", "Assignments", "Project"],
    default: "Quizzes"
  },
  shuffleAnswers: { type: Boolean, default: true }, // Default Yes
  timeLimit: { type: Number, default: 20 }, // Time limit in minutes
  multipleAttempts: { type: Boolean, default: false }, // Default No
  attempts: { type: Number, default: 1 }, // Default 1
  showCorrectAnswers: { type: String, enum: ["Never", "After Submission", "After Due Date"], default: "Never" }, // Default Never
  accessCode: { type: String, default: "" },
  oneQuestionAtATime: { type: Boolean, default: true }, // Default Yes
  webcamRequired: { type: Boolean, default: false }, // Default No
  lockQuestionsAfterAnswering: { type: Boolean, default: false }, // Default No
  questions: [questionSchema]
});

// Pre-save hook to update points and numberOfQuestions before saving
quizSchema.pre('save', function(next) {
  if (this.questions) {
    this.numberOfQuestions = this.questions.length;
    this.points = this.questions.reduce((total, question) => total + (question.points || 0), 0);
  }
  next();
});

export default quizSchema;
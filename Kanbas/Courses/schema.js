import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    number: String,
    name: String,
    startDate: String, 
    endDate: String,   
    department: String,
    credits: Number,
    description: String,
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

  export default courseSchema;
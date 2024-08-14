import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    number: String,
    name: String,
    startDate: String, 
    endDate: String,   
    department: String,
    credits: Number,
    description: String,
  });

  export default courseSchema;
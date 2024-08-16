import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    number: String,
    name: String,
    startDate: String, 
    endDate: String,   
    department: String,
    credits: Number,
    description: String,
    participants : [String]
  });

  export default courseSchema;
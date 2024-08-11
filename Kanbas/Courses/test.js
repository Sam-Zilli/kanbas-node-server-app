import mongoose from 'mongoose';
import Course from './model.js'; 
import 'dotenv/config';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING)
  .then(async () => {
    console.log('MongoDB connected successfully');
    
    try {
      const courses = await Course.find();
      console.log('Courses fetched:', courses);
      
      if (courses.length === 0) {
        console.log('No courses found in the database.');
      } else {
        console.log(`Found ${courses.length} course(s):`);
        courses.forEach(course => console.log(course));
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));



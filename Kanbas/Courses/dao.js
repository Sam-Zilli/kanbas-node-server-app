import model from "./model.js"; 

export const findAllCourses = async () => {
    try {
      const courses = await model.find();
      return courses;
    } catch (err) {
      console.error('Error fetching courses:', err);
      throw err; 
    }
  };
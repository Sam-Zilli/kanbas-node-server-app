import Course from "./model.js"; // Import the Mongoose model

// Fetch all courses
export const findAllCourses = async () => {
  try {
    const courses = await Course.find();
    return courses;
  } catch (err) {
    console.error('Error fetching courses:', err);
    throw err;
  }
};

// Fetch a course by ID
export const findCourseById = async (id) => {
  try {
    const course = await Course.findById(id);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  } catch (err) {
    console.error('Error fetching course by ID:', err);
    throw err;
  }
};

// Create a new course
export const createCourse = async (courseData) => {
  try {
    if (courseData._id) {
      const existingCourse = await Course.findById(courseData._id);
      if (existingCourse) {
        await Course.findByIdAndDelete(courseData._id);
      }
    }
    const newCourse = new Course(courseData);
    return await newCourse.save();
  } catch (err) {
    console.error('Error creating course:', err);
    throw err;
  }
};


// Update a course by ID
export const updateCourseById = async (id, courseData) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, courseData, { new: true, runValidators: true });
    if (!updatedCourse) {
      throw new Error('Course not found');
    }
    return updatedCourse;
  } catch (err) {
    console.error('Error updating course by ID:', err);
    throw err;
  }
};

// Delete a course by ID
export const deleteCourseById = async (id) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      throw new Error('Course not found');
    }
    return deletedCourse;
  } catch (err) {
    console.error('Error deleting course by ID:', err);
    throw err;
  }
};

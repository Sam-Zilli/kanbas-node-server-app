import Course from "./model.js"; // Import the Mongoose model

// Fetch all courses
export const findAllCourses = async () => {
  try {
    const courses = await Course.find();
    console.log("courses dao.js findAllCourses: ", courses)
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

// // Create a new course
// export const createCourse = async (courseData) => {
//   console.log("+++++++++++++In dao++++++++++++++")
//   try {
//     if (courseData._id) {
//       console.log("There already a courseId?")
//       const existingCourse = await Course.findById(courseData._id);
//       if (existingCourse) {
//         await Course.findByIdAndDelete(courseData._id);
//       }
//     }
//     console.log("++++++Gonna create a new course now...+++++")
//     const newCourse = new Course(courseData);
//     console.log("New Course: ")
//     console.log(newCourse)
//     console.log("``````````````````````````````````````")
//     return await newCourse.save();
//   } catch (err) {
//     console.error('Error creating course:', err);
//     throw err;
//   }
// };



// Create a new course
export const createCourse = async (courseData) => {
  console.log("+++++++++++++ In dao ++++++++++++++");
  
  try {
    // Check if an _id is provided
    if (courseData._id) {
      // Validate the _id
      if (!mongoose.Types.ObjectId.isValid(courseData._id)) {
        throw new Error('Invalid course ID');
      }

      // Find existing course by ID
      const existingCourse = await Course.findById(courseData._id);

      // Update the existing course if it exists
      if (existingCourse) {
        console.log("Course already exists. Updating the existing course...");
        return await Course.findByIdAndUpdate(courseData._id, courseData, { new: true });
      }
    }

    // Remove _id from courseData if creating a new course
    const { _id, ...courseToSave } = courseData;

    // Create a new course
    console.log("Creating a new course...");
    const newCourse = new Course(courseToSave);
    console.log("New Course:");
    console.log(newCourse);
    console.log("``````````````````````````````````````");
    return await newCourse.save();
    
  } catch (err) {
    // Log error and rethrow
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

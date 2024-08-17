import * as dao from "./dao.js";

export default function CourseRoutes(app) {

  // Retrieve all courses
  const findAllCourses = async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).send({ message: 'Internal server error', error });
    }
  };

  // Retrieve course by ID
  const findCourseById = async (req, res) => {
    const { id } = req.params;
    try {
      const course = await dao.findCourseById(id);
      if (course) {
        res.json(course);
      } else {
        res.status(404).send({ message: 'Course not found' });
      }
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      res.status(500).send({ message: 'Internal server error', error });
    }
  };

  // Create a new course
  const createCourse = async (req, res) => {
    console.log("=============In create Course===================")
    try {
      console.log("Course body: ")
      console.log(req.body)
      console.log("=============Before Dao call===================")
      const course = await dao.createCourse(req.body);
      console.log("Course: ", course)
      res.status(201).json(course);
    } catch (error) {
      res.status(500).send({ message: 'Internal server error', error });
    }
  };

  const updateCourseById = async (req, res) => {
    const { id } = req.params; // Extract ID from URL parameters
    try {
      // Check if ID is valid
      if (!id) {
        throw new Error('Course ID is required');
      }
      const updatedCourse = await dao.updateCourseById(id, req.body, { new: true, runValidators: true });
      if (updatedCourse) {
        res.json(updatedCourse);
      } else {
        //onsole.log('Course not found for ID:', id);
        res.status(404).send({ message: 'Course not found' });
      }
    } catch (error) {
      //console.error('Error updating course:', error.message);
      res.status(500).send({ message: 'Internal server error', error: error.message });
    }
  };

  // Delete a course by ID
  const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCourse = await dao.deleteCourseById(id);
      if (deletedCourse) {
        res.sendStatus(204);
      } else {
        res.status(404).send({ message: 'Course not found' });
      }
    } catch (error) {
      //console.error('Error deleting course:', error);
      res.status(500).send({ message: 'Internal server error', error });
    }
  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:id", findCourseById); 
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:id", updateCourseById);
  app.delete("/api/courses/:id", deleteCourse);
}

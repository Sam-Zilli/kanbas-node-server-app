import * as dao from "./dao.js";

export default function CourseRoutes(app) {

  const findAllCourses = async (req, res) => {
    console.log('Request received:', req.method, req.url);
    try {
      console.log('Calling DAO to fetch courses...');
      const courses = await dao.findAllCourses();
    res.json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).send({ message: 'Internal server error', error });
    }
  };


  // GET course by ID
  const findCourseById = async (req, res) => {
    const { id } = req.params;
    try {
      console.log('Calling DAO to fetch course by ID...');
      const course = await dao.findCourseById(id);
      if (course) {
        console.log('Course retrieved:', course);
        res.json(course);
      } else {
        res.status(404).send({ message: 'Course not found' });
      }
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      res.status(500).send({ message: 'Internal server error', error });
    }
  };


  // POST endpoint to create a new course
  const createCourse = async (req, res) => {
    try {
      const course = new Course(req.body);
      const savedCourse = await course.save();
      res.status(201).json(savedCourse);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).send({ message: 'Internal server error', error });
    }
  };


  // PUT endpoint to update a course by ID
  const updateCourse = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updatedCourse) {
        return res.status(404).send({ message: 'Course not found' });
      }
      res.json(updatedCourse);
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).send({ message: 'Internal server error', error });
    }
  };

    // DELETE endpoint to delete a course by ID
    const deleteCourse = async (req, res) => {
      const { id } = req.params;
      try {
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) {
          return res.status(404).send({ message: 'Course not found' });
        }
        res.sendStatus(204); // No content
      } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).send({ message: 'Internal server error', error });
      }
    };
  

  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:id", findCourseById); 
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
}

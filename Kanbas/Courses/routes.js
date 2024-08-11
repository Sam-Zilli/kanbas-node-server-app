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

  const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(user);
  };

  // PUT endpoint to update a course by ID
  const updateCourseById = async (req, res) => {
    console.log("Update Course 1")
    const { id } = req.params;
    console.log("Update Course 2. id: ", id)
    try {
      console.log("Updated Course 3")
      const updatedCourse = await dao.updateCourseById(id, req.body, { new: true, runValidators: true });
      console.log("Updated Course Info: ", updatedCourse)
      if (!updatedCourse) {
        return res.status(404).send({ message: 'Course not found' });
      }
      console.log("Updated Course 4")
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
        const deletedCourse = await dao.deleteCourseById(id);
        if (!deletedCourse) {
          return res.status(404).send({ message: 'Course not found' });
        }
        res.sendStatus(204);
      } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).send({ message: 'Internal server error', error });
      }
    };
  

  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:id", findCourseById); 
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:id", updateCourseById);
  app.delete("/api/courses/:id", deleteCourse);
}

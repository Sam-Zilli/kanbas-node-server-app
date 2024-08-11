import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  const findAllCourses = async (req, res) => {
    console.log('Request received:', req.method, req.url);
    try {
      console.log('Calling DAO to fetch courses...');
      const courses = await dao.findAllCourses();
      console.log('Courses retrieved:', courses);
      res.send(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).send({ message: 'Internal server error', error });
    }
  };

  app.get("/api/courses", findAllCourses);
}





// TEST CODE
//import mongoose from 'mongoose';
// import Course from './model.js'
// export default function CourseRoutes(app) {
//   const findAllCourses = async (req, res) => {
//     try {
//       // Use DAO method or directly query the database
//       // const courses = await dao.findAllCourses(); 
//       const newCourse = new Course({
//         _id: 'CS101',
//         name: 'Introduction to Computer Science',
//         number: 'CS101',
//         startDate: new Date('2024-09-01'),
//         endDate: new Date('2024-12-15'),
//         department: 'Computer Science',
//         credits: 4,
//         description: 'This course introduces fundamental concepts of computer science and programming.'
//       });
//       const courses = [newCourse]; // For testing; replace with actual database query
//       res.send(courses);
//     } catch (error) {
//       res.status(500).send({ message: 'Internal server error', error });
//     }
//   };

//   app.get("/api/courses", findAllCourses);
// }

// import Database from "../Database/index.js";

// export default function CourseRoutes(app) {

//   app.put("/api/courses/:id", (req, res) => {
//     const { id } = req.params;
//     const course = req.body;
//     Database.courses = Database.courses.map((c) =>
//       c._id === id ? { ...c, ...course } : c
//     );
//     res.sendStatus(204);
//   });


//   app.delete("/api/courses/:id", (req, res) => {
//     const { id } = req.params;
//     Database.courses = Database.courses.filter((c) => c._id !== id);
//     res.sendStatus(204);
//   });


//   app.post("/api/courses", (req, res) => {
//     const course = { ...req.body,
//       _id: new Date().getTime().toString() };
//     Database.courses.push(course);
//     res.send(course);
//   });



//   app.get("/api/courses", (req, res) => {
//     const courses = Database.courses;
//     console.log("In api/courses")
//     res.send(courses);
//   });
// }


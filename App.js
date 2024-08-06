import express from "express";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./kanbas/Assignments/routes.js";

const app = express();
app.use(cors());                    // make sure cors is used right after creating the app
app.use(express.json());  
ModuleRoutes(app); 
CourseRoutes(app); 
AssignmentRoutes(app);             
Lab5(app);                          // express instance
app.listen(4000);
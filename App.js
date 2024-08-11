import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";

import cors from "cors";
import Lab5 from "./Lab5/index.js";

import CourseRoutes from "./Kanbas/Courses/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors())


        
app.use(express.json());  

app.get("/", (req, res) => {
    res.send("Yay it worked!sdfsfsdf");
  });

console.log("BACKEND RUNNING!")

ModuleRoutes(app); 
CourseRoutes(app); 
AssignmentRoutes(app);     
UserRoutes(app);        
Lab5(app);     
                     // express instance
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
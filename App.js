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

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/final-project";
mongoose.connect(CONNECTION_STRING).then(() => console.log("MongoDB Connection made")).catch((err) => console.error("MongoDB connection error:", err));;
const app = express()

app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);
app.use(express.json());


const sessionOptions = {
  secret: process.env.SESSION_SECRET || "final-project",
  resave: false,
  saveUninitialized: false,
};


// if NOT developing
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
} else {
  console.log("++++++++++++++ DEVELOPMENT ++++++++++++++++++")
}


app.use(
  session(sessionOptions)
);


app.get("/", (req, res) => {
  res.send("Yay it worked!");
});


ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
Lab5(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
});
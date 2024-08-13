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




// mongoose
//   .connect(process.env.MONGO_CONNECTION_STRING)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING).then(() => console.log("MongoDB Connection made")).catch((err) => console.error("MongoDB connection error:", err));;
const app = express()

app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "https://66babee47420600008b977be--glistening-fox-cc1c23.netlify.app" || "http://localhost:3000",
    })
);



const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};


// if NOT developing
if (process.env.NODE_ENV !== "development") {
  console.log("=============== NOT IN DEVELOPMENT ===========")
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

//console.log("BACKEND RUNNING!");
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
Lab5(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





// mongoose.connection.on('connected', () => {
//   console.log(`Mongoose connected to ${process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"}`);
// });

// mongoose.connection.on('error', (err) => {
//   console.error('Mongoose connection error:', err);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('Mongoose disconnected');
// });

// app.get('/api/debug-info', (req, res) => {
//   res.json({
//     databaseName: "kanbas",
//     connectionString: process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
//   });
// });
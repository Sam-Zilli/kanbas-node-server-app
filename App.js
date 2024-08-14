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



const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

mongoose.connect(CONNECTION_STRING)
  .then(async () => {
    console.log("MongoDB Connection made");
    console.log(CONNECTION_STRING)

    const client = mongoose.connection.client;

    // List all databases
    const admin = client.db().admin();
    const { databases } = await admin.listDatabases();

    console.log("Databases and their collections:");

    for (const dbInfo of databases) {
      const dbName = dbInfo.name;
      console.log(`\nDatabase: ${dbName}`);
    }
  })
  .catch(err => console.error("MongoDB connection error:", err));

const app = express();


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
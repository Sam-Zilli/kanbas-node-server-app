import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js"

export default function UserRoutes(app) {

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }

    const users = await dao.findAllUsers();
    res.json(users);
    return;
  };

  const findUsersByCourseId = async (req, res) => {
    const { cid } = req.params;

    // Find a way to get CourseNumber from cid I have
    const course = await courseDao.findCourseById(cid)
    const courseNumber = course.number

    const filteredUsers = await dao.findUsersByCourseNumber(courseNumber)
    res.json(filteredUsers)
}


const findUserById = async (req, res) => {
  try {
    const user = await dao.findUserById(req.params.userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;

    const updateStatus = await dao.updateUser(userId, req.body);
    if (!updateStatus) {
      return res.status(404).json({ message: "User not found or update failed" });
    }

    // get the updated user
    const updatedUser = await dao.findUserById(userId);
    // give upated user back to client
    res.json(updatedUser);
  };

  
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body; // succesfully getting username and password
    try {
      const currentUser = await dao.findUserByCredentials(username, password);
      if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
        res.status(401).json({ message: "Unable to login. Try again later." });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };


    // New function to get courses for a user by username
    const getUserCoursesByUserId = async (req, res) => {
      const { userId } = req.params;

      try {
        const user = await dao.findUserByUserId(userId);
        if (user) {
          res.json(user.courses);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    };

  app.get("/api/courses/:cid/users", findUsersByCourseId);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);

  app.get("/api/users/courses/:userId", getUserCoursesByUserId);
}

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
    console.log(cid)

    // Find a way to get CourseNumber from cid I have
    const course = await courseDao.findCourseById(cid)
    const courseNumber = course.number

    const filteredUsers = await dao.findUsersByCourseNumber(courseNumber)
    res.json(filteredUsers)
}


  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };


  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    res.json(status);
  };

  
  const signup = async (req, res) => {
    console.log("routes.js signup")
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    console.log("username isnt't taken, move onto create user...")
    console.log("-----------")
    console.log(req.body)
    console.log("-----------")
    const currentUser = await dao.createUser(req.body);
    console.log(currentUser)
    console.log("-----------")
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
}

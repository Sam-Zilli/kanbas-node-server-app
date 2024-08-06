import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
  // Delete an assignment
  app.delete('/api/assignments/:id', (req, res) => {
    const { id } = req.params;
    const index = db.assignments.findIndex(a => a._id === id);

    if (index !== -1) {
      db.assignments.splice(index, 1);
      res.sendStatus(204);
    } else {
      res.status(404).send('Assignment not found');
    }
  });

  // Create an assignment
  app.post('/api/courses/:cid/assignments', (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    console.log(`Creating assignment for course ${cid}:`, newAssignment);
    db.assignments.push(newAssignment);
    res.status(201).send(newAssignment);
  });

  // Retrieve all assignments for a specific course
  app.get('/api/courses/:cid/assignments', (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter(a => a.course === cid);
    res.json(assignments);
  });

  // Retrieve a specific assignment
  app.get('/api/assignments/:id', (req, res) => {
    const { id } = req.params;
    const assignment = db.assignments.find(a => a._id === id);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).send('Assignment not found');
    }
  });

  // Update an assignment
  app.put('/api/assignments/:id', (req, res) => {
    const { id } = req.params;
    const index = db.assignments.findIndex(a => a._id === id);

    if (index !== -1) {
      db.assignments[index] = { ...db.assignments[index], ...req.body };
      res.json(db.assignments[index]);
    } else {
      res.status(404).send('Assignment not found');
    }
  });
}

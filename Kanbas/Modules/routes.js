import * as dao from "./dao.js";

export default function ModuleRoutes(app) {

  const findModulesByCourseId = async (req, res) => {
    const { cid } = req.params;
    try {
      const modules = await dao.findModulesByCourseId(cid);
      res.json(modules);
    } catch (err) {
      console.error('Error fetching modules:', err);
      res.status(500).json({ error: err.message });
    }
  };

  const updateModule = async (req, res) => {
    const { mid } = req.params;
    try {
      const updatedModule = await dao.updateModuleById(mid, req.body);
      res.json(updatedModule);
    } catch (err) {
      console.error('Error updating module:', err);
      res.status(500).json({ error: err.message });
    }
  };

  const createModule = async (req, res) => {
    const moduleData = { ...req.body, course: req.params.cid };
    try {
      const newModule = await dao.createModule(moduleData);
      res.status(201).json(newModule);
    } catch (err) {
      console.error('Error creating module:', err);
      res.status(500).json({ error: err.message });
    }
  };

  const deleteModule = async (req, res) => {
    const { mid } = req.params;
    try {
      const deletedModule = await dao.deleteModuleById(mid);
      res.json(deletedModule);
    } catch (err) {
      console.error('Error deleting module:', err);
      res.status(500).json({ error: err.message });
    }
  };

  app.get("/api/courses/:cid/modules", findModulesByCourseId);
  app.post("/api/courses/:cid/modules", createModule);
  app.put("/api/modules/:mid", updateModule);
  app.delete("/api/modules/:mid", deleteModule);
}
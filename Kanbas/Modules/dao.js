import Module from './model.js'; 

export const findModulesByCourseId = async (courseId) => {
  try {
    return await Module.find({ course: courseId });
  } catch (err) {
    console.error('Error fetching modules by course ID:', err);
    throw err;
  }
};

export const findModuleById = async (id) => {
  try {
    const module = await Module.findById(id);
    if (!module) {
      throw new Error('Module not found');
    }
    return module;
  } catch (err) {
    console.error('Error fetching module by ID:', err);
    throw err;
  }
};

export const createModule = async (moduleData) => {
  try {
    const newModule = new Module(moduleData);
    return await newModule.save();
  } catch (err) {
    console.error('Error creating module:', err);
    throw err;
  }
};

export const updateModuleById = async (id, moduleData) => {
  try {
    const updatedModule = await Module.findByIdAndUpdate(id, moduleData, { new: true, runValidators: true });
    if (!updatedModule) {
      throw new Error('Module not found');
    }
    return updatedModule;
  } catch (err) {
    console.error('Error updating module by ID:', err);
    throw err;
  }
};

export const deleteModuleById = async (id) => {
  try {
    const deletedModule = await Module.findByIdAndDelete(id);
    if (!deletedModule) {
      throw new Error('Module not found');
    }
    return deletedModule;
  } catch (err) {
    console.error('Error deleting module by ID:', err);
    throw err;
  }
};
import Module from './model.js'; 
import Course from '../Courses/model.js'
import mongoose from "mongoose";

export const findModulesByCourseId = async (courseId) => {
  try {

    const course = await Course.findById(courseId);
    const modules = await Module.find({ course: course.number });

    return modules;
  } catch (err) {
    console.error('Error fetching modules:', err);
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
    //console.error('Error fetching module by ID:', err);
    throw err;
  }
};

export const createModule = async (moduleData) => {
  try {
    const course = await Course.findById(moduleData.course);

    if (!course) {
      throw new Error('Course not found');
    }
    const courseNumber = course.number;
    moduleData.course = courseNumber;
    const newModule = new Module(moduleData);
    return await newModule.save();
  } catch (err) {
    console.error('Error creating module:', err);
    throw err;
  }
};

export const updateModuleById = async (mid, moduleData) => {
  try {

    const updatedModule = await Module.findByIdAndUpdate(mid, moduleData, { new: true, runValidators: true });   
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
    //console.error('Error deleting module by ID:', err);
    throw err;
  }
};
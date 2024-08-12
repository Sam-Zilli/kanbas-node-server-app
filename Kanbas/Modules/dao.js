import Module from './model.js'; 
import Course from '../Courses/model.js'
import mongoose from "mongoose";

export const findModulesByCourseId = async (courseId) => {
  try {

    //console.log("dao.js findModulesByCourseId");

    const course = await Course.findById(courseId);

    // Fetch modules associated with the found course
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
    console.log("createModule 1, Course: ", course)
    const courseNumber = course.number;
    console.log("createModule 2, Course: ", courseNumber)
    moduleData.course = courseNumber;
    console.log("createModule 3, moduleData: ", moduleData)
    const newModule = new Module(moduleData);
    console.log("in doa createModule: ", newModule)
    return await newModule.save();
  } catch (err) {
    console.error('Error creating module:', err);
    throw err;
  }
};

export const updateModuleById = async (mid, moduleData) => {
  try {
    console.log("in DAO updateModuleById")

    const oldModule = await Module.findById(mid)
    // console.log("Old Module: ", oldModule) 


    const updatedModule = await Module.findByIdAndUpdate(mid, moduleData, { new: true, runValidators: true });   
    console.log("dao after updatedModule")
    
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
    console.log("dao deleteModuleById, id: ", id)
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
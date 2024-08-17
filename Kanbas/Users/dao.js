import User from "./model.js";

export const createUser = (user) => User.create(user);

export const findAllUsers = () => User.find();

export const findUserById = (userId) => User.findById(userId);

export const findUserByUsername = (username) => {
  return User.findOne({ username: username });
};

export const findUserByCredentials = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      return user;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const findUsersByRole = (role) => User.find({ role: role });


export const updateUser = async (userId, user) => {
  try {
    // Update the user
    await User.updateOne({ _id: userId }, { $set: user });

    // Fetch the updated user
    const updatedUser = await User.findById(userId).exec();

    if (!updatedUser) {
      return;
    }

  } catch (err) {
    // Log any errors
    console.error('Error updating user:', err);
  }
};

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); 
  return User.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};

export const deleteUser = (userId) => User.deleteOne({ _id: userId });

export const findUsersByCourseNumber = (courseNumber) => {
  return User.find({ courses: courseNumber });
};


export const addCourseToUser = async (userId, courseNumber) => {
  try {
    // Add the course number to the user's courses array
    await User.updateOne(
      { _id: userId },
      { $addToSet: { courses: courseNumber } } // $addToSet ensures no duplicates
    );

    // Fetch the updated user to confirm
    const updatedUser = await User.findById(userId).exec();
    if (updatedUser) {
    }

  } catch (err) {
    // Log any errors
    console.error('Error adding course to user:', err);
  }
};


export const removeCourseFromUser = async (userId, courseNumber) => {
  try {
    // Remove the course number from the user's courses array
    await User.updateOne(
      { _id: userId },
      { $pull: { courses: courseNumber } } // $pull removes the specified value
    );

    // Fetch the updated user to confirm
    const updatedUser = await User.findById(userId).exec();
    if (updatedUser) {
    }

  } catch (err) {
    // Log any errors
    console.error('Error removing course from user:', err);
  }
};

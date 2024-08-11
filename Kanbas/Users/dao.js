import User from "./model.js";

export const createUser = (user) => User.create(user);

export const findAllUsers = () => User.find();

export const findUserById = (userId) => User.findById(userId);

export const findUserByUsername = (username) => User.findOne({ username: username });

export const findUserByCredentials = (username, password) =>
  User.findOne({ username, password });

export const findUsersByRole = (role) => User.find({ role: role }); // or just User.find({ role })

export const updateUser = (userId, user) => User.updateOne({ _id: userId }, { $set: user });

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return User.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};


export const deleteUser = (userId) => User.deleteOne({ _id: userId });
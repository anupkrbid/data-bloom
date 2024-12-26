// const mongoose = require('mongoose');

// const User = require('../models/user');

// exports.getUsers = (req, res, next) => {
//   User.find()
//     .exec()
//     .then((results) => {
//       res.status(200).json({
//         status: true,
//         message: 'USERS GET',
//         results: results
//       });
//     })
//     .catch((error) => next(new Error(error)));
// };

// exports.getUser = (req, res, next) => {
//   User.find({ _id: req.params.userId })
//     .exec()
//     .then((result) => {
//       res.status(200).json({
//         status: true,
//         message: 'USERS GET',
//         result: result
//       });
//     })
//     .catch((error) => next(new Error(error)));
// };

// exports.postUser = (req, res, next) => {
//   const user = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     created_at: new Date(),
//     updated_at: new Date()
//   });
//   user
//     .save()
//     .then((result) => {
//       res.status(201).json({
//         status: true,
//         message: 'USER POST',
//         result: result
//       });
//     })
//     .catch((error) => next(new Error(error)));
// };

// exports.patchUser = (req, res, next) => {
//   const toUpdate = {};
//   for (const key in req.body) {
//     if (req.body.hasOwnProperty(key)) {
//       toUpdate[key] = req.body[key];
//       toUpdate['updated_at'] = new Date();
//     }
//   }
//   User.update({ _id: req.params.userId }, { $set: toUpdate })
//     .exec()
//     .then((result) => {
//       res.status(200).json({
//         status: true,
//         message: 'USER PATCH',
//         result: result
//       });
//     })
//     .catch((error) => next(new Error(error)));
// };

// exports.deleteUser = (req, res, next) => {
//   User.remove({ _id: req.params.userId })
//     .exec()
//     .then((result) => {
//       res.status(200).json({
//         status: true,
//         message: 'USER DELETE'
//       });
//     })
//     .catch((error) => next(new Error(error)));
// };

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id:  String,
  name: String,
  email: String,
  validEmail: Boolean,
  password: String,
  createdAt: Date,
  updatedAt: Date
}, {collection: 'users'});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  validEmail: Boolean,
  password: {
    salt: String,
    passwordHash: String
  },
  created_at: Date,
  updated_at: Date
}, {collection: 'users'});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;
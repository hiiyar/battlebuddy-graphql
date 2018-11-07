const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boostSchema = new Schema({
  id: String,
  name: String,
  value: Number,
  matches: Number,
  order: Number,
  icons: [
    {
      name: String,
      extension: String
    }
  ]
});

const BoostModel = mongoose.model('BoostModel', boostSchema);

module.exports = BoostModel;
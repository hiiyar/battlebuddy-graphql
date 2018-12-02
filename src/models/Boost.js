const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boostSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  value: Number,
  matches: Number,
  index: Number,
  icons: [
    {
      name: String,
      extension: String
    }
  ]
}, {collection: 'boosts'});

const BoostModel = mongoose.model('BoostModel', boostSchema);

module.exports = BoostModel;
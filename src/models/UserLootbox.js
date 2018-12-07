const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLootboxSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  status: String,
  open_time: String,
  server_time: String,
  opened_at: String,
  created_at: String,
  updated_at: String,
  selected_item: String,
  lootbox: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    icons: [
      {
        type: { type: String },
        name: String,
        extension: String,
        url: String
      }
    ],
    items: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        description: String,
        icons: [
          {
            type: { type: String },
            name: String,
            extension: String,
            url: String
          }
        ]
      }
    ]
  },
  user: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String
  }
}, { collection: 'userLootbox' });

const UserLootboxModel = mongoose.model('UserLootboxModel', userLootboxSchema);

module.exports = UserLootboxModel;
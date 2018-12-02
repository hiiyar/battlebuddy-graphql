const mongoose = require('mongoose');

const lootboxSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  items: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      description: String
    }
  ],
  icons: [
    {
      type: String,
      name: String,
      extension: String,
      url: String
    }
  ]
}, { collection: 'lootboxes' });

const LootboxModel = mongoose.model('Lootbox', lootboxSchema);

module.exports = LootboxModel;
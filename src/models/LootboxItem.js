const mongoose = require('mongoose');

const lootboxItemSchema = new mongoose.Schema({
  id:  { type: String },
  name: { type: String },
  icons: [
    {
      name: { type: String },
      extension: { type: String }
    }
  ]
}, { collection: 'lootboxes' });

const LootboxModel = mongoose.model('Lootbox', lootboxSchema);

module.exports = LootboxModel;
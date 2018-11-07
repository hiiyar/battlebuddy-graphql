const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  id:  String,
  status: String,
  founds: Number
}, {collection: 'wallets'});

const WalletModel = mongoose.model('WalletModel', walletSchema);

module.exports = WalletModel;
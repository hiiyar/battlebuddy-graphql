const WalletModel = require('../../models/Wallet');
const UserLootboxModel = require('../../models/UserLootbox');

const User = {
    
  wallet: async (parent, args, ctx, info) => {
    const wallet = await WalletModel.findOne({user_id: parent.id});
    wallet.id = wallet._id.toString();
    return wallet;
  }, 

  inventory: async (parent, args, ctx, info) => {
    const inventory = await UserLootboxModel.where({"user._id": parent.id});
    
    return inventory.map(x => {
      x.server_time = (new Date()).toISOString();
      return x;
    });
  }

}

module.exports = User;

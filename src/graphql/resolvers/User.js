const WalletModel = require('../../models/Wallet');
const UserLootboxModel = require('../../models/UserLootbox');

const User = {
    
  wallet: async (parent, args, ctx, info) => {
    const wallet = await WalletModel.findOne({user_id: parent.id});
    wallet.id = wallet._id.toString();
    return wallet;
  }, 

  lootboxes: async (parent, args, ctx, info) => {
    const lootboxes = await UserLootboxModel.find({"user._id": parent.id}).select('lootbox');
    return lootboxes.map(x => {
      x = x.lootbox;
      x = x.toObject();
      x.id = x._id.toString();
      return x;
    });
  }

}

module.exports = User;

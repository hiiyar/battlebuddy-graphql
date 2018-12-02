const WalletModel = require('../../models/Wallet');

const User = {
    
  wallet: async (parent, args, ctx, info) => {
    const wallet = await WalletModel.findOne({user_id: parent.id});
    wallet.id = wallet._id.toString();
    return wallet;
  }, 

  lootboxes: async (parent, args, ctx, info) => {
    console.log('Dr Hans Chucrutes...');
    return null;
  }

}

module.exports = User;

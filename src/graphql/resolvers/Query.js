const sorter = require('../../helpers/sorter');
const crypto = require('../../helpers/crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config/app');

const UserModel = require('../../models/User');
const BoostModel = require('../../models/Boost');
const LootboxModel = require('../../models/Lootbox');
const UserLootboxModel = require('../../models/UserLootbox');

const Query = {

  user: async (parent, args, ctx, info) => {
    return await UserModel.findOne({_id: args.id});
  },

  users: async (parent, { orderBy }, ctx, info) => {
    return await UserModel.find({}).sort(sorter.makeSort(orderBy));
  },

  boosts: async (parent, { orderBy }, ctx, info) => {
    return await BoostModel.find({}).sort(sorter.makeSort(orderBy));
  },

  lootboxes: async (parent, { orderBy }, ctx, info) => {
    return await LootboxModel.find({}).sort(sorter.makeSort(orderBy));
  },

  roulette: async (parent, { idUserLootbox }, ctx, info) => {
    const userLootbox = await UserLootboxModel.findOne({_id: idUserLootbox});
    const lootbox = userLootbox.lootbox;
    const positionItemSelected = 20;
    const countItemsRoulette = 50;
    let rouletteItems = [];

    if (lootbox.items){
      const items = lootbox.items;
      
      const selected = lootbox.items.filter((x) => {
        return x.id === userLootbox.selected_item;
      })[0];

      for(let i = 0; i < countItemsRoulette; i++)
      {
        let index = Math.floor(Math.random() * items.length);
        i == (positionItemSelected-1) ? rouletteItems.push(selected) : rouletteItems.push(items[index]);
      }
    }
    
    return {
      selected_item: userLootbox.selected_item,
      user: userLootbox.user,
      lootbox: userLootbox.lootbox,
      items: rouletteItems
    };
  },

  login: async (parent, { email, password }, ctx, info) => {
    let user = await UserModel.findOne({email: email });
              
    if (!user)
      throw new Error('User not found...');
    
    if (!crypto.checkPasswordHash(password, user.password)) 
      throw new Error('Invalid login');
    
    return {
        user,
        token: jwt.sign({id: user.id, email: user.email}, config.jwt.secret, {})
    };
  }

}

module.exports = Query;
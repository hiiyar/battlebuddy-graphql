const UserLootbox = {

  lootbox: async (parent, args, ctx, info) => {
    parent.lootbox.id = parent.lootbox._id.toString();
    return parent.lootbox;
  }, 

};

module.exports = UserLootbox;
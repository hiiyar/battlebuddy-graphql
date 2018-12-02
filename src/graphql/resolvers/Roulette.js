
const Roulette = {

  lootbox: async (parent, args, ctx, info) => {
    parent.lootbox.id = parent.lootbox._id.toString();
    return parent.lootbox;
  },

  user: async (parent, args, ctx, info) => {
    parent.user.id = parent.user._id.toString();
    return parent.user;
  },

  items: async (parent, args, ctx, info) => {
    return parent.items;
  },

}

module.exports = Roulette;
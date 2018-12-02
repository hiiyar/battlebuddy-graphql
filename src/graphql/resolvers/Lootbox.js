const Lootbox = {

  items: async (parent, args, ctx, info) => {
    return parent.items;
  }, 

  icons: async (parent, args, ctx, info) => {
    return parent.icons;
  }, 

};

module.exports = Lootbox;
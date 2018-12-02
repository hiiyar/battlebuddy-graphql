const Item = {
  icons: async (parent, { type }, ctx, info) => {
    return parent.icons;
  }
}

module.exports = Item;
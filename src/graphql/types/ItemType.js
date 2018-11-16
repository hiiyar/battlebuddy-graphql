const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;
const ItemIconType = require('./ItemIconType');

function ItemTypeFunction(){
}
module.exports = ItemTypeFunction;

ItemTypeFunction.query = new GraphQLObjectType({
    name: "Item",
    description: "Item premiation",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        icon: { type: ItemIconType.query }
    })
  });

ItemTypeFunction.input = null;

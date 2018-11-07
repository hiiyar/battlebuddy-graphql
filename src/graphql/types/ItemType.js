const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

function ItemTypeFunction(){
}
module.exports = ItemTypeFunction;

ItemTypeFunction.query = new GraphQLObjectType({
    name: "Item",
    description: "Item premiation",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    })
  });

ItemTypeFunction.input = null;

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

function ItemIconFunction(){
}
module.exports = ItemIconFunction;

ItemIconFunction.query = new GraphQLObjectType({
  name: 'ItemIcon',
  fields: () => ({
      name: {type: GraphQLString },
      extension: { type: GraphQLString }
  })
});
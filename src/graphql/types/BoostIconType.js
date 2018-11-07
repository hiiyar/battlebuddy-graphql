const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLFloat, GraphQLInt  } = graphql;

function BoostIconFunction(){
}
module.exports = BoostIconFunction;

BoostIconFunction.query = new GraphQLObjectType({
  name: 'BoostIcon',
  fields: () => ({
      name: {type: GraphQLString },
      extension: { type: GraphQLString }
  })
});
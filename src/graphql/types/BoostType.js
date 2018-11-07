const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLFloat, GraphQLInt  } = graphql;

function BoostTypeFunction(){
}
module.exports = BoostTypeFunction;

const BoostIconType = require('./BoostIconType');

const boosticons = require('../../../data/boosticons.json');

BoostTypeFunction.query = new GraphQLObjectType({
    name: 'Boost',
    description: 'Entity Boost on application',
    fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
        value: { type: GraphQLFloat },
        order: { type: GraphQLInt },
        matches: { type: GraphQLInt },
        icon: { 
            type: BoostIconType.query,
            resolve(parent, args) {
                return _.find(boosticons, {"boost_id" : parent.id });
            } 
        }
    })
  });

BoostTypeFunction.input = new GraphQLInputObjectType({
  name: 'BoostInputType',
  description: 'Boost payload definition',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    value: { type: GraphQLFloat },
    order: { type: GraphQLInt },
    matches: { type: GraphQLInt }
  }),
});

const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

function RouletteTypeFunction(){
}
module.exports = RouletteTypeFunction;

const ItemType = require('./LootboxItemType');

RouletteTypeFunction.query = new GraphQLObjectType({
    name: 'Roulette',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        items: {
            type: GraphQLList(ItemType.query)
        }
    })
});

RouletteTypeFunction.input = null;
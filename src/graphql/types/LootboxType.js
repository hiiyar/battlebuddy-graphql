const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

function LootboxTypeFunction(){
}
module.exports = LootboxTypeFunction;

const UserType = require('./UserType');
const LootBoxItemType = require('./LootboxItemType');

const userlootboxes = require('../../../data/userlootboxes.json');
const lootboxitems = require('../../../data/lootboxitems.json');

LootboxTypeFunction.query = new GraphQLObjectType({
    name: 'LootBox',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        users: {
            type: GraphQLList(UserType.query),
            resolve(parent, args){
                return _.filter(userlootboxes, (box) => {
                    return box.lootbox_id === parent.id;
                });
            }
        },
        items: {
            type: GraphQLList(LootBoxItemType.query),
            resolve(parent, args){
                return _.filter(lootboxitems, (lootbox) => {
                    return lootbox.lootbox_id === parent.id;
                });
            }
        }
    })
});

LootboxTypeFunction.input = null;
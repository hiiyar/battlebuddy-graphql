const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType } = graphql;

function LootBoxItemTypeFunction(){
}
module.exports = LootBoxItemTypeFunction;

const LootBoxType = require('./LootboxType');
const ItemType = require('./ItemType');


LootBoxItemTypeFunction.query = new GraphQLObjectType({
    name: "LootboxItem",
    description: "",
    fields: () => ({
        lootbox: {
            type: LootBoxType.query,
            resolve(parent, args){
                return _.find(lootboxitems, { id: parent.lootbox_id })
            }
        },
        item: {
            type: ItemType.query,
            resolve(parent, args){
                return _.find(items, { id: parent.item_id })
            }
        },
    })
});

LootBoxItemTypeFunction.input = null;

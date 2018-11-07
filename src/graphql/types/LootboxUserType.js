const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLFloat } = graphql;

function LootBoxUserFunction(){
}
module.exports = LootBoxUserFunction;

const UserType = require('./UserType');
const LootBoxType = require('./LootboxType');

const users = require('../../../data/users.json');
const lootboxes = require('../../../data/lootboxes.json');

LootBoxUserFunction.query = new GraphQLObjectType(
    {
        name: 'LootBoxUser',
        fields: () => ({
            status: { type: GraphQLString },
            dt_opened: { type: GraphQLString },
            server_time: { type: GraphQLFloat },
            open_time: { type: GraphQLFloat },
            user: {
                type: UserType.query,
                resolve(parent, args){
                    return _.find(users, { id: parent.user_id })
                }
            },
            lootbox: {
                type: LootBoxType.query,
                resolve(parent, args){
                    return _.find(lootboxes, { id: parent.lootbox_id })
                }
            }
        })
    }
);

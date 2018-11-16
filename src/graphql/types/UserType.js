const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLID } = graphql;

//GAMBETA
function UserTypeFunction(){
}
module.exports = UserTypeFunction;

const WalletType = require('./WalletType');
const LootBoxUserType = require('./LootboxUserType');

const WalletModel = require('../../models/Wallet');

const userlootboxes = require('../../../data/userlootboxes.json');

UserTypeFunction.query = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        wallet: {
            type: WalletType.query,
            resolve(parent, args){
                return WalletModel.find({user_id: parent.id});
            }
        },
        lootboxes : {
            type: GraphQLList(LootBoxUserType.query),
            resolve(parent, args){
                return _.filter(userlootboxes, (lootbox) => {
                    return lootbox.user_id === parent.id;
                });
            }
        }
    })
});

UserTypeFunction.input = new GraphQLInputObjectType({
    name: 'UserInputType',
    description: 'User payload definition',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    }),
});


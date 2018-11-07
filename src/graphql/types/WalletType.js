const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat } = graphql;

function WalletTypeFunction(){
}
module.exports = WalletTypeFunction;

const TransactionType =  require('./TransactionType');

const transactions = require('../../../data/transactions.json');

WalletTypeFunction.query = new GraphQLObjectType({
    name: 'Wallet',
    description: 'Wallet have the founds to buy boosts',
    fields: () => ({
        id: { type: GraphQLString },
        status: { type: GraphQLString },
        funds: { type: GraphQLFloat },
        transactions: {
            type: GraphQLList(TransactionType.query),
            resolve(parent, args){
                return _.filter(transactions, (transaction) => {
                    return transaction.wallet_id === parent.id;
                });
            }
        }
    })
});
    
WalletTypeFunction.input = null;

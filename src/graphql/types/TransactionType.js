const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLFloat } = graphql;

function TransactionTypeFunction(){
}
module.exports = TransactionTypeFunction;

const WalletType = require('./WalletType');

const wallet = require('../../../data/wallet.json');

TransactionTypeFunction.query = new GraphQLObjectType({
        name: 'Transaction',
        description: 'Transaction made on user Wallet',
        fields: () => ({
            wallet: { 
                type: WalletType.query,
                resolve(parent, args){
                    return _.find(wallet, {id: parent.wallet_id });
                }
            },
            type: { type: GraphQLString },
            value: { type: GraphQLFloat },
            description: { type: GraphQLString },
            dt_transaction: { type: GraphQLString }
        })
    });

TransactionTypeFunction.input = null;

const graphql = require('graphql');
const _ = require('lodash');

const lootboxes = require('../data/lootboxes.json');
const users = require('../data/users.json');
const userlootboxes = require('../data/userlootboxes.json');
const boosts = require('../data/boosts.json');
const boosticons = require('../data/boosticons.json');
const wallet = require('../data/wallet.json');
const transactions = require('../data/transactions.json');
const items = require('../data/items.json');
const lootboxitems = require('../data/lootboxitems.json');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLFloat, GraphQLInt  } = graphql;

const LootBoxType = new GraphQLObjectType({
   name: 'LootBox',
   fields: () => ({
       id: { type: GraphQLString },
       name: { type: GraphQLString },
       users: {
           type: GraphQLList(LootBoxUserType),
           resolve(parent, args){
               return _.filter(userlootboxes, (box) => {
                  return box.lootbox_id === parent.id;
               });
           }
       },
       items: {
           type: GraphQLList(LootBoxItemType),
           resolve(parent, args){
             return _.filter(lootboxitems, (lootbox) => {
                return lootbox.lootbox_id === parent.id;
             });
           }
       }
   })
});

const ItemType = new GraphQLObjectType({
    name: "Item",
    description: "Item premiation",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    })
})

const LootBoxItemType = new GraphQLObjectType({
    name: "LootboxItem",
    description: "",
    fields: () => ({
        lootbox: {
            type: LootBoxType,
            resolve(parent, args){
                return _.find(lootboxitems, { id: parent.lootbox_id })
            }
        },
        item: {
            type: ItemType,
            resolve(parent, args){
                return _.find(items, { id: parent.item_id })
            }
        },
    })
})

const LootBoxUserType = new GraphQLObjectType({
   name: 'LootBoxUser',
   fields: () => ({
       status: { type: GraphQLString },
       dt_opened: { type: GraphQLString },
       user: {
           type: UserType,
           resolve(parent, args){
               return _.find(users, { id: parent.user_id })
           }
       },
       lootbox: {
           type: LootBoxType,
           resolve(parent, args){
               return _.find(lootboxes, { id: parent.lootbox_id })
           }
       }
   })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
       id: { type: GraphQLString },
       name: { type: GraphQLString },
       email: { type: GraphQLString },
       wallet: {
           type: WalletType,
           resolve(parent, args){
               return _.find(wallet, {user_id: parent.id });
           }
       },
       lootboxes : {
           type: GraphQLList(LootBoxUserType),
           resolve(parent, args){
               return _.filter(userlootboxes, (lootbox) => {
                   return lootbox.user_id === parent.id;
               });
           }
       }
    })
})

const BoostIconType = new GraphQLObjectType({
    name: 'BoostIcon',
    fields: () => ({
        name: {type: GraphQLString },
        extension: { type: GraphQLString }
    })
})

const BoostType = new GraphQLObjectType({
    name: 'Boost',
    description: 'Entity Boost on application',
    fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
        value: { type: GraphQLFloat },
        order: { type: GraphQLInt },
        matches: { type: GraphQLInt },
        icon: { 
            type: BoostIconType,
            resolve(parent, args) {
                return _.find(boosticons, {"boost_id" : parent.id });
            } 
        }
    })
})

const WalletType = new GraphQLObjectType({
    name: 'Wallet',
    description: 'Wallet have the founds to buy boosts',
    fields: () => ({
        id: { type: GraphQLString },
        status: { type: GraphQLString },
        founds: { type: GraphQLFloat },
        transactions: {
            type: GraphQLList(TransactionType),
            resolve(parent, args){
                return _.filter(transactions, (transaction) => {
                    return transaction.wallet_id === parent.id;
                });
            }
        }
    })
})

const TransactionType = new GraphQLObjectType({
    name: 'Transaction',
    description: 'Transaction made on user Wallet',
    fields: () => ({
        wallet: { 
            type: WalletType,
            resolve(parent, args){
                return _.find(wallet, {id: parent.wallet_id });
            }
        },
        type: { type: GraphQLString },
        value: { type: GraphQLFloat },
        description: { type: GraphQLString },
        dt_transaction: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: {
       lootbox: {
           type: LootBoxType,
           args: { id: { type: GraphQLString }},
           resolve(parent, args){
                return _.find(lootboxes, { id: args.id });
           }
       },
       lootboxes: {
           type: GraphQLList(LootBoxType),
           resolve(parent, args){
               console.log(parent);
               return lootboxes;
           }
       },
       user: {
           type: UserType,
           args: { id: { type: GraphQLString }},
           resolve(parent, args){
               return _.find(users, {id: args.id});
           }
       },
       users: {
           type: GraphQLList(UserType),
           resolve(parent, args){
               return users;
           }
       },
       boosts: {
           type: GraphQLList(BoostType),
           resolve(parent, args){
               return boosts;
           }
       }
   }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

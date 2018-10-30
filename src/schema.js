const graphql = require('graphql');
const _ = require('lodash');

const lootboxes = require('../data/lootboxes.json');
const users = require('../data/users.json');
const userlootboxes = require('../data/userlootboxes.json');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

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
       }
   })
});

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
       }
   }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

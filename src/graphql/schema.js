const graphql = require('graphql');
const _ = require('lodash');

const userModel = require('../models/User');
const lootboxModel = require('../models/Lootbox');
const boostModel = require('../models/Boost');

const LootBoxType = require('./types/LootboxType');
const UserType = require('./types/UserType');
const BoostType = require('./types/BoostType');

const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLSchema, GraphQLList, GraphQLFloat, GraphQLInt  } = graphql;

const RootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: {
       lootbox: {
           type: LootBoxType.query,
           args: { id: { type: GraphQLString }},
           resolve(parent, args){
                return lootboxModel.find({ id: args.id });
           }
       },
       lootboxes: {
           type: GraphQLList(LootBoxType.query),
           resolve(parent, args){
                return lootboxModel.find();
           }
       },
       user: {
           type: UserType.query,
           args: { id: { type: GraphQLString }},
           resolve(parent, args){
               return userModel.find({id: args.id});
           }
       },
       users: {
           type: GraphQLList(UserType.query),
           resolve(parent, args){
               return userModel.find({});
           }
       },
       boosts: {
           type: GraphQLList(BoostType.query),
           resolve(parent, args){
               return boostModel.find({});
           }
       }
   }
});

const RootMutation = new GraphQLObjectType({
    name: 'MutationQuery',
    fields: {
        createUser: {
            type: UserType.query,
            args: {
                input: {
                    type: new GraphQLNonNull(UserType.input),
                },
            },
            resolve: async (rootValue, { input }) => {
                if (!isEmail(input.email)) {
                    throw new Error('The email is not in a valid format');
                }
                const result = await userModel.create(input);
                return result;
            },
        },
        updateUser: {
            type: UserType.query,
            args: {
                id: { type: GraphQLInt },
                input: {
                    type: new GraphQLNonNull(UserType.input),
                },
            },
            resolve: async (rootValue, { input }) => {
                if (!isEmail(input.email)) {
                    throw new Error('The email is not in a valid format');
                }
                const result = await userModel.findById(args.id).update(input);
                return result;
            },
        },
    }
 });

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

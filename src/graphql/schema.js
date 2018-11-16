const graphql = require('graphql');
const mongoose = require('mongoose');
const sorter = require('../helpers/sorter');
const _ = require('lodash');

const userModel = require('../models/User');
const lootboxModel = require('../models/Lootbox');
const boostModel = require('../models/Boost');

const LootBoxType = require('./types/LootboxType');
const UserType = require('./types/UserType');
const BoostType = require('./types/BoostType');

const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLSchema, GraphQLList, GraphQLFloat, GraphQLInt  } = graphql;

const crypto = require('../helpers/crypto');

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
           args: { orderBy: {
               type: GraphQLString
           } },
           resolve: async (parent, { orderBy = null }) => {

                orderBy = sorter.makeSort(orderBy);
                if (!orderBy)
                    orderBy = sorter.makeSort("name_ASC");

                let lootboxes = await lootboxModel.find({}).sort(orderBy);
                
                return lootboxes.map((x) => {
                    x._id = x._id.toString();
                    return x;
                });
           }
       },
       user: {
           type: UserType.query,
           args: { id: { type: GraphQLString }},
           resolve: async (parent, { id }) => {
               let user = await userModel.findOne({_id: id});
               return user;
           }
       },
       users: {
            type: GraphQLList(UserType.query),
            args: { orderBy: {
                type: GraphQLString
            } },
           resolve: async (parent, { orderBy = null }) => {
                orderBy = sorter.makeSort(orderBy);
                if (!orderBy)
                    orderBy = sorter.makeSort("name_ASC");

                let users = await userModel.find({}).sort(orderBy);
                return users.map((x) => {
                    x._id = x._id.toString();
                    return x;
                });
           }
       },
       boosts: {
           type: GraphQLList(BoostType.query),
           resolve(parent, args){
               return boostModel.find({});
           }
       },
        login: {
            type: UserType.query,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve: async (parent, { email, password }) => {
                let user = await userModel.findOne({email: email });
                
                if (!user){
                    throw new Error('User not found...');
                }
                
                if (!crypto.checkPasswordHash(password, user.password)) {
                    throw new Error('Invalid login');
                }
                
                return user;
            },
        }
   }
});

const RootMutation = new GraphQLObjectType({
    name: 'MutationQuery',
    fields: {
        createUser: {
            type: UserType.query,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                pass: { type: GraphQLString },
            },
            resolve: async (parent, { name, email, pass }) => {
                if (!email) {
                    throw new Error('The email is not in a valid format');
                }

                let docs = await userModel.count({email: email});
                if (docs > 0){
                    throw new Error('Email in use by another user');
                }

                let user = new userModel({
                    _id: new mongoose.Types.ObjectId(),
                    name,
                    email,
                    password: crypto.createPasswordHash(pass),
                    createdAt: (new Date()).toString(),
                    updatedAt: (new Date()).toString()
                });

                const result = await user.save();
                result.id = result._id.toString();

                return result;
            },
        },
        updateUser: {
            type: UserType.query,
            args: {
                name: { type: GraphQLString },
                id: { type: GraphQLString },
            },
            resolve: async (parent, { name, id }) => {
                
                let user = await userModel.findOne({_id: new mongoose.Types.ObjectId(id) });
                
                if (!user){
                    throw new Error('User not found...');
                }
                
                user.name = name;
                user.updatedAt = (new Date()).toString();

                const result = await user.save();
                result.id = result._id.toString();

                return result;
            },
        },
        removeUser: {
            type: UserType.query,
            args: {
                id: { type: GraphQLString },
            },
            resolve: async (parent, { id }) => {
                
                return await userModel.deleteOne({_id: new mongoose.Types.ObjectId(id) });
                
            },
        },
        changePass: {
            type: UserType.query,
            args: {
                id: { type: GraphQLString },
                newpass: { type: GraphQLString },
            },
            resolve: async (parent, { id, newpass }) => {
                let user = await userModel.findOne({_id: new mongoose.Types.ObjectId(id) });
                
                if (!user){
                    throw new Error('User not found...');
                }
                
                newPassword = crypto.createPasswordHash(newpass);
                
                user.password = newPassword;
                user.updatedAt = (new Date()).toString();

                const result = await user.save();
                result.id = result._id.toString();

                return result;
            },
        }
    }
 });

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

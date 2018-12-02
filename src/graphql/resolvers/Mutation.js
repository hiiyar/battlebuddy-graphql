const crypto = require('../../helpers/crypto');
const mongoose = require('mongoose');

const UserModel = require('../../models/User');

const Mutation = {
  createUser: async (parent, { name, email, password }, ctx, info) => {
    if (!email) {
        throw new Error('The email is not in a valid format');
    }
  
    let docs = await UserModel.count({email: email});
    if (docs > 0){
        throw new Error('Email in use by another user');
    }
  
    let user = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password: crypto.createPasswordHash(password),
        created_at: (new Date()).toString(),
        updated_at: (new Date()).toString()
    });
  
    const result = await user.save();
    result.id = result._id.toString();
  
    return result;
  },

  updateUser: async (parent, { id, name }, ctx, info) => {
    let user = await UserModel.findOne({_id: id });
        
    if (!user){
        throw new Error('User not found...');
    }
        
    user.name = name;
    user.updated_at = (new Date()).toString();

    const result = await user.save();
    result.id = result._id.toString();

    return result;
    
  },

  removeUser: async (parent, { id }, ctx, info) => {
    return await UserModel.deleteOne({_id: new mongoose.Types.ObjectId(id) });
  },

  changePassword: async (parent, {id, newPassword}, ctx, info) => {
    
    let user = await UserModel.findOne({_id: new mongoose.Types.ObjectId(id) });
    
    if (!user){
        throw new Error('User not found...');
    }
    
    user.password = crypto.createPasswordHash(newPassword);
    user.updated_at = (new Date()).toString();

    const result = await user.save();
    result.id = result._id.toString();

    return result;
      
  },
  
}

module.exports = Mutation;
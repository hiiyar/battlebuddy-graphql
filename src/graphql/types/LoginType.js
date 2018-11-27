const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = require('./UserType');

function LoginTypeFunction(){
}
module.exports = LoginTypeFunction;

LoginTypeFunction.query = new GraphQLObjectType({
    name: "Login",
    description: "Login",
    fields: () => ({
        user: { type: UserType.query },
        token: { type: GraphQLString }
    })
  });

LoginTypeFunction.input = null;

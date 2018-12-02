const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');

const cors = require('./middlewares/cors');
const database = require('./config/database');
const appConfig = require('./config/app');
const mongoose = require('mongoose');

const QueryResolver  = require('./graphql/resolvers/Query');
const MutationResolver  = require('./graphql/resolvers/Mutation');
const UserResolver  = require('./graphql/resolvers/User');
const LootboxResolver  = require('./graphql/resolvers/Lootbox');
const RouletteResolver  = require('./graphql/resolvers/Roulette');
const ItemResolver  = require('./graphql/resolvers/Item');

const app = express();

//Schema file
const typeDefs = gql(fs.readFileSync(__dirname.concat('/graphql/schema.graphql'), 'utf8'))

// Connect on Mongo Database
mongoose.connect(database.connectionString('mongodb'), { useNewUrlParser: true })
.then(() => {
    console.info('Conectado no MongoDB... :)');
}).catch((err) => {
    console.error('Erro ao conectar no MongoDB... :(');
});

const server = new ApolloServer({ 
    typeDefs, 
    resolvers: {
        Query: QueryResolver,
        User: UserResolver,
        Lootbox: LootboxResolver,
        Roulette: RouletteResolver,
        Item: ItemResolver,
        Mutation: MutationResolver
    },
    graphiql: true,
    graphqlPath: "graphql"
});

// Middlewware CORS
app.use(cors);

server.applyMiddleware({ app });

// Start Server
app.listen(appConfig.node_port, () => {
   console.log('API BattleBuddy iniciada... port ' + appConfig.node_port);
});

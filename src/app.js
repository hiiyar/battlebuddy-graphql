const express = require('express');
const graphqlHTTP = require('express-graphql');
const rootSchema = require('./graphql/schema');
const cors = require('./middlewares/cors');
const database = require('./config/database');
const appConfig = require('./config/app');
const mongoose = require('mongoose');

const app = express();

// Connect on Mongo Database
mongoose.connect(database.connectionString('mongodb'), { useNewUrlParser: true })
.then(() => {
    console.info('Conectado no MongoDB... :)');
}).catch((err) => {
    console.error('Erro ao conectar no MongoDB... :(');
});

// Middlewware CORS
app.use(cors);

// Endpoint for GraphQL
app.use('/graphql', graphqlHTTP({
    schema: rootSchema,
    graphiql: true
}));

// Start Server
app.listen(appConfig.node_port, () => {
   console.log('API BattleBuddy iniciada... port 5005');
});

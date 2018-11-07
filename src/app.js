const express = require('express');
const graphqlHTTP = require('express-graphql');
const rootSchema = require('./graphql/schema');
const cors = require('./middlewares/cors');
const config = require('./config/config');
const mongoose = require('mongoose');

const app = express();

// Connect on Mongo Database
mongoose.connect(config.connectionString('mongodb'), { useNewUrlParser: true })
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
app.listen(5000, () => {
   console.log('API BattleBuddy iniciada... port 5000');
});

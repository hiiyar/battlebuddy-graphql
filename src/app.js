const express = require('express');
const graphqlHTTP = require('express-graphql');
const rootSchema = require('./schema');

const app = express();

app.use('/graphql', graphqlHTTP({
   schema: rootSchema,
    graphiql: true
}));

app.listen(5000, () => {
   console.log('API BattleBuddy iniciada... port 5000');
});

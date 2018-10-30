const express = require('express');
const graphqlHTTP = require('express-graphql');
const rootSchema = require('./schema');
const cors = require('./middlewares/cors');

const app = express();

app.use(cors);

app.use('/graphql', graphqlHTTP({
   schema: rootSchema,
    graphiql: true
}));

app.listen(5000, () => {
   console.log('API BattleBuddy iniciada... port 5000');
});

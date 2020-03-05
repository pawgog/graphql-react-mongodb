const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors')
const schema = require('./schema/schema')

const app = express();

app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-38xpt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(4000, () => {
      console.log('server run')
    })
  }).catch(err => {
    console.log(err);
  });

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


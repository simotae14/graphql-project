const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config({
  path: "variables.env",
});
const User = require("./models/User");
const Post = require("./models/Post");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.error(err));

// create a type definition
const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }
  type Query {
    getTodos: [Todo]
  }
`;

// initialize server
const server = new ApolloServer({
  typeDefs,
  context: {
    User,
    Post,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server listening on port ${url}`);
});

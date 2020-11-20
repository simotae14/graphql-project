const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Import our TypeDefs and resolvers
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

// Import environment Variables and Mongoose Models
require("dotenv").config({
  path: "variables.env",
});
const User = require("./models/User");
const Post = require("./models/Post");

// connect to mLab DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    retryWrites: false,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.error(err));

// create Apollo/GraphQL server using typeDefs, resolvers and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server listening on port ${url}`);
});

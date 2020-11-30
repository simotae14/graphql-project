const { ApolloServer, AuthenticatioError } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

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

// Verify JWT Token passed from Client
const getUser = async (token) => {
  if (token) {
    try {
      let user = await jwt.verify(token, process.env.SECRET);
      console.log(user);
    } catch (err) {
      throw new AuthenticatioError(
        "Your session is ended. Please sign in again."
      );
    }
  }
};

// create Apollo/GraphQL server using typeDefs, resolvers and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // retrieve authorization token from client
    const token = req.headers["authorization"];
    return {
      User,
      Post,
      currentUser: await getUser(token),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server listening on port ${url}`);
});

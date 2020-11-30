const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// function to create a Web Token
const createToken = (user, secret, expiresIn) => {
  // we use jwt package to generate token
  const { username, email } = user;
  return jwt.sign(
    {
      username,
      email,
    },
    secret,
    {
      expiresIn, // how long it expires the token
    }
  );
};

module.exports = {
  Query: {
    getCurrentUser: async (_, args, { User, currentUser }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: "favorites",
        model: "Post",
      });
      return user;
    },
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({}).sort({ createdDate: "desc" }).populate({
        path: "createdBy",
        model: "User",
      });
      return posts;
    },
  },
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorId },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId,
      }).save();
      return newPost;
    },
    signinUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({
        username,
      });
      // check if user in DB
      if (!user) {
        throw new Error("User not found");
      }
      // Check the password with bCrypt
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      // generate token long 1hour
      return {
        token: createToken(user, process.env.SECRET, "1hr"),
      };
    },
    signupUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({
        username,
      });
      // check if user in DB
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        email,
        password,
      }).save();
      // generate token long 1hour
      return {
        token: createToken(newUser, process.env.SECRET, "1hr"),
      };
    },
  },
};

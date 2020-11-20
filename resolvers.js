module.exports = {
  Query: {
    getUser: () => null,
  },
  Mutation: {
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
      return newUser;
    },
  },
};

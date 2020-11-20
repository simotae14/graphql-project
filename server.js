const { ApolloServer, gql } = require("apollo-server");

// mocked data
const todos = [
  { task: "Wash car", completed: false },
  { task: "Clean room", completed: true },
];

// create a type definition
const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }
  type Query {
    getTodos: [Todo]
  }
  type Mutation {
    addTodo(task: String, completed: Boolean): Todo
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getTodos: () => todos,
  },
  Mutation: {
    addTodo: (_, { task, completed }) => {
      const todo = {
        task,
        completed,
      };
      todos.push(todo);
      return todo;
    },
  },
};

// initialize server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server listening on port ${url}`);
});

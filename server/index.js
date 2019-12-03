const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

let config = {
  port: process.env.PORT || 4000
};

const typeDefs = gql`
  type Currency {
    name: String!
  }

  type Query {
    currencies: [Currency!]!
  }
`;

const resolvers = {
  Query: {
    currencies: () => []
  }
};

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: config.port }, () => {
  console.log(`Apollo Server on http://localhost:${config.port}/graphql`);
});

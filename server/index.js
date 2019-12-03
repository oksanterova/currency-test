const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

let config = {
  port: process.env.PORT || 4000
};

const currencies = [
  {
    name: "United States Dollar",
    symbol: "USD"
  },
  {
    name: "Russian Ruble",
    symbol: "RUB"
  },
  {
    name: "Swedish Krona",
    symbol: "SEK"
  },
  {
    name: "European Euro",
    symbol: "EUR"
  },
  {
    name: "Pound Sterling",
    symbol: "GBP"
  },
  {
    name: "Swiss Franc",
    symbol: "CHF"
  }
];

const typeDefs = gql`
  type Currency {
    name: String!
    symbol: String!
  }

  type Query {
    currencies: [Currency!]!
  }
`;

const resolvers = {
  Query: {
    currencies: () => currencies
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

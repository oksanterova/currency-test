const express = require("express");
const fetch = require("node-fetch");
const { ApolloServer, gql } = require("apollo-server-express");
const fakeFixer = require("./fake_fixer");

let config = {
  accessKey: process.env.ACCESS_KEY,
  fakeFixer: process.env.FAKE_FIXER === "true",
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

  type Rate {
    symbol: String!
    rate: Float!
  }

  type Query {
    currencies: [Currency!]!
    rates(base: String!): [Rate!]!
  }
`;

const fetchLatest = async (base, symbols) => {
  if (config.fakeFixer) {
    return fakeFixer[base];
  }

  const url = `http://data.fixer.io/api/latest?access_key=${
    config.accessKey
  }&base=${base}&symbols=${symbols.join(",")}`;

  const res = await fetch(url);
  return await res.json();
};

const resolvers = {
  Query: {
    currencies: () => currencies,
    rates: async (_, { base }) => {
      const symbols = currencies.map(({ symbol }) => symbol);
      const data = await fetchLatest(base, symbols);

      if (!data.success) {
        throw new Error(data.error.type);
      }

      return Object.entries(data.rates).map(([symbol, rate]) => ({
        symbol,
        rate
      }));
    }
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

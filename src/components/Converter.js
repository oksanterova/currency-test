import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 4em;
  background: lightgrey;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const Currencies = styled.ul`
  list-style-type: none;
`;

const Currency = styled.li``;

export const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      name
      symbol
    }
  }
`;

function Converter() {
  const { loading, error, data } = useQuery(GET_CURRENCIES);

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading ...</p>;

  return (
    <Wrapper>
      <Title>Currency Converter</Title>
      <Currencies>
        {data.currencies.map(currency => (
          <Currency key={currency.name}>{currency.name}</Currency>
        ))}
      </Currencies>
    </Wrapper>
  );
}

export default Converter;

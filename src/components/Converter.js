import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import CurrencySelect from "./CurrencySelect";
import Amount from "./Amount";
import styled from "styled-components";

const GET_RATES = gql`
  query GetRates($base: String!) {
    rates(base: $base) {
      rate
      symbol
    }
  }
`;

const Wrapper = styled.div`
  padding: 4em;
  max-width: 300px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const Arrow = styled.i`
  transform: rotate(45deg);
`;

export function getConvertedAmount(amount, rates, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) {
    return amount;
  } else {
    const targetRate =
      toCurrency && rates.find(rate => rate.symbol === toCurrency);
    const result = amount * targetRate.rate;
    return Number(result.toFixed(2));
  }
}

function Converter() {
  const [fromCurrency, setFromCurrency] = useState({
    symbol: "USD",
    name: "United States Dollar"
  });

  const [toCurrency, setToCurrency] = useState({
    symbol: "EUR",
    name: "European Euro"
  });

  const [amount, setAmount] = useState(0);

  const { error, data } = useQuery(GET_RATES, {
    variables: { base: fromCurrency.symbol }
  });

  if (error) return <p>Error</p>;

  const convertedAmount =
    data &&
    getConvertedAmount(
      amount,
      data.rates,
      fromCurrency.symbol,
      toCurrency.symbol
    );

  return (
    <Wrapper>
      <Title>Currency Converter</Title>
      <CurrencySelect setCurrency={setFromCurrency} currency={fromCurrency} />

      <Amount
        setAmount={setAmount}
        amount={amount}
        symbol={fromCurrency.symbol}
      />

      <Arrow />

      <CurrencySelect setCurrency={setToCurrency} currency={toCurrency} />

      <Amount
        disabled={true}
        amount={convertedAmount}
        symbol={toCurrency.symbol}
      />
    </Wrapper>
  );
}

export default Converter;

import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import CurrencySelect from "./CurrencySelect";
import Amount from "./Amount";
import right from "../assets/right.png";
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
  display: flex;
  flex-direction: row;
  min-height: 100%;
  @media (max-width: 830px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CurrencyBlock = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  margin: 24px;
  border: none;
  border-radius: 50%;
`;

const Arrow = styled.div`
  width: 32px;
  height: 32px;
  background: url(${right}) no-repeat;
  background-size: 32px 32px;

  @media (max-width: 830px) {
    transform: rotate(90deg);
  }
`;

export function getConvertedAmount(amount, rates, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) {
    return amount;
  } else {
    const targetRate = rates.find(rate => rate.symbol === toCurrency);

    if (targetRate) {
      const result = amount * targetRate.rate;
      return Number(result.toFixed(2));
    } else {
      return null;
    }
  }
}

function Converter() {
  const [fromCurrency, setFromCurrency] = useState({
    symbol: "USD",
    name: "🇺🇸 United States Dollar"
  });

  const [toCurrency, setToCurrency] = useState({
    symbol: "EUR",
    name: "🇪🇺 European Euro"
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

  const switchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <>
      <Wrapper>
        <CurrencyBlock>
          <CurrencySelect
            setCurrency={setFromCurrency}
            currency={fromCurrency}
          />

          <Amount
            setAmount={setAmount}
            amount={amount}
            symbol={fromCurrency.symbol}
          />
        </CurrencyBlock>
        <Button onClick={switchCurrencies}>
          <Arrow />
        </Button>

        <CurrencyBlock>
          <CurrencySelect setCurrency={setToCurrency} currency={toCurrency} />

          <Amount
            disabled={true}
            amount={convertedAmount}
            symbol={toCurrency.symbol}
          />
        </CurrencyBlock>
      </Wrapper>
    </>
  );
}

export default Converter;

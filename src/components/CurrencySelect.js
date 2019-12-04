import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      name
      symbol
    }
  }
`;

export default function CurrencySelect({ currency, setCurrency }) {
  const { loading, error, data } = useQuery(GET_CURRENCIES);

  if (error) return <p>Error</p>;

  const options =
    data &&
    data.currencies.map(({ symbol, name }) => ({ label: name, value: symbol }));

  return (
    <Select
      title="Select Currency"
      value={{ value: currency.symbol, label: currency.name }}
      name="currencies"
      isLoading={loading}
      onChange={({ value, label }) =>
        setCurrency({ symbol: value, name: label })
      }
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}

CurrencySelect.propTypes = {
  currency: PropTypes.object.isRequired,
  setCurrency: PropTypes.func.isRequired
};

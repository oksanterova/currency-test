import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputWrapper = styled.div`
  max-height: 38px;
  min-width: 296px;
  border-radius: 4px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const Input = styled.input`
  min-width: 218px;
  font-size: 1em;
  max-height: 38px;
  padding: 8px;
  ${props =>
    props.disabled &&
    `
     background: whitesmoke;
  `}
`;

const Valuta = styled.div`
  display: inline-block;
  vertical-align: middle;
  line-height: 36px;
  height: 36px;
  min-width: 58px;
  border: 1px solid lightgrey;
  text-align: center;
`;

export default function Amount({
  symbol,
  disabled = false,
  amount = "",
  setAmount = () => null
}) {
  const handleChange = e => {
    if (e.target.value === "" || e.target.value < 0) {
      setAmount(null);
    } else {
      const amount = parseInt(e.target.value);

      setAmount(amount);
    }
  };

  return (
    <InputWrapper>
      <Input
        title="Amount"
        name="amount"
        value={amount || ""}
        type="number"
        onChange={handleChange}
        disabled={disabled}
        placeholder={disabled ? "" : "Amount to convert"}
      />
      <Valuta>{symbol}</Valuta>
    </InputWrapper>
  );
}

Amount.propTypes = {
  symbol: PropTypes.string.isRequired,
  amount: PropTypes.number,
  disabled: PropTypes.bool,
  setAmount: PropTypes.func
};

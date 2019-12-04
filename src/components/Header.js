import React from "react";

import styled from "styled-components/macro";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: teal;
`;

const Title = styled.h1`
  font-size: 1.8em;
  color: white;
  text-transform: uppercase;
  margin: 10px 20px;
  @media (max-width: 380px) {
    font-size: 1.5em;
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Title>Currency Converter</Title>
    </HeaderWrapper>
  );
}

import React from "react";

import styled from "styled-components/macro";

const FooterrWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 36px;
  background-color: darkgrey;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Copy = styled.div`
  font-size: 0.7em;
  color: white;
  margin-right: 20px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: teal;
`;

export default function Header() {
  return (
    <FooterrWrapper>
      <Copy>
        Code test made by{" "}
        <StyledLink
          href="https://www.linkedin.com/in/oksana-kanterova"
          title="Linkedin"
        >
          Oksana Kanterova
        </StyledLink>{" "}
        aka{" "}
        <StyledLink
          href="https://github.com/oksanterova/currency-test"
          title="Github"
        >
          oksanterova
        </StyledLink>
      </Copy>
    </FooterrWrapper>
  );
}

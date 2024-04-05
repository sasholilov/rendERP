import styled from "styled-components";

const StyledLogo = styled.div`
  margin: 0 auto;

  & img {
    max-width: 120px;
    text-align: center;
    cursor: pointer;
  }
`;

function Logo() {
  return (
    <StyledLogo>
      <img src="../../src/data/images/LogoRendERP.png" alt="logo" />
    </StyledLogo>
  );
}

export default Logo;

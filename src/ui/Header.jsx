import styled from "styled-components";

const StyledHeader = styled.div`
  background-color: grey;
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid grey;

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;

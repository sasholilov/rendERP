import styled from "styled-components";

const StyledHeader = styled.div`
  background-color: var(--color-grey-1);
  padding: 1.2rem 4.8rem;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0 -10px 6px -12px grey inset;
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;

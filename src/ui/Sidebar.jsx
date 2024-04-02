import styled from "styled-components";

const StyledSidebar = styled.div`
  background-color: #b4b4b4;
  padding: 3.2rem 2.4rem;
  border-right: 1px solid #686868;

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return <StyledSidebar>Sidebar</StyledSidebar>;
}

export default Sidebar;

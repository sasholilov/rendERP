import styled from "styled-components";

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
`;

function Table() {
  return (
    <StyledTable>
      <p>Name</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
    </StyledTable>
  );
}

export default Table;

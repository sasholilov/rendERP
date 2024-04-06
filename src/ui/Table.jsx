import styled from "styled-components";
import TableHeader from "./TableHeader";

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

function Table() {
  return (
    <StyledTable>
      <TableHeader>Company Name</TableHeader>
      <TableHeader>VAT</TableHeader>
      <TableHeader>Country</TableHeader>
      <TableHeader>Address</TableHeader>
      <TableHeader>Telephone</TableHeader>
      <TableHeader>IBAN</TableHeader>
      <p>BEST SHOPPING</p>
      <p>BG202483628</p>
      <p>Bulgaria</p>
      <p>Sofia</p>
      <p>0887000004</p>
      <p>BG66UNCR7755213654</p>
    </StyledTable>
  );
}

export default Table;

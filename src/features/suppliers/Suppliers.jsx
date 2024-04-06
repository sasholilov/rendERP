import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import TableData from "../../ui/TableData";
import Title from "../../ui/Title";
import DeleteIcon from "../../ui/DeleteIcon";
import EditIcon from "../../ui/EditIcon";
import styled from "styled-components";
import { useSuppliers } from "./useSuppliers";

const StyledActions = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

function Suppliers() {
  const { isLoading, suppliers } = useSuppliers();
  if (isLoading) return <p>Loading...</p>;
  console.log(suppliers);
  return (
    <>
      <Title>Suppliers</Title>
      <Table gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <TableHeader>Company Name</TableHeader>
        <TableHeader>VAT</TableHeader>
        <TableHeader>Country</TableHeader>
        <TableHeader>Address</TableHeader>
        <TableHeader>Telephone</TableHeader>
        <TableHeader>IBAN</TableHeader>
        <TableHeader>Actions</TableHeader>
        {suppliers.map((sup) => (
          <>
            <TableData key={sup.id}>{sup.company_name}</TableData>
            <TableData key={sup.id}>{sup.vat}</TableData>
            <TableData key={sup.id}>{sup.country}</TableData>
            <TableData key={sup.id}>{sup.address}</TableData>
            <TableData key={sup.id}>{sup.telephone}</TableData>
            <TableData key={sup.id}>{sup.iban}</TableData>
            <TableData>
              <StyledActions>
                <EditIcon />
                <DeleteIcon />
              </StyledActions>
            </TableData>
          </>
        ))}
      </Table>
    </>
  );
}

export default Suppliers;

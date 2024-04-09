import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import TableData from "../../ui/TableData";
import Title from "../../ui/Title";
import DeleteIcon from "../../ui/DeleteIcon";
import EditIcon from "../../ui/EditIcon";
import styled from "styled-components";
import { useSuppliers } from "./useSuppliers";
import Button from "../../ui/Button";
import { useState } from "react";
import SaveIcon from "../../ui/SaveIcon";

const StyledActions = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

const StyledHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
  margin: 0;
`;

const StyledForm = styled.form`
  grid-column: 1 / span 7;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
`;

function Suppliers() {
  const { isLoading, suppliers } = useSuppliers();
  const [addMode, setAddMode] = useState(false);
  const addModeButton = addMode === true ? "close" : "add";
  if (isLoading) return <p>Loading...</p>;
  console.log(suppliers);
  return (
    <>
      <Title>Suppliers</Title>

      <StyledHeaderBar>
        <p>Search bar</p>
        <Button type={addModeButton} onClick={() => setAddMode(!addMode)}>
          {addMode ? "End adding" : "Add new supplier"}
        </Button>
      </StyledHeaderBar>
      <Table gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <TableHeader>Company Name</TableHeader>
        <TableHeader>VAT</TableHeader>
        <TableHeader>Country</TableHeader>
        <TableHeader>Address</TableHeader>
        <TableHeader>Telephone</TableHeader>
        <TableHeader>IBAN</TableHeader>
        <TableHeader>Actions</TableHeader>
        {addMode && (
          <StyledForm>
            <TableData>
              <input type="text" placeholder="Company name" />
            </TableData>
            <TableData>
              <input type="text" placeholder="VAT" />
            </TableData>
            <TableData>
              <input type="text" placeholder="Country" />
            </TableData>
            <TableData>
              <input type="text" placeholder="Address" />
            </TableData>
            <TableData>
              <input type="text" placeholder="Telephone" />
            </TableData>
            <TableData>
              <input type="text" placeholder="IBAN" />
            </TableData>
            <TableData>
              <SaveIcon />
            </TableData>
          </StyledForm>
        )}

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

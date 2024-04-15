import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import Title from "../../ui/Title";
import styled from "styled-components";
import { useSuppliers } from "./useSuppliers";
import Button from "../../ui/Button";
import DeleteIcon from "../../ui/DeleteIcon";
import EditIcon from "../../ui/EditIcon";
import { useState } from "react";
import TableDataRow from "../../ui/TableDataRow";
import { useDeleteSupplier } from "./useDeleteSupplier";
import EditSupplier from "./EditSupplier";
import AddSupplier from "./AddSupplier";

const StyledHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
  margin: 0;
  margin-bottom: 10px;
`;

function Suppliers() {
  const { isLoading, suppliers } = useSuppliers();
  const { isDeleting, deleteSupp } = useDeleteSupplier();
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState({});
  const addModeButton = addMode === true ? "close" : "add";
  if (isLoading || isDeleting) return <p>Loading...</p>;

  function handleEditSupplier(id) {
    const objectToEditToState = suppliers.find(
      (supplier) => supplier.id === id
    );
    setObjectToEdit(objectToEditToState);
    setEditMode(!editMode);
  }
  return (
    <>
      <Title>Suppliers</Title>
      <StyledHeaderBar>
        <p>Search bar</p>
        <Button type={addModeButton} onClick={() => setAddMode(!addMode)}>
          {addMode ? "End adding" : "Add new supplier"}
        </Button>
      </StyledHeaderBar>
      <Table gridtemplatecolumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <TableHeader columns={7}>
          <p>Company Name</p>
          <p>VAT</p>
          <p>Country</p>
          <p>Address</p>
          <p>Telephone</p>
          <p>IBAN</p>
          <p>Actions</p>
        </TableHeader>

        {addMode && <AddSupplier />}
        {editMode && (
          <EditSupplier
            objecToEdit={objectToEdit}
            idToSave={objectToEdit.id}
            setEditMode={setEditMode}
          />
        )}
        {suppliers.map((sup) => (
          <TableDataRow
            key={sup.id}
            columns={7}
            resource={{
              company_name: sup.company_name,
              vat: sup.vat,
              country: sup.country,
              address: sup.address,
              telephone: sup.telephone,
              iban: sup.iban,
            }}
          >
            <EditIcon onClick={() => handleEditSupplier(sup.id)} />
            <DeleteIcon onClick={() => deleteSupp(sup.id)} />
          </TableDataRow>
        ))}
      </Table>
    </>
  );
}

export default Suppliers;

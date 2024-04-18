import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import Title from "../../ui/Title";
import styled from "styled-components";
import { useSuppliers } from "./useSuppliers";
import Button from "../../ui/Button";
import DeleteIcon from "../../ui/DeleteIcon";
import EditIcon from "../../ui/EditIcon";
import { useEffect, useState } from "react";
import TableDataRow from "../../ui/TableDataRow";
import { useDeleteSupplier } from "./useDeleteSupplier";
import EditSupplier from "./EditSupplier";
import AddSupplier from "./AddSupplier";
import Pagination from "../../ui/Pagination";

import { useSearchParams } from "react-router-dom";
import Search from "../../ui/Search";
import Spinner from "./Spinner";

const StyledHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
  margin: 0;
  margin-bottom: 10px;
`;

const StyledResultTitle = styled.h3`
  text-align: center;
  color: var(--color-grey-4);
`;

function Suppliers() {
  const { isLoading, suppliers, count } = useSuppliers();
  const { isDeleting, deleteSupp } = useDeleteSupplier();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState({});
  const addModeButton = addMode === true ? "close" : "add";

  useEffect(() => {
    if (searchQuery) {
      searchParams.set("search", searchQuery);
      setSearchParams(searchParams);
      console.log(searchParams);
    }
    if (searchQuery === "") {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, [searchQuery, searchParams, setSearchParams]);

  if (isLoading || isDeleting) return <Spinner />;

  function handleEditSupplier(id) {
    const objectToEditToState = suppliers.find(
      (supplier) => supplier.id === id
    );
    setObjectToEdit(objectToEditToState);
    setEditMode(!editMode);
  }

  function handleDelete(suppId) {
    if (window.confirm("Are you sure?")) deleteSupp(suppId);
  }

  if (suppliers.length === 0)
    return (
      <>
        <StyledResultTitle>
          You do not have any suppliers! Add a new supplier from the form below.
        </StyledResultTitle>
        <AddSupplier />
      </>
    );
  return (
    <>
      <Title>Suppliers</Title>

      {!editMode && (
        <StyledHeaderBar>
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Button type={addModeButton} onClick={() => setAddMode(!addMode)}>
            {addMode ? "End adding" : "Add new supplier"}
          </Button>
        </StyledHeaderBar>
      )}
      {searchQuery && (
        <StyledResultTitle>
          {`Founded (${suppliers.length}) ${
            suppliers.length > 1 ? `results` : `result`
          } from search keyword
          "${searchQuery}"`}
        </StyledResultTitle>
      )}
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
        {editMode && (
          <EditSupplier
            objecToEdit={objectToEdit}
            idToSave={objectToEdit.id}
            setEditMode={setEditMode}
          />
        )}

        {!editMode && addMode && <AddSupplier />}

        {!editMode &&
          suppliers.map((sup) => (
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
              <DeleteIcon onClick={() => handleDelete(sup.id)} />
            </TableDataRow>
          ))}
      </Table>
      {!editMode && <Pagination count={count} />}
    </>
  );
}

export default Suppliers;

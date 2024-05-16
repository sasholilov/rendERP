import { useState, useEffect } from "react";
import styled from "styled-components";
import DeleteIcon from "../../ui/DeleteIcon";
import EditIcon from "../../ui/EditIcon";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TableDataRow from "../../ui/TableDataRow";
import TableHeader from "../../ui/TableHeader";
import Title from "../../ui/Title";
import Pagination from "../../ui/Pagination";
import { formatDate, formatPrice } from "../../utils/helpers";
import { usePurchase } from "./usePurchase";
import { useSearchParams } from "react-router-dom";
import { useDeletePurchase } from "./useDeletePurchase";
import FeatureHeader from "../../ui/FeatureHeader";
import SearchResult from "../../ui/SearchResult";
import AddPurchase from "./AddPurchase";
import EditPurchase from "./EditPurchase";

const StyledResultTitle = styled.h3`
  text-align: center;
  color: var(--color-grey-4);
`;

function Purchase() {
  const { isLoading, purchases, count } = usePurchase();
  const { isDeleting, deletePur } = useDeletePurchase();
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [purchaseToEdit, setPurchaseToEdit] = useState({});
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

  function handleEditPurchase(id) {
    const objectToEditToState = purchases.find(
      (purchase) => purchase.id === id
    );
    setPurchaseToEdit(objectToEditToState);
    setEditMode(!editMode);
  }

  function handleDelete(purID) {
    if (window.confirm("Are you sure?")) deletePur(purID);
  }
  if (count === 0)
    return (
      <>
        <StyledResultTitle>
          You do not have any purchases! Add a new purchase from the form below.
        </StyledResultTitle>
        <AddPurchase />
      </>
    );
  return (
    <>
      <Title>Purchase</Title>
      {!editMode && (
        <FeatureHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          addMode={addMode}
          addModeButton={addModeButton}
          setAddMode={setAddMode}
          feature={"purchase"}
        />
      )}
      {searchQuery && (
        <SearchResult feature={purchases} searchQuery={searchQuery} />
      )}
      <Table gridtemplatecolumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <TableHeader columns={7}>
          <p>Date</p>
          <p>Supplier</p>
          <p>Category</p>
          <p>Invoice number</p>
          <p>Total</p>
          <p>VAT</p>
          <p>Actions</p>
        </TableHeader>
        {editMode && (
          <EditPurchase
            objectToEdit={purchaseToEdit}
            setEditMode={setEditMode}
          />
        )}
        {!editMode && addMode && <AddPurchase />}
        {!editMode &&
          purchases.map((pur, index) => (
            <TableDataRow
              key={`${pur.id}-${index}`}
              columns={7}
              resource={{
                purchase_date: formatDate(pur.purchase_date),
                supplier: pur.suppliers.company_name,
                purchase_category: pur.purchase_category,
                invoice_number: pur.invoice_number,
                total: formatPrice(pur.total),
                has_vat: pur.has_vat,
              }}
            >
              <EditIcon onClick={() => handleEditPurchase(pur.id)} />
              <DeleteIcon onClick={() => handleDelete(pur.id)} />
            </TableDataRow>
          ))}
      </Table>
      {!editMode && <Pagination count={count} />}
    </>
  );
}

export default Purchase;

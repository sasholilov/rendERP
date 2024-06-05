import { useState, useEffect } from "react";
import styled from "styled-components";
import DeleteIcon from "../../ui/DeleteIcon";
import EditIcon from "../../ui/EditIcon";
import DetailsIcon from "../../ui/DetailsIcon";
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
import ToggleSwitch from "../../ui/ToggleSwitch";
import { useSuppliers } from "../suppliers/useSuppliers";
import Payments from "./Payments";
import StatusUi from "../../ui/StatusUi";
import FilterPurchase from "./FilterPurchase";
import {
  PURCHASE_CATEGORY,
  PAYMENT_METHODS,
  STATUSES,
} from "../../utils/constants";

const StyledResultTitle = styled.h3`
  text-align: center;
  color: var(--color-grey-4);
`;

function Purchase() {
  const { isLoading, purchases, count } = usePurchase();
  const { suppliers } = useSuppliers();
  const { isDeleting, deletePur } = useDeletePurchase();
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [purchaseToEdit, setPurchaseToEdit] = useState({});
  const [showPayments, setShowPayments] = useState(false);
  const [purchaseDetail, setPurchaseDetail] = useState(0);
  const addModeButton = addMode === true ? "close" : "add";
  const statuses = Object.values(STATUSES);

  const titleMode = addMode
    ? "Purchase - Adding"
    : editMode
    ? "Purchase - Editing"
    : "Purchase";

  useEffect(() => {
    if (searchQuery) {
      searchParams.set("search", searchQuery);
      setSearchParams(searchParams);
    }

    if (searchQuery) {
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

  function handleDelete(purId) {
    if (window.confirm("Are you sure?")) deletePur(purId);
  }

  function handleShowPayments(purId) {
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
    setShowPayments(!showPayments);
    setPurchaseDetail(purId);
    searchParams.set("details", purId);
    setSearchParams(searchParams);
  }

  if (count === 0 && !searchParams)
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
      {showPayments && (
        <Payments
          showPayments={showPayments}
          setShowPayments={setShowPayments}
          purchaseId={purchaseDetail}
        />
      )}
      <Title>{titleMode}</Title>
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

      {suppliers && (
        <FilterPurchase
          suppliers={suppliers}
          category={PURCHASE_CATEGORY}
          pmethods={PAYMENT_METHODS}
          statuses={statuses}
        />
      )}

      <Table gridtemplatecolumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <TableHeader columns={9}>
          <p>Date</p>
          <p>Supplier</p>
          <p>Category</p>
          <p>Invoice number</p>
          <p>Total</p>
          <p>VAT</p>
          <p>Payment Method</p>
          {!addMode ? <p>Status</p> : <p>Paid Amount</p>}
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
              columns={9}
              resource={{
                purchase_date: formatDate(pur.purchase_date),
                supplier: pur.suppliers.company_name,
                purchase_category: pur.purchase_category,
                invoice_number: pur.invoice_number,
                total: formatPrice(pur.total),
                has_vat: (
                  <ToggleSwitch checked={pur.has_vat} isDisabled={true} />
                ),
                payment_method: pur.payment_method,
                status: (
                  <StatusUi statustype={pur.status}>{pur.status}</StatusUi>
                ),
              }}
            >
              <EditIcon onClick={() => handleEditPurchase(pur.id)} />
              <DeleteIcon onClick={() => handleDelete(pur.id)} />
              <DetailsIcon onClick={() => handleShowPayments(pur.id)} />
            </TableDataRow>
          ))}
      </Table>
      {!editMode && <Pagination count={count} />}
    </>
  );
}

export default Purchase;

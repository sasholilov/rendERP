import { useState, useEffect } from "react";
import DeleteIcon from "../../ui/DeleteIcon";
import EditIcon from "../../ui/EditIcon";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TableDataRow from "../../ui/TableDataRow";
import TableHeader from "../../ui/TableHeader";
import Title from "../../ui/Title";
import { formatDate, formatPrice } from "../../utils/helpers";
import { usePurchase } from "./usePurchase";
import { useSearchParams } from "react-router-dom";
import FeatureHeader from "../../ui/FeatureHeader";
import SearchResult from "../../ui/SearchResult";
import AddPurchase from "./AddPurchase";

function Purchase() {
  const { isLoading, purchases } = usePurchase();
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
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

  if (isLoading) return <Spinner />;

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
        {!editMode && addMode && <AddPurchase />}
        {purchases.map((pur, index) => (
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
            <EditIcon onClick={() => setEditMode(true)} />
            <DeleteIcon />
          </TableDataRow>
        ))}
      </Table>
    </>
  );
}

export default Purchase;

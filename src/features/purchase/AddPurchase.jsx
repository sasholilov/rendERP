import styled from "styled-components";
import TableData from "../../ui/TableData";
import SaveIcon from "../../ui/SaveIcon";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";
import { useAddPurchase } from "./useAddPurchase";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import Spinner from "../../ui/Spinner";

const StyledForm = styled.form`
  grid-column: 1 / 7;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(7, minmax(160px, 1fr));
  text-align: center;
`;

function AddPurchase() {
  const ref = useRef();
  const { isAdding, addPurchase } = useAddPurchase();
  const [purchase_date, setPurchase_date] = useState("");
  const [supplier_id, setSupplier_id] = useState("");
  const [category, setCategory] = useState("");
  const [invoice_number, setInvoice_number] = useState("");
  const [has_vat, setHas_vat] = useState("");
  const [total, setTotal] = useState("");

  function handleSavePurchase(e) {
    e.preventDefault();
    const purchaseObj = {
      purchase_date,
      supplier_id,
      invoice_number,
      has_vat,
      total,
    };

    if (
      !purchase_date ||
      !supplier_id ||
      !category ||
      !invoice_number ||
      !has_vat ||
      !total
    ) {
      toast.error("Please fill all fields");
      return;
    }
    if (isAdding) return <Spinner />;
    addPurchase({ ...purchaseObj }, { onSuccess: ref.current.reset() });
  }

  if (isAdding) return <Spinner />;

  return (
    <StyledForm ref={ref}>
      <TableData>
        <InputText
          type="text"
          placeholder="Date"
          onChange={(e) => setPurchase_date(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Supplier"
          onChange={(e) => setSupplier_id(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Invoice Number"
          onChange={(e) => setInvoice_number(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Total"
          onChange={(e) => setTotal(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Has Vat"
          onChange={(e) => setHas_vat(e.target.value)}
        />
      </TableData>
      <TableData>
        <Button type="save" onClick={(e) => handleSavePurchase(e)}>
          <SaveIcon />
        </Button>
      </TableData>
    </StyledForm>
  );
}

export default AddPurchase;

import styled from "styled-components";
import TableData from "../../ui/TableData";
import SaveIcon from "../../ui/SaveIcon";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";
import Spinner from "../../ui/Spinner";
import InputSelect from "../../ui/InputSelect";
import DatePicker from "react-datepicker";
import { useAddPurchase } from "./useAddPurchase";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useSuppliers } from "../suppliers/useSuppliers";
import { isPaid } from "../../utils/helpers";
import { PURCHASE_CATEGORY, PAYMENT_METHODS } from "../../utils/constants";

import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";
import ToggleSwitch from "../../ui/ToggleSwitch";

const StyledForm = styled.form`
  grid-column: 1 / 9;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(9, minmax(160px, 1fr));
  text-align: center;
`;

function AddPurchase() {
  const ref = useRef();
  const { isAdding, addPurchase } = useAddPurchase();
  const { isLoading, suppliers } = useSuppliers();
  const [purchase_date, setPurchase_date] = useState("");
  const [supplier_id, setSupplier_id] = useState("");
  const [purchase_category, setPurchase_category] = useState("");
  const [invoice_number, setInvoice_number] = useState("");
  const [has_vat, setHas_vat] = useState(true);
  const [total, setTotal] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [payment_method, setPayment_method] = useState("");
  const [status, setStatus] = useState(total);

  function handleToggleChange(e) {
    setHas_vat(e.target.checked);
    setIsChecked(e.target.checked);
  }

  function handleSavePurchase(e) {
    e.preventDefault();
    const purchaseObj = {
      purchase_date,
      supplier_id,
      purchase_category,
      invoice_number,
      has_vat,
      total,
      payment_method,
      status: isPaid(Number(total), Number(status ? status : total)),
    };

    if (
      !purchase_date ||
      !supplier_id ||
      !purchase_category ||
      !invoice_number ||
      !payment_method ||
      !total
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (total < status) {
      toast.error(
        "The payment can not be greater than the total amaount of the purchase"
      );
      return;
    }

    if (isAdding) return <Spinner />;
    addPurchase({ ...purchaseObj }, { onSuccess: ref.current.reset() });
  }

  function handleSupplierChange(e) {
    const selectedSupplier = e.target.value;
    setSupplier_id(Number(selectedSupplier));
  }

  const selectDate = purchase_date ? purchase_date : null;

  if (isAdding || isLoading) return <Spinner />;

  return (
    <StyledForm ref={ref}>
      <TableData>
        <DatePicker
          selected={selectDate}
          onChange={(date) => setPurchase_date(date)}
          dateFormat="MM.dd.yyyy"
          placeholderText="Select Date"
        />
      </TableData>
      <TableData>
        <InputSelect
          resource={suppliers}
          displayOptions="company_name"
          handle={(e) => handleSupplierChange(e)}
          value={supplier_id}
          selectfor="Supplier"
        />
      </TableData>
      <TableData>
        <InputSelect
          resource={PURCHASE_CATEGORY}
          selectfor="Category"
          handle={(e) => setPurchase_category(e.target.value)}
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
        <ToggleSwitch
          checked={isChecked}
          onChange={handleToggleChange}
          isDisabled={false}
        />
      </TableData>
      <TableData>
        <InputSelect
          resource={PAYMENT_METHODS}
          selectfor="Payment"
          handle={(e) => setPayment_method(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Paid amount"
          value={total}
          onChange={(e) => setStatus(e.target.value)}
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

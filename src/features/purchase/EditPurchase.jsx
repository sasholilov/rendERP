import styled from "styled-components";
import TableData from "../../ui/TableData";
import SaveIcon from "../../ui/SaveIcon";
import Button from "../../ui/Button";
import PropTypes from "prop-types";
import InputText from "../../ui/InputText";
import { useState } from "react";
import { useEditPurchase } from "./useEditPurchase";
import CancelIcon from "../../ui/CancelIcon";
import Spinner from "../../ui/Spinner";
import { useSuppliers } from "../suppliers/useSuppliers";
import InputSelect from "../../ui/InputSelect";
import ToggleSwitch from "../../ui/ToggleSwitch";

const StyledForm = styled.form`
  grid-column: 1 / 7;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  text-align: center;
  grid-auto-rows: auto;
  text-overflow: ellipsis;
  @media screen and (max-width: 1460px) {
    font-size: 12px;
  }
`;

function EditPurchase({ objectToEdit, setEditMode }) {
  const { isEditing, editPurchase } = useEditPurchase();
  const { isLoading, suppliers } = useSuppliers();
  const [purchase_date, setPurchase_date] = useState(
    objectToEdit?.purchase_date
  );
  const [supplier_id, setSupplier_id] = useState(objectToEdit?.supplier_id);
  const [purchase_category, setPurchase_category] = useState(
    objectToEdit?.purchase_category
  );
  const [invoice_number, setInvoice_number] = useState(
    objectToEdit?.invoice_number
  );
  const [total, setTotal] = useState(objectToEdit?.total);
  const [has_vat, setHas_vat] = useState(objectToEdit?.has_vat);
  const [isChecked, setIsChecked] = useState(objectToEdit.has_vat);

  function handleSupplierChange(e) {
    const selectedSupplier = e.target.value;
    setSupplier_id(Number(selectedSupplier));
  }

  function handleToggleChange(e) {
    setHas_vat(e.target.checked);
    setIsChecked(e.target.checked);
  }

  function handleSaveEditedPurchase(e, purchaseId) {
    e.preventDefault();
    const objectToSave = {
      purchase_date,
      supplier_id,
      purchase_category,
      invoice_number,
      total,
      has_vat,
    };

    editPurchase({ objectToSave, purchaseId });
    setEditMode(false);
  }

  if (isEditing || isLoading) return <Spinner />;

  return (
    <StyledForm>
      <TableData>
        <InputText
          type="text"
          placeholder="Purchase Date"
          onChange={(e) => setPurchase_date(e.target.value)}
          value={purchase_date}
        />
      </TableData>
      <TableData>
        <InputSelect
          resource={suppliers}
          displayOptions="company_name"
          handle={(e) => handleSupplierChange(e)}
          value={objectToEdit.suppliers.id}
          selectfor="Supplier"
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Category"
          onChange={(e) => setPurchase_category(e.target.value)}
          value={purchase_category}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Invoice Number"
          onChange={(e) => setInvoice_number(e.target.value)}
          value={invoice_number}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Total"
          onChange={(e) => setTotal(e.target.value)}
          value={total}
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
        <Button
          type="save"
          onClick={(e) => handleSaveEditedPurchase(e, objectToEdit.id)}
        >
          <SaveIcon />
        </Button>
        <CancelIcon onClick={() => setEditMode(false)} />
      </TableData>
    </StyledForm>
  );
}

EditPurchase.propTypes = {
  objectToEdit: PropTypes.object,
  setEditMode: PropTypes.func,
};

export default EditPurchase;

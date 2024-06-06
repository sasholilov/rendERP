import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import InputSelect from "../../ui/InputSelect";
import PropTypes from "prop-types";
import InputText from "../../ui/InputText";
import Button from "../../ui/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

const StyledFilters = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 0;
  margin: 0;
  margin-bottom: 10px;
`;
const StyledForm = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function FilterPurchase({ suppliers, category, pmethods, statuses }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredFromDate, setFilteredFromDate] = useState("");
  const [filteredToDate, setFilteredToDate] = useState("");
  const [filterValue, setFilterValue] = useState({
    supplier_id: "",
    purchase_category: "",
    invoice_number: "",
    total: "",
    has_vat: "",
    payment_method: "",
    status: "",
    purchase_date: "",
  });

  const categoryValue = searchParams.get("purchase_category");
  const supplierId = searchParams.get("supplier_id");
  const invoiceNumberValue = searchParams.get("invoice_number");
  let gtTotalValue = "";
  let ltTotalValue = "";
  if (searchParams.get("total")) {
    gtTotalValue = searchParams.get("total").split("-")[0];
    ltTotalValue = searchParams.get("total").split("-")[1];
  }
  const paymentMethodsValue = searchParams.get("payment_method");
  const statusValues = searchParams.get("status");

  function hasValues(obj) {
    return Object.values(obj).some((value) => value !== "");
  }

  useEffect(() => {
    if (hasValues(filterValue)) {
      for (const [key, value] of Object.entries(filterValue)) {
        if (value) {
          searchParams.set(key, value);
        }
      }
      setSearchParams(searchParams);
    }
  }, [filterValue, setSearchParams]);

  function handleFilterSuppliers(e) {
    setFilterValue((prev) => ({
      ...prev,
      supplier_id: e.target.value,
    }));
  }

  function handleFilterCategory(e) {
    setFilterValue((prev) => ({
      ...prev,
      purchase_category: e.target.value,
    }));
  }

  function handleFilterInvoiceNumber(e) {
    e.preventDefault();
    setFilterValue((prev) => ({
      ...prev,
      invoice_number: e.target.previousSibling.value,
    }));
  }

  function handleFilterPayments(e) {
    setFilterValue((prev) => ({
      ...prev,
      payment_method: e.target.value,
    }));
  }

  function handleFilterVat(e) {
    let hasVatFilter = "";
    if (e.target.value === "Yes") hasVatFilter = "true";
    if (e.target.value === "No") hasVatFilter = "false";
    setFilterValue((prev) => ({
      ...prev,
      has_vat: hasVatFilter,
    }));
  }

  function handleFilterStatus(e) {
    setFilterValue((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  }

  function handleFilterRangeTotal(e) {
    e.preventDefault();
    const ltTotal = e.target.previousSibling.value;
    const gtTotal = e.target.previousSibling.previousSibling.value;
    setFilterValue((prev) => ({
      ...prev,
      total: `${gtTotal}-${ltTotal}`,
    }));
  }

  function handleDateFilter() {
    const yearFrom = filteredFromDate.split("-")[0];
    const monthFrom = filteredFromDate.split("-")[1];
    const dayFrom = filteredFromDate.split("-")[2].slice(0, 2);
    const yearTo = filteredToDate.split("-")[0];
    const monthTo = filteredToDate.split("-")[1];
    const dayTo = filteredToDate.split("-")[2].slice(0, 2);

    setFilterValue((prev) => ({
      ...prev,
      purchase_date: `${yearFrom}-${monthFrom}-${dayFrom}--${yearTo}-${monthTo}-${dayTo}`,
    }));
  }

  return (
    <StyledFilters>
      <InputSelect
        resource={suppliers}
        value={supplierId}
        displayOptions="company_name"
        selectfor="Supplier"
        handle={handleFilterSuppliers}
      />
      <InputSelect
        value={categoryValue}
        resource={category}
        selectfor="Category"
        handle={handleFilterCategory}
      />
      <StyledForm>
        <InputText placeholder="Invoice Number" value={invoiceNumberValue} />
        <Button type="add" onClick={handleFilterInvoiceNumber}>
          Set
        </Button>
      </StyledForm>
      <StyledForm>
        <InputText placeholder="Range Total From" value={gtTotalValue} />
        <InputText placeholder="Range Total To" value={ltTotalValue} />
        <Button type="add" onClick={handleFilterRangeTotal}>
          Set
        </Button>
      </StyledForm>
      <InputSelect
        resource={["Yes", "No"]}
        selectfor="Has Vat"
        handle={handleFilterVat}
      />
      <InputSelect
        value={paymentMethodsValue}
        resource={pmethods}
        selectfor="Payment Methods"
        handle={handleFilterPayments}
      />
      <InputSelect
        value={statusValues}
        resource={statuses}
        selectfor="Status"
        handle={handleFilterStatus}
      />
      <DatePicker
        selected={filteredFromDate}
        onChange={(date) => setFilteredFromDate(date.toISOString())}
        dateFormat="MM.dd.yyyy"
        placeholderText="Select Date"
      />
      <DatePicker
        selected={filteredToDate}
        onChange={(date) => setFilteredToDate(date.toISOString())}
        dateFormat="MM.dd.yyyy"
        placeholderText="Select Date"
      />
      <Button type="add" onClick={handleDateFilter}>
        Set
      </Button>
    </StyledFilters>
  );
}

FilterPurchase.propTypes = {
  suppliers: PropTypes.any,
  category: PropTypes.array,
  pmethods: PropTypes.array,
  statuses: PropTypes.any,
};

export default FilterPurchase;

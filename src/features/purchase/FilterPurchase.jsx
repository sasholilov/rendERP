import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import InputSelect from "../../ui/InputSelect";
import PropTypes from "prop-types";

const StyledFilters = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 0;
  margin: 0;
  margin-bottom: 10px;
`;

function FilterPurchase({ suppliers, category }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValue, setFilterValue] = useState({
    supplier_id: "",
    purchase_category: "",
  });

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

  console.log(suppliers, category);

  return (
    <StyledFilters>
      <InputSelect
        resource={suppliers}
        displayOptions="company_name"
        selectfor="Supplier"
        handle={handleFilterSuppliers}
      />
      <InputSelect
        resource={category}
        selectfor="Category"
        handle={handleFilterCategory}
      />
    </StyledFilters>
  );
}

FilterPurchase.propTypes = {
  suppliers: PropTypes.any,
  category: PropTypes.any,
};

export default FilterPurchase;

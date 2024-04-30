import styled from "styled-components";
import TableData from "../../ui/TableData";
import SaveIcon from "../../ui/SaveIcon";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";
import { useState, useRef } from "react";
import { useAddSupplier } from "./useAddSupplier";
import { toast } from "react-hot-toast";

const StyledForm = styled.form`
  grid-column: 1 / 7;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(7, minmax(180px, 1fr));
  text-align: center;
`;

function AddSupplier() {
  const ref = useRef();
  const { isAdding, addSupplier } = useAddSupplier();
  const [company_name, setCompany_name] = useState("");
  const [vat, setVat] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [iban, setIban] = useState("");
  const [country, setCountry] = useState("");

  function handleSaveSupplier(e) {
    e.preventDefault();
    const suplierObj = {
      company_name,
      vat,
      address,
      telephone,
      iban,
      country,
    };

    if (!company_name || !vat || !address || !telephone || !iban || !country) {
      toast.error("Please fill all fields");
      return;
    }
    if (isAdding) return <p>Loading....</p>;
    addSupplier({ ...suplierObj }, { onSuccess: ref.current.reset() });
  }

  if (isAdding) return <p>Loading....</p>;

  return (
    <StyledForm ref={ref}>
      <TableData>
        <InputText
          type="text"
          placeholder="Company Name"
          onChange={(e) => setCompany_name(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="VAT"
          onChange={(e) => setVat(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Telephone"
          onChange={(e) => setTelephone(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="IBAN"
          onChange={(e) => setIban(e.target.value)}
        />
      </TableData>
      <TableData>
        <Button type="save" onClick={(e) => handleSaveSupplier(e)}>
          <SaveIcon />
        </Button>
      </TableData>
    </StyledForm>
  );
}

export default AddSupplier;

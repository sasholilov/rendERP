import styled from "styled-components";
import TableData from "../../ui/TableData";
import SaveIcon from "../../ui/SaveIcon";
import Button from "../../ui/Button";
import PropTypes from "prop-types";
import InputText from "../../ui/InputText";
import { useState } from "react";
import { useEditSupplier } from "./useEditSupplier";

const StyledForm = styled.form`
  grid-column: 1 / 7;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(7, minmax(180px, 1fr));
  text-align: center;
`;

function EditSupplier({ objecToEdit, id }) {
  const { isEditing, editSupplier } = useEditSupplier();
  const [company_name, setCompany_name] = useState(objecToEdit?.company_name);
  const [vat, setVat] = useState(objecToEdit?.vat);
  const [address, setAddress] = useState(objecToEdit?.address);
  const [telephone, setTelephone] = useState(objecToEdit?.telephone);
  const [iban, setIban] = useState(objecToEdit?.iban);
  const [country, setCountry] = useState(objecToEdit?.country);

  function handleSaveEditedSupplier(e, id) {
    e.preventDefault();
    const objectToSave = {
      company_name,
      vat,
      address,
      telephone,
      iban,
      country,
    };

    console.log("CHECK THE VAALUES", objectToSave, id);

    editSupplier({ objectToSave, id });
  }

  if (isEditing) return <p>Loading....</p>;

  return (
    <StyledForm>
      <TableData>
        <InputText
          type="text"
          placeholder="Company Name"
          onChange={(e) => setCompany_name(e.target.value)}
          value={objecToEdit.company_name}
          id={id}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="VAT"
          onChange={(e) => setVat(e.target.value)}
          value={objecToEdit.vat}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
          value={objecToEdit.country}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          value={objecToEdit.address}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="Telephone"
          onChange={(e) => setTelephone(e.target.value)}
          value={objecToEdit.telephone}
        />
      </TableData>
      <TableData>
        <InputText
          type="text"
          placeholder="IBAN"
          onChange={(e) => setIban(e.target.value)}
          value={objecToEdit.iban}
        />
      </TableData>
      <TableData>
        <Button
          type="save"
          onClick={(e) => handleSaveEditedSupplier(e, objecToEdit.id)}
        >
          <SaveIcon />
        </Button>
      </TableData>
    </StyledForm>
  );
}

EditSupplier.propTypes = {
  objecToEdit: PropTypes.object,
  id: PropTypes.number,
};

export default EditSupplier;

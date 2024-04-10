import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import TableData from "../../ui/TableData";
import Title from "../../ui/Title";
import DeleteIcon from "../../ui/DeleteIcon";
import EditIcon from "../../ui/EditIcon";
import styled from "styled-components";
import { useSuppliers } from "./useSuppliers";
import Button from "../../ui/Button";
import SaveIcon from "../../ui/SaveIcon";
import InputText from "../../ui/InputText";
import { useAddSupplier } from "./useAddSupplier";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";

const StyledActions = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

const StyledHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
  margin: 0;
`;

const StyledForm = styled.form`
  grid-column: 1 / span 7;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(221px, 1fr));
  text-align: center;
  grid-auto-flow: row;
`;

const StyledData = styled.div`
  grid-column: 1 / span 7;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(221px, 1fr));
  text-align: center;
  grid-auto-flow: row;
`;

function Suppliers() {
  const ref = useRef();
  const { isLoading, suppliers } = useSuppliers();
  const [addMode, setAddMode] = useState(false);
  const [company_name, setCompany_name] = useState("");
  const [vat, setVat] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [iban, setIban] = useState("");
  const [country, setCountry] = useState("");
  const { isAdding, addSupplier } = useAddSupplier();
  const addModeButton = addMode === true ? "close" : "add";
  if (isLoading) return <p>Loading...</p>;

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
    setAddress("");
    setCompany_name("");
    setVat("");
    setIban("");
    setTelephone("");
    setCountry("");
  }

  return (
    <>
      <Title>Suppliers</Title>
      <StyledHeaderBar>
        <p>Search bar</p>
        <Button type={addModeButton} onClick={() => setAddMode(!addMode)}>
          {addMode ? "End adding" : "Add new supplier"}
        </Button>
      </StyledHeaderBar>
      <Table gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <TableHeader>Company Name</TableHeader>
        <TableHeader>VAT</TableHeader>
        <TableHeader>Country</TableHeader>
        <TableHeader>Address</TableHeader>
        <TableHeader>Telephone</TableHeader>
        <TableHeader>IBAN</TableHeader>
        <TableHeader>Actions</TableHeader>
        {addMode && (
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
        )}

        {suppliers.map((sup) => (
          <StyledData key={sup.id}>
            <TableData key={sup.id}>{sup.company_name}</TableData>
            <TableData key={sup.id}>{sup.vat}</TableData>
            <TableData key={sup.id}>{sup.country}</TableData>
            <TableData key={sup.id}>{sup.address}</TableData>
            <TableData key={sup.id}>{sup.telephone}</TableData>
            <TableData key={sup.id}>{sup.iban}</TableData>
            <TableData>
              <StyledActions>
                <EditIcon />
                <DeleteIcon />
              </StyledActions>
            </TableData>
          </StyledData>
        ))}
      </Table>
    </>
  );
}

export default Suppliers;

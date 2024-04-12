import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import TableData from "../../ui/TableData";
import Title from "../../ui/Title";
import styled from "styled-components";
import { useSuppliers } from "./useSuppliers";
import Button from "../../ui/Button";
import SaveIcon from "../../ui/SaveIcon";
import DeleteIcon from "../../ui/DeleteIcon";
import EditIcon from "../../ui/EditIcon";
import InputText from "../../ui/InputText";
import { useAddSupplier } from "./useAddSupplier";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import TableDataRow from "../../ui/TableDataRow";
import { useDeleteSupplier } from "./useDeleteSupplier";

const StyledHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
  margin: 0;
  margin-bottom: 10px;
`;

const StyledForm = styled.form`
  grid-column: 1 / 7;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  text-align: center;
`;

function Suppliers() {
  const ref = useRef();
  const { isLoading, suppliers } = useSuppliers();
  const { isDeleting, deleteSupp } = useDeleteSupplier();
  const [addMode, setAddMode] = useState(false);
  const [company_name, setCompany_name] = useState("");
  const [vat, setVat] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [iban, setIban] = useState("");
  const [country, setCountry] = useState("");
  const { isAdding, addSupplier } = useAddSupplier();
  const addModeButton = addMode === true ? "close" : "add";
  if (isLoading || isDeleting) return <p>Loading...</p>;

  console.log(deleteSupp);
  //
  //  async function deleteTest(id) {
  //    try {
  //      await deleteSupplier(id);
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  }
  //
  //  deleteTest(332);
  //
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
      <Table gridtemplatecolumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <TableHeader columns={7}>
          <p>Company Name</p>
          <p>VAT</p>
          <p>Country</p>
          <p>Address</p>
          <p>Telephone</p>
          <p>IBAN</p>
          <p>Actions</p>
        </TableHeader>
        {addMode && (
          <StyledForm ref={ref} columns={7}>
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
          <TableDataRow
            key={sup.id}
            columns={7}
            resource={{
              company_name: sup.company_name,
              vat: sup.vat,
              country: sup.country,
              address: sup.address,
              telephone: sup.telephone,
              iban: sup.iban,
            }}
          >
            <EditIcon />
            <DeleteIcon onClick={() => deleteSupp(sup.id)} />
          </TableDataRow>
        ))}
      </Table>
    </>
  );
}

export default Suppliers;

import Table from "../ui/Table";
import TableHeader from "../ui/TableHeader";
import TableData from "../ui/TableData";
import Title from "../ui/Title";

function Suppliers() {
  return (
    <>
      <Title>Suppliers</Title>
      <Table gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr">
        <TableHeader>Company Name</TableHeader>
        <TableHeader>VAT</TableHeader>
        <TableHeader>Country</TableHeader>
        <TableHeader>Address</TableHeader>
        <TableHeader>Telephone</TableHeader>
        <TableHeader>IBAN</TableHeader>
        <TableData>BEST SHOPPING</TableData>
        <TableData>BG202483628</TableData>
        <TableData>Bulgaria</TableData>
        <TableData>Sofia</TableData>
        <TableData>0887000004</TableData>
        <TableData>BG66UNCR7755213654</TableData>
      </Table>
    </>
  );
}

export default Suppliers;

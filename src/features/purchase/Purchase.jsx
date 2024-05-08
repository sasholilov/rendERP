import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import Title from "../../ui/Title";

function Purchase() {
  return (
    <>
      <Title>Purchase</Title>
      <Table gridtemplatecolumns="1fr 1fr 1fr 1fr 1fr 1fr">
        <TableHeader columns={6}>
          <p>Purchase date</p>
          <p>Supplier</p>
          <p>Category</p>
          <p>Invoice number</p>
          <p>Total</p>
          <p>Has Vat</p>
        </TableHeader>
      </Table>
    </>
  );
}

export default Purchase;

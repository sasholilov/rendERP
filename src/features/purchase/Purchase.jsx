import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TableDataRow from "../../ui/TableDataRow";
import TableHeader from "../../ui/TableHeader";
import Title from "../../ui/Title";
import { usePurchase } from "./usePurchase";

function Purchase() {
  const { isLoading, purchases } = usePurchase();

  if (isLoading) return <Spinner />;

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

        {purchases.map((pur) => (
          <TableDataRow
            key={pur.id}
            columns={6}
            resource={{
              purchase_date: pur.purchase_date,
              supplier: pur.suppliers.company_name,
              purchase_category: pur.purchase_category,
              invoice_number: pur.invoice_number,
              total: pur.total,
              has_vat: pur.has_vat,
            }}
          ></TableDataRow>
        ))}
      </Table>
    </>
  );
}

export default Purchase;

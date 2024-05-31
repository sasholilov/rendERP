import styled from "styled-components";
import Title from "../../ui/Title";
import { RiCloseLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { usePurchase } from "./usePurchase";
import { usePayment } from "./usePayment";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { formatDate } from "../../utils/helpers";
import Button from "../../ui/Button";
import InputText from "../../ui/InputText";
import { useAddPayment } from "./useAddPayment";
import { useEffect, useRef, useState } from "react";
import { useEditPurchase } from "./useEditPurchase";

const StyledForm = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledModal = styled.div`
  width: 40%;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.03), 0 1px 4px rgba(0, 0, 0, 0.02);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 999;

  & h3 {
    font-size: 18px;
    text-transform: uppercase;
    color: var(--color-light);
    background-color: var(--color-green-1);
    font-weight: 700;
    padding-top: 8px;
    padding-bottom: 8px;
    line-height: 28px;
    margin: 0 auto;
    text-align: center;
    border-radius: var(--border-radius-8);
    max-width: 120px;
  }

  & ul {
    margin: 0 auto;
    list-style: none;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  & li {
    padding: 0.75rem 1.25rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  }
`;

const CloseModal = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: var(--color-red-1);
  color: var(--color-light);
  padding: 5px 7px 5px 7px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: var(--border-radius-4);
  transition: 0.2s;

  &:hover {
    background-color: var(--color-red-2);
  }
`;

const StyledDataInLi = styled.div`
  display: flex;
  justify-content: space-between;

  & p {
    padding: 0;
    margin: 0;
  }
`;

function Payments({ showPayments, setShowPayments, purchaseId }) {
  const ref = useRef();
  const { purchases, isLoading } = usePurchase(purchaseId);
  const { payments, isLoadingPayments } = usePayment(purchaseId);
  const { addPayment, isAdding } = useAddPayment();
  const { isEditing, editPurchase } = useEditPurchase();
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkForPaid, setCheckForPaid] = useState(false);
  const invoiceNumber = purchases[0].invoice_number;
  const totalPayments = payments.reduce(
    (acc, cur) => acc + cur.payment_amount,
    0
  );
  const dueAmount = purchases[0]?.total - totalPayments;

  function handleCloseModal() {
    setShowPayments(!showPayments);
    searchParams.delete("details");
    setSearchParams(searchParams);
  }

  function handleAddPayment(e) {
    e.preventDefault();
    setCheckForPaid(true);
    const paymentObj = {
      purchase_id: purchaseId,
      payment_amount: e.target.previousSibling.value,
    };
    addPayment({ ...paymentObj });
    ref.current.reset();
  }

  useEffect(() => {
    console.log(dueAmount);
    if (dueAmount === 0 && checkForPaid) {
      setCheckForPaid(false);
      const objectToSave = {
        status: "Paid",
      };
      editPurchase({ objectToSave, purchaseId });
    }
  }, [dueAmount, editPurchase, purchaseId]);

  if (isLoading || isLoadingPayments || isAdding || isEditing)
    return <Spinner />;

  return (
    <StyledModal>
      <Title>Payments for Invoice #{invoiceNumber}</Title>
      <p>Due amount: {dueAmount}</p>
      <p>Invoice amount: {purchases[0]?.total}</p>
      <p>Payments sum: {totalPayments}</p>
      <CloseModal onClick={handleCloseModal}>
        <RiCloseLine />
      </CloseModal>
      <p>History of the payments:</p>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            <StyledDataInLi>
              <p>Date: {formatDate(payment?.created_at)}</p>
              <p>Payment: {payment?.payment_amount}</p>
            </StyledDataInLi>
          </li>
        ))}
      </ul>
      {dueAmount > 0 ? (
        <StyledForm ref={ref}>
          <InputText />
          <Button type="add" onClick={(e) => handleAddPayment(e)}>
            Add payment
          </Button>
        </StyledForm>
      ) : (
        <h3>Paid</h3>
      )}
    </StyledModal>
  );
}
Payments.propTypes = {
  showPayments: PropTypes.bool,
  setShowPayments: PropTypes.func,
  purchaseId: PropTypes.number,
  setPurchase: PropTypes.func,
};

export default Payments;

import styled from "styled-components";
import Title from "../ui/Title";
import { RiCloseLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { usePurchase } from "../features/purchase/usePurchase";
import { useSearchParams } from "react-router-dom";

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
    font-size: 14px;
    text-transform: uppercase;
    color: var(--color-grey-4);
    font-weight: 500;
    line-height: 28px;
    padding-left: 10px;
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

function Modal({ showModal, setShowModal, purchase }) {
  const { purchases } = usePurchase(purchase);
  const [searchParams, setSearchParams] = useSearchParams();
  const invoiceNumber = purchases[0].invoice_number;

  function handleCloseModal() {
    setShowModal(!showModal);
    searchParams.delete("details");
    setSearchParams(searchParams);
  }

  return (
    <StyledModal>
      <p>test: {purchase}</p>
      <Title>Payments for Invoice #{invoiceNumber}</Title>
      <h3>Due amount: 100лв</h3>
      <CloseModal onClick={handleCloseModal}>
        <RiCloseLine />
      </CloseModal>
      <ul>
        <li>
          <StyledDataInLi>
            <p>Date: 22.05.2024</p>
            <p>Payment: 500</p>
          </StyledDataInLi>
        </li>
        <li>
          <StyledDataInLi>
            <p>Date: 22.05.2024</p>
            <p>Payment: 500</p>
          </StyledDataInLi>
        </li>
      </ul>
    </StyledModal>
  );
}
Modal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  purchase: PropTypes.number,
  setPurchase: PropTypes.func,
};

export default Modal;

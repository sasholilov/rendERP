import styled from "styled-components";
import { MdOutlineCancel } from "react-icons/md";
import PropTypes from "prop-types";

const StyledDelete = styled.span`
  background-color: var(--color-red-1);
  color: var(--color-light);
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: var(--border-radius-4);
  transition: 0.2s;

  &:hover {
    background-color: var(--color-red-2);
  }
`;

function CancelIcon({ onClick }) {
  return (
    <StyledDelete onClick={onClick}>
      <MdOutlineCancel />
    </StyledDelete>
  );
}

CancelIcon.propTypes = {
  onClick: PropTypes.func,
};

export default CancelIcon;

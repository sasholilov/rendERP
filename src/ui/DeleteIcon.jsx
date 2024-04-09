import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";

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

function DeleteIcon() {
  return (
    <StyledDelete>
      <RiDeleteBin6Line />
    </StyledDelete>
  );
}

export default DeleteIcon;

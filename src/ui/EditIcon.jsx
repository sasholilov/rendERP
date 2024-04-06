import styled from "styled-components";
import { RiEditLine } from "react-icons/ri";

const StyledEdit = styled.span`
  background-color: var(--color-yellow-1);
  color: var(--color-light);
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: var(--border-radius-4);
`;

function EditIcon() {
  return (
    <StyledEdit>
      <RiEditLine />
    </StyledEdit>
  );
}

export default EditIcon;

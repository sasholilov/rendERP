import styled from "styled-components";
import { RiSave3Line } from "react-icons/ri";

const StyledSave = styled.span`
  background-color: var(--color-green-1);
  color: var(--color-light);
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: var(--border-radius-4);
  transition: 0.2s;

  &:hover {
    background-color: var(--color-green-2);
  }
`;

function SaveIcon() {
  return (
    <StyledSave>
      <RiSave3Line />
    </StyledSave>
  );
}

export default SaveIcon;

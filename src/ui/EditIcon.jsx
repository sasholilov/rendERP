import styled from "styled-components";
import { RiEditLine } from "react-icons/ri";
import PropTypes from "prop-types";

const StyledEdit = styled.span`
  background-color: var(--color-yellow-1);
  color: var(--color-light);
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: var(--border-radius-4);
  transition: 0.2s;

  &:hover {
    background-color: var(--color-yellow-2);
  }
`;

function EditIcon({ onClick }) {
  return (
    <StyledEdit onClick={onClick}>
      <RiEditLine />
    </StyledEdit>
  );
}

EditIcon.propTypes = {
  onClick: PropTypes.func,
};

export default EditIcon;

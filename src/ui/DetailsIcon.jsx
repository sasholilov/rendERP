import styled from "styled-components";
import { RiMore2Fill } from "react-icons/ri";
import PropTypes from "prop-types";

const StyledDelete = styled.span`
  background-color: var(--color-blue-1);
  color: var(--color-light);
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: var(--border-radius-4);
  transition: 0.2s;

  &:hover {
    background-color: var(--color-blue-2);
  }
`;

function DetailsIcon({ onClick }) {
  return (
    <StyledDelete onClick={onClick}>
      <RiMore2Fill />
    </StyledDelete>
  );
}

DetailsIcon.propTypes = {
  onClick: PropTypes.func,
};

export default DetailsIcon;

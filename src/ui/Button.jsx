import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  color: var(--color-light);
  background-color: ${(props) =>
    props.type === "add"
      ? `var(--color-skyblue-1)`
      : props.type === "save"
      ? "none"
      : `var(--color-red-1)`};
  padding: 8px 16px;
  border-radius: var(--border-radius-8);
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.type === "add"
        ? `var(--color-skyblue-2)`
        : props.type === "save"
        ? "none"
        : `var(--color-red-2)`};
  }
`;

function Button({ type, children, onClick }) {
  return (
    <StyledButton onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;

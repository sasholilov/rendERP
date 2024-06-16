import styled from "styled-components";
import PropTypes from "prop-types";

export const StyledButton = styled.button`
  color: var(--color-light);
  background-color: ${(props) =>
    props.type === "add"
      ? `var(--color-skyblue-1)`
      : props.type === "save"
      ? "none"
      : props.type === "cancel"
      ? "none"
      : `var(--color-red-1)`};
  padding: ${(props) => (props.type === "save" ? `4px` : `8px 16px`)};
  border-radius: var(--border-radius-8);
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.type === "add"
        ? `var(--color-skyblue-2)`
        : props.type === "save"
        ? "none"
        : props.type === "cancel"
        ? "none"
        : `var(--color-red-2)`};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function Button({ type, children, onClick, isDisabled }) {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      disabled={isDisabled ? true : false}
    >
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default Button;

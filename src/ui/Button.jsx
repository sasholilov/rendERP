import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  color: var(--color-light);
  background-color: ${(props) =>
    props.type === "add" ? `var(--color-skyblue-1)` : "red"};
  padding: 8px 16px;
  border-radius: var(--border-radius-8);
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.type === "add" ? `var(--color-skyblue-2)` : "red"};
  }
`;

function Button({ type, children }) {
  return <StyledButton type={type}>{children}</StyledButton>;
}

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;

import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTitle = styled.div`
  font-size: 18px;
  text-transform: uppercase;
  color: #212121;
  font-weight: 600;
  line-height: 28px;
`;

function Title({ children }) {
  return <StyledTitle as="h2">{children}</StyledTitle>;
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;

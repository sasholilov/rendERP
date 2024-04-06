import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTableHeader = styled.p`
  font-weight: bold;
  padding-bottom: 16px;
  border-bottom: var(--border-bottom);
`;

function TableHeader({ children }) {
  return <StyledTableHeader>{children}</StyledTableHeader>;
}

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableHeader;

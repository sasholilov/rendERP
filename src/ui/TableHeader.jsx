import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTableHeader = styled.p`
  font-weight: bold;
  padding-bottom: 16px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
`;

function TableHeader({ children }) {
  return <StyledTableHeader>{children}</StyledTableHeader>;
}

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableHeader;

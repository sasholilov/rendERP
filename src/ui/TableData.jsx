import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTableData = styled.p`
  color: var(--color-grey-4);
`;

function TableData({ children }) {
  return <StyledTableData>{children}</StyledTableData>;
}

TableData.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableData;

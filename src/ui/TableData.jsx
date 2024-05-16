import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTableData = styled.div`
  color: var(--color-grey-4);
  padding: 20px;
`;

function TableData({ children }) {
  return <StyledTableData>{children}</StyledTableData>;
}

TableData.propTypes = {
  children: PropTypes.any,
};

export default TableData;

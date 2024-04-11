import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.gridTemplateColumns || "1fr 1fr 1fr 1fr 1fr 1fr"};
  text-align: center;
  background-color: var(--color-light);
  border-radius: var(--border-radius-4);
  box-shadow: var(--box-shadow-1);
  align-items: center;
  padding: 0 20px 20px 20px;
`;

function Table({ children, gridtemplatecolumns }) {
  return (
    <StyledTable gridtemplatecolumns={gridtemplatecolumns}>
      {children}
    </StyledTable>
  );
}

Table.propTypes = {
  children: PropTypes.node.isRequired,
  gridtemplatecolumns: PropTypes.string,
};

export default Table;

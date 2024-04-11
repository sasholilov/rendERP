import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import TableData from "./TableData";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledActions = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;
const StyledData = styled.div`
  grid-column: 1 / span ${(props) => props.columns};
  align-items: center;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    minmax(120px, 1fr)
  );
  text-align: center;
`;

function TableDataRow({ resource, columns }) {
  return (
    <StyledData columns={columns}>
      {Object.keys(resource).map((key) => (
        <TableData key={key}>{resource[key]}</TableData>
      ))}
      <TableData>
        <StyledActions>
          <EditIcon />
          <DeleteIcon />
        </StyledActions>
      </TableData>
    </StyledData>
  );
}

TableDataRow.propTypes = {
  resource: PropTypes.object,
  columns: PropTypes.number,
};

export default TableDataRow;

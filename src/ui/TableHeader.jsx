import styled from "styled-components";
import PropTypes from "prop-types";

const StyledData = styled.div`
  grid-column: 1 / span ${(props) => props.columns};
  align-items: center;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    minmax(120px, 1fr)
  );
  text-align: center;

  & p {
    font-weight: bold;
    padding-bottom: 16px;
    border-bottom: var(--border-bottom);
  }
`;

function TableHeader({ children, columns }) {
  return <StyledData columns={columns}>{children}</StyledData>;
}

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.number,
};

export default TableHeader;

import styled from "styled-components";
import PropTypes from "prop-types";

const StatusUi = styled.div`
  background-color: ${(props) =>
    props.statusType === "Paid"
      ? `var(--color-green-1)`
      : props.statusType === "Unpaid"
      ? `var(--color-red-1)`
      : props.statusType === "Partial"
      ? `var(--color-yellow-2)`
      : `var(--color-green-1)`};

  padding: 5px 2px 5px 2px;
  color: var(--color-grey-1);
  border-radius: var(--border-radius-4);
  font-weight: 500;
`;

function Status({ statusType }) {
  return <Status statustype={statusType} />;
}

Status.propTypes = {
  statusType: PropTypes.string,
};

export default StatusUi;

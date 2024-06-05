import styled from "styled-components";
import PropTypes from "prop-types";
import { STATUSES } from "../utils/constants";

const StatusUi = styled.div`
  background-color: ${(props) =>
    props.statustype === `${STATUSES.PAID}`
      ? `var(--color-green-1)`
      : props.statustype === `${STATUSES.UNPAID}`
      ? `var(--color-red-1)`
      : props.statustype === `${STATUSES.PARTIAL}`
      ? `var(--color-yellow-2)`
      : `var(--color-green-1)`};

  padding: 5px 2px 5px 2px;
  color: var(--color-grey-1);
  border-radius: var(--border-radius-4);
  font-weight: 500;
`;

function Status({ statustype }) {
  return <Status statustype={statustype} />;
}

Status.propTypes = {
  statustype: PropTypes.string,
};

export default StatusUi;

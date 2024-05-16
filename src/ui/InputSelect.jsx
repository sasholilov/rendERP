import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSelect = styled.select`
  border: 1px solid #688cb4 !important;
  padding: 8px !important;
  max-width: 142px;
  border-radius: 10px;
  color: #495057;
  font-size: 1rem !important;
  cursor: pointer !important;
  background-color: transparent;

  & option {
    background-color: var(--color-light);
    padding-bottom: 10rem !important;
  }

  & option:first-child {
    font-style: italic;
  }

  &:focus {
    background-color: var(--color-light);
  }

  &:hover {
    background-color: var(--color-light);
  }
`;

function InputSelect({ selectfor, resource, displayOptions, handle, value }) {
  return (
    <StyledSelect onChange={(e) => handle(e)} defaultValue={value}>
      <option>Select {selectfor}</option>
      {displayOptions
        ? resource.map((res) => (
            <option key={res.id} value={res.id}>
              {res[displayOptions]}
            </option>
          ))
        : resource.map((res) => (
            <option key={res} value={res}>
              {res}
            </option>
          ))}
    </StyledSelect>
  );
}

InputSelect.propTypes = {
  resource: PropTypes.array,
  displayOptions: PropTypes.string,
  handle: PropTypes.func,
  value: PropTypes.any,
  selectfor: PropTypes.string,
};

export default InputSelect;

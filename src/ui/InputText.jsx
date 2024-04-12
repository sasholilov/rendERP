import styled from "styled-components";
import PropTypes from "prop-types";

const StyledInput = styled.input.attrs({ type: "text" })`
  border: 1px solid #688cb4 !important;
  padding: 8px !important;
  max-width: 132px;
  border-radius: 10px;
  color: #495057;
  font-size: 1rem !important;
  cursor: text !important;
`;

function InputText({ type, placeholder, onChange, value }) {
  return (
    <StyledInput
      defaultValue={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

InputText.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default InputText;

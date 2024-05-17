import styled from "styled-components";
import PropTypes from "prop-types";

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: var(--color-skyblue-1);
  }

  &:focus + span {
    box-shadow: 0 0 1px var(--color-skyblue-1);
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

function ToggleSwitch({ checked, isDisabled, onChange }) {
  return (
    <Switch>
      <Checkbox
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={isDisabled}
      />
      <Slider />
    </Switch>
  );
}

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default ToggleSwitch;

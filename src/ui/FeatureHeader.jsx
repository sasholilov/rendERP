import Button from "./Button";
import Search from "./Search";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
  margin: 0;
  margin-bottom: 10px;
`;

function FeatureHeader({
  searchQuery,
  setSearchQuery,
  addModeButton,
  addMode,
  setAddMode,
  feature,
}) {
  return (
    <StyledHeaderBar>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {!searchQuery && (
        <Button type={addModeButton} onClick={() => setAddMode(!addMode)}>
          {addMode ? "End adding" : `Add new ${feature}`}
        </Button>
      )}
    </StyledHeaderBar>
  );
}
FeatureHeader.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  addModeButton: PropTypes.string,
  addMode: PropTypes.bool,
  setAddMode: PropTypes.func,
  feature: PropTypes.string,
};

export default FeatureHeader;

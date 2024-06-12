import Button from "./Button";
import Search from "./Search";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

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
  showsearch,
  showfilterbtn,
  setFilterMode,
  filterMode,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClearFilters() {
    setSearchParams({});
  }

  function hasParams() {
    return [...searchParams.keys()].length > 0;
  }

  return (
    <StyledHeaderBar>
      {showsearch && (
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}
      {showfilterbtn && (
        <Button type="add" onClick={() => setFilterMode(!filterMode)}>
          {filterMode ? `Hide Filters` : `Filters`}
        </Button>
      )}
      {filterMode && (
        <Button onClick={handleClearFilters} isDisabled={!hasParams()}>
          Clear Filters
        </Button>
      )}
      {!searchQuery && !filterMode && (
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
  showsearch: PropTypes.bool,
  showfilterbtn: PropTypes.bool,
  setFilterMode: PropTypes.func,
  filterMode: PropTypes.bool,
};

export default FeatureHeader;

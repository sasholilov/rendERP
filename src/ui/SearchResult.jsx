import styled from "styled-components";
import PropTypes from "prop-types";

const StyledResultTitle = styled.h3`
  text-align: center;
  color: var(--color-grey-4);
`;

function SearchResult({ feature, searchQuery }) {
  return (
    <StyledResultTitle>
      {`Founded (${feature.length}) ${
        feature.length > 1 ? `results` : `result`
      } from search keyword
  "${searchQuery}"`}
    </StyledResultTitle>
  );
}

SearchResult.propTypes = {
  searchQuery: PropTypes.string,
  feature: PropTypes.object,
};

export default SearchResult;

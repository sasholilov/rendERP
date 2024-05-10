import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import PropTypes from "prop-types";
import InputText from "./InputText";

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
`;

function Search({ searchQuery, setSearchQuery }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleSearchEnter(e) {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
    }
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  function handleSearch(e) {
    setSearchQuery(e.target.previousSibling.value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <SearchBar>
      <InputText
        key={searchQuery}
        placeholder="Search..."
        onKeyDown={(e) => handleSearchEnter(e)}
      />
      <Button type="add" onClick={(e) => handleSearch(e)}>
        Search
      </Button>
      {searchQuery && <Button onClick={() => setSearchQuery("")}>Clear</Button>}
    </SearchBar>
  );
}

Search.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
};

export default Search;

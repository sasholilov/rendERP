import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1rem;
  margin-left: 0.8rem;
  color: var(--color-grey-3);
  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: var(--color-grey-1);
  border: none;
  border-radius: var(--border-radius-8);
  font-weight: 500;
  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
    color: var(--color-grey-3);
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
    color: var(--color-grey-3);
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-grey-4);
    color: var(--color-grey-1);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function netxtPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}{" "}
        </span>
        of <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={netxtPage}
          disabled={currentPage === pageCount}
        >
          <HiChevronRight />
          <span>Next</span>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

Pagination.propTypes = {
  count: PropTypes.number,
};

export default Pagination;

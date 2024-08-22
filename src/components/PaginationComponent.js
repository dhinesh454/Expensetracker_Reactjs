import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent= ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className="justify-content-center my-3">
      <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />

      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          onClick={() => paginate(number)}
          active={number === currentPage}
        >
          {number}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length} />
      <Pagination.Last onClick={() => paginate(pageNumbers.length)} disabled={currentPage === pageNumbers.length} />
    </Pagination>
  );
};

export default PaginationComponent;

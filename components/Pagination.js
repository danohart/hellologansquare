import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { perPage } from "../config";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    places(where: { neighborhood: "Logan Square" }) {
      name
    }
  }
`;

async function Pagination({ page, handlePageChange }) {
  const count = await context.query.places.count();
  const [pageNumber, setPageNumber] = useState(1);

  function changePage(e) {
    if (e === "previous") setPageNumber(pageNumber - 1);
    if (e === "next") setPageNumber(pageNumber + 1);

    handlePageChange(e);
  }

  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>Loading...</p>;
  const pages = Math.ceil(count / perPage);

  return (
    <div className='pagination'>
      <button
        onClick={() => changePage("previous")}
        disabled={pageNumber === 1}
      >
        ← Prev
      </button>
      <p>
        Page {pageNumber} of {pages}
      </p>
      <button onClick={() => changePage("next")} disabled={pageNumber >= pages}>
        Next →
      </button>
    </div>
  );
}

export default Pagination;

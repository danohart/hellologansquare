import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { perPage } from "../config";
import Loading from "./Loading";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    places(where: { neighborhood: { name: { equals: "Logan Square" } } }) {
      name
    }
  }
`;

function Pagination({ page, handlePageChange }) {
  const [pageNumber, setPageNumber] = useState(1);

  async function changePage(e) {
    if (e === "previous") setPageNumber((prevState) => prevState - 1);
    if (e === "next") setPageNumber((prevState) => prevState + 1);

    return handlePageChange(e);
  }

  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return <Loading />;

  const pages = Math.ceil(data.places.length / perPage);

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

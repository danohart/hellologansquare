import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { perPage } from "../config";
import Loading from "./Loading";
import { useRouter } from "next/router";
import Error from "@/lib/ErrorMessage";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    places(where: { neighborhood: { name: { equals: "Logan Square" } } }) {
      name
    }
  }
`;

function Pagination({ page, handlePageChange }) {
  const router = useRouter();
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const pages = Math.ceil(data.places.length / perPage);

  return (
    <div className='pagination'>
      <button
        onClick={() => handlePageChange("previous")}
        disabled={!router.query.page && router.query.page === 1}
      >
        ← Prev
      </button>
      <p>
        Page {router.query.page ? router.query.page : "1"} of {pages}
      </p>
      <button
        onClick={() => handlePageChange("next")}
        disabled={router.query.page >= pages}
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;

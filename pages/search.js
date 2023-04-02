import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import { gql, useQuery } from "@apollo/client";
import Place from "../components/Place";
import Hero from "../components/Hero";
import Meta from "../components/Meta";

const SEARCH_PLACES_QUERY = gql`
  query SEARCH_PLACES_QUERY($search_query: String!) {
    places(
      where: {
        neighborhood: { name: { equals: "Logan Square" } }
        OR: [{ name: { contains: $search_query } }]
      }
    ) {
      id
      name
      description {
        document
      }
      address
      mainCategory {
        name
      }
    }
  }
`;

export default function Search(props) {
  const router = useRouter();
  const type = router.query.type;

  const { loading, error, data } = useQuery(SEARCH_PLACES_QUERY, {
    variables: { search_query: type },
  });

  if (error) return <p>Error :( {error}</p>;

  const searchBack = (
    <button>
      <Link href='/'>Go Back</Link>
    </button>
  );

  return (
    <div className='category-page'>
      <Meta title={`Search: "${type}" // Hello Logan Square`} />

      <Hero title={"Search: " + type} subtitle={searchBack} />

      <div className='card-wrapper'>
        {!loading ? (
          data.places.map((place) => (
            <Place place={place} key={place.id} setList={props.setList} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

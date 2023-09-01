import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Place from "@/components/Place";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";
import { perPage } from "@/config";
import { useRouter } from "next/router";
import Error from "@/lib/ErrorMessage";

const HOME_PLACES_QUERY = gql`
  query HOME_PLACES_QUERY($skip: Int, $take: Int) {
    places(
      skip: $skip
      take: $take
      where: { neighborhood: { name: { equals: "Logan Square" } } }
    ) {
      id
      neighborhood {
        name
      }
      name
      featured
      description {
        document
      }
      simpleDescription
      address
      mainCategory {
        name
      }
      subCategory {
        name
      }
      googleId
    }
  }
`;

export default function AllPlaces({ setList }) {
  const router = useRouter();
  const offset = parseInt(router.query.page);

  console.log("offset", offset);

  const { loading, error, data } = useQuery(HOME_PLACES_QUERY, {
    variables: { skip: offset, take: perPage },
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  function handlePageChange(e) {
    if (e === "previous") router.push(`/places/${offset - 1}`);
    if (e === "next") router.push(`/places/${offset + 1}`);
  }

  return (
    <div>
      <div className='card-wrapper'>
        {data.places.map((place) => (
          <Place place={place} key={place.id} setList={setList} />
        ))}
      </div>

      <Pagination page={offset} handlePageChange={handlePageChange} />
    </div>
  );
}

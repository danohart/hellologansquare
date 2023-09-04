import React from "react";
import Place from "../components/Place";
import Loading from "../components/Loading";
import Hero from "../components/Hero";
import { gql, useQuery } from "@apollo/client";
import Meta from "../components/Meta";

const PATIO_QUERY = gql`
  query PATIO_QUERY {
    places(
      where: {
        neighborhood: { name: { equals: "Logan Square" } }
        details: { some: { name: { equals: "patio" } } }
      }
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
      details {
        name
      }
      mainCategory {
        name
      }
    }
  }
`;

export default function Patio(props) {
  const { loading, error, data } = useQuery(PATIO_QUERY);
  if (loading) return "Loading";
  if (error) return <p>Error :( {error}</p>;
  return (
    <>
      <Meta title='List of Patios Open in Logan Square Chicago Restaurants // Hello Logan Square' />
      <Hero
        title='Patios Currently Open'
        subtitle='Find places ready to serve you out on the patio'
      />
      <div className='patio'>
        <div className='card-wrapper'>
          {loading ? (
            <Loading />
          ) : (
            data.places.map((place) => (
              <Place place={place} key={place.id} setList={props.setList} />
            ))
          )}
        </div>
        {/* <Map
          placeIds={data.allPlaces.map((place) => {
            place.lat + place.lng;
          })}
        /> */}
      </div>
    </>
  );
}

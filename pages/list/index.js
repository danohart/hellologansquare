import React from "react";
import Place from "../../components/Place";
import Loading from "../../components/Loading";
import Hero from "../../components/Hero";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Meta from "../../components/Meta";

const SOME_PLACES_QUERY = gql`
  query SOME_PLACES_QUERY {
    allPlaces(
      where: {
        OR: [
          { id: "5edb2b6d5431ee8b98d23d3d" }
          { id: "5e211bcfc259b442a111cecb" }
        ]
      }
    ) {
      id
      name
      description
      address {
        lat
        lng
        formattedAddress
      }
      path
      image
      mainCategory {
        name
      }
    }
  }
`;

export default function List(props) {
  const { loading, error, data } = useQuery(SOME_PLACES_QUERY);
  if (loading) return "Loading";
  if (error) return <p>Error :( {error}</p>;
  return (
    <>
      <Meta title='List created for places in Logan Square Chicago Restaurants // Hello Logan Square' />
      <Hero title='Your List' />
      <div className='list'>
        <div className='card-wrapper'>
          {loading ? (
            <Loading />
          ) : (
            data.allPlaces.map((place) => (
              <Place place={place} key={place.id} setList={props.setList} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

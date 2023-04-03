import React, { useState, useRef } from "react";
import Place from "../components/Place";
import Loading from "../components/Loading";
import Hero from "../components/Hero";
import { gql, useQuery } from "@apollo/client";
import Meta from "../components/Meta";
import Category from "../components/Category";
import Pagination from "../components/Pagination";
import { perPage } from "../config";

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
      address
      mainCategory {
        name
      }
      subCategory {
        name
      }
    }
  }
`;

export default function Home(props) {
  const [offset, setOffset] = useState(0);
  const exploreAll = useRef(null);

  const { loading, error, data } = useQuery(HOME_PLACES_QUERY, {
    fetchPolicy: "network-only",
    variables: { skip: offset, take: perPage },
  });
  if (error) return <p>Error :( {error}</p>;

  function handlePageChange(e) {
    if (e === "previous") setOffset(offset - perPage);
    if (e === "next") setOffset(offset + perPage);
    window.scrollTo({
      top: exploreAll.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className='homepage'>
      <Hero
        title='Discover your neighborhood.'
        subtitle='Find places to eat and drink in Logan Square'
        search
      />
      <Category path='Patio' setList={props.setList} />
      <Category path='Restaurant' setList={props.setList} />
      <Category path='Bar' setList={props.setList} />
      <h3 align='center' ref={exploreAll}>
        Explore All
      </h3>
      <div className='card-wrapper'>
        {loading ? (
          <Loading />
        ) : (
          data.places.map((place) => (
            <Place place={place} key={place.id} setList={props.setList} />
          ))
        )}
      </div>

      <Pagination page={offset} handlePageChange={handlePageChange} />
    </div>
  );
}

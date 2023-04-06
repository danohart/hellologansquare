import React, { useState, useRef } from "react";
import Place from "../components/Place";
import Loading from "../components/Loading";
import Hero from "../components/Hero";
import { gql, useQuery } from "@apollo/client";
import Meta from "../components/Meta";
import Category from "../components/Category";
import Pagination from "../components/Pagination";
import { perPage } from "../config";
import { initializeApollo } from "@/lib/withData";
import Link from "next/link";

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
      googleId
    }
  }
`;

export default function Home({ places, setList }) {
  const [offset, setOffset] = useState(0);
  const exploreAll = useRef(null);

  const { loading, error, data } = useQuery(HOME_PLACES_QUERY, {
    variables: { skip: offset, take: perPage },
  });
  if (error) return <p>Error :( {error}</p>;

  return (
    <div className='homepage'>
      <Hero
        title='Discover your neighborhood.'
        subtitle='Find places to eat and drink in Logan Square'
        search
      />
      <Category path='Patio' setList={setList} />
      <Category path='Restaurant' setList={setList} />
      <Category path='Bar' setList={setList} />
      <h3 align='center' ref={exploreAll}>
        Explore All
      </h3>
      <div className='card-wrapper'>
        {data.places.map((place) => (
          <Place place={place} key={place.id} setList={setList} />
        ))}
      </div>
      <div className='center-align'>
        <Link href='/places'>
          <button className='large'>Explore All</button>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: HOME_PLACES_QUERY,
    variables: { skip: 0, take: perPage },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

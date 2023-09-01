import React from "react";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import { gql, useQuery } from "@apollo/client";
import Place from "../../components/Place";
import Hero from "../../components/Hero";
import Meta from "../../components/Meta";

export default function Category(props) {
  const router = useRouter();
  const { type } = router.query;

  const CATEGORY_PLACES_QUERY = gql`
    query CATEGORY_PLACES_QUERY($category: String!) {
      places(
        where: {
          neighborhood: { name: { equals: "Logan Square" } }
          OR: [{ mainCategory: { name: { equals: $category } } }]
        }
      ) {
        id
        name
        description {
          document
        }
        simpleDescription
        details {
          name
        }
        address
        mainCategory {
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(CATEGORY_PLACES_QUERY, {
    variables: { category: type },
  });

  if (error) return <p>Error :( {error}</p>;

  function determineCategorySubtitle() {
    if (type === "Bar")
      return "Check out the neighborhood bars that make our corner of Chicago great.";
    if (type === "Cafe")
      return "Need some caffeine? Need a place to work? Check out these coffee shops.";
    if (type === "Restaurant")
      return "In the mood for tacos? Or even some deep dish pizza? Find that and more here.";
    if (type === "Brewery")
      return "Grab a brew that's brewed right here in Logan Square.";
    return null;
  }

  return (
    <div className='category-page'>
      <Meta
        title={`${
          type === "Brewery" ? "Breweries" : type + "s"
        } in Logan Square, Chicago // Hello Chicago`}
      />

      <Hero title={type + " Results"} subtitle={determineCategorySubtitle()} />

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

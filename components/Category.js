import React from "react";
import Link from "next/link";
import Place from "../components/Place";
import Loading from "../components/Loading";
import { useQuery, gql } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

const CATEGORY_PLACES_QUERY = gql`
  query CATEGORY_PLACES_QUERY($query: String!, $lowerCase: String) {
    places(
      where: {
        neighborhood: { name: { equals: "Logan Square" } }
        featured: { equals: true }
        OR: [
          { mainCategory: { name: { contains: $query } } }
          { details: { some: { name: { equals: $lowerCase } } } }
        ]
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
      mainCategory {
        name
      }
      subCategory {
        name
      }
    }
  }
`;

export default function Category(props) {
  const { loading, error, data } = useQuery(CATEGORY_PLACES_QUERY, {
    variables: { query: props.path, lowerCase: props.path.toLowerCase() },
  });

  if (error) return <p>Error :( {error}</p>;
  return (
    <div className='category-list'>
      <h3 className='category-list-title'>Featured {props.path + "s"}</h3>
      <div className='outer-menu'>
        <div className='category-wrapper'>
          {loading ? (
            <Loading />
          ) : (
            data.places.map((place) => (
              <Place place={place} key={place.id} setList={props.setList} />
            ))
          )}
          <Link
            href={{
              pathname: "/category",
              query: { type: props.path },
            }}
            key={props.path}
          >
            <div className='more'>
              <div>
                <span>
                  More&nbsp;
                  <FontAwesomeIcon icon={faChevronCircleRight} />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

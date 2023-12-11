import React, { useState, useEffect } from "react";
import { initializeApollo } from "@/lib/withData";
import Place from "../../components/Place";
import { gql } from "@apollo/client";
import Meta from "../../components/Meta";

export default function List({ list }, props) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [message, setMessage] = useState("Copy");

  useEffect(() => {
    const currentUrl = window.location.href;
    setCurrentUrl(currentUrl);
  }, []);

  function copyUrl() {
    navigator.clipboard.writeText(currentUrl);
    setMessage("Copied!");
    setTimeout(() => {
      setMessage("Copy");
    }, "2000");
  }

  return (
    <>
      <Meta title='List created for places in Logan Square Chicago Restaurants // Hello Logan Square' />
      <div className='share'>
        <input className='share-input' value={currentUrl} />
        <div className='share-click'>
          <div className='share-toast'>{message}</div>
          <button className='share-button' onClick={copyUrl}>
            Copy link
          </button>
        </div>
      </div>
      <div className='list'>
        <div className='card-wrapper'>
          {list.places.map((place) => (
            <Place place={place} key={place.id} setList={props.setList} />
          ))}
        </div>
      </div>
    </>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      query ALL_LISTS {
        favoritesLists {
          url
        }
      }
    `,
  });
  // Get the paths we want to pre-render based on posts
  const paths = data.favoritesLists.map((favoritesList) => ({
    params: { url: favoritesList.url },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      query ($where: FavoritesListWhereUniqueInput!) {
        favoritesList(where: $where) {
          url
          places {
            name
            address
            simpleDescription
            mainCategory {
              name
            }
            subCategory {
              name
            }
          }
        }
      }
    `,
    variables: {
      where: {
        url: params.url,
      },
    },
  });
  const list = data.favoritesList;

  return { props: { list } };
}

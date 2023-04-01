import React, { useState, useRef } from "react";
import Meta from "../components/Meta";
import Loading from "../components/Loading";
import { gql, useQuery } from "@apollo/client";

const RANDOM_PLACES_QUERY = gql`
  query RANDOM_PLACES_QUERY {
    allPlaces(
      where: {
        neighborhood: "Logan Square"
        mainCategory: { name: { equals: "Bar" } }
      }
      sortBy: name_ASC
    ) {
      id
    }
  }
`;

const SINGLE_PLACE = gql`
  query SINGLE_PLACE($id: ID!) {
    place(where: { id: $id }) {
      id
      name
      description
      address
      image
      mainCategory {
        name
      }
    }
  }
`;

export default function Random() {
  function getRandomInteger(min, max) {
    const random = Math.floor(Math.random() * (max - min)) + min;
    console.log("random", random);
    return random;
  }
  const getAllPlaces = useQuery(RANDOM_PLACES_QUERY);

  const randomPlaceId =
    getAllPlaces.data &&
    getAllPlaces.data.allPlaces[getRandomInteger(0, 20)].id;

  const [randomNumber, setRandomNumber] = useState("5edb040eb5b1ec2bc5e48818");

  const getSinglePlace = useQuery(SINGLE_PLACE, {
    skip: !getAllPlaces.data,
    variables: {
      id: randomNumber,
    },
  });

  if (getSinglePlace.loading)
    return (
      <div className='random card-wrapper'>
        <h1>Random Place Picker</h1>
        <h2>For Logan Square Neighborhood</h2>
        <Loading singleCard />
      </div>
    );
  if (getSinglePlace.error)
    return <p align='center'>Error :( {getSinglePlace.error.message}</p>;

  if (!getSinglePlace) return null;

  async function refetchRandomPlace() {
    setRandomNumber(getAllPlaces.data.allPlaces[getRandomInteger(0, 20)].id);
    getSinglePlace.refetch();
    return console.log("success!");
  }

  return (
    <>
      <div className='random card-wrapper'>
        <Meta title=' Pick a random place for lunch or dinner' />
        <h1>Random Place Picker</h1>
        <h2>For Logan Square Neighborhood</h2>
        {getAllPlaces.loading ? (
          "Loading"
        ) : (
          <div className='card'>
            <div className='title-wrapper'>
              <h2 className='title'>{getSinglePlace.data.Place.name}</h2>
            </div>
            <div className='inner'>
              <div className='additional-info'>
                <p>{getSinglePlace.data.Place.description}</p>
                <div className='address'>
                  <a
                    target='_blank'
                    href={`https://www.google.com/maps/search/?api=1&query=${
                      getSinglePlace.data.Place.name +
                      " " +
                      getSinglePlace.data.Place.address.formattedAddress
                    }`}
                  >
                    {getSinglePlace.data.Place.address.formattedAddress}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='center-align'>
        <div className='button' onClick={refetchRandomPlace}>
          Refresh
        </div>
      </div>
    </>
  );
}

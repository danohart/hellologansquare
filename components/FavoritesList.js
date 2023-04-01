import { useMutation } from "@apollo/client";
import { slugify } from "../lib/slugify";
import { gql } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";

const CREATE_LIST_MUTATION = gql`
  mutation CREATE_LIST_MUTATION(
    $places: [PlaceWhereUniqueInput!]
    $url: String
  ) {
    createFavoritesList(data: { places: { connect: $places }, url: $url }) {
      url
    }
  }
`;

export default function FavoritesList({ favList, addOrRemoveToFavList }) {
  const router = useRouter();
  const placeIdArray = favList.map((place) => ({
    id: place.id,
  }));

  const today = new Date();

  const postedAt =
    today.getDate() +
    ":" +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  const url = slugify(postedAt);

  const [addListToDatabase, { loading, error }] = useMutation(
    CREATE_LIST_MUTATION,
    {
      variables: {
        places: placeIdArray,
        url,
      },
    }
  );

  async function saveList() {
    const addToDatabase = await addListToDatabase();
    const res = addToDatabase;
    addOrRemoveToFavList("place", "clear");

    return res ? router.push(`/list/${url}`) : null;
  }

  return (
    <div className='fav-list'>
      <h4>Favorites List</h4>
      {favList.map((place) => (
        <div className='fav-list-place' key={place.id}>
          {place.name}
          <span
            className='fav-list-place-remove'
            onClick={() => addOrRemoveToFavList(place)}
          >
            x
          </span>
        </div>
      ))}
      <button className='fav-list-save' onClick={() => saveList()}>
        Save List
      </button>
    </div>
  );
}

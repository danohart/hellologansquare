import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "@/components/Loading";

export default function Nearby() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);

  const [placeDetails, setPlaceDetails] = useState({
    result: {
      business_status: "Not Set",
      name: "Not Set",
      opening_hours: {
        open_now: true,
        periods: [""],
        weekday_text: [""],
      },
      website: "Not Set",
    },
  });

  async function getPlaceData(keyword, token) {
    let url = `/api/findPlace?keyword=${keyword}`;
    if (token !== null)
      url = `/api/searchNearby?keyword=${keyword}&next_page_token=${token}`;

    const data = await fetch(url);
    const results = await data.json();

    setResults(results);
    setNextPageToken(!results.next_page_token ? null : results.next_page_token);

    return;
  }

  async function findPlaceDetails(id) {
    const url = `/api/updatePlace?placeId=${id}`;

    const data = await fetch(url);
    const results = await data.json();

    setPlaceDetails(results);
  }

  const ALL_PLACES_QUERY = gql`
    query Places($where: PlaceWhereInput!) {
      places(where: $where) {
        id
        name
        address
        googleId
        website
      }
    }
  `;

  const GET_PLACE_QUERY = gql`
    query Place($where: PlaceWhereUniqueInput!) {
      place(where: $where) {
        id
        name
        address
        googleId
      }
    }
  `;

  const UPDATE_PLACE_MUTATION = gql`
    mutation UpdatePlace(
      $data: PlaceUpdateInput!
      $where: PlaceWhereUniqueInput!
    ) {
      updatePlace(data: $data, where: $where) {
        name
      }
    }
  `;

  const { error: singlePlaceError, data: singlePlaceData } = useQuery(
    GET_PLACE_QUERY,
    {
      variables: { where: { name: placeDetails.result.name } },
    }
  );

  const [
    updateWebSiteInfo,
    { error: mutationError, loading, data: mutationData },
  ] = useMutation(UPDATE_PLACE_MUTATION);

  function handleChange(e) {
    e.preventDefault();

    const searchTerm = e.target.value;

    setTerm(searchTerm);

    return;
  }

  const {
    loading: placesLoading,
    error: placesError,
    data: placesData,
  } = useQuery(ALL_PLACES_QUERY, {
    variables: { where: { featured: { not: { equals: true } } } },
  });

  if (placesLoading) return Loading;

  return (
    <div className='main' style={{ margin: "0 40px" }}>
      Hello
      <br />
      <input
        value={term}
        placeholder='Search Nearby Logan Square'
        onChange={handleChange}
      />
      <button onClick={() => getPlaceData(term, nextPageToken)}>Get</button>
      <button onClick={() => findPlaceDetails(term)}>Updated Data</button>
      <hr />
      {placesData.places.map((place) => (
        <div
          key={place.id}
          style={
            !place.googleId
              ? { display: "none" }
              : { display: "block", float: "left", padding: "10px" }
          }
          onClick={() => setTerm(place.googleId)}
        >
          {place.name}
        </div>
      ))}
      <br />
      <div>
        {placeDetails.website !== "Not Set" ? (
          <div>
            {JSON.stringify(placeDetails)}
            <br />
            <button
              onClick={() =>
                updateWebSiteInfo({
                  variables: {
                    data: { website: placeDetails.result.website },
                    where: {
                      id: singlePlaceData.place.id,
                    },
                  },
                })
              }
            >
              Does this look correct?
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <hr />
      <textarea
        defaultValue={JSON.stringify(results.result)}
        id='results-text'
        cols='100'
        rows='50'
      ></textarea>
      {nextPageToken}
    </div>
  );
}

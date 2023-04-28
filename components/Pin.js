import Head from "next/head";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faTimes,
  faDirections,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const MAP_PIN_QUERY = gql`
  query ($id: ID!) {
    place(where: { id: $id }) {
      id
      name
      address
      mainCategory {
        name
      }
    }
  }
`;

export default function Pin({ openPopup, closePopup, placeId }) {
  const [showMarkerInfo, setShowMarkerInfo] = useState(false);

  const { loading, error, data } = useQuery(MAP_PIN_QUERY, {
    variables: { id: placeId },
  });
  if (loading) return "";
  if (error) return <p>Error :( {error}</p>;

  return (
    <>
      <div className={showMarkerInfo ? "pin show" : "pin"}>
        <FontAwesomeIcon
          icon={faMapMarker}
          title={data.place.name}
          onClick={() => setShowMarkerInfo(true)}
        />
      </div>
      <div className={showMarkerInfo ? "pin-info show" : "pin-info"}>
        <div className='pin-info-close'>
          <a
            target='_blank'
            href={`https://www.google.com/maps/search/?api=1&query=${
              data.place.name + " " + data.place.address.formattedAddress
            }`}
          >
            <FontAwesomeIcon icon={faDirections} />
          </a>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setShowMarkerInfo(false)}
          />
        </div>
        <h3>{data.place.name}</h3>
        <p>{data.place.address}</p>
        <div className='pin-info-type'>
          Type of place: {data.place.mainCategory.name}
        </div>
      </div>
    </>
  );
}

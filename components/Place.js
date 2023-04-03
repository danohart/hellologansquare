import Link from "next/link";
import { CategoryIcon } from "../components/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPlusCircle,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { DocumentRenderer } from "@keystone-6/document-renderer";

export default function Place({ place, setList }) {
  const [isAdded, setIsAdded] = useState(false);

  function addPlaceToList(place) {
    setList(place);
    setIsAdded(!isAdded);
    return;
  }

  return (
    <div className='card' key={place.id}>
      {place.featured ? (
        <>
          <div className='featured'>
            <FontAwesomeIcon
              icon={faStar}
              title='Featured Local Logan Square Place'
            />
          </div>
          <div className='add-to-list with-feature'>
            <FontAwesomeIcon
              icon={!isAdded ? faPlusCircle : faMinus}
              title='Add Local Logan Square Place'
              onClick={() => addPlaceToList(place)}
            />
          </div>
        </>
      ) : (
        <div className='add-to-list'>
          <FontAwesomeIcon
            icon={faPlusCircle}
            title='Add Local Logan Square Place'
            onClick={() => addPlaceToList(place)}
          />
        </div>
      )}

      <div className='title-wrapper'>
        <h2 className='title'>
          <Link
            href={{
              pathname: "/place",
              query: { id: place.id },
            }}
          >
            {place.name}
          </Link>
        </h2>
      </div>
      <div className='inner'>
        <div className='address'>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${
              place.name + " " + place.address
            }`}
            target='_blank'
          >
            {place.address.split(",", 1)}
          </a>
        </div>
        <div className='additional-info'>
          <p>
            <DocumentRenderer document={place.description.document} />
          </p>
        </div>
      </div>
      {place.hours ? (
        <div className='hours'>
          <h3>Hours</h3>
          <div>{place.hours.split(",")[0]}</div>
          <div>{place.hours.split(",")[1]}</div>
          <div>{place.hours.split(",")[2]}</div>
        </div>
      ) : null}
      <div className='icons'>
        <CategoryIcon icon={place.mainCategory.name} />
        {place.subCategory ? (
          <CategoryIcon icon={place.subCategory.name} />
        ) : null}
        {place.details &&
        place.details.length &&
        place.details.filter((detail) => detail.name === "patio") ? (
          <CategoryIcon icon='patio' />
        ) : null}
      </div>
    </div>
  );
}

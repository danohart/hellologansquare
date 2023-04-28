import { useState } from "react";
import { Map, Overlay } from "pigeon-maps";
import Pin from "./Pin";
import Place from "./Place";

export default function MapComponent(props) {
  const MAPTILER_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPTILER_ACCESS;
  const MAP_ID = "basic";

  function mapTilerProvider(x, y, z, dpr) {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png?key=${MAPTILER_ACCESS_TOKEN}`;
  }

  const [allPlaces, setAllPlaces] = useState(props.placeIds);
  const [centerOfMap, setCenterOfMap] = useState(props.centerOfMap);
  const [zoomIn, setZoomIn] = useState(15);
  const [selectedIndex, setSelectedIndex] = useState(null);

  function setSelectedMarker(index) {
    setSelectedIndex(index);
  }

  function closePopup(selectedIndex) {
    console.log("openPopup", selectedIndex);
    setSelectedIndex(null);
  }

  function openPopup(index) {
    console.log("openPopup", index);
    setSelectedIndex(index);
  }

  function handleZoom(lat, lng, id) {
    setCenterOfMap([lat, lng]);
    setZoomIn(17);
    setSelectedIndex(id);
    return;
  }

  return (
    <div className='map'>
      <div className='map-places'>
        <Map center={centerOfMap} zoom={zoomIn} provider={mapTilerProvider}>
          {allPlaces.map((location) => (
            <Overlay
              anchor={[location.address.lat, location.address.lng]}
              key={location.id}
            >
              <Pin
                placeId={location.id}
                openPopup={() => openPopup(selectedIndex)}
                closePopup={() => closePopup(selectedIndex)}
              />
            </Overlay>
          ))}
        </Map>
      </div>
      <div className='map-list'>
        <div className='card-wrapper'>
          {allPlaces.map((place) => (
            <>
              <Place place={place} key={place.id} setList={props.setList} />
              <button
                onClick={() =>
                  handleZoom(place.address.lat, place.address.lng, place.id)
                }
              >
                Scroll into view
              </button>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

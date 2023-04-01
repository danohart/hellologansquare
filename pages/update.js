import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useState } from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";

const UPDATE_PLACES = gql`
  {
    places(where: { neighborhood: "Logan Square" }, first: 2) {
      id
      address
      name
    }
  }
`;

const MUTATION_PLACES = gql`
  mutation {
    updatePlaces(data: [{ id: ID, data: { hours: "Simon" } }]) {
      id
      name
      hours
    }
  }
`;

export default function Update() {
  const reedsId = "ChIJH7NYD4HND4gR5ciTtGb4_eE";
  const googleUrl1 = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${reedsId}&fields=opening_hours,name&key=${googleMapsApi}`;
  const googleUrl2 = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApi}&libraries=places`;

  const [updateHours, setUpdateHours] = useState("");
  const { loading, error, data } = useQuery(UPDATE_PLACES);

  console.log("dataaaa", updateHours);

  if (loading) return "Loading";
  if (error) return <p>Error :( {error.message}</p>;

  function DoIt() {
    setUpdateHours([
      data.allPlaces.map((place) => ({
        id: place.id,
        data: { name: place.name },
      })),
    ]);

    // data.allPlaces.map((place) =>
    fetch(googleUrl2, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        console.log("daTa", data.result.opening_hours.weekday_text)
      );
    // );
  }

  var map;
  var service;
  var infowindow;

  function initMap() {
    if (typeof window !== "undefined") {
      var chicago = new google.maps.LatLng(41.9383806, -87.7134283);

      infowindow = new google.maps.InfoWindow();

      map = new google.maps.Map(document.getElementById("map"), {
        center: chicago,
        zoom: 15,
      });

      var request = {
        placeId: "ChIJMfp633DND4gR3jR0TmYO0qQ",
        fields: [
          "name",
          "geometry",
          "place_id",
          "formatted_address",
          "opening_hours",
          "utc_offset_minutes",
        ],
      };

      var service = new google.maps.places.PlacesService(map);

      service.getDetails(request, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
          });
          google.maps.event.addListener(marker, "click", function () {
            infowindow.setContent(
              "<div><strong>" +
                place.name +
                "</strong><br>" +
                "Place ID: " +
                place.place_id +
                "<br>" +
                place.formatted_address +
                "<br>" +
                place.opening_hours.weekday_text +
                "</div>"
            );
            infowindow.open(map, this);
          });
        }
      });
    }
  }

  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  return (
    <div className='card-wrapper'>
      <Head>
        <title>Update</title>
        <script
          async
          src='https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U&libraries=places'
        ></script>
      </Head>
      <div className='button' onClick={() => initMap()}>
        Click
      </div>
      <div id='map' style={{ height: "600px", width: "100%" }}>
        Hey
      </div>
    </div>
  );
}

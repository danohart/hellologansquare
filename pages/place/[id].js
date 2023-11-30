import Meta from "@/components/Meta";
import { gql } from "@apollo/client";
import { CategoryIcon, PathIcon } from "../../components/Icons";
import { initializeApollo } from "@/lib/withData";
import { getHappyHourData } from "@/lib/scripts";
import { useEffect, useState } from "react";

export default function Place({ place }) {
  const [happyHour, setHappyHour] = useState("None");

  useEffect(() => {
    getHappyHourData(place).then((res) => setHappyHour(res));
  }, []);

  return (
    <div className='place-single'>
      <Meta
        title={`${place.name} : A ${place.mainCategory.name} in Chicago // Find things
          to do in Chicago like a local`}
        description={`${place.name} is a ${place.mainCategory.name} in Chicago, IL`}
      />
      <div className='card' key={place.id}>
        <div className='title-wrapper'>
          <h2 className='title'>{place.name}</h2>
          <div className='icons'>
            <CategoryIcon icon={place.mainCategory.name} />
          </div>
        </div>
        <div className='inner'>
          <div className='additional-info'>
            <p>{place.simpleDescription}</p>
            <div className='address'>{place.address}</div>
          </div>
        </div>
        <PathIcon icon={place.path} />

        {happyHour !== "None" ? (
          <div>
            <h3>Happy Hour Specials</h3>
            {happyHour.day.map((day) => (
              <div>{day.name + ": " + day.drink_specials}</div>
            ))}
          </div>
        ) : null}
      </div>
      {process.env.NODE_ENV !== "development" ? (
        <div className='map'>
          <iframe
            src={
              `https://www.google.com/maps/embed/v1/place?key=${process.env.MAPS_API_KEY}&q=` +
              place.name +
              " " +
              place.address
            }
            width='600'
            height='450'
            allowFullScreen
            className='map-iframe'
          />
        </div>
      ) : null}
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      query ALL_PLACES_QUERY {
        places(where: { neighborhood: { name: { equals: "Logan Square" } } }) {
          id
        }
      }
    `,
  });
  // Get the paths we want to pre-render based on posts
  const paths = data.places.map((place) => ({
    params: { id: place.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      query SINGLE_PLACE($id: ID!) {
        place(where: { id: $id }) {
          id
          name
          description {
            document
          }
          simpleDescription
          address
          image {
            filename
          }
          mainCategory {
            name
          }
        }
      }
    `,
    variables: { id: params.id },
  });
  const place = data.place;

  return { props: { place } };
}

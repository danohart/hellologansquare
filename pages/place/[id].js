import Head from "next/head";
import { gql } from "@apollo/client";
import { CategoryIcon, PathIcon } from "../../components/Icons";
import { initializeApollo } from "@/lib/withData";

export default function Place({ place }) {
  return (
    <div className='place-single'>
      <Head>
        <title>
          {place.name} : A {place.mainCategory.name} in Chicago // Find things
          to do in Chicago like a local
        </title>
        <meta
          name='description'
          content={`${place.name} is a ${place.mainCategory.name} in Chicago, IL`}
        />
        <script type='application/ld+json'>{`
         {
            "@context": "https://schema.org/",
            "@type": "Place",
            "name": "${place.name}",
            "description": "${place.description}",
            ${place.image ? `"image":"${place.image.filename}",` : ``}
          }
        `}</script>
      </Head>
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
      </div>
      <div className='map'>
        <iframe
          src={
            "https://www.google.com/maps/embed/v1/place?key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U&q=" +
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

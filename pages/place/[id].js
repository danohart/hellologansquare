import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { CategoryIcon, PathIcon } from "../../components/Icons";

export default function Place() {
  const router = useRouter();
  const { id } = router.query;

  const SINGLE_PLACE = gql`
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
  `;

  const { loading, error, data } = useQuery(SINGLE_PLACE, {
    variables: { id },
  });

  if (loading) return <div className='place-single'>Please wait...</div>;
  if (error)
    return (
      <p>
        Error <p>{error}</p>
      </p>
    );

  const place = data.place;

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

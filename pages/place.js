import Loading from "../components/Loading";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { CategoryIcon, PathIcon } from "../components/Icons";

const SINGLE_PLACE = gql`
  query SINGLE_PLACE($id: ID!) {
    place(where: { id: $id }) {
      id
      name
      description {
        document
      }
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

export default function Place() {
  const router = useRouter();
  const id = router.query.id;
  const { loading, error, data } = useQuery(SINGLE_PLACE, {
    variables: {
      id: id,
    },
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
            <p>
              <DocumentRenderer document={place.description.document} />
            </p>
            <div className='address'>{place.address}</div>
          </div>
        </div>
        <PathIcon icon={place.path} />
      </div>
    </div>
  );
}

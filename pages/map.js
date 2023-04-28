import { useQuery, gql } from "@apollo/client";
import MapComponent from "../components/Map";
import Meta from "../components/Meta";
import Error from "@/lib/ErrorMessage";

const ALL_PLACES_QUERY = gql`
  query ALL_PLACES_QUERY {
    places(where: { neighborhood: { name: { equals: "Logan Square" } } }) {
      id
      neighborhood {
        name
      }
      name
      featured
      description {
        document
      }
      address
      mainCategory {
        name
      }
      subCategory {
        name
      }
      googleId
    }
  }
`;

export default function MapPage() {
  const { loading, error, data } = useQuery(ALL_PLACES_QUERY);
  if (loading) return "Please wait...";
  if (error) return <Error error={error} />;

  return (
    <>
      <Meta title='Map' />
      <MapComponent
        placeIds={data.places}
        centerOfMap={[41.9391408, -87.7118835]}
      />
    </>
  );
}

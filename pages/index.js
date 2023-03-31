import { useEffect, useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useQuery, gql } from "@apollo/client";

const inter = Inter({ subsets: ["latin"] });

const GET_ALL_PLACES = gql`
  query GetPlaces {
    places(where: { neighborhood: { name: { equals: "Logan Square" } } }) {
      id
      name
      description {
        document
      }
      address
      mainCategory {
        name
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_PLACES);
  const [statusCheck, setStatusCheck] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // async function getOperationStatus(place) {
  //   const api = await fetch(
  //     `/api/findPlace?placeName=${place.name + " " + place.address}`
  //   );
  //   const data = await api.json();
  //   console.log("api", data.candidates[0].business_status);
  //   setStatusCheck(data.candidates[0].business_status);

  //   return data.candidates[0].business_status;
  // }

  return (
    <>
      <Head>
        <title>
          Hello Logan Square // Things to do in Chicago&apos;s Northwest Side
          Neighborhood
        </title>
        <meta
          name='description'
          content='Get to know the Logan Square neighborhood in Chicago IL'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div>
          <h1 style={{ textAlign: "center", margin: "20px" }}>
            Hello Logan Square
          </h1>
        </div>
        <div className={styles.grid}>
          {data.places.map((place) => (
            <div className={styles.card} key={place.id}>
              <h2 className={inter.className}>{place.name}</h2>
              <p className={inter.className}>
                {/* {place.description.document[0].children[0].text} */}
                {place.mainCategory.name}
              </p>
              <p className={inter.className}>{place.address}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

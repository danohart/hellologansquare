import React, { useState, useEffect } from "react";
import Place from "../components/Place";
import Loading from "../components/Loading";
import Hero from "../components/Hero";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Meta from "../components/Meta";

const EVENTS_QUERY = gql`
  {
    allEvents {
      id
      neighborhood
      name
      featured
      description
      hours
      location {
        name
        address {
          formattedAddress
        }
      }
      category {
        name
      }
    }
  }
`;

export default function Events() {
  const [svEvents, setSVEvents] = useState("Loading");
  useEffect(() => {
    const fetchData = async (limit) => {
      const svUrl =
        "https://sleeping-village.com/wp-json/tribe/events/v1/events/";
      const data = await fetch(`${svUrl}?per_page=${limit}`);
      const json = await data.json();

      setSVEvents(json.events);
    };

    fetchData(12).catch(console.error);
  }, []);

  const { loading, error, data } = useQuery(EVENTS_QUERY);
  if (loading) return "Loading";
  if (error) return <p>Error :( {error}</p>;

  return (
    <>
      <Meta title='List of Events Happening in Logan Square Chicago // Hello Logan Square' />
      <Hero
        title='Events in Logan Square'
        subtitle='Find events like bar trivia and karaoke happening throughout the Logan Square neighborhood'
      />
      <div className='events'>
        <div className='card-wrapper'>
          {loading ? (
            <Loading />
          ) : (
            data.allEvents.map((place) => (
              <div className='card event' key={place.id}>
                {place.featured ? (
                  <div className='featured'>
                    <FontAwesomeIcon
                      icon={faStar}
                      title='Featured Local Logan Square Place'
                    />
                  </div>
                ) : null}

                <div className='title-wrapper'>
                  <h2 className='title'>{place.name}</h2>
                </div>
                <div className='inner'>
                  <h3>@ {place.location.name}</h3>
                  <div className='address'>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${
                        place.name +
                        " " +
                        place.location.address.formattedAddress
                      }`}
                      target='_blank'
                    >
                      {place.location.address.formattedAddress.split(",", 1)}
                    </a>
                  </div>
                  {place.description === place.name ? null : (
                    <div className='additional-info'>
                      <p>{place.description}</p>
                    </div>
                  )}
                </div>
                {place.hours ? (
                  <div className='hours'>
                    <h3>When</h3>
                    <div>{place.hours.split(",")[0]}</div>
                    <div>{place.hours.split(",")[1]}</div>
                    <div>{place.hours.split(",")[2]}</div>
                  </div>
                ) : null}
              </div>
            ))
          )}
          {svEvents === "Loading"
            ? null
            : svEvents.map((event) => (
                <div className='card event' key={event.id}>
                  <div className='title-wrapper'>
                    <h2 className='title'>{event.title}</h2>
                  </div>
                  <div className='inner'>
                    <h3>@ Sleeping Village</h3>
                    <div className='address'>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=Sleeping+Village`}
                        target='_blank'
                      >
                        {" "}
                        3734 W Belmont Ave, Chicago, IL 60618
                      </a>
                    </div>

                    <div className='additional-info'>
                      {/* <p>{event.description}</p> */}
                    </div>
                  </div>
                  <div className='hours'>
                    <h3>When</h3>
                    <div>{event.start_date}</div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

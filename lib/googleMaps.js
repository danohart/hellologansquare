const type = ["findplacefromtext", "details"];

const api_url = `https://maps.googleapis.com/maps/api/place`;

const api_output = `/json?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;

const working_url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJGayFy4PND4gRvwFADOjvXc8&fields=business_status,name,price_level,opening_hours&key=${process.env.MAPS_API_KEY}`;

export async function findPlace(type, params) {
  const url =
    api_url +
    "/findplacefromtext" +
    api_output +
    "&input=Harding Tavern 2732 N Milwaukee Ave, Chicago, IL 60647, USA";

  return await fetch(url, { method: "GET" })
    .then((res) => res.json)
    .then((data) => console.log(data));
}

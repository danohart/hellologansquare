export default async function handler(req, res) {
  const type = ["findplacefromtext", "details"];

  const api_url = `https://maps.googleapis.com/maps/api/place`;
  const api_output = `/json?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;

  const textQuery = "&input=" + req.query.placeName + "&inputtype=textquery";
  const fields = "&fields=name,business_status,formatted_address";

  const url = api_url + "/findplacefromtext" + api_output + textQuery + fields;

  const data = await fetch(url).then((res) => res.json());

  res.status(200).json(data);
}

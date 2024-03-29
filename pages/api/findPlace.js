export default async function handler(req, res) {
  const type = ["findplacefromtext", "details"];

  const api_url = `https://maps.googleapis.com/maps/api/place`;
  const api_output = `/json?key=${process.env.MAPS_API_KEY}`;

  const textQuery = "&input=" + req.query.keyword + "&inputtype=textquery";
  const fields =
    "&fields=place_id,name,business_status,formatted_address,type,price_level";

  const url = api_url + "/findplacefromtext" + api_output + textQuery + fields;

  const data = await fetch(url).then((res) => res.json());

  console.log("find", data);

  res.status(200).json(data);
}

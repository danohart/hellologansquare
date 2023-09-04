export default async function handler(req, res) {
  if (!req.query.placeId)
    return res.status(400).json({ message: "No place id provided" });
  const api_url = `https://maps.googleapis.com/maps/api/place`;
  const api_output = `/json?key=${process.env.MAPS_API_KEY}`;

  const placeId = "&place_id=" + req.query.placeId;
  const fields =
    "&fields=place_id,name,business_status,website,opening_hours,type,formatted_address,editorial_summary";

  const url = api_url + "/details" + api_output + placeId + fields;

  const data = await fetch(url).then((res) => res.json());

  res.status(200).json(data);
}

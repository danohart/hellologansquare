export default async function handler(req, res) {
  const type = ["findplacefromtext", "details", "nearbysearch"];

  const api_url = `https://maps.googleapis.com/maps/api/place`;
  const api_output = `/json?key=${process.env.MAPS_API_KEY}`;

  const location = "&location=41.9225057%2C-87.7098792&radius=1609.34";
  const keyword = `&keyword=${req.query.keyword}`;
  const fields = req.query.next_page_token
    ? `&pagetoken=${req.query.next_page_token}`
    : "";

  const url =
    api_url + "/nearbysearch" + api_output + location + keyword + fields;

  const data = await fetch(url).then((res) => res.json());

  console.log("next", url);

  res.status(200).json(data);
}

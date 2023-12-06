export default async function handler(req, res) {
  const api_url = `https://www.hellochicago.co/api/places`;

  const data = await fetch(api_url).then((res) => res.json());

  if (data.success) {
    res.status(200).json(data.places);
  } else {
    res.status(200).json(data.success);
  }
}

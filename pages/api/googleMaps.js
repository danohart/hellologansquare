export default async function handler(req, res) {
  console.log(req);
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json("success");
}

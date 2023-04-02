import { useState } from "react";

export default function Nearby() {
  const [results, setResults] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);

  async function getPlaceData(keyword) {
    const data = await fetch(
      `/api/searchNearby?keyword=${keyword}${
        nextPageToken ? `&next_page_token=${nextPageToken}` : ""
      }`
    );
    const results = await data.json();

    setResults(results);
    setNextPageToken(results.next_page_token);
  }

  console.log(results);

  return (
    <div className='main'>
      Hello
      <br />
      <button onClick={() => getPlaceData("restaurant")}>Get</button>
      <hr />
      <textarea id='myTextArea' cols='50' rows='10'></textarea>
    </div>
  );
}

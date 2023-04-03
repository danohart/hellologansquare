import { useState } from "react";

export default function Nearby() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);

  async function getPlaceData(keyword, token) {
    let url = `/api/searchNearby?keyword=${keyword}`;
    if (token !== null)
      url = `/api/searchNearby?keyword=${keyword}&next_page_token=${token}`;

    const data = await fetch(url);
    const results = await data.json();

    setResults(results);
    setNextPageToken(!results.next_page_token ? null : results.next_page_token);

    return;
  }

  function handleChange(e) {
    e.preventDefault();

    const searchTerm = e.target.value;

    setTerm(searchTerm);

    return;
  }

  return (
    <div className='main' style={{ margin: "0 40px" }}>
      Hello
      <br />
      <input
        value={term}
        placeholder='Search Nearby Logan Square'
        onChange={handleChange}
      />
      <button onClick={() => getPlaceData(term, nextPageToken)}>Get</button>
      <hr />
      <textarea
        defaultValue={JSON.stringify(results.results)}
        id='results-text'
        cols='100'
        rows='50'
      ></textarea>
      {nextPageToken}
    </div>
  );
}

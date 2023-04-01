import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Hero(props) {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { type: searchValue },
    });
  }

  return (
    <div className='hero-wrapper'>
      <div className='hero'>
        <h2>{props.title}</h2>
        <span>{props.subtitle}</span>
        {props.description ? <p>{props.description}</p> : null}
        {props.search ? (
          <div className='search'>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Search...'
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

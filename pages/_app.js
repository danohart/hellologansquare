import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import Page from "../components/Page";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/style.scss";
import { client } from "@/lib/withData";
import FavoritesList from "../components/FavoritesList";
function App({ Component, pageProps: { ...pageProps } }) {
  const [favList, setFavList] = useState([]);

  function addOrRemoveToFavList(place, clear) {
    if (clear) return setFavList([]);
    setFavList((prevState) => [...prevState, { ...place }]);

    const array = [...favList];
    const index = array.map((place) => place.id).indexOf(place.id);

    if (index !== -1) {
      array.splice(index, 1);
      setFavList(array);
    }
  }

  return (
    <ApolloProvider client={client}>
      <Page>
        <Component
          {...pageProps}
          setList={(place) => addOrRemoveToFavList(place)}
        />
        {favList.length > 0 ? (
          <FavoritesList
            favList={favList}
            addOrRemoveToFavList={addOrRemoveToFavList}
          />
        ) : null}
      </Page>
    </ApolloProvider>
  );
}

export default App;

import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/withData";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

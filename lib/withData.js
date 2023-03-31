import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://dashboard.hellochicago.co/api/graphql",
  cache: new InMemoryCache(),
});

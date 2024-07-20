import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT, // Replace with your Hasura endpoint
    headers: {
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET, // Replace with your Hasura admin secret
    },
  }),
  cache: new InMemoryCache(),
});

export default client;

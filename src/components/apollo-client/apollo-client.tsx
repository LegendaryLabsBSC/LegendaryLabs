import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://legendary-labs-graphql-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
})

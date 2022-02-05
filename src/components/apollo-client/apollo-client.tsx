import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'http://api.dev.legendarylabs.net/graphql',
  cache: new InMemoryCache(),
})

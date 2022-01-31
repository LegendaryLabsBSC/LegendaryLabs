import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://api.dev.legendarylabs.net/graphql',
  cache: new InMemoryCache(),
})

export default client

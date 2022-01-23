import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://api.dev.legendarylabs.net/graphql',
  cache: new InMemoryCache(),
})

export default client

import { ApolloClient, InMemoryCache } from '@apollo/client'

// export const client = new ApolloClient({
//   uri: 'https://legendary-labs-graphql-api.herokuapp.com/graphql',
//   cache: new InMemoryCache(),
// })

export const client = new ApolloClient({
    uri: 'http://192.168.1.213:3003/graphql',
    cache: new InMemoryCache(),
  })
  
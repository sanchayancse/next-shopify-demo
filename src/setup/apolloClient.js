// import { ApolloClient } from "apollo-client"
// import { HttpLink } from "apollo-link-http"
// import { InMemoryCache } from "apollo-cache-inmemory"

// const apolloClient = new ApolloClient({
//   link: new HttpLink({
//     uri: 'https://gitlab.com/api/graphql',
//   }),
//   cache: new InMemoryCache()
// })

// export default apolloClient

import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
const domain = process.env.STORE_FRONT_DOMAIN
const storefrontAccessToken = process.env.STORE_FRONT_ACCESS_TOKEN

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://${domain}/api/2021-07/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      
    }

  }),
  cache: new InMemoryCache()
})

export default apolloClient
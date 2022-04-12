import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

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
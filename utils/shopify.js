import Client from "shopify-buy";
export const client = Client.buildClient({
  storefrontAccessToken: process.env.STORE_FRONT_ACCESS_TOKEN,
  domain: process.env.STORE_FRONT_DOMAIN,
});
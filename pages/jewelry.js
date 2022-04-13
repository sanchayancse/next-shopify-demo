import Head from "next/head";
import Link from 'next/link'
import PropTypes from "prop-types";
import React, { Component } from "react";
import { client } from "../utils/shopify";
import { createMedia } from "@artsy/fresnel";
import { setCookies } from 'cookies-next';
import { getCookie } from 'cookies-next';
import SEO from "../components/SEO";
import axios from 'axios';

import {
  Button,
  Popup,
  Container,
  Divider,
  Grid,
  Card,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";
import charity from '../assets/charity';

const Jewelry = (props) =>
  console.log(props) || (
    <>
      <Segment vertical style={{ padding: "2em" }}>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Header
              content="Best Sales Product"
              as="h2"
              style={{
                fontSize: props.isMobile ? "1.5em" : "1.7em",
                fontWeight: "normal",
              }}
            />
            <Card.Group itemsPerRow={props.isMobile ? 3 : 4}>
              {props.beautyProducts?.map(function(product, idx){
                const charityArr = props.charity;
                const type = getCookie('charity') ? getCookie('charity') : 'care';
                let message = charityArr[type].desc;
                message = message.replace('[[unit]]', charityArr[type].unit);
                message = message.replace('[[price]]', charityArr[type].price);
                  return (console.log(product) || (
                    <Link key={product.id} href={`product/${product.id}`}>
                      <Card raised>
                        <Image src={product.images[0].src} wrapped ui={false} />
                        <Card.Content>
                          <Header sub>
                            <Popup
                              trigger={<div>{product.title}</div>}
                              content={product.title}
                              position="top left"
                            />
                          </Header>
                          <Card.Meta>Joined in 2016</Card.Meta>
                          <Card.Description>
                            Daniel is a comedian living in Nashville.
                          </Card.Description>
                          <Card.Description>
                            {message}{product.price}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                     </Link>
                  ))
                  })}
            </Card.Group>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
export default Jewelry;

export const getStaticProps = async (context) => {
  const query = {
    query: "productType:['customType:Jewelry']"
  };
  const beautyProducts = await client.product.fetchQuery(query);
  const infos = await client.shop.fetchInfo();
  const policies = await client.shop.fetchPolicies();
  // const {data} = await axios.get(process.env.NETLIFY_URL + '/api1/charity');
  return {
    props: {
      infos: JSON.parse(JSON.stringify(infos)),
      policies: JSON.parse(JSON.stringify(policies)),
      beautyProducts: JSON.parse(JSON.stringify(beautyProducts)),
      // charity: JSON.parse(JSON.stringify(data)),
      revalidate: 10, // In seconds
    },
  };
};
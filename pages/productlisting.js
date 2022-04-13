import React, { Component } from "react";
import { withRouter } from "next/router"
import Head from "next/head";
import Link from 'next/link'
import PropTypes from "prop-types";
import { client } from "../utils/shopify";
import { createMedia } from "@artsy/fresnel";
import { setCookies } from 'cookies-next';
import { getCookie } from 'cookies-next';
import SEO from "../components/SEO";
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
class Productlisting extends Component {

    render() {
        const { query } = this.props.router;
        console.log(this.props.products);
        return (
        <>
      <Segment vertical style={{ padding: "2em" }}>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Header
              content="Best Sales Product"
              as="h2"
              style={{
                fontSize: this.props.isMobile ? "1.5em" : "1.7em",
                fontWeight: "normal",
              }}
            />
            <Card.Group itemsPerRow={this.props.isMobile ? 3 : 4}>
              {this.props.products?.map(function(product, idx){
                  const productType = product.productType;

                  if(!query.type || (query.type && productType.match(query.type.charAt(0).toUpperCase()+query.type.slice(1)))) {
                const charityArr = {
                  "care":
                  {
                    "name": "care",
                    "unit": 1,
                    "message": "1 unit available of care",
                    "cost":450
                  },
                  "home":
                  {
                    "name": "home",
                    "unit": 2,
                    "message": "2 unit available of home",
                    "cost":500
                  }
                };
                const message = getCookie('charity') ? charityArr[getCookie('charity')].message : charityArr['care'].message;
  
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
                }
                  })}
            </Card.Group>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
        )
    }

}

export default withRouter(Productlisting);

export const getStaticProps = async (context) => {
    const products = await client.product.fetchAll();
    const infos = await client.shop.fetchInfo();
    const policies = await client.shop.fetchPolicies();
  
    return {
      props: {
        infos: JSON.parse(JSON.stringify(infos)),
        policies: JSON.parse(JSON.stringify(policies)),
        products: JSON.parse(JSON.stringify(products)),
        revalidate: 10, // In seconds
      },
    };
  };
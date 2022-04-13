import { useState } from "react";
import { client } from "../../utils/shopify";
import { addProductToCart } from "../../utils/Cart";
import Head from "next/head";
import { getCookie } from 'cookies-next';
import axios from 'axios';

import {
  List,
  Grid,
  Image,
  Header,
  Segment,
  Dropdown,
  Input,
} from "semantic-ui-react";
const ProductPage = (props) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("");
  // const charityArr = {
  //   "care":
  //   {
  //     "name": "care",
  //     "unit": 1,
  //     "message": "1 unit available of care",
  //     "cost":450
  //   },
  //   "home":
  //   {
  //     "name": "home",
  //     "unit": 2,
  //     "message": "2 unit available of home",
  //     "cost":500
  //   }
  // };
  const charityArr = props.charity;
  // const type = getCookie('charity') ? getCookie('charity') : 'care';
  let message
  // let message = charityArr[type].desc;
  // message = message.replace('[[unit]]', charityArr[type].unit);
  // message = message.replace('[[price]]', charityArr[type].price);
  // console.log(props.product);
  const {
    product: { images, title, descriptionHtml, id, variants },
  } = props;
  const addToCart = async () => {
    try {
      if (productQuantity < 1) return;
      const {
        product: { variants },
      } = props;
      console.log("Fired");
      const variantId = selectedVariant
        ? variants.find(({ title }) => title === selectedVariant).id
        : variants[0].id;
      addProductToCart([
        {
          variantId,
          quantity: Number(productQuantity),
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };
  const options = variants.map(({ id, title }) => ({
    key: id,
    value: title,
    text: title,
  }));
  return (
    <Grid centered container>
      <Head>
        <meta charSet="UTF-8" />
      </Head>
      <Grid.Row stackable padded centered>
        <Grid.Column mobile={16} tablet={10} computer={10}>
          <Grid.Row>
            <Image size="large" src={images[selectedImage].src} />
          </Grid.Row>
          <Grid.Row>
            <List horizontal animated divided>
              {images.map((image, index) => {
                return (
                  <List.Item
                    style={{ cursor: "pointer" }}
                    key={index}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image size="small" src={image.src} />
                  </List.Item>
                );
              })}
              {/* <Divider vertical>Or</Divider> */}
            </List>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={6}
          computer={6}
          style={{ marginTop: 50 }}
        >
          <Segment>
            <Header>{title} {message}</Header>
            <Header as="h3">Size </Header>
            <Dropdown
              // placeholder="Select Friend"
              fluid
              selection
              defaultValue={options[0].value}
              onChange={(e, { value }) => setSelectedVariant(value)}
              options={options}
            />
            <Header as="h3">ADD to Cart </Header>
            <Input
              fluid
              action={{
                color: "teal",
                labelPosition: "left",
                icon: "cart",
                content: "Checkout",
                onClick: addToCart,
              }}
              type="number"
              onChange={(e, data) => setProductQuantity(data.value)}
              actionPosition="left"
              placeholder="Search..."
              defaultValue={productQuantity}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid text style={{ marginTop: 50 }}>
        <Header as="h3" textAlign="left">
          Product Description:
        </Header>
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </Grid>
    </Grid>
  );
};

// export async function getServerSideProps({ query }) {
//   console.log(query.productId[0]);
//   const product = await client.product.fetch(query.productId[0]);
//   return {
//     props: {
//       product: JSON.parse(JSON.stringify(product)),
//     }, // will be passed to the page component as props
//   };
// }

export const getStaticPaths = async () => {
  const products = JSON.parse(JSON.stringify(await client.product.fetchAll()));
  console.log("====================================");
  console.log(products);
  return {
    paths: products.map(({ id }) => ({
      params: { productId: id.split('/') },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const productId = params.productId.join('/');
  //const {data} = await axios.get(process.env.NETLIFY_URL + '/api1/charity');
  console.log(productId);
  let charityStoredArr = typeof window !== 'undefined' && window.localStorage.getItem("charityStored") ? window.localStorage.getItem("charityStored") : ''
  if(typeof window !== 'undefined' && window.localStorage.getItem("charityStored")){
    console.log('testing local storage setted');
  }
  if(!charityStoredArr) {
  // const {data} = await axios.get(process.env.NETLIFY_URL + '/api1/charity');
  // charityStoredArr = data;
  console.log('testing local storage setting');
  typeof window !== 'undefined' ? window.localStorage.setItem("charityStored") : JSON.stringify(charityStoredArr);
  }

  const product = await client.product.fetch(productId);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      // charity: JSON.parse(JSON.stringify(charityStoredArr)),
      revalidate: 60,
    }, // will be passed to the page component as props
  };
}
export default ProductPage;
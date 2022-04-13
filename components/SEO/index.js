import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

const SEO = (props) => {
  const { title, description, image, charity } = props;
  return (
    <Head>
      <title>{title} | App</title>
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
      <meta itemProp="charity" content={charity} />
    </Head>
  );
};

SEO.defaultProps = {
  title: '',
  description: '',
  image: '',
  charity: JSON.stringify({
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
  }),  
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  charity: PropTypes.string,
};

export default SEO;
import gql from "graphql-tag";
import Link from "next/link";
import apolloClient from "../gql/apolloClient";
import React, { useState, useEffect } from "react";
import Router from "next/router";

const Home = ({ projects }) => {
  console.log(projects, "projects");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState("");

  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState("");

  const [isLogin, setIsLogin] = useState("false");
  const [isRegister, setRegister] = useState("");

  const handleLogin = async () => {
    const frmdetails = {
      email: email,
      password: password,
    };
    login(frmdetails);
    setEmail("");
    setPassword("");

    // document.getElementById("loginForm").reset();
  };

  const handleRegister = async () => {
    const frmdetails = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: emails,
      password: passwords,
    };
    register(frmdetails);
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmails("");
    setPasswords("");
  };

  const login = async (frmdetails) => {
    console.log(frmdetails, "nssggbg");
    const { data, error } = await apolloClient.mutate({
      mutation: LOGIN_QUERY,
      variables: {
        email: frmdetails.email,
        password: frmdetails.password,
      },
    });

    if (data) {
      console.log(data, error, "data");
      if (data.customerAccessTokenCreate.customerAccessToken.accessToken) {
        setIsLogin("true");
        customerData(data.customerAccessTokenCreate.customerAccessToken.accessToken);
        localStorage.setItem(
          "accessToken",
          data.customerAccessTokenCreate.customerAccessToken.accessToken
        );
        Router.push("/product");
      }
    }

    return {
      props: {
        projects: data,
      },
    };
  };

  const register = async (frmdetails) => {
    console.log(frmdetails, "nssggbg");
    const { data, error } = await apolloClient.mutate({
      mutation: REGISTRATION_QUERY,
      variables: {
        firstName: frmdetails.firstName,
        lastName: frmdetails.lastName,
        email: frmdetails.email,
        password: frmdetails.password,
        phone: frmdetails.phone,
        acceptsMarketing: false,
      },
    });

    if (data) {
      console.log(data, error, "data REGISTRATION_QUERY");
      if (data.customerCreate.customer) {
        console.log(data.customerCreate.customer, "here");
        setRegister("Register Successfully");
        // Router.push("/product");
      } else {
        if (data.customerCreate.customerUserErrors.length > 0) {
          setRegister(data.customerCreate.customerUserErrors[0].message);
        }
      }
    }

    return {
      props: {
        projects: data,
      },
    };
  };

  const customerData = async (frmdetails) => {
    console.log(frmdetails, "nssggbg");
    const { data, error } = await apolloClient.query({
      query: CUSTOMER_QUERY,
      variables: {
        customerAccessToken: frmdetails
      },
    });

    if (data) {
      console.log(data, error, "data");
      localStorage.setItem("customer", JSON.stringify(data.customer));
     
    }

    return {
      props: {
        projects: data,
      },
    };
  };

  return (
    <>
      <h2>{isLogin}</h2>
      <h2>{isRegister}</h2>
      <div className="container" style={{ display: "flex", justifyContent:"center" }}>
        <div>
          <h2>LOGIN</h2>

          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <br></br>

          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
                    <br></br>
          <br></br>

          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
    &nbsp; &nbsp; &nbsp; &nbsp; 
        <div style={{ display: "inlineBlock" }}>
          <h2>REGISTER</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
           <br></br>
          <br></br>

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
           <br></br>
          <br></br>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
           <br></br>
          <br></br>
          <input
            type="email"
            name="email"
            value={emails}
            placeholder="Email"
            onChange={(e) => setEmails(e.target.value)}
          />
           <br></br>
          <br></br>
          <input
            type="password"
            name="password"
            value={passwords}
            placeholder="Password"
            onChange={(e) => setPasswords(e.target.value)}
          />
           <br></br>
          <br></br>

          <button type="submit" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </>
  );
};

// const PROJECTS_QUERY = gql`
//   query {
//     collectionByHandle(handle: "frontpage") {
//       title
//       products(first: 25) {
//         edges {
//           node {
//             id
//             title
//             handle
//             priceRange {
//               minVariantPrice {
//                 amount
//               }
//             }
//             images(first: 5) {
//               edges {
//                 node {
//                   originalSrc
//                   altText
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `

const LOGIN_QUERY = gql`
  mutation ($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const REGISTRATION_QUERY = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phone: String!
    $acceptsMarketing: Boolean!
  ) {
    customerCreate(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        password: $password
        acceptsMarketing: $acceptsMarketing
      }
    ) {
      customer {
        firstName
        lastName
        id
        email
        updatedAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_QUERY = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      lastName
      email
    }
  }
`;
export default Home;

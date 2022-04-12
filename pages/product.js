import React, { useState, useEffect } from "react";
import Router from 'next/router'



const product = () => {
const [isLogin, setIsLogin] = useState(false);
const [customer, setCustomer] = useState(null);

useEffect(() => {
  var token = localStorage.getItem("accessToken");
  if(token){
    setIsLogin(true);
    var customerData = JSON.parse(localStorage.getItem("customer"));
    console.log(customerData, "customerData");
    setCustomer(customerData);

  }else{
     Router.push("/");
  }

},[])



if(isLogin){
  if(customer){
    return (
      <div>
        <h1>Product Page</h1>
        <p>EMAIL: {customer.email}</p>
        <p>FIRST NAME: {customer.firstName}</p>

      </div>
    )
  }
  
}else{
  return (
    <div>
      <h1>Product Page</h1>
      <p>You are not logged in</p>
     
      {/* <button onClick={handleLogin}>Login</button> */}
    </div>
  )
}

  
}

export default product
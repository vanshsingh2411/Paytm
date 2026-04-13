import React from 'react';
import { BrowserRouter , Navigate, Route , Routes , useNavigate } from "react-router-dom";
import { useState  } from   "react";

import   Signup from "../pages/Signup"
import  Signin     from   "../pages/Signin" 
import  Dashboard  from   "../pages/Dashboard" 
import  SendMoney  from   "../pages/SendMoney"  


function App() {
  
  return (

 <BrowserRouter>
      <Routes>
      <Route path = "/"  element = {<Navigate to ="/signup" />}>  </Route>
      <Route path = "/dashboard"  element = {<Dashboard/>}>  </Route>
      <Route path = "/signup"      element = {<Signup/>}>     </Route>
      <Route path = "/signin"     element = {<Signin/>}>     </Route>
      <Route path = "/send"       element = {<SendMoney/>}>  </Route>
      </Routes>
  </BrowserRouter>
    
)}

export default App;

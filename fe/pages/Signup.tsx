import React, { useState } from 'react';
import Heading from '../components/Heading.jsx'
import InputBox from '../components/InputBox.jsx'
import SubHeading from '../components/Sub.jsx'
import BottomWarning from '../components/BottomWarning.jsx'
import Button from '../components/Button.jsx';
import Signin from './Signin.js' ;
import axios from 'axios' ;
import { useNavigate } from 'react-router-dom' ;



export default function Signup() {


  const navigate = useNavigate();

  const [firstname,  setFirstName]  =   useState('');
  const [password ,  setPassword]   =   useState('');
  const [lastname ,  setLastName]   =   useState('');
  const [username ,  setUsername]=   useState('')  ;


 async function signup() {
   
    console.log( "input credentials  : " + username +  password + firstname + lastname )

  await  axios.post("http://localhost:3001/api/v1/user/signup" , {
        

          username : username ,
          password : password,
          firstname : firstname,
          lastname : lastname 

        }).then( () => { navigate ('/signin') } );
      
  }

 return (

  <div className = 'bg-slate-300  h-screen flex' >

  <div className= 'mx-120 my-15  bg-white w-120 h-170 px-10 py-1 border rounded-4xl'>
  
  <div className = 'pl-25' >

     <Heading props = "Signup" />  

  </div>

    <SubHeading props = "Enter your information to create an Account" />
    
    <InputBox onChange={ ( e : any ) => {  

         setFirstName( e.target.value );
    
    }

  }  type = 'text' lable = "FirstName" placeholder = "Tom" />


    <InputBox onChange = {  (e : any ) => {

         setLastName( e.target.value );
        
 } } type = 'text' lable = "LastName" placeholder = "Holland" />
 
    <InputBox onChange={ ( e : any ) => {

        setUsername(e.target.value);   

   }  }

type = 'text' lable = "email" placeholder = "tomHolland@gmail.com" />
    
    <InputBox onChange = {  ( e : any) => {

      setPassword(e.target.value); 

    }  }  type = 'text'  lable = "password" placeholder = "12345" />
  
    <div className = 'mx-4 mt-10'>

 <Button onClick = { () => signup() } lable = "signup" />
   
    </div>

  <BottomWarning lable = "Already Signed up ?" redirect = "Signin" link = "/signin" />

 </div> 

 </div>

)}
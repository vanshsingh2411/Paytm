
import React from 'react';
import Heading from '../components/Heading.jsx'
import InputBox from '../components/InputBox.jsx'
import SubHeading from '../components/Sub.jsx'
import BottomWarning from '../components/BottomWarning.jsx'
import Button from '../components/Button.jsx';
import Signup from './Signup.jsx';
import { useNavigate } from 'react-router-dom';
import {useState}  from 'react' ;
import axios from 'axios';



export default function Signin(){

  const [password , setPassword] = useState('');
  const [username , setUsername] = useState('');

    const navigate = useNavigate();



    async function setToken() {



    const response : any  =  await axios.post("http://localhost:3001/api/v1/user/signin" , {

         username :  username,        
         
         password : password 
      
    })

  
    localStorage.setItem( "email" , username);

    localStorage.setItem( "token" , response.data.token );


  setTimeout( () => {
      
     navigate("/dashboard");       

  } , 1500 ); 

}


 return ( 

  <div className = 'bg-slate-300  h-screen flex '>
  <div className= 'mx-120 mt-20  bg-white w-120 h-150 px-10 py-1 border rounded-4xl' >

    <div className = 'ml-25'>  
    
    <Heading props = "Signin"/>

    </div>

    <SubHeading props = "Enter your Credentials to Access your  Account" />

    <InputBox onChange = {  ( e : any ) => {

       setUsername(e.target.value);
    
      } 
    
  }  lable = "email" type = 'text' placeholder = "tomHolland@gmail.com" />
    

    <InputBox onChange={ ( e : any ) => {

       setPassword( e.target.value );
    

  }

} type = '' lable = "password" placeholder = "123" />


   <div className = 'mx-5 mt-15'>

   <Button onClick = { () => setToken() }  lable = "signin"/>

   </div>

    <div className= 'mt-8 mx-5'>
     
     <BottomWarning lable = "Did'nt have an account ? " redirect= "Signup" link = "/signup"/>

    </div>
  </div>
 </div>
 
)
}
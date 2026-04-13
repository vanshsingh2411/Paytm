
  import React, { use } from 'react';
  import Heading from  "../components/Heading";
  import SubHeading from  "../components/Sub";
  import InputBox from "../components/InputBox";
  import Button from "../components/Button";
  import BottomWarning from "../components/BottomWarning";
  import UserComp from '../components/UserComp';
  import axios from 'axios';
  import { useState , useEffect } from 'react';


  export default  function Dashboard() {

 const[ Balance , setBalance ] = useState(0);
 const [userInfo , setUserInfo] = useState('ron');



 async function getUserInfo() {

    const response : any = await axios.get('http://localhost:3001/api/v1/user/userInfo' , {
    
    headers : {

        'Authorization' : localStorage.getItem('token')

      }

 })


 setUserInfo(response.data.user.firstname);

 console.log(response.data);

 }

   // for fetching user object 



useEffect( () => {
     
     getUserInfo()
  
 } , [] );
  


 async function getBalance() {
 
   let response : any = await axios.get('http://localhost:3001/api/v1/account/balance' , {
       
  headers : {

      'Authorization' : localStorage.getItem('token')?.toString()   
    
   }    

  })
  

  if( response.data.balance ) {
      
     setBalance( response.data.balance.toFixed(2) );

  }
   
}

useEffect(()=> {

  getBalance(); 

},[]);



return (

<div className = 'px-10 ' >  
    <div className = 'flex flex-row justify-between w-screen border-b'>

    <Heading props =  "Payments App" />

  <img alt = "lable" src = "https://thepatriot.in/wp-content/uploads/2024/02/Paytm.jpg" className = "border  rounded-full w-14 h-14 mx-5 mt-5 mr-165 mb-6 " />

    <div className = 'font-bold mt-8 mr-20 '>
  
          Hello  { userInfo  }
  
    </div>   

</div>

  <div className= 'flex flex-column'>

     <SubHeading props = "Your Balance" />

  <div className = 'mt-5 ml-10 text-xl' >

  </div>


 <div className = 'mt-5.5 ml-4 text-xl text-bold'>

   { Balance } 

   </div>

  </div>

  <SubHeading props = "Users" />  

   <div id = 'userList' > 
  
   <UserComp />

   </div>

  </div>

) }

// <UserComp />
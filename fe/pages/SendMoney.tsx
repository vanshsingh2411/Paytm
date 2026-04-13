import React, { useRef } from 'react';
import Sub from '../components/Sub' ;
import UserComp from '../components/UserComp';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import { useState } from 'react' ;
import axios from 'axios' ;
import { useNavigate, useSearchParams } from 'react-router-dom';



export default function SendMoney() {

  const [amount , setAmount] = useState(0);
  

  const [searchParams] = useSearchParams();
  
  const id = searchParams.get("id");
  
  const name = searchParams.get("name");

  const navigate = useNavigate()

  return (
  
  <div className = 'bg-slate-300 h-screen flex '>
  
    <div className = 'mx-125 mt-30 border border-solid w-100 h-120 px-5 bg-white border rounded-3xl'>
     <div className = 'flex flex-column ml-17'>
       <Heading  props = "Send"/>
       <Heading  props = "Money"/>
 </div>

       <div>
        <br/>

      <div className = 'text-2xl m-3 px-14 text-blue-400'>

       To : {name}
      </div>
        
        <br/>

    <InputBox  
        type = "number"
        lable = "Amount (in INR)" 
        placeholder = "Enter Amount" 

       onChange = { (e : any) => {
           
           setAmount(e.target.value); 
        
         }
    
    }/>

        <br/>
        <br/>

        <br/>

     <div>
      

     </div>

        < button onClick = { async () => {

           console.log( amount + " " + id )

         await axios.post("http://localhost:3001/api/v1/account/transfer", {

             receiver : id ,
             amount : Number(amount) 

          } , 

          {
            
        
            headers: {
 
                 'Authorization'  :  localStorage.getItem('token')

            }

          }).then( () => navigate('/dashboard'))


        } } 

       className = 'w-90 h-15 bg-green-400 justifyItem-center mt-5 border rounded-3xl text-xl'> Initiate Transfer </button>   
       </div>
  
    
  </div>
  </div>
  
  )
}









/*

export default function SendMoney() {


  const [amount,setAmount] = useState(0);

  const [searchParams] = useSearchParams();
  
  const id = searchParams.get("id");
  
  const name = searchParams.get("name");

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate()


  return (
  
  <div className = 'bg-slate-300 h-screen flex '>
  
    <div className = 'mx-125 mt-30 border border-solid w-100 h-120 px-5 bg-white border rounded-3xl'>
     <div className = 'flex flex-column ml-17'>
       <Heading  props = "Send"/>
       <Heading  props = "Money"/>
 </div>

       <div>
        <br/>

      <div className = 'text-2xl m-3 px-14 text-blue-400'>

       To : {name}
      </div>
        
        <br/>
        <InputBox  

        type = "number"
        lable = "Amount (in INR)" 
        placeholder = "Enter Amount" 
        onChange = { () =>  (e : any) => {
           
            setAmount(e.target.value); 
        
         }
    
    }/>

        <br/>
        <br/>

        <br/>

     <div>
      

     </div>

        < button onClick = { ()=> {

          axios.post("http://localhost:3001/api/v1/account/transfer"), {

             receiver : id ,
             amount : amount 

          } , 
          {
            
            headers: {
 
              'Authorization' :  localStorage.getItem("token")
            }

          }


        }} 

       className = 'w-90 h-15 bg-green-400 justifyItem-center mt-5 border rounded-3xl text-xl'> Initiate Transfer </button>   
       </div>
  
    
  </div>
  </div>
  
  )
}

*/
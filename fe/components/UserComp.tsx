
import React from "react" ;
import Button from "./Button" 
import { useState , useEffect } from "react" ;
import axios from 'axios' ;
import { useNavigate } from "react-router-dom" ;


export default function UserComp() {
 
  const [users , setUsers] = useState([]);

  // const [filter , setFilter] = useState("");
   

async function usersBulk() {

  try {

    const response : any = await axios.get( 'http://localhost:3001/api/v1/user/bulk', {
         
    headers : {

         'Authorization' : localStorage.getItem('token')
   
      }

 });
  
  setUsers( response.data.users );

      console.log(response.data.users);

      console.log( Date.now() );

}

 catch(e) {

    console.log( 'error : ' + e );
   
 }
  

 }


  useEffect( () => {

     // axios.get("http://localhost:3001/api/v1/bulk?filter=" + filter).then(response => setUsers(response.data.user));

  usersBulk();


   console.log( Date.now() );

    
  }, [] ) ;
  

  return (

     <div className = " mx-10 m-5 flex flex-col">

    <input  

      onChange={ (e) => {

     //   setFilter(e.target.value)

       

     }}
   
   placeholder='Search Users ...' className = 'border border-solid-black w-150  rounded-2xl h-10 mt-5 px-5'/>
  
    <div className = "flex flex-col w-[45vw] mt-10 " >
    
    
  { users.map((usr: any) => {

   console.log("each user:", usr);  
  
 return <User key={usr._id} user={usr} />

  })}

    </div>

 </div>
    
  )

}

 
// { users.map( user => <User user = {user} />) }


function User( { user } : any ) {


    const navigate = useNavigate();

 { user.firstname[0] } 

   
   return <div className="flex justify-between">
   
          <div className="flex">
              
              <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                  
                  <div className="flex flex-col justify-center h-full text-xl">
                       
                       

     { user.firstname[0] } 


                  </div>
   
              </div>
   
              <div className="flex flex-col justify-center h-ful">
                  <div>

                      {user.firstname} {user.lastname}
              
                  </div>
   
              </div>
   
          </div>
  
          <div className="flex flex-col justify-center h-ful">
  
            <Button onClick = { () => {

                  navigate("/send?id=" + user._id + "&name=" + user.firstname);

            }} lable = { "Send" } />

          </div>

      </div>

}
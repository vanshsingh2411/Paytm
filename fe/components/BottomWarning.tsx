import React from "react";
import {Link} from "react-router-dom" ;

interface BottomWarningProps {

   lable : string,

   redirect : string,   

   link : any

}


export default function BottomWarning( { lable,redirect,link } : BottomWarningProps ) {

 return ( 

    <div className = " py-2 text-sm flex justify-center ">

      <div>

         { lable }
      
      </div>

      <Link className="pointer underline pl-1 cursor-pointer" to={link}>

        { redirect }

      </Link>
          
    </div>

 )

}
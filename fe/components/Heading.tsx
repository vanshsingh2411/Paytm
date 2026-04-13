import React from 'react';

interface HeadingProps {

   props : string 

}

function Heading( {props} : HeadingProps) { 

     return  (

   <div className = "font-bold text-4xl text-black-400 mt-5 mx-0 mb-3 pt-2 ">      
            
            { props }

    </div>
)

}


export default Heading ;

import React from 'react';


interface subheadingInterface {

    props : string

}


function SubHeading( {props} : subheadingInterface  ){ 

  return (

   <div className = "font-bold text-xl text-black-400 mt-5" >
      { props }

   </div>

)
  
  }

export default SubHeading ;
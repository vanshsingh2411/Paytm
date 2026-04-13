import React from 'react'

interface buttonProps {

  lable : string
  
  onClick : () => void

}

export default function Button( { lable , onClick } : buttonProps ) {

  return (

    <div>
      
      <button  onClick = {onClick}  type = "button" className = 'w-60 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-0 mx-15 '> { lable } </button> 

    </div> 
    
 
) }
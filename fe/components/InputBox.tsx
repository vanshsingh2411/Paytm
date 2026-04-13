import React from 'react';

interface inputProps{

    placeholder : string,
    type : string,
    
    lable :  string,

    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void ;

}


export default function InputBox({placeholder , type , lable, onChange} : inputProps){

  return ( 
    <div className= 'mx-0' >
    <div className = 'text-xl font-medium text-left px-3 py-1 mt-5  '>
       { lable }  
    </div>
      <input  type = {type} required = {true}  onChange = { onChange}  placeholder = {placeholder}  className = 'bg-slate-50 w-90 h-10 px-2 justifyItem-center border border-solid border-black-300 rounded '/> 
    </div>
  )
}

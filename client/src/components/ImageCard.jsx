import React from 'react'
import { useState } from 'react'
function ImageCard({image,setSelectCount,selectCount}) {

  const [state,setState] =useState(true)
  return (
    <div className='border-2 h-[15rem] w-[15rem] bg-cover bg-center rounded-xl ' style={{ backgroundImage: `url(${image})`}}>
      <div className='text-3xl text-end pr-[0.5rem] pt-[0.5rem]' onClick={()=>{
        if(state){
          setSelectCount(selectCount+1)
          setState(false)
        }else{
          setSelectCount(selectCount-1)
          setState(true)
        }
      }}>{state?'😍':'❌'}</div>
    </div>
  )
}

export default ImageCard
import React, { useState } from 'react'

function SearchBar({setQuery}) {
    const [input,setInput]=useState('')
    const handelkeyDown =(e)=>{
      if(e.key=='Enter'){
        setQuery(input)
      }
    }
  return (
    <div className='flex m-[1rem] text-2xl'>
        <input placeholder='search the images' className='border-2 rounded-xl pl-[0.2rem]'
        onChange={(e)=>{
            setInput(e.target.value)
        }}
        onKeyDown={handelkeyDown}
        />
        <button className='bg-gray-400 p-[0.5rem] rounded-xl' onClick={()=>{
            setQuery(input)
        }}>Search</button>

    </div>
  )
}

export default SearchBar
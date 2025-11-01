import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
function Banner({searchComplete}) {
    const [topSearch,setTopSearch] =useState([])
    useEffect(()=>{

        const gettopSearch=async()=>{
            try{
                const response=await axios.get('http://localhost:5500/api/get-max-search')
                console.log(response)
                setTopSearch(response.data.data)
            }catch(error){
                console.error("error in banner",error)
            }
        }
        gettopSearch()
    },[searchComplete])
  return (
    <div className='border-2 bg-gray-900/60 text-2xl'>
       <div className='text-center text-2xl '>Top Search</div>
        <div>
        {
            topSearch.map((term,index)=>(
                <div key={index} className='flex gap-4'>
                    <div className='w-[25%]'>
                    <div>Term:<strong>{term.searchTerm}</strong> {'---->'}</div>
                    </div>
                    <div>
                    <div>Count:{term.count}</div>
                    </div>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default Banner
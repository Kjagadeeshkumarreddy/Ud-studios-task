import React, { useEffect, useState } from 'react'
import ImageCard from './ImageCard'
import axios from 'axios'
import SearchBar from './SearchBar'
import History from './History'
import Banner from './Banner'
function Home() {
  const [urls,setUrls]=useState([])
  const [pageNo,setPageNo] =useState(1)
  const [query,setQuery] =useState('')
  const [searchComplete,setSearchComplete] =useState(false)
  const [selectCount,setSelectCount] =useState(0)
  useEffect(()=>{
    const getImages =async()=>{
      try{
        setSearchComplete(false)
        const response= await axios.post('http://localhost:5500/api/get-images',{
          pageNo:pageNo,
          query:query|| 'nature'
        },{withCredentials:true})
        setSearchComplete(true)
        //console.log(response)
        setUrls(response.data.data.results)
      }catch(error){
        console.error("error in fetchime images",error)
      }
    }

    getImages()

  },[query])
  useEffect(()=>{
    console.log(selectCount)
  })
  return (
    <div className='flex flex-col'>
      <Banner  searchComplete={searchComplete}/>
      <div className='flex'>
        <div className='flex items-center justify-center w-[75%]'>
          <SearchBar setQuery={setQuery}/> 
        </div>
         <div className='text-2xl text-center mt-[0.5rem]'>Select Count= <strong className='text-4xl'>{selectCount} </strong></div>
          <div className=' max-h-[100vh] overflow-y-auto'></div>
      </div>
      <div className='flex'>
        <div className='flex flex-wrap gap-4  flex-grow w-[75%]'>
          {
            urls!==''?
            urls.map((images)=>(
              <div className="">
              <ImageCard key={images.id} image={images.urls.small} setSelectCount={setSelectCount} selectCount={selectCount}/>
              </div>
            )):''
          }
        </div>
          <div className='w-[28%] max-h-[100vh] overflow-y-auto'>
          <History searchComplete={searchComplete}/>
        </div>
      </div>
    </div>
  )
}

export default Home
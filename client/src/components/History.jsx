import axios from 'axios'
import React, { useEffect, useState } from 'react'

function History({searchComplete}) {
    const [history,setHistory] =useState([])
    useEffect(()=>{
        const getHistory =async()=>{
        try{
            const response=await axios.get(`http://localhost:5500/api/get-history`,{withCredentials:true})
            //console.log(response)
            setHistory(response.data.data)
        }catch(error){
            console.log("error in history",error)
        }
    }
    getHistory()
    },[searchComplete])
  return (
    <div className='border-2  text-2xl'>
        <div className='text-center '>History</div>
        <div>History count = {history.length}</div>
        <div>
            {
                history.map((term,index)=>(
                    <div key={index} className=''>
                        <div>Term: {term.searchTerm}</div>
                        <div>searched At: {new Date(term.searchAt).toLocaleString()}</div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default History
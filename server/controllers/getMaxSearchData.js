const searchData=require('../models/SearchedData')

const getmaxSearch =async(req,res)=>{
    try{
        //console.log("route ho=ite")
        const topsearch = await searchData.find().sort({ count: -1 }).limit(5);
        //console.log(topsearch)
        res.status(200).json({data:topsearch})
    }catch(error){
        console.error("error in get max count",error)
        return res.status(500).json({message:'Internal eerror'})
    }
}

module.exports ={getmaxSearch}
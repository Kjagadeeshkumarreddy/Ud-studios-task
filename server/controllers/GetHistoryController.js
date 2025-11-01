const Details =require('../models/UserDetails')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const getHistory =async(req,res)=>{
    try{
        const cookies=req.cookies
        //console.log(cookies)
        if(!cookies){
            return res.status(401).json({message:"un autherised user"})
        }
        let accessToken =cookies.accessToken
        if(accessToken){
            const userId=jwt.verify(accessToken,process.env.JWT_KEY).userId
            const user = await Details.findOne({userId});
            if(!user||!user.searchHistory){
                return res.status(200).json({data:[]})
            }
            return res.status(200).json({data:user.searchHistory.reverse()})
        }
        return res.status(200).json({data:[]})
    }catch(error){
        console.error("error in get history",error)
        return res.status(500).json({message:"Internal error"})
    }
}

module.exports ={getHistory}
const dotenv =require('dotenv')
const axios =require('axios')
const jwt=require('jsonwebtoken')
dotenv.config()

const userDetails =require('../models/UserDetails')

const searchData=require('../models/SearchedData')

const getImages =async (req,res)=>{
    try{
        const {pageNo,query} =req.body
        const cookies=req.cookies
        //console.log(cookies)
        if(!cookies) return res.status(401).json({message:"cookies not found"})
        let accessToken=cookies.accessToken
        if(accessToken){
            const userId=jwt.verify(accessToken,process.env.JWT_KEY).userId
            if(query!='nature'){
                await userDetails.updateOne(
                    {userId:userId},
                    {$push:{
                        searchHistory:{searchTerm:query,
                            searchAt:new Date()
                        }

                    }}
                )
            }
        }else{
            const userId=jwt.verify(cookies.refreshToken,process.env.JWT_KEY).userId
            if(query!='nature'){
                await searchData.updateOne(
                    {userId:userId},
                    {$push:{
                        searchHistory:{searchTerm:query,
                            searchAt:new Date()
                        }
                        
                    }}
                )
            }
            let accessToken=jwt.sign(
                {userId:userId},
                process.env.JWT_KEY,
                {expiresIn:'15m'}
            )
            res.cookie('accessToken',accessToken,{
                httpOnly:true,
                secure:false,
                sameSite:'Lax',
                maxAge: 15*60*1000
            })
        }
        if (!query || typeof query !== 'string' || query.trim() === '') {
            console.warn('⚠️ Invalid query:', query);
            return res.status(409).json({ message: "enter a valid search term" });
            }
        const response=await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_KEY}&per_page=20&page=${pageNo}`)
        if(response){
            console.log(pageNo,query)
            //console.log(query)
            if(query!='nature'){
            await searchData.updateOne(
                {searchTerm:query},
                {$inc:{count:1}},
                {upsert:true}
            );
        }
            return res.status(200).json({data:response.data})
        }
        return res.status(409).json({message:"searches term is not avalable"})
    }catch(error){
        console.error("error in get Images",error)
        return res.status(500).json({message:"Internal error"})
    }
}

module.exports={getImages}
const passport = require("passport");
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const faceBookLogin= (req,res,next)=>{
    console.log("facebook login")
    passport.authenticate("facebook",{
        session:false,
    })(req,res,next)
}

const faceBookCallBack =(req,res,next)=>{
    console.log("facebook callback");
    passport.authenticate("facebook",{session:false},(err,user,info)=>{
        if(err){
            return res.status(500).json({message:"internal error"})
        }
        if(!user){
            return res.status(409).json({message:"user not found"})
        }

        const accessToken=jwt.sign(
            {userId:user.userId},
            process.env.JWT_KEY,
            {expiresIn:'15m'}  
        )

        const refreshToken =jwt.sign(
            {userId:user.userId},
            process.env.JWT_KEY,
            {expiresIn:'7d'}
        )

        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            secure:false,
            sameSite: 'Lax',
            maxAge:15*60*1000
        })

        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite: 'Lax',
            maxAge:7*24*60*60*1000
        })

        return res.redirect('http://localhost:5173/home')
    })(req,res,next);
}

module.exports ={faceBookLogin,faceBookCallBack}
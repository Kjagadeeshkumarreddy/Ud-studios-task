const passport =require('passport')
const jwt=require('jsonwebtoken')
const dotenv =require('dotenv')
dotenv.config()
const googleLogin = (req, res, next) => {
    console.log("google login")
  passport.authenticate("google", {
    session: false,
    scope: ['profile', 'email']
  })(req, res, next)
}

const googleCallBack = (req,res,next)=>{
    console.log("google call back")
    passport.authenticate("google",{session:false},(err,user,info)=>{
        if(err){
            return res.status(500).json({message:"internal server error"})
        }
        if(!user){
            return res.status(409).json({message:info.message||"Authentication is faild"})
        }
        const accessToken =jwt.sign(
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
            httpOnly: true,
            secure: false, // false for localhost
            sameSite:'Lax',
            maxAge: 15*60*1000
        })
        res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            secure: false, // false for localhost
            sameSite:'Lax',
            maxAge: 7*24*60*60*1000
        })
        return res.redirect('http://localhost:5173/home')
    })(req,res,next)
}

module.exports ={googleLogin,googleCallBack}
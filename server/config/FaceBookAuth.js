const passport=require('passport')
const faceBookStratagy =require('passport-facebook').Strategy
const dotenv=require('dotenv')
dotenv.config()
const Details =require('../models/LoginDetails');
const userDetails=require('../models/UserDetails')

passport.use(new faceBookStratagy({
    clientID:process.env.FACEBOOK_APP_ID,
    clientSecret:process.env.FACEBOOK_APP_SECRET,
    callbackURL:'http://localhost:5500/api/auth/facebook/callback',
    profileFields:['id','email']
},
async(accessToken,refreshToken, profile,done)=>{
    console.log("facebook auth statagy")
    try{
        let loginDetails=await Details.findOne({providerUserID:profile.id})
        if(loginDetails){
            await Details.updateOne(
                {providerUserID:profile.id},
                {$set:{
                    accessToken:accessToken,
                    refreshToken:refreshToken
                }}
            )
        }else{
            loginDetails =new Details({
                providers:'facebook',
                providerUserID:profile.id,
                accessToken,
                refreshToken
            })
            await loginDetails.save()
        }
        const existingUser = await userDetails.findOne({userId:loginDetails._id})
        if(!existingUser){
            const newUser =new userDetails({
                userId:loginDetails._id,
                searchHistory:[]
            })
            await newUser.save()
            return done(null,newUser)
        }
        return done(null,existingUser)
    }catch(error){
        console.error("error in facebook auth ",error);
        return done(error,null)
    }
}

))
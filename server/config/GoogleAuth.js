const passport=require('passport')
const oAuthStrategy =require('passport-google-oauth2').Strategy
const dotenv = require('dotenv')
dotenv.config()
const axios=require('axios')

const Details =require('../models/LoginDetails')

const userDetails =require('../models/UserDetails')

passport.use(new oAuthStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET_KEY,
    callbackURL:'http://localhost:5500/api/auth/google/callback',
    scope:['profile','email']
    },
    async(googleAccessToken,googleRefreshToken,Profile,done)=>{
        console.log("passportt gogle")
        try{
            let loginDetails= await Details.findOne({providerUserID:Profile.id})
            if(loginDetails){
                await Details.updateOne(
                    {providerUserID:Profile.id},
                    {$set:{
                        accessToken:googleAccessToken,
                        refreshToken:googleRefreshToken
                    }}
                )
            }else{
                loginDetails= new Details({
                    providers:"google",
                    providerUserID:Profile.id,
                    accessToken:googleAccessToken,
                    refreshToken:googleRefreshToken
                })
                await loginDetails.save()
            }
            const existingUser= await userDetails.findOne({userId:loginDetails._id})
            if(!existingUser){
                const newUser =new userDetails({
                    userId:loginDetails._id,
                    searchHistory:[]
                })
                await newUser.save()
                return done(null,newUser)
            }
            return done(null, existingUser);
        }catch(error){
            console.error("error in google auth",error)
            return done(error,null)
        }
    }
))
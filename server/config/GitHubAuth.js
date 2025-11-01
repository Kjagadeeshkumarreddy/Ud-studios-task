const passport=require('passport')
const GitHubStrategy =require('passport-github2').Strategy
const dotenv = require('dotenv')
dotenv.config()
const axios=require('axios')

const Details =require('../models/LoginDetails')

const userDetails =require('../models/UserDetails')

passport.use(new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_SECRET_KEY,
    callbackURL:'http://localhost:5500/api/auth/github/callback',
    scope:['user:email']
    },
    async(gitHubAccessToken,gitHubRefreshToken,Profile,done)=>{
        try{
            let loginDetails= await Details.findOne({providerUserID:Profile.id})
            if(loginDetails){
                await Details.updateOne(
                    {providerUserID:Profile.id},
                    {$set:{
                        accessToken:gitHubAccessToken,
                        refreshToken:gitHubRefreshToken
                    }}
                )
            }else{
                loginDetails= new Details({
                    providers:"github",
                    providerUserID:Profile.id,
                    accessToken:gitHubAccessToken,
                    refreshToken:gitHubRefreshToken
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
            console.error("error in github auth",error)
            return done(error,null)
        }
    }
))
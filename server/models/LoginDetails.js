const mongoose =require('mongoose')

const Details=new mongoose.Schema({
    providers:{
        type:String,
        enum:['google','facebook','github'],
        required:true
    },
    providerUserID:{
        type:String,
        required:true
    },
    accessToken:{
        type:String
    },
    refreshToken:{
        type:String
    }
})

module.exports =mongoose.model("loginDetails",Details)
const mongoose =require('mongoose')

const searchData=new mongoose.Schema({
    searchTerm:{
        type:String,
        required:true,
    },
    count:{
        type:Number,
        default:1
    }
})

module.exports =mongoose.model("searchData",searchData)
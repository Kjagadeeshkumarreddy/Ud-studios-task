const mongoose =require('mongoose')

const userDetailsSchema =mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    searchHistory:[
        {
            searchTerm:{
                type:String
            },
            searchAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
    
},{timestamps:true})

module.exports = mongoose.model("userDetails",userDetailsSchema)
const mongoose =require('mongoose')

const dotenv=require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("database is connected")
}).catch((error)=>{
    console.error("error in database connection ",error)
})
const express =require('express')
const dotenv=require('dotenv')
dotenv.config()
const app=express()
const passport =require('passport')
const cookiesParser=require('cookie-parser')
require('./db')

require('./config/GoogleAuth')
require('./config/GitHubAuth')
require('./config/FaceBookAuth')
const cors=require('cors')
const router =require('./routes/routes')
const helmet = require('helmet')
const port =process.env.PORT||5500


app.use(express.json())

app.use(helmet())

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','PUT','POST','DELETE'],
    credentials:true
}))

app.use(cookiesParser())

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err)
  res.status(500).json({ error: 'Internal Server Error' })
})
app.use(passport.initialize())
app.use('/api',router)

app.listen(port,()=>{
    console.log("server is started at ",port)
})
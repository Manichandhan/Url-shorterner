const express=require('express')
const cookieParser=require('cookie-parser')
//routes to handle
const routes=require('./routers/user_crud_routes')
const authRout=require('./routers/user_auth_routes')
const app=express()
//dbconnection
const dbconnection=require('./config/db.connection')

app.use(cookieParser())
// dotenv variables
require('dotenv').config()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const PORT=process.env.PORT

app.use('/api',routes)
app.use('/api/auth',authRout)
app.use((err,req,res,next)=>{

    if(err){
        
        res.status(404).send({errmessage:"something went wrong",error:err.message})
    }
})
app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
})
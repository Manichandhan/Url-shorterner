const mongoose=require('mongoose')

require('dotenv').config()

const dbconnection=mongoose.connect(process.env.DB_connection,{useNewUrlParser:true,useUnifiedTopology:true})
dbconnection.then(()=>{
    console.log('connected successfully');
}).catch((err)=>{
    console.error('error occured '+ err);
})


mongoose.connection.on('connection',()=>{
    console.log('connected successfully to DB');
})
mongoose.connection.on('disconnected',()=>{
    console.log('unable to connect',);
})



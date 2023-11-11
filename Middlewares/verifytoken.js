
const jwt=require('jsonwebtoken');
require('dotenv').config()
const verifytoken=async (req,res,next)=>{
    if(!req.cookies.token){
        return next(new Error('please login'))
    }
const decode= jwt.verify(req.cookies.token,process.env.secretKey)
if(decode){
    next()
}else{
   return next(new Error('please login again'))
}
}
module.exports={verifytoken}
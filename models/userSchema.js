const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
 email:{
    type:String,
    unique:true,
    required:[true,'enter email']
    
 },
 password:{
    type:String,
    required:[true,'enter password']
 }
});

const userModel=mongoose.model("users",userSchema)

module.exports=userModel
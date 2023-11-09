const mongoose = require("mongoose");

const Schema = mongoose.Schema;
 
const urlSchema = new Schema({
  OriginalUrl: { type: String, required: true },
  shortId: { type: String,unique:true },
  urlName:{type:String },
  email:{type:String,required:true}
});

const urlModel = mongoose.model("url", urlSchema);

module.exports = urlModel;

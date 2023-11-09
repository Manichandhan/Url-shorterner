const express = require("express");

const router = express.Router();

const {deleteDocs}=require('../controllers/authControl')
const{findAllurls,findurl,addUrl,removeUrl}=require('../controllers/userControls')
const{validSchema}=require('../Middlewares/addUrlSchema')
const {verifytoken}=require('../Middlewares/verifytoken')
router.get("/findUrl/:shortid",verifytoken,findurl);

router.get("/all",verifytoken,findAllurls );

router.post("/shorten",verifytoken,validSchema,addUrl);

router.delete('/deleteUrl/:shortid',removeUrl)




//general developer use routes
router.delete('/delete',deleteDocs)
module.exports = router;

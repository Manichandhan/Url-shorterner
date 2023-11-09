const express = require("express");

const router = express.Router();
const {signup,signin,signout}=require('../controllers/authControl')
const {generateOtp}=require('../Middlewares/signup_midlware')
//user registeration route
router.post('/signup',generateOtp,signup)

router.post('/signin',signin)

router.delete('/signout',signout)

module.exports=router
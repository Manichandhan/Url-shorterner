const Joi=require('joi')

const userSchema={
    email:Joi.string().required()
}
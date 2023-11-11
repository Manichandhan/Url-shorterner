### URL_Shorterner

Created Rest apis to save urls in a Database and generate A Short id
User Authentication is also included with email verification while sign Up
## Routes
# Domain: http//localhost:7000/
 1. User Auth Routes
 /api/auth/signup
 /api/auth/signin
 /api/auth/signout
 json signup & signin Request Body
 {
    "email":"user123@gmail.com",
    "password":"userPass@1234"
 }
 2. Url shortener Routes
 /api/all
 /api/shorten
 /api/deleteUrl/:shortid
 json url shortern request body
 {
    "OriginalUrl":"www.example.com",
    "email":"user123@gmail.com"
 }

 ## Installation
 v16.15.1 Node.js 
 install dependencies - npm install

## Env variables
add this variables in .env file
PORT : add Your port Number
DB_connection : mongodb connection string
secretKey : secretKey for generating  JWT token
password : add your email and password for sending email OTPs
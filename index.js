"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

const express=require('express')
const app=express()
require('dotenv').config()
const PORT=process.env.PORT
const HOST=process.env.HOST

/*--------------------------------------*/
const session = require("cookie-session")
app.use(session({ secret: process.env.SECRET_KEY || 'secret_keys_for_cookies' }))
app.use(express.json())

//! Connect to MongoDB with Mongoose:
require('./src/dbConnection')
/*--------------------------------------*/
app.use(require('./src/middlewares/authorization'))
/*--------------------------------------*/

// Searching&Sorting&Pagination:
app.use(require('./src/middlewares/findSearchSortPage'))


/*--------------------------------------*/
//! Home Page

app.get('/', (req, res)=>{
    res.send({
        err:false,
        message:'Welcome to Blog APP'
    })
})

/*--------------------------------------*/
//! Routes:
app.use('/api', require('./src/routes/blogPost'))
app.use('/api', require('./src/routes/blogcategory'))
app.use('/users/auth', require('./src/routes/auth'))
app.use('/users/auth', require('./src/routes/userRoute'))



//! errorHandler:
app.use(require('./src/errorHandler'))

/*--------------------------------------*/
app.listen(PORT, ()=>console.log(`App is running: ${HOST}:${PORT} `))
"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

const mongoose = require('mongoose')

const commentsSchema= new mongoose.Schema({
   
    comments:[{
        type:String
    }]

},{collection:'comments', timestamps:{createdAt:'publish_date', updatedAt:'update_date'}})

module.exports= mongoose.model('Comments', commentsSchema)
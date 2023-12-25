"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

const mongoose = require('mongoose')
const commentModel=require('./comments')
const blogPostSchema= new mongoose.Schema({
   
    title: {
        type: String,
        trim: true,
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: true
    },

    image:{
        type: String,
        trim: true,
    },

    category_name: {
        type: mongoose.Schema.Types.ObjectId, // Relational ObjectId
        ref: 'BlogCategory', // ModelName
        // required: true,
    },

    status:{
        type:String,
        enum:['p', 'd']
    },

    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
    }],

    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    
    likes_n:{type:Number}


},{collection:'blogPost', timestamps:{createdAt:'publish_date', updatedAt:'update_date'}})

module.exports= mongoose.model('BlogPost', blogPostSchema)
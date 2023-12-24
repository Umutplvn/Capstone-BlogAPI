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
        type: mongoose.Schema.ObjectId, // Relational ObjectId
        ref: 'BlogCategory', // ModelName
        required: true,
    },

    category: [{
        type: Number, // Relational ObjectId
        trim: true, // ModelName
    }],

    status:{
        type:String,
        enum:['p', 'd']
    },

    // comments:[{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Comments',
    // }],

      comments:[{
    
    }],
    
    likes_n:{type:Number}


},{collection:'blogPost', timestamps:{createdAt:'publish_date', updatedAt:'update_date'}})

module.exports= mongoose.model('BlogPost', blogPostSchema)
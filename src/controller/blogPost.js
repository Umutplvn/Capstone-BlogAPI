"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

//! Call Models:
const BlogPost = require('../models/blogPost')
const User=require('../models/userModel')

module.exports = {

    list: async (req, res) => {

        const data = await BlogPost.find().populate('category_name')
        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    create: async (req, res) => {
        const body=req.body
        const author=req.user
        body.author=author

        const data = await BlogPost.create(body)
        
        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        })
    },

    read: async (req, res) => {

        const data = await BlogPost.findOne({ _id: req.params.postId }).populate('category_name')
        
        // .populate('category_name') // get Primary Data

        res.status(200).send({
            error: false,
            result: data
        })

    },

    update: async (req, res) => {
        
        const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            body: req.body,
            result: data,
            newData: await BlogPost.findOne({ _id: req.params.postId })
        })

    },

    delete: async (req, res) => {
        
        const data = await BlogPost.deleteOne({ _id: req.params.postId })
        console.log("data",data);
        
        if((data.deletedCount >= 1)){

            res.send({
                message:'Successfully deleted'
            })
        }else{
            res.send({
                message:"There is no recording to be deleted."
            })
        }

    },

    pushComment: async(req, res)=>{

        const comments = req.body
                
        const data= await BlogPost.updateOne({_id:req.params.postId}, { $push: { comments: comments }})
    
        const newData=await BlogPost.findOne({_id:req.params.postId}).populate('comment')
        
        res.status(202).send({
            error:false,
            data,
            commentsCount: newData.comments.length,
            new:newData,
            comments
        })
},

// pullComment: async(req, res)=>{
    
//     const user = await User.findOne({ _id:User._id});

//     console.log(user);


//     // const data= await BlogPost.updateOne({_id:req.params.postId}, {$push:{comments: comments}})

//     // const newData=await BlogPost.findOne({_id:req.params.postId}).populate('comments')
    
//     res.status(202).send({
//         // error:false,
//         // data,
//         // commentsCount: newData.comments.length,
//         // new:newData,
//         // comments
//     })
// }




}
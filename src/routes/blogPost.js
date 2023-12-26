"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/


const router = require('express').Router()

//! Call controller

 const BlogPost = require('../controller/blogPost')

router.route('/blogs')
.get(BlogPost.list)
.post(BlogPost.create)

router.route('/blogs/:postId')
.get(BlogPost.read)
.put(BlogPost.update)
.delete(BlogPost.delete)

router.route('/blogs/:postId/comment')
.post(BlogPost.pushComment)

router.route('/blogs/:postId/commentdelete')
.post(BlogPost.pullComment)

module.exports = router
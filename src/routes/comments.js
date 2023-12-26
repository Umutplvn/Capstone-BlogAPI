"use strict"

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/


const router = require('express').Router()

//! Call controller

 const Comments = require('../controller/comments')

router.route('/comment')
.get(Comments.list)
.post(Comments.create)

router.route('/comments/:commentId')
.get(Comments.read)
.put(Comments.update)
.delete(Comments.delete)


module.exports = router
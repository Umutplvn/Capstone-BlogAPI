"use express"

const express=require('express')
const TokenModel=require('../models/token')

module.exports= async(req, res, next)=>{

const authToken = req.headers?.authorization || null

if(authToken){
    const tokenData=await TokenModel.findOne({token:authToken}).populate('userId')
    req.user=tokenData?.userId?._id
}
next()
}


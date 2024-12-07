const express=require('express')
const mongoose=require('mongoose')
const app=express()
mongoose.connect('mongodb://localhost:27017/deliveryApp')
const adminSchema=new mongoose.Schema({
    userName:{type:String, required:true},
    userId:{type:Number, required:true},
    
})
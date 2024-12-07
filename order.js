const express=require('express')
const mongoose=require('mongoose')
const app=express()
mongoose.connect('mongodb://localhost:27017/deliveryApp')
const orderSchema=new mongoose.Schema({
    orderID:{type:String, required:true},
    customerID:{type:String, required:true},
    item:{type:Number, required:true},
    totalAmount:{type:Number, required:true},
    shippingAddress:{type:String, require:true},
    status:{type:String, required:true},
});
const order=mongoose.model("order",orderSchema);
app.get("/getUsers",(res,req)=>{
    order.find({}).then(function(order){
        console.log(order)
    }).catch(function(err){
        console.log(err)
    })
})
app.listen(3003,()=>{
    console.log("Connection done");
})
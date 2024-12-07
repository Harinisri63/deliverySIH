// const express=require('express')
// const mongoose=require('mongoose')
// const app=express()
// mongoose.connect('mongodb://localhost:27017/deliveryApp')
// const deliverySchema=new mongoose.Schema({
//     orderID:{type: Number , requried: true},
//     orderConfirmation:{type: String, requried:true},
//     shipped:{type:String, required:true},
//     smsStatus:{type:String},
//     outForDelivery:{type:String, required:true},
//     deliveryelivered:{type:String, required:true},
// });
// const delivery=mongoose.model("delivery",deliverySchema)
// app.get("/getUsers",(res,req)=>{
//   delivery.find({}).then(function(user){
//     res.json(user)
//   }).catch(function(err){
//     console.log(err);
//   })
// })
// app.listen(3002,()=>{
//   console.log("Connection done");
// })


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/deliveryApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const deliverySchema = new mongoose.Schema({
  orderID: { type: Number, required: true },
  orderConfirmation: { type: String, required: true },
  shipped: { type: String, required: true },
  smsStatus: { type: String },
  outForDelivery: { type: String, required: true },
  deliveryDelivered: { type: String, required: true },
});
const Delivery = mongoose.model('delivery', deliverySchema);
app.post('/addDelivery', (req, res) => {
  const { orderID, orderConfirmation, shipped, smsStatus, outForDelivery, deliveryDelivered } = req.body;
  const newDelivery = new Delivery({
    orderID,
    orderConfirmation,
    shipped,
    smsStatus,
    outForDelivery,
    deliveryDelivered,
  });
  newDelivery.save().then(() => res.status(201).json({ message: 'Delivery information added successfully!' }))
    .catch((err) => res.status(400).json({ error: err.message }));
});
app.get('/getDelivery', (req, res) => {
  Delivery.find({})
    .then((deliveries) => res.json(deliveries))
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});

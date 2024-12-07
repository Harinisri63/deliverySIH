// const express=require('express')
// const mongoose=require('mongoose')
// const app=express()
// mongoose.connect('mongodb://localhost:27017/deliveryApp')
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     age: { type: Number, required: true },
//     address: { type: String, required: true },
//     aadhaarNo: { type: String, required: true, unique: true },
//     drivingLicence: { type: String, required: true },
//     vehicleType: { type: String, required: true },
//     deliveryType: { type: String, required: true },
//     suitableLocation: { type: String },
//     emergencyContactNo: { type: String, required: true },
//     height: { type: Number },
//     weight: { type: Number },
//     bloodGroup: { type: String },
//     medicineHistory: { type: [String] }, 
//     medicalHistoryDescription: { type: String },
//     additionalNotes: { type: String },
//   });
//   const User = mongoose.model("User", userSchema);
//   app.get("/getUsers",(req,res)=>{
//     User.find({}).then(function(users){
//       res.json(users)
//     }).catch(function(err){
//       console.log(err)
//     })
//   })
// app.listen(3002,()=>{
//   console.log("Connection done");
// })


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/deliveryApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  aadhaarNo: { type: String, required: true, unique: true },
  drivingLicence: { type: String, required: true },
  vehicleType: { type: String, required: true },
  deliveryType: { type: String, required: true },
  suitableLocation: { type: String },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: { type: String },
  medicineHistory: { type: [String] },
  medicalHistoryDescription: { type: String },
  additionalNotes: { type: String },
});
const User = mongoose.model('User', userSchema);
app.post('/addUser', (req, res) => {
  const newUser = new User(req.body);
  newUser.save().then(() => res.status(201).json({ message: 'User added successfully!' }))
    .catch((err) => res.status(400).json({ error: err.message }));
});
app.get('/getUsers', (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});

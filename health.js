// const express=require('express')
// const mongoose=require('mongoose')
// const app=express()
// mongoose.connect('mongodb://localhost:27017/deliveryApp')
// const healthSchema=new mongoose.Schema({
//     user:{type:String,required:true},
//     height:{type:Number, required:true},
//     weight:{type:Number, required:true},
// });
// const health=mongoose.model("health",healthSchema);
// app.get("/getUsers",(res,req)=>{
//     health.find({}).then(function(health){
//         res.json(health)
//     }).catch(function(err){
//         console.log(err);
//     })
// });
// app.listen(3005,()=>{
//     console.log("Connection done");
// })

// ======================================
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const app = express();
// app.use(bodyParser.json());
// mongoose.connect("mongodb://localhost:27017/deliveryApp", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// const healthSchema = new mongoose.Schema({
//   user: { type: String, required: true },
//   height: { type: Number, required: true },
//   weight: { type: Number, required: true },
// });
// const Health = mongoose.model("Health", healthSchema);
// app.get("/getHealth", (req, res) => {
//   Health.find({})
//     .then((healthData) => {
//       res.json(healthData);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error fetching health data");
//     });
// });
// app.post("/addHealth", async (req, res) => {
//   try {
//     const healthData = req.body;
//     const newHealth = new Health(healthData);
//     await newHealth.save();
//     res.status(201).json({
//       message: "Health data added successfully",
//       health: newHealth,
//     });
//   } catch (error) {
//     console.error("Error adding health data:", error);
//     res.status(500).json({ message: "Error adding health data", error });
//   }
// });
// app.listen(3005, () => {
//   console.log("Server is running on port 3005");
// });
// =======================================================



const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors()); 
app.use(bodyParser.json());
mongoose
  .connect("mongodb://localhost:27017/deliveryApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
const healthSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  heartRate:{type:Number, required:true},
    SPO2:{type:String, require:true},
    sleepDuration:{type:Number, required:true},
    footSteps:{type:Number, required:true},
    temperature:{type:String, required:true},
    distanceWalked:{type:Numder, required:true},
    stress:{type:NUmber, required:true},
    sleepQuality:{type:String, required:true},
});
const Health = mongoose.model("Health", healthSchema);
app.get("/getHealth", (req, res) => {
  Health.find({})
    .then((healthData) => res.json(healthData))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching health data");
    });
});
app.post("/addHealth", async (req, res) => {
  try {
    const { user, height, weight } = req.body;
    if (!user || !height || !weight) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("Received data:", req.body);
    const newHealth = new Health({ user, height, weight });
    await newHealth.save();
    res.status(201).json({
      message: "Health data added successfully",
      health: newHealth,
    });
  } catch (error) {
    console.error("Error adding health data:", error);
    res.status(500).json({ message: "Error adding health data", error });
  }
});
app.listen(3005, () => {
  console.log("Server is running on port 3005");
});


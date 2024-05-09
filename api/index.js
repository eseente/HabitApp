const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://esen:esen@cluster0.sbrrgxd.mongodb.net/").then(()=>{
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error Connecting to MongoDb",error);
});

app.listen(port, () => {
    console.log("Server running on port 3000");
});

const Habit = require("./models/habit")
//endpoint to create a habit in the backend
app.post("/habits",async(req,res)=>{
    try{
        const {title,color,repeatMode,reminder}=req.body;

        const newHabit = new Habit({
            title,
            color,
            repeatMode,
            reminder
        })

        const savedHabit = await newHabit.save();
        res.status(2000).json(savedHabit);
    }catch(error){
        res.status(500).json({error:"Network error"})
    }
})
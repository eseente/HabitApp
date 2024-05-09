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

const Habit = require("./models/habit");
const { Try } = require("expo-router/build/views/Try");
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
        console.log("New habit created",newHabit);
        const savedHabit = await newHabit.save();
        res.status(200).json(savedHabit);
    }catch(error){
        console.log('backend error:',error)
        res.status(500).json({error:error})
    }
});

app.get("/habitsList",async(req,res)=>{
    try {
        const allHabits = await Habit.find({});

        res.status(200).json(allHabits)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

app.put("/habits/:habitId/completed/:day",async(req,res)=>{
    try {
        const {habitId,day} = req.params;

        const habit = await Habit.findById(habitId);

        if(!habit){
            return res.status(404).json({error:"Habit not found"})
        }

        habit.completed[day] = true;

        await habit.save();

        res.status(200).json({message:"Habit complettion status updated"})
    } catch (error) {
        console.log("Error",error);
        res.status(500).json({error:error.message})
    }
})
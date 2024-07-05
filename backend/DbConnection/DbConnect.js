import mongoose from "mongoose";
const dbconnection=mongoose.connect('mongodb://localhost:27017/StackOver',{
    
})
.then(()=>{
    console.log("Connected")
}).catch("not connected")

export default dbconnection;


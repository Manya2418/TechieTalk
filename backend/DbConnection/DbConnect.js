import mongoose from "mongoose";
const dbconnection=mongoose.connect('mongodb+srv://manya:manya123@cluster0.ixep32d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Connected")
}).catch("not connected")

export default dbconnection;


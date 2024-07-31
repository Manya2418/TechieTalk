

import mongoose from "mongoose";

const dbconnection=mongoose.connect('mongodb+srv://manya:manya123@cluster0.ixep32d.mongodb.net/StackOver')
.then(()=>{
    console.log("Connected")
}).catch("not connected")

// const dbconnection=async()=>{
//     try{
//         mongoose.connect('mongodb+srv://manya:manya123@cluster0.ixep32d.mongodb.net/StackOver')
//         console.log("connected")
//     }catch(err){
//         console.log("not connected")
//     }
// }

export default dbconnection;


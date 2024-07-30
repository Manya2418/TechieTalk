// import mongoose from "mongoose";

// const dbconnection=async()=>{
//     try{
//         await mongoose.connect('mongodb+srv://manya:manya123@cluster0.ixep32d.mongodb.net/StackOver')
//         console.log("Connected")
//     }
//     catch(err){
//         console.log(err);
//     }
   
// }

import mongoose from "mongoose";

const dbconnection = () => {
  mongoose.connect('mongodb+srv://manya:manya123@cluster0.ixep32d.mongodb.net/StackOver')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
};

export default dbconnection;



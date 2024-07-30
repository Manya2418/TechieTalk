import mongoose from "mongoose";

const dbconnection=async()=>{
    try{
        await mongoose.connect('mongodb+srv://manya:manya123@cluster0.ixep32d.mongodb.net/StackOver',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 10
        })
        console.log("Connected")
    }
    catch(err){
        console.log(err);
    }
   
}
export default dbconnection;


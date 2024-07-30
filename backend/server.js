import express from 'express'
import cors from 'cors'
import userRouter from './Routes/userRoute.js';
import bodyParser from 'body-parser';
import dbconnection from './DbConnection/DbConnect.js';
import questionRoute from './Routes/Questions.js'
const app=express();


app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

dbconnection();
app.use('/user',userRouter)
app.use('/question',questionRoute)

app.get('/',(req,res)=>{
    res.send("Hello manya")
})

app.listen(4000,(req,res)=>{
    console.log("server is running on 4000")
})
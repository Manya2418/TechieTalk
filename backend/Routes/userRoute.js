import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import Contact from "../models/Contact.js";
const router=express.Router()

router.post('/signup',async(req,res)=>{
    const {name,email,phone,password}=req.body;
    try{

        let user=await User.findOne({email});
        if(user){
            return res.status(404).json({message:"User already Exist"})
        }

        const hashedPassword=await bcrypt.hash(password,12)
        user = new User({ 
            name, 
            email, 
            password: hashedPassword,
            phone 
        });
        await user.save();
        console.log(user)

        const token=jwt.sign({ userId: user._id },"secret",{expiresIn:"1h"})
        res.status(201).json({token});

    }catch(error){
        res.status(500).json("Something went wrong....")
    }
}
);






router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const payload = { user: { id: user.id ,name: user.name, email: user.email,phone:user.phone} };
        const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });

        res.json({
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                phone:user.phone
            }
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/alluser', async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
     try {
      const user = await User.findOne({ email });
   
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      const token = crypto.randomBytes(20).toString('hex');
      user.password= token;
      user.resetPasswordExpires = Date.now() + 3600000; 
      await user.save();
  
      
      const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: 'manyasahu94@gmail.com',
          pass: 'fqcp ifqv gjkr wivt',
        },
      });
      await transporter.sendMail({
        to: user.email,
        from:'manyasahu94@gmail.com',
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please click on the following link, or paste this into your browser to complete the process:\n\n
               https://techie-talk-hxox-jiy8ztxki-manya-sahus-projects.vercel.app/user/resetpassword/${token}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      });
      res.status(200).json({ message: 'Password reset email sent' });

    } catch (err) {
      console.error("server error",err)
      res.status(500).send({ message: 'Server error' });
    }
  });
  
  
  router.post('/resetpassword/:token', async (req, res) => {
    const { token}=req.params;
    const {password}=req.body;
    try {
      const user = await User.findOne({ password: token});
      if (!user) {
        return res.status(400).send({ message: 'Password reset token is invalid or has expired' });
      }
  
      const newpassword = await bcrypt.hash(password, 10);
      user.password = newpassword;
      
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.status(200).send({ message: 'Password has been reset' });
    } catch (err) {
      res.status(500).send({ message: 'Server error' });
    }
  });
  


router.get('/:userId', async (req, res) => {
    const {userId}=req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({user})

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post("/update/:id",async (req,res)=>{
    const userId=req.params.id
    const {name,about,tags}=req.body

    try{
        const user=await User.findByIdAndUpdate(
            userId,
            { name, about, tags },
            { new: true }
        
        );
        if(!user){
            res.status(404).json({ message: "User not found" });
        }  
        
        res.status(200).json({ message: "User updated successfully" });

    }catch(err){
        res.status(505).json({message:"Bad request"})
    }
})



router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      const newContact = new Contact({ name, email, message });
      await newContact.save();
      res.status(201).json({ message: 'Contact data saved successfully' });
    } catch (err) {
      console.error('Error saving contact data:', err);
      res.status(500).json({ error: 'Failed to save contact data' });
    }
  });

export default router

import React, { useState } from 'react'
import './Component.css'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Contact = () => {

    const initial={
        name: '',
        email: '',
        message: ''
      }
    const [formData, setFormData] = useState(initial);
    const {name,email,message}=formData;

      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
   };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post('http://localhost:4000/user/contact', formData);
          
          setFormData({ name: '', email: '', message: '' });
          alert("done")
          toast.success('Message sent successfully');
        } catch (error) {
          console.error('Failed to send message:', error);
          toast.error('Failed to send message. Please try again later.');
        }
      };

  return (
    <>
        <div className='Contact'>
            <div class="flex-col mt-10">
                
            <h1 class="text-xl">Join the Stack Overflow community</h1>
            <p>Get unstuck — ask a question</p>
            <p>Unlock new privileges like voting and commenting</p>
            <p>Save your favorite tags, filters, and jobs</p>
            <p>Earn reputation and badges</p>
            <div className='card' >
                
                <div class="w-32 h-32 shadow-xl bg-white  justify-center align-middle flex-col p-10 ">
                <i class="fa-solid fa-location-dot text-customColor "></i>
                <h4>MAIN OFFICE</h4>
                </div>
                <div class="w-32 h-32 shadow-xl bg-white justify-center align-middle flex-col p-10">
                    
                <i class="fa-solid fa-fax text-customColor "></i>
                <h4>FAX</h4>
                </div>
                <div class="w-32 h-32  shadow-xl bg-white justify-center align-middle flex-col p-10 ">
                <i class="fa-solid fa-phone text-customColor"></i>
                <h1>PHONE NUMBER</h1>
                </div>
                <div class="w-32 h-32  shadow-xl bg-white justify-center align-middle flex-col p-10">
                <i class="fa-solid fa-envelope text-customColor"></i>
                <h4>EMAIL</h4>
                </div>      
            </div>
            
            </div>
            <div class="w-96 bg-customColor p-6 mt-20">
                
                <h1 class="text-center text-xl text-white">Contact Us</h1>
                <form className="signup-form">
                <div>
                <label for="name" class="text-white">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder='Name'
                        required
                    />
                </div>
                <div>
                <label for="email" class="text-white">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder='Email'
                        required
                    />
                </div>
              
                <div>
                <label for="message" class="text-white">
                Message
                </label>
                <textarea 
                type="text"
                name='message'
                placeholder="Type your message here..."  
                value={message}
                required
                onChange={onChange}/>
                </div>
                <button type="submit"  onClick={handleSubmit} >Send Message</button>
                
                </form>
            </div>
        </div>
        <ToastContainer/>
    </>
  )
}

export default Contact
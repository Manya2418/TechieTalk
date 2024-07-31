import React, { useState } from 'react'
import './user.css'
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'
import Loader from '../Loader'
const EditProfileForm = ({profile}) => {
  
    const [name,setName]=useState(profile?.name)
    const [about,setAbout]=useState(profile?.about)
    const [loading, setLoading] =useState();
    const [tags,setTags]=useState('')
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        

            const userData={
                name,
                about,
                tags:tags.split(" ")
            }
            setLoading(false)
            try{
                const response=await axios.post(`https://techietalk.onrender.com/user/update/${profile._id}`,userData);
                toast.success("Profile Updated!")
                window.location.reload()
            }catch(err){
                console.log(err);
            }finally{
                setLoading(true)
            }
        
        }

        if(loading){
            return <Loader/>
        }

    return (
    <>     
    <h1 className='edit-profile-title'>
        Edit Your Profile
    </h1>
    <h2 className='edit-profile-title'>
        Public Information
    </h2>
    <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor='name'>
            <h3>Display name</h3>
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
        </label>
        <label htmlFor='about'>
            <h3>About me</h3>
            <textarea id="about" cols="30" rows="10" value={about} onChange={(e)=>setAbout(e.target.value)}></textarea>
        </label>

        <label htmlFor='tags'>
            <h3>watched tags</h3>
            <p>Add tags separated by 1 space</p>
            <input type='text' id='tags' value={tags}  onChange={(e)=>setTags(e.target.value)}/>
        </label><br/>


        <input type='submit' value="Save profile" className='user-submit-btn'/>
        {/* <button type='button' className='user-cancel-btn' onClick={()=>setSwitch(false)}>Cancel</button> */}
    </form>
    <Toaster/>
    </>
  )
}

export default EditProfileForm

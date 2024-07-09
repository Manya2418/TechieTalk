import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import './user.css'
import LeftSidebar from '../Layout/LeftSidebar';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import EditProfileForm from './EditProfileForm';

const UserProfile = () => {
    const [profile,setProfile]=useState(null)
    const [showComponent, setShowComponent] = useState(false);

    const isAuthenticated=useSelector((state)=>state.user.isAuthenticated)
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const user=userData?userData.user.id:null;

    const {userId}=useParams();

    const handleClick = () => {
        setShowComponent(!showComponent);
    };

    useEffect(()=>{
        const fetchdata=async ()=>{
            if(userId){
                try{
                    const response=await axios.get(`https://techietalk-1.onrender.com/user/${userId}`);
                    setProfile(response.data.user)
                }catch(err){
                    console.log(err)
                }
            }
                
            }
        fetchdata();
    },[userId])

  return (
  <>
  <LeftSidebar/>
    <div className='homeContainer_1'>
        
        <div className='home-container-2'>
            <section>
            <div className='homeContainer_2'>
            <div className='user-details'>
                <p style={{backgroundColor:"red",padding:"5px 20px 5px 20px",cursor:"pointer",fontSize:"50px",color:"white"}}>
                {profile?.name.charAt(0).toUpperCase()}</p>

                <div className='user-name'>
                    <h1>{profile?.name}</h1>
                    <p><i class="fas fa-birthday-cake"></i>
                    Member of {moment(profile?.joinedOn).fromNow()}</p>
                    
                </div>
                
            </div>
            
            <div>
                <p>
                    {profile?.about}
                    </p>
                    {profile?.tags?.length > 0 ? (
                profile.tags.map((tag, index) => (
                    <h1 key={index}>{tag}</h1>
                ))
            ) : (
                <p>No tags available</p>
            )}
                </div><br/>
            {
                userId===user &&(
                    <button type='button' className="edit-profile-btn" onClick={handleClick}>
                        <i class="fa-solid fa-pen"></i>
                        Edit Profile
                    </button>)
            }
           
            </div>
            <div>

            </div>
            </section>
            {showComponent && <EditProfileForm profile={profile} setShowComponent={setShowComponent} />}

        </div>
       
    </div>



    </>
  )
}

export default UserProfile
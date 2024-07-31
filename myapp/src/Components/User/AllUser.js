import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LeftSidebar from '../Layout/LeftSidebar';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const AllUser = () => {
    const [loading,setLoading]=useState();
    const [users,setusers]=useState([]);

    useEffect(()=>{
        const fetchdata=async ()=>{
            setLoading(true)
            try{
                const res=await axios.get("https://techietalk.onrender.com/user/alluser");
                setusers(res.data)
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        }
        fetchdata();
    },[])
     if(loading){
        return <Loader/>
     }
  return (

        <>
    <div style={{display:"flex"}}>
        <LeftSidebar/>
        <div className='home-content'>
        <div class="m-7 flex gap-8 text-center flex-wrap">
        
        {users.map((user) => (
            <div  class="w-20 flex-col align-middle justify-center">
                <p style={{backgroundColor:"#009dff",color:"white",padding:"5px 10px 5px px",textAlign:"center",cursor:"pointer",height:"40px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                
                <Link to={`/user/${user._id}`}>{user.name.charAt(0)}</Link>
                </p>
            <h1 key={user._id}>{user.name}</h1>
            </div>
        ))}
    </div>
        </div>
        </div>
    </>

    
  )
}

export default AllUser
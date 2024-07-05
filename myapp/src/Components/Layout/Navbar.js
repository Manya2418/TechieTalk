import React, { useEffect, useState } from 'react'
import './Component.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth, logout } from '../../store/userSlice';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const navigate=useNavigate();
  const dispatch=useDispatch();
  const isAuthenticated=useSelector((state)=>state.user.isAuthenticated)
  
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const username=userData?userData.user.name:null;
  const userId=userData?userData.user.id:null;
  const profile=username?username.charAt(0):null;

  const handleLogout = () => {
    sessionStorage.clear();  
    dispatch(logout());
    toast.success('Logged out successfully!');

    navigate('/'); 
    window.location.reload(); 
  };
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (

  

    <div >
      <nav className="navbar">
        <div className="logo">
          <Link to="/"><img src='../../../image.png'/></Link>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a ><Link to="/">Home</Link></a></li>
          <li><a ><Link to="/user/About">About</Link></a></li>
          <li><a ><Link to="/user/contact">Contact Us</Link></a></li>
        
        <div className={`nav-actions ${isMenuOpen ? 'active' : ''}`}>
          <input type="text" placeholder="Search" className="search-input" />
        
          {
            isAuthenticated?(
              <>
              <p style={{backgroundColor:"#F7B733",padding:"5px 10px 5px 10px",borderRadius:"100%",cursor:"pointer"}}>
                
                <Link to={`/user/${userId}`}>{profile}</Link>
                </p>


              <button className="login-btn" onClick={handleLogout}>
            Log out</button>
            </>
            ):(
              <Link to="/user/login" className="login-btn">
            Login</Link>
            
            )
          }
        </div>
        </ul>

        <div className="menu-toggle" onClick={toggleMenu}><i class="fa-solid fa-ellipsis-vertical"/></div>
    
      </nav>
      <Toaster/>
    </div>
  )
}

export default Navbar
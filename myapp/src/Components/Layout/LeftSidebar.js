import React, { useState } from 'react'
import './Component.css'
import { Link } from 'react-router-dom'

const LeftSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
    <div className="menu-toggle1" onClick={toggleMenu}> ☰</div>
   
    <nav className={`sidebar ${isMenuOpen ? 'active':''}`}>
    
      <div className="nav-menu" >
        <h1><Link to='/' ><i class="fa-solid fa-house"></i>Home</Link></h1>
        <h1><Link to='/'><i class="fa-solid fa-globe"></i>Questions</Link></h1>
        <h1><Link to='/tags'><i class="fa-solid fa-tag"></i>Tags</Link></h1>
        <h1 ><Link to="/user/alluser" ><i class="fa-solid fa-user"></i>Users</Link></h1>
       
      </div>
      
      
      
    </nav>
    
    </>
  
  )
}

export default LeftSidebar
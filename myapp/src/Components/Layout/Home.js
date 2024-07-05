import React from 'react'
import LeftSidebar from './LeftSidebar'
import './Component.css'
import RightSidebar from './RightSidebar'
import Questions from '../Question/Questions'
const Home = () => {
  return (
    <>
    <div style={{display:"flex"}}>
        <LeftSidebar/>
        <Questions/>
        <RightSidebar/>
        </div>
        
    </>
  )
}

export default Home
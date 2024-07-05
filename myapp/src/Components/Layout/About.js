import React from 'react'
import '../User/user.css'
import Animation from '../Animations/About.json'
import Lottie from 'lottie-react'
const About = () => {
  return (<>    

        <div className='login-main' class="mt-28 flex">
            <div className='login-image' >
                <h1>Join the Stack Overflow community</h1>
                <p>Get unstuck — ask a question</p>
                <p>Unlock new privileges like voting and commenting</p>
                <p>Save your favorite tags, filters, and jobs</p>
                <p>Earn reputation and badges</p>
                <p style={{ fontSize: "15px", color: "#666767" }}>
                    Collaborate and share knowledge with a private group for
                </p>
                <p style={{ fontSize: "13px", color: "#007ac6" }}>
                    Get Stack Overflow for Teams free for up to 50 users.
                </p>
            </div>
        <div>

        <Lottie animationData={Animation} loop={true} autoplay={true} />

        </div>
        </div>

        </>

  )
}

export default About
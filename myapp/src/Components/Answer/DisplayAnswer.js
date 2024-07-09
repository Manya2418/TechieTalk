import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate, useParams } from 'react-router-dom';
import LeftSidebar from '../Layout/LeftSidebar';
import RightSidebar from '../Layout/RightSidebar';
import '../Layout/Component.css'
import './Answer.css'
import copy from 'copy-to-clipboard'
import axios from 'axios'
import moment from 'moment';
import { Link } from 'react-router-dom';
import {  Toaster,toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import OthersAnswer from './OthersAnswer';
import Loader from '../Loader';

const DisplayAnswer = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const username=userData?userData.user.name:null;
  const userId=userData?userData.user.id:null;
  const [vote,setvote]=useState(0);
  const [loading,setLoading]=useState();

    
  
  const [Data,setData]=useState({
    answerBody:''
  })
  const handleChange=(e)=>{
    setData(e.target.value)

  }
  const {questionId}=useParams();
  const [question,setquestion]=useState(null)

  const isAuthenticated=useSelector((state)=>state.user.isAuthenticated)
   const navigate=useNavigate()
  const location=useLocation();

    const handleShare=()=>{
      copy("https://techietalk-1.onrender.com"+location.pathname)
      alert(`Copied url :`+"https://techietalk-1.onrender.com"+location.pathname)
    }

    const handleDelete=async ()=>{
      
      const que={
        userId:userId
      }
      setLoading(true)
      try{
        await axios.delete(`http://localhost:4000/question/delete/${questionId}`,{data:que})
        toast.success("Deleted Successful!")
        navigate('/')
      }catch{
        console.log("error not able to delete")
      }finally{
        setLoading(false)
      }
    }

    useEffect(()=>{
      const fetchdata=async()=>{
        setLoading(true)
        try{
          const response=await axios.get(`http://localhost:4000/question/${questionId}`);
          console.log(response.data)
          setquestion(response.data)
   
        }catch(err){
          console.log("error in fetching",err)
        }finally{
          setLoading(false)
        }
      };
      fetchdata();
      
    },[questionId])

    const handleSubmit=async (e)=>{
      e.preventDefault()
      
      if(!isAuthenticated){
        alert("Login first for posting answer")
        navigate("/user/login")
        return;
      }

      const formData={
        answerBody:Data,
        userAnswered:username,
        userId:userId,

      }
      setLoading(true)
        try{
          const data=await axios.post(`http://localhost:4000/question/${questionId}/answer`,formData);
          toast.success("Answer is posted!")
          setData({ answerBody: '' });
          const updatedQuestion=await axios.get(`http://localhost:4000/question/${questionId}`)
          setquestion(updatedQuestion.data)
        }catch(err){
          console.log(err)
        }finally{
          setLoading(false)
        }
      
      
    }
    const handleupVote = async () => {
      if(!isAuthenticated){
        alert("Login first for posting answer")
        navigate("/user/login")
        return;
      }
      setvote(1)
      setLoading(true)
      try {
          const response = await axios.post(`http://localhost:4000/question/${questionId}/upvote`, {
              userId: userId,
          });
          
      } catch (err) {
          console.log('Error voting on question');
      }finally{
        setLoading(false)
      }
  };

  const handledownVote = async () => {
    if(!isAuthenticated){
      alert("Login first for posting answer")
      navigate("/user/login")
      return;
    }
    setvote(-1)
    setLoading(true)
    try {
        const response = await axios.post(`http://localhost:4000/question/${questionId}/downvote`,{
          userId: userId,
      });
       
    } catch (err) {
        console.log('Error voting on question');
    }finally{
      setLoading(false)
    }
};
if (loading) {
  return <Loader />;
}


  return (
    <>
    <div style={{display:"flex"}}>
        <LeftSidebar/>
        <div className='home-content'>
          {question ? (
              <div key={question._id}>
              <section className='container question-details-container'>
                  <h1 class="text-2xl">{question.questionTitle}</h1>
                  <div className='question-details-container-2' >
                      <div className='question-votes'>
                      <i className="fa-solid fa-caret-up" onClick={handleupVote}></i>
                        <p>{vote}</p>
                    <i className="fa-solid fa-caret-down" onClick={handledownVote}></i>
                  
                      </div>
                      <div style={{width:"100%"}}>
                          <p className='question-body'>{question.questionBody}</p>
                        <div className='question-details-tags'>
                          {
                            question.questionTags.map((tag)=>{
                              <p key={tag}>{tag}</p>
                            })
                          }
                        </div>
                        <div className='question-actions-user' >
                          <div>
                            <button type='button' onClick={handleShare} >Share</button>
                            {
                              userId===question?.userId && (
                                <button type='button' onClick={handleDelete}>Delete</button>
                              )
                            }
                           
                          </div>
                          <div >
                            <p>asked {moment(question.askedOn).fromNow()}</p>
                            <Link to={`/user/${question.userId}`} className='user-link' style={{color:"#0006d8"}}>
                              <h1 textDecoration="none" class="bg-orange-500 text-white p-3 pt-1 pb-1 text-2xl">{question.userName.charAt(0).toUpperCase()}</h1>
                              <div>
                                {question.userName}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                  </div>
              </section>
              {
                question.noOfAnswers!==0 &&(
                  <section>
                    <h3>
                      {question.noOfAnswers} Answers
                    </h3>
                    <OthersAnswer key={question._id} question={question} handleShare={handleShare} userId={userId}/>

                  </section>
                )
              }
              <section className='post-ans-container'>
                <h3>Your Answer</h3>

                <form onSubmit={handleSubmit} >
                  <textarea 
                    name='answerBody' 
                    value={Data.answerBody} 
                    id='' 
                    cols="30" 
                    rows="10"
                    onChange={handleChange}
                    ></textarea> 


                  <input type='submit' className='post-ans-btn' value='Post your Answer'/>
                </form>
                <p>
                  Browse other Question tagged
                  {question.questionTags.map((tag)=>(
                    <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                  ))} or  
                  <Link to='/question/askque' style={{textDecoration:"none",color:"#009dff"}}>
                    {" "}ask your own question
                  </Link>
                </p>
              </section>
          </div>
            ) : (
              <p>Loading...</p>
            )}
        </div>
        <RightSidebar/>
        </div>
    <Toaster/>
    </>
  )
}

export default DisplayAnswer
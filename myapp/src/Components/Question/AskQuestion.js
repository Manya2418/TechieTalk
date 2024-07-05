import React, { useEffect, useState } from "react"
import './Question.css'
import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
import { initializeAuth } from "../../store/userSlice";

import { Toaster ,toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";


const AskQuestion = () => {
    const [loading,setLoading]=useState();
    const isAuthenticated=useSelector((state)=>state.user.isAuthenticated);
    const navigate=useNavigate();
    
    const dispatch=useDispatch();
    
    useEffect(()=>{
      if(!isAuthenticated){
        toast.error("Please Login First")
        navigate('/user/login')
      }else{
        dispatch(initializeAuth())
      }
        
      },[dispatch])

    const storeduser = sessionStorage.getItem('userData');
    const user=storeduser?JSON.parse(storeduser):null;
    const userName=user?user.user.name:null;
    const userId=user?user.user.id : null;

    const [formData, setFormData] = useState({
        questionTitle: '',
        questionBody: '',
        questionTags: '',
        userName:userName,
        userId:userId,
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:4000/question/askque',formData);
            
            toast.success('Submitted Successfully!');
        
            setFormData({
                questionTitle: '',
                questionBody: '',
                questionTags: '',
                userName:userName,
                userId:userId,
              });
              navigate("/")
        }
        catch (error) {
            console.error('Error submitting question:', error);
          }finally{
            setLoading(false)
          }
        };

        if(loading){
          return <Loader/>
        }
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1 class="font-serif text-3xl">Ask a public Question</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you're asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                name="questionTitle"
                value={formData.questionTitle}
                onChange={handleChange}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                

              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                value={formData.questionBody}
                onChange={handleChange}
                id="ask-ques-body"
                name="questionBody"
                cols="30"
                rows="10"
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                name="questionTags"
                value={formData.questionTags}
                onChange={handleChange}
                placeholder="e.g. (xml typescript wordpress)"/>
            </label>
          </div>
          <input
            type="submit"
            value="Reivew your question"
            className="review-btn"
          />
        </form>
      </div>
      <Toaster/>
    </div>
  )
}

export default AskQuestion

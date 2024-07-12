import React, { useEffect, useState } from 'react';
import '../Layout/Component.css'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import QuestionList from './QuestionList';
import Loader from '../Loader';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading,setLoading]=useState();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://techietalk-1.onrender.com/question/getallquestion");
        setQuestions(res.data);
      } catch (err) {
        console.log("Error fetching questions", err);
      }finally{
        setLoading(false)
      }
    };
    fetchQuestions();
  }, []);
  const location=useLocation();

  if(loading){
    return <Loader/>
  }
  return (
    <>
      <div className='home-content'>
        <div className='home-ask' >

        {
            location.pathname==='/'?<h1 className="font-serif text-3xl">Top Questions</h1>:<h1>All Questions</h1>
          }
        <button className='login-btn'>
          <Link to="/askque">Ask Question</Link>
        </button></div>

        <div>
          <QuestionList questionsList={questions}/>
        </div>
      </div>
      
    </>
  );
}

export default Questions;

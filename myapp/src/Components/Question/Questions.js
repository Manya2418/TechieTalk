import React, { useEffect, useState } from 'react';
import '../Layout/Component.css'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import QuestionList from './QuestionList';
import RightSidebar from '../Layout/RightSidebar';

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:4000/question/getallquestion");
        setQuestions(res.data);
      } catch (err) {
        console.log("Error fetching questions", err);
      }
    };
    fetchQuestions();
  }, []);
  const location=useLocation();


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

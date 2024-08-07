import React from 'react'
import './Question.css'
import moment from 'moment'
import { Link } from 'react-router-dom'
const DisplayQuestion = ({question}) => {
  return (
    <div className='display-question-container'>
      <div className='display-votes-ans'>
        <p>{question.upVote.length+Math.abs(question.downVote.length)}</p>
        <p>votes</p>
      </div>
      
      <div className='display-votes-ans'>
        <p>{question.noOfAnswers}</p>
        <p>answers</p>
      </div>

      <div className='display-question-details'>
        <Link to={`/answer/${question._id}`} className="question-title-link">
          {question.questionTitle}
        </Link>
        <div className='display-tags-time'>
          <div className='display-tags'>
          {
            question.questionTags.map((tag)=>(
              <p key={tag}>{tag}</p>
            ))
          }
        </div>
        <p className='display-time'>
          asked {moment(question.askedOn).fromNow()}  {question.userName}
        </p>
      </div>
    </div>
    </div>
  )
}

export default DisplayQuestion

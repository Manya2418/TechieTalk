import React from 'react'
import DisplayQuestion from './DisplayQuestion'

const QuestionList = ({questionsList}) => {
  return (
    <>
        {
        questionsList.map((question)=>(
           <DisplayQuestion question={question} key={question._id}/>
            ))
        }
    </>
  )
}

export default QuestionList

import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import { toast,Toaster } from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader'

const OthersAnswer = ({question,handleShare,userId}) => {
    const [loading,setLoading]=useState();
    const {questionId}=useParams();
    const navigate=useNavigate()

    const handleDelete= async(userId,ansId)=>{
        const data={userId,ansId}
        setLoading(true);
        try{
            await axios.delete(`https://techietalk-1.onrender.com/question/${questionId}/deleteAnswer`,{data})
            toast.success("Answer Deleted!")
            navigate('/')
            
        }catch{
            console.log("error not able to delete")
          }finally{
            setLoading(false)
          }

    }

    if(loading){
      return <Loader/>
    }
  return (
    <div>
      {
        question.answer.map((ans)=>(
            <div className='display-ans' key={ans._id}>
                <p>{ans.answerBody}</p>
                <div className='question-actions-user'>
                    <div>
                        <button type='button' onClick={handleShare}>Share</button>
                        {
                          userId===ans?.userId && (
                            <button type='button' onClick={()=>handleDelete(userId,ans._id)}>Delete</button>
                          )
                        }
                    </div>
                    <div>
                    <p>answered {moment(ans.answeredOn).fromNow()}</p>
                    <Link to={`/user/${ans.userId}`} className='user-link' style={{color:"#0006d8"}}>
                        <p  class="bg-green-600 text-white pb-1 pl-2 pr-2 pt-1">{ans.userAnswered.charAt(0).toUpperCase()}</p>
                           <div> {ans.userAnswered} </div>
                    </Link>
                    </div>
                    
                </div>
            </div>
        ))
      }
      <Toaster/>
    </div>
  )
}

export default OthersAnswer
import express from 'express'
import Question from '../models/Questions.js';

const router=express.Router()


router.post("/askque",async (req,res)=>{
    const {questionTitle,questionBody,questionTags,userName,userId,noOfAnswers}=req.body;
   try{
        const question=new Question({questionTitle,questionBody,questionTags,userName,userId,noOfAnswers})
        await question.save();
        res.status(201).json({message:"Contact data saved"})
    }catch(err){
        console.error("error savind data",err);
        res.status(500).json({error:"failed to save"})
    }
})


router.get('/getallquestion',async (req,res)=>{
    try{
        const questions=await Question.find();
        res.json(questions);
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

)

router.get("/:id",async(req,res)=>{
    try{
        const question=await Question.findById(req.params.id)
        res.json(question)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post("/:id/answer",async (req,res)=>{
    const {answerBody,userAnswered,userId}=req.body
    if (!answerBody) {
        return res.status(400).json({ message: "Answer body is required" });
    }
    try{
        
        const question=await Question.findById(req.params.id)
        
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        question.answer.push({answerBody,userAnswered,userId})
        question.noOfAnswers=question.answer.length;
        await question.save();
        res.status(201).json({message:"Contact data saved"})

    }catch (err) {
        console.error("Error adding answer", err);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.delete("/delete/:questionId",async (req,res)=>{
    const {userId}=req.body;
    const {questionId}=req.params

   
    try{
        const question=await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        if (question.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized action" });
        }
        
        await question.deleteOne();
        res.status(201).json({message:"deleted successfully"})
    }catch(err){
        res.status(500).json({message:"failed deleted"})
    }
})

router.delete("/:questionId/deleteAnswer",async(req,res)=>{
    const {questionId}=req.params;
    const {userId,ansId}=req.body

    try{
        const question=await Question.findById(questionId);

        if(!question){
            return res.status(404).json({message:"Question not found"})
        }
        const answer=question.answer.id(ansId);
        
        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }
        if (answer.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized action" });
        }
        question.answer.pull(ansId)
        question.noOfAnswers = question.answer.length;
        
        await question.save();
        res.status(201).json({ message: "Answer added successfully" });
    


    }catch(err){
        console.error("Error deleting answer:", err);
        res.status(500).json({ message: "Failed to delete" });
    }
}

)


router.post('/:questionId/downvote', async (req, res) => {
    const { questionId } = req.params;
    const { userId } = req.body;

    try {
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        question.downVote-=1;
        await question.save();

        res.status(200).json({ message: 'Downvote recorded', question });
    } catch (error) {
        console.error('Error downvoting question', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/:questionId/upvote', async (req, res) => {
    const { questionId } = req.params;

    try {
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        question.upVote+=1
        await question.save();

        res.status(200).json({ message: 'Downvote recorded', question });
    } catch (error) {
        console.error('Error downvoting question', error);
        res.status(500).json({ message: 'Server error' });
    }
});
export default router

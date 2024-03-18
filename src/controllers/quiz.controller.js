import { Quiz, QuizResult } from "../models/quiz.model.js";

const createQuiz = async (req, res) => {
    try {
        const quizData = req.body;
        const newQuiz = new Quiz(quizData);
        await newQuiz.save();
        console.log('Quiz created successfully:', newQuiz);
        res.json({ message: 'Quiz created successfully', quiz: newQuiz });
      } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const submitQuiz = async (req, res) => {
  const answers = req.body;
  console.log('Quiz answers:', answers);
  res.json({ message: 'Quiz submitted successfully' });
}


const getQuiz = async (req, res) => {
    try {
        const quizId = req.params.id;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
          return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json({ quiz });
      } catch (error) {
        console.error('Error retrieving quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const quizResult = async (req, res) => {
    try {
        const { quizId, userId, answers, score, totalQuestions } = req.body;
        const result = new Result({ quizId, userId, answers, score, totalQuestions });
        await result.save();
        console.log('Quiz result submitted successfully:', result);
        res.json({ message: 'Quiz result submitted successfully', result });
      } catch (error) {
        console.error('Error submitting quiz result:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

export {
    createQuiz,
    submitQuiz,
    getQuiz,
    quizResult
}
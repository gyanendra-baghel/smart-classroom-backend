import mongoose, {Schema} from "mongoose";
import { User } from "./user.model"
import { Quiz } from "./quiz.model"

// Define schema for quiz results
const quizResultSchema = new Schema({
  quiz: {
    type: Quiz,
    required: true
  },
  user: {
    type: User,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  incorrectAnswers: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  }
});

// Define model for Result
const QuizResult = mongoose.model('quizResultSchema', quizResultSchema);

module.exports = QuizResult;

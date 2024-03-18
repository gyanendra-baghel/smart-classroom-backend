import mongoose, { Schema } from "mongoose";
import { User } from "./user.model";


const questionSchema = new Schema({
    questionText: {
      type: String,
      required: true
    },
    options: {
      type: [String], // Array of strings representing options
      required: true
    },
    correctOptionIndex: {
      type: Number,
      required: true
    }
  });
  
  // Define schema for quiz
const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema], // Array of question objects
        required: true
    },
    createdBy: {
        type: User,
        required: true
    }
},
    {
        timestamps: true,
    }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
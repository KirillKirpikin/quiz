import React, { useState } from 'react'
import { Question, Quiz } from '../../types/quiz.type';

import { v4 as uuidv4 } from 'uuid';
import { saveQuiz } from '../../utils/storage';

const AddQuiz = () => {
    const [title, setTitle] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([
      { text: '', answers: [{ text: '', isCorrect: false }] }
    ]);
  
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };
  
    const handleQuestionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuestions = [...questions];
      newQuestions[index].text = e.target.value;
      setQuestions(newQuestions);
    };
  
    const handleAnswerChange = (qIndex: number, aIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuestions = [...questions];
      newQuestions[qIndex].answers[aIndex].text = e.target.value;
      setQuestions(newQuestions);
    };
  
    const handleCorrectChange = (qIndex: number, aIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuestions = [...questions];
      newQuestions[qIndex].answers[aIndex].isCorrect = e.target.checked;
      setQuestions(newQuestions);
    };
  
    const addQuestion = () => {
      const lastQuestion = questions[questions.length - 1];
      if (lastQuestion.text.trim() === '' || lastQuestion.answers.some(answer => answer.text.trim() === '')) {
          alert('Please fill in the current question and all answers before adding a new question.');
          return;
      }
      setQuestions([...questions, { text: '', answers: [{ text: '', isCorrect: false }] }]);
    };
  
    const addAnswer = (qIndex: number) => {
      const currentQuestion = questions[qIndex];
      if (currentQuestion.answers.some(answer => answer.text.trim() === '')) {
          alert('Please fill in the current answers before adding a new answer.');
          return;
      }
      const newQuestions = [...questions];
      newQuestions[qIndex].answers.push({ text: '', isCorrect: false });
      setQuestions(newQuestions);
    };

    const deleteQuestion = (qIndex: number)=>{
      if(questions.length > 1){
        const newQuestions = questions.filter((_, index)=> index !== qIndex);
        setQuestions(newQuestions);
        
      }
    }

    const deleteAnswer = (qIndex: number, aIndex: number)=>{
      const newQuestions = [...questions];
      newQuestions[qIndex].answers = newQuestions[qIndex].answers.filter((_,index)=> index !== aIndex)
      setQuestions(newQuestions);
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const id = uuidv4()
      const newQuiz: Quiz = { id ,title, questions };
      saveQuiz(newQuiz).then(() => {
        setTitle('');
        setQuestions([{ text: '', answers: [{ text: '', isCorrect: false }] }]);
        alert('Quiz saved!');
      });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex}>
            <label>Question {qIndex + 1}:</label>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(qIndex, e)}
            />
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex}>
                <label>Answer {aIndex + 1}:</label>
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                />
                <label>
                  Correct:
                  <input
                    type="checkbox"
                    checked={answer.isCorrect}
                    onChange={(e) => handleCorrectChange(qIndex, aIndex, e)}
                  />
                </label>
                <button type="button" onClick={()=>deleteAnswer(qIndex, aIndex)}>Delete</button>
              </div>
            ))}
            <button type="button" onClick={() => addAnswer(qIndex)}>
              Add Answer
            </button>
            <button type="button" className='mb-[30px]' onClick={()=>deleteQuestion(qIndex)}>Delete Question</button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <button type="submit">Save Quiz</button>
      </form>
    );
  }

export default AddQuiz
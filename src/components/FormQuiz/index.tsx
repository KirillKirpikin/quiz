import React from "react";
import { Question } from "../../types/quiz.type";

import styles from './form.module.scss'


interface IFormQuiz{
    handleSubmit: (e: React.FormEvent) => void
    title: string,
    submitTitle: string
    questions:  Question[],
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
}

const FormQuiz: React.FC<IFormQuiz> = ({questions, setQuestions, setTitle, title, handleSubmit, submitTitle}) => {

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
  
    const deleteQuestion = (qIndex: number) => {
        if (questions.length > 1) {
        const newQuestions = questions.filter((_, index) => index !== qIndex);
        setQuestions(newQuestions);
      }
  };
  
  const deleteAnswer = (qIndex: number, aIndex: number) => {
      const newQuestions = [...questions];
      newQuestions[qIndex].answers = newQuestions[qIndex].answers.filter((_, index) => index !== aIndex);
      setQuestions(newQuestions);
  };

    return (
      <div className={styles.section}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.input}>
              <label>Title:</label>
              <input type="text" value={title} onChange={handleTitleChange} />
            </div>
            {questions.map((question, qIndex) => (
              <div key={qIndex} className={styles.question}>
                <div className={styles.delete}>
                <button type="button" onClick={() => deleteQuestion(qIndex)}>Delete Question</button>

                </div>

                <div className={styles.input}>
                  <label>Question {qIndex + 1}:</label>
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) => handleQuestionChange(qIndex, e)}
                  />
                </div>
                {question.answers.map((answer, aIndex) => (
                  <div key={aIndex} className={styles.answer}>
                    <div className={styles.input}>
                      <label>Answer {aIndex + 1}:</label>
                      <input
                        type="text"
                        value={answer.text}
                        onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                      />
                    </div>
                    <div className={styles.check}>
                    <label>
                      Correct:
                      <input
                        type="checkbox"
                        checked={answer.isCorrect}
                        onChange={(e) => handleCorrectChange(qIndex, aIndex, e)}
                      />
                    </label>
                    </div>
                    <button type="button" onClick={() => deleteAnswer(qIndex, aIndex)}>Delete</button>
                  </div>
                ))}
                <div className={styles.btns}>
                  <button type="button" onClick={() => addAnswer(qIndex)}>Add Answer</button>
                  
                </div>
              </div>
            ))}
            <div className={styles.btn}>
              <button  type="button" onClick={addQuestion}>Add Question</button>

            </div>
            <div className={styles.add}>
              <button type="submit">{submitTitle} Quiz</button>

            </div>
          </form>

        </div>

      </div>
    );
}

export default FormQuiz;
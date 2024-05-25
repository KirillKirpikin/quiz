import React from 'react'
import { Quiz } from '../../types/quiz.type';
import styles from './results.module.scss'
import { formatTime } from '../../utils/formatTime';

interface IResult {
    data: Quiz,
    answers: { [key: number]: number[] }
    timer: number
}

const Results: React.FC<IResult> = ({data, answers, timer}) => {
    const calculateScore = () => {
        return Object.keys(answers).reduce((score, questionIndex) => {
            const questionIdx = parseInt(questionIndex, 10);
            const question = data?.questions[questionIdx];
            const userAnswers = answers[questionIdx];
            const correctAnswers = question?.answers
                .map((answer, i) => answer.isCorrect ? i : -1)
                .filter(index => index !== -1);
            const isCorrect = correctAnswers?.length === userAnswers.length && correctAnswers.every(index => userAnswers.includes(index));
            return isCorrect ? score + 1 : score;
        }, 0);
    };

    return (


    <div className={styles.results}>
        <h2>Your Results</h2>
        <h2>Your time: {formatTime(timer)}</h2>
        <p>You scored {calculateScore()} out of {data.questions.length}</p>
        {Object.keys(answers).map((questionIndex, i) => {
            const questionIdx = parseInt(questionIndex, 10);
            const question = data.questions[questionIdx];
            return (
                <div key={i} className={styles.question}>
                    <p>Question: {question.text}</p>
                    <p>Your answers:</p>
                    <ul>
                        {answers[questionIdx].map((answerIndex, j) => (
                            <li  key={j}>{question.answers[answerIndex].text} - {question.answers[answerIndex].isCorrect ? 'Correct' : 'Incorrect'}</li>
                        ))}
                    </ul>
                </div>
            );
        })}
    </div>
    )
}

export default Results
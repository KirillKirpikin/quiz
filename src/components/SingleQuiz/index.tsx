import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById } from '../../utils/storage';

import styles from './singleQuize.module.scss';
import Results from '../Results';
import { formatTime } from '../../utils/formatTime';

const SingleQuiz = () => {
    const {id} = useParams<{id: string}>();
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: number[] }>({});
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [timer, setTimer] = useState(0);

    const timerRef = useRef<number | null>(null);
    const { data, isLoading } = useQuery({
        queryKey: ['Quiz', id],
        queryFn: () =>getQuizById(id as string)
    });

    const handleAnswerClick = (answerIndex: number) => {
        setSelectedAnswers(prevSelected => {
            if (prevSelected.includes(answerIndex)) {
                return prevSelected.filter(index => index !== answerIndex);
            } else {
                return [...prevSelected, answerIndex];
            }
        });
    };

    const handlePreviousQuestion = () => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [index]: selectedAnswers
        }));
        const previousIndex = index - 1;
        setSelectedAnswers(answers[previousIndex] || []);
        setIndex(previousIndex);
    };

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimer(prevTime => prevTime + 1);
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    const handleNextQuestion = () => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [index]: selectedAnswers
        }));
        setSelectedAnswers([]);
        setIndex(prevIndex => prevIndex + 1);

        if (data && data.questions && index + 1 >= data.questions.length) {
            stopTimer();
        }
    };



    return (
        <section className={styles.section}>
            <div className={styles.container}>
                
                {isLoading ? 
                    <div>Loading ...</div>
                    : data ? (
                        <div className={styles.block}>
                            {index < data.questions.length ? (
                                <>
                                <h1>{data.title}</h1>
                                <h2>Question {index + 1} of {data.questions.length}:</h2>
                                <h4>{data.questions[index]?.text}</h4>
                                {data.questions[index]?.answers.map((item, i)=>(
                                    <div 
                                        key={i}
                                        onClick={() => handleAnswerClick(i)}
                                        className={`${styles.answer} ${selectedAnswers.includes(i) && styles.answer_active}`}
                                    > {item.text}</div>
                                ))}
                                <div className={styles.btns}>
                                    <div>                                        
                                        <button onClick={handlePreviousQuestion} disabled={index === 0}>back</button>
                                    </div>
                                    <div>
                                        <button disabled={selectedAnswers.length <= 0} onClick={handleNextQuestion}>Next</button>
                                    </div>
                                    <div>
                                        {formatTime(timer)}
                                    </div>
                                </div>
                                </>
                            ):(
                                <Results data={data} answers={answers} timer={timer}/>
                            )}
                            

                        </div>
                    ): ( <div>No quiz</div> )
                }
            </div>            
        </section>

    )
}

export default SingleQuiz
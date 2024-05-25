import React from 'react'
import styles from './quizCard.module.scss'
import { Quiz } from '../../types/quiz.type'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteQuiz } from '../../utils/storage'

interface IQuizCard{
  quiz: Quiz
}

const QuizCard:React.FC<IQuizCard> = ({quiz}) => {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteQuiz(quiz.id),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['Quiz']});
      alert('Quiz delete!');
    }
});

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <h3>{quiz.title}</h3>
        <button onClick={()=>mutation.mutate()}>Delete</button>

      </div>
      <div>
        <h5>{quiz.questions.length} questions</h5>
       
      </div>
      <div className={styles.btn}>
        <Link to={`update/${quiz.id}`}>
          update
        </Link>
        <Link to={`quiz/${quiz.id}`}>
            To pass a quiz
        </Link>               

      </div>
    </div>
  )
}

export default QuizCard
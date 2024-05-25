import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Question, Quiz } from '../types/quiz.type';
import { getQuizById, updateQuiz } from '../utils/storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FormQuiz from '../components/FormQuiz';

const UpdateQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([
    { text: '', answers: [{ text: '', isCorrect: false }] }
  ]);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['Quiz', id],
    queryFn: () =>getQuizById(id as string),
    });


    
    const mutation = useMutation({
        mutationFn: (updatedQuiz: Quiz) => updateQuiz(updatedQuiz),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['Quiz', id]});
          alert('Quiz updated!');
          navigate('/')
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedQuiz: Quiz = { id: id!, title, questions };
        mutation.mutate(updatedQuiz);
    };

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setQuestions(data.questions);
        }
    }, [data]);


if(isLoading){
    return <div>Loading....</div>
}

  return (
    <FormQuiz 
        handleSubmit={handleSubmit} 
        questions={questions} 
        setQuestions={setQuestions} 
        setTitle={setTitle}
        title={title}
        submitTitle='Update'
    />
  );
}

export default UpdateQuiz;

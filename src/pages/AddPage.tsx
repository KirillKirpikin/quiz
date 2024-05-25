import React, { useState } from 'react'
import { Question, Quiz } from '../types/quiz.type';
import { saveQuiz } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';
import FormQuiz from '../components/FormQuiz';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const AddPage = () => {
    const [title, setTitle] = useState<string>('');
    const navigate = useNavigate()
    const [questions, setQuestions] = useState<Question[]>([
      { text: '', answers: [{ text: '', isCorrect: false }] }
    ]);

    const queryClient = useQueryClient();

    const mutation = useMutation({
      mutationFn: (newQuiz: Quiz) => saveQuiz(newQuiz),
      onSuccess: () => {
        setTitle('');
        setQuestions([{ text: '', answers: [{ text: '', isCorrect: false }] }]);            
          queryClient.invalidateQueries({queryKey: ['Quiz']});
          alert('Quiz updated!');
          navigate('/')
      }
  });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const id = uuidv4()
      const newQuiz: Quiz = { id ,title, questions };
      mutation.mutate(newQuiz);  
    };
  
    return (
      <FormQuiz 
        handleSubmit={handleSubmit} 
        questions={questions} 
        setQuestions={setQuestions} 
        setTitle={setTitle}
        title={title}
        submitTitle='Add'
    />
    );
  }

export default AddPage
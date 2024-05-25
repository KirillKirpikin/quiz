import { Quiz } from "../types/quiz.type";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const saveQuiz = async (quiz: Quiz): Promise<void> => {
  await delay(500);
  const storedQuizzes = localStorage.getItem('quizzes');
  const quizzes: Quiz[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];
  quizzes.push(quiz);
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
};

export const getQuizzes = async (): Promise<Quiz[]> => {
  await delay(500);
  const storedQuizzes = localStorage.getItem('quizzes');
  const quizzes: Quiz[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];
  return quizzes;
};

export const getQuizById = async (id: string): Promise<Quiz | undefined> => {
    await delay(500);
    const storedQuizzes = localStorage.getItem('quizzes');
    const quizzes: Quiz[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];
    return quizzes.find(quiz => quiz.id === id);
};

export const deleteQuiz = async (id: string): Promise<void> => {
  await delay(500);
  const storedQuizzes = localStorage.getItem('quizzes');
  const quizzes: Quiz[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];
  const updatedQuizzes = quizzes.filter(quiz => quiz.id !== id);
  localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
};

export const updateQuiz = async (updatedQuiz: Quiz): Promise<void> => {
  await delay(500);
  const storedQuizzes = localStorage.getItem('quizzes');
  const quizzes: Quiz[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];
  const quizIndex = quizzes.findIndex(quiz => quiz.id === updatedQuiz.id);
  if (quizIndex > -1) {
    quizzes[quizIndex] = updatedQuiz;
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }
};
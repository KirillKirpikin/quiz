export interface Answer {
    text: string;
    isCorrect: boolean;
  }
  
  export interface Question {
    text: string;
    answers: Answer[];
  }
  
  export interface Quiz {
    id: string
    title: string;
    questions: Question[];
  }
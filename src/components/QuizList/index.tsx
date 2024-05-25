import { Link } from 'react-router-dom';
import { getQuizzes } from '../../utils/storage';
import QuizCard from '../QuizCard';

import styles from './list.module.scss'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const QuizList = () => {
  const { data, isLoading } = useQuery({
      queryKey: ['Quiz'],
      queryFn: () => getQuizzes(),
    });
    

    
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    setSearchTerm(event.target.value);
  };

  const filteredQuizzes = data?.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
          <h2>Quiz List</h2>

          <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.search}
        />
          <div className={styles.list}>
          {isLoading ? 
              <div>Loading ...</div>
              : data ? (
                  <>
                  {filteredQuizzes && filteredQuizzes.map((quiz) => (
                    <div key={quiz.id} className={styles.card}>
                      <QuizCard  quiz={quiz}/>
                    </div>))} 
                    <div  className={styles.card}>
                      <div className={styles.btn_add}>
                        <Link to={'/admin'} className={styles.add}>
                          +
                        </Link>
                      </div>
                    </div> 
                  </>
              ): ( <div>No quiz</div> )
            }            
          </div>

      </div>
    </section>
  );
}

export default QuizList

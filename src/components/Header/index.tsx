import React from 'react'
import styles from './header.module.scss'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to={'/'}>
                    <h1>Quiz</h1>

                </Link>
            </div>
            <div className={styles.nav_bar}>
                <Link to={'/'}>Quiz page</Link>
            </div>
        </div>
    </header>
  )
}

export default Header
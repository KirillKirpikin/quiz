import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SingleQuizPage from '../pages/SingleQuizPage'
import UpdateQuiz from '../pages/UpdatePage'
import AddPage from '../pages/AddPage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route index element={<HomePage/>}/>
        <Route path='admin' element={<AddPage/>}/>
        <Route path='quiz/:id' element={<SingleQuizPage/>} />
        <Route path='update/:id' element={<UpdateQuiz/>}/>
    </Routes>
  )
}

export default AppRoutes
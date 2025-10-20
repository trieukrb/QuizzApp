
import './App.css'
import {Routes} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Quizz from "./features/quiz/Quizz.jsx";
import Login from "./components/Login.jsx";
import {Route} from "react-router-dom";
import AddQuestion from "./features/question-management/AddQuestion.jsx"

const Welcome = () => <h2>Chào mừng đến với Quizzlet!</h2>;

function App() {
  return (
      <Routes>
          <Route path='/' element={<Layout/>}>
              <Route index element={<Welcome />} />
          </Route>
          <Route path='quiz' element={<Quizz/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='addquestion' element={<AddQuestion/>}/>
      </Routes>
  )
}

export default App
